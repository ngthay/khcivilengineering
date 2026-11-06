/* Lesson 3 — Linear regression, gradient descent and error measures */
KCE_COURSE.lessons.push({
  id: 'linear-regression',
  num: 3,
  title: 'Linear Regression — Least Squares, Gradient Descent and Abrams’ Law',
  desc: 'Fitting a straight line by least squares, R², RMSE and MAE, linearising Abrams’ law with logarithms, how gradient descent learns the same line step by step, and multiple regression on the concrete dataset with and without engineered features.',
  icon: '📈',
  color: 'sky',
  meta: ['Least squares', 'R² · RMSE', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Linear regression</strong> predicts the target as a weighted sum of the features:</p>
$$\hat y = b_0 + b_1x_1 + b_2x_2 + \dots + b_px_p$$
<p>The weights are chosen to minimise the sum of squared errors \(\sum(y_i - \hat y_i)^2\) — the <strong>least squares</strong> method. For one feature the answer is</p>
$$b_1 = \frac{\sum(x_i - \bar x)(y_i - \bar y)}{\sum(x_i - \bar x)^2},\qquad b_0 = \bar y - b_1\bar x$$
<p>“Linear” means linear in the weights: \(x^2\), \(\ln x\) or \(w/b\) can be used as features, so curved relationships can still be fitted.</p>` },
        { title: 'Measuring the error', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Measure</th><th>Formula</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>MAE</td><td>\(\frac1n\sum|y_i - \hat y_i|\)</td><td>Typical error, in the units of y</td></tr>
    <tr><td>RMSE</td><td>\(\sqrt{\frac1n\sum(y_i - \hat y_i)^2}\)</td><td>Like MAE but punishes large errors more</td></tr>
    <tr><td>R²</td><td>\(1 - \dfrac{\sum(y_i - \hat y_i)^2}{\sum(y_i - \bar y)^2}\)</td><td>Fraction of the variation explained: 1 is perfect, 0 is no better than the mean</td></tr>
  </tbody>
</table></div>
<p>Always quote an error in engineering units (MPa, mm) as well as R² — an R² of 0.9 may still mean ±5 MPa, too much for a design decision.</p>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Abrams’ law as a straight line', html: String.raw`
<p>Abrams’ law \(f = A/B^{w/c}\) is not linear, but its logarithm is:</p>
$$\ln f = \ln A - (w/c)\ln B$$
<p>So fitting a straight line to (w/c, ln f) gives ln A and −ln B. Transforming the data so that the physics becomes linear is one of the most useful tricks in engineering regression.</p>` },
        { title: 'Gradient descent', html: String.raw`
<p>Large models (neural networks) cannot be solved with a formula. They are trained by <strong>gradient descent</strong>: start with any weights and repeatedly step against the slope of the loss \(L = \frac1n\sum(\hat y_i - y_i)^2\):</p>
$$b_0 \leftarrow b_0 - \eta\frac{\partial L}{\partial b_0} = b_0 - \eta\,\frac2n\sum e_i,\qquad b_1 \leftarrow b_1 - \eta\,\frac2n\sum e_ix_i$$
<p>where \(e_i = \hat y_i - y_i\) and η is the <strong>learning rate</strong>. Too small: slow; too large: the loss grows instead of falling. Scaling the inputs first makes training much faster.</p>
<div data-widget="linreg-fit" data-title="Least-squares fit — edit the points and choose the model"></div>
<p>The default points are the five test results of the worked example. Switch the model to Abrams to fit \(f = A/B^{w/c}\), add or remove points, and see how R² and the prediction change.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Strength against w/c by hand and in Python', html: String.raw`
<div class="ex">
  <div class="ex-head">Five mixes gave 28-day strengths of 45.0, 40.5, 35.0, 32.0 and 28.0 MPa at w/c = 0.40, 0.45, 0.50, 0.55 and 0.60. Fit a straight line and Abrams’ law, and predict the strength at w/c = 0.48.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Means: \(\bar x = 0.50\), \(\bar y = 36.1\) MPa.</li>
      <li>\(\sum(x - \bar x)(y - \bar y) = (-0.1)(8.9) + (-0.05)(4.4) + 0 + (0.05)(-4.1) + (0.1)(-8.1) = -2.125\); \(\sum(x - \bar x)^2 = 0.025\).</li>
      <li>\(b_1 = -2.125/0.025 = -85.0\) MPa per unit w/c; \(b_0 = 36.1 + 85.0 \times 0.5 = 78.6\) MPa.
        <span class="result">f = 78.6 − 85.0 (w/c); at w/c = 0.48: f = 37.8 MPa</span></li>
    </ol>
  </div>
</div>
${kcePy(String.raw`
import numpy as np

wc = np.array([0.40, 0.45, 0.50, 0.55, 0.60])     # water/cement ratio
f = np.array([45.0, 40.5, 35.0, 32.0, 28.0])       # 28-day strength, MPa

# Straight line f = b0 + b1*wc by least squares
b1, b0 = np.polyfit(wc, f, 1)
pred = b0 + b1 * wc
r2 = 1 - ((f - pred) ** 2).sum() / ((f - f.mean()) ** 2).sum()
rmse = np.sqrt(((f - pred) ** 2).mean())
print(f"Line:   f = {b0:.2f} {b1:+.2f} wc   R² = {r2:.4f}  RMSE = {rmse:.2f} MPa")

# Abrams' law f = A / B^wc  ->  ln f = ln A - wc ln B  (a straight line in ln f)
c1, c0 = np.polyfit(wc, np.log(f), 1)
A, B = np.exp(c0), np.exp(-c1)
pred2 = A / B ** wc
r2b = 1 - ((f - pred2) ** 2).sum() / ((f - f.mean()) ** 2).sum()
print(f"Abrams: f = {A:.1f} / {B:.2f}^wc   R² = {r2b:.4f}")
print(f"Predicted at wc = 0.48: line {b0 + b1*0.48:.1f} MPa, Abrams {A / B**0.48:.1f} MPa")
`, 'abrams.py')}
${kceOut(String.raw`
Line:   f = 78.60 -85.00 wc   R² = 0.9914  RMSE = 0.56 MPa
Abrams: f = 116.4 / 10.69^wc   R² = 0.9961
Predicted at wc = 0.48: line 37.8 MPa, Abrams 37.3 MPa
`)}
<figure class="fig shot"><img src="images/ai/abrams-fit.png" alt="Five test results with a straight-line fit and an Abrams-law fit" width="1050" height="600" loading="lazy"><figcaption>Figure 1 — Inside the tested range (shaded) both models agree; outside it they diverge. The physically based Abrams form is safer to extrapolate a little, but neither should be trusted far beyond the data.</figcaption></figure>` },
        { title: 'The same line by gradient descent', html: String.raw`
${kcePy(String.raw`
import numpy as np

wc = np.array([0.40, 0.45, 0.50, 0.55, 0.60])
f = np.array([45.0, 40.5, 35.0, 32.0, 28.0])
x = (wc - wc.mean()) / wc.std()            # scale the input first

b0, b1, lr = 0.0, 0.0, 0.1                 # start from zero, learning rate 0.1
for epoch in range(1, 201):
    err = b0 + b1 * x - f
    loss = (err ** 2).mean()
    b0 -= lr * 2 * err.mean()              # dLoss/db0
    b1 -= lr * 2 * (err * x).mean()        # dLoss/db1
    if epoch in (1, 10, 50, 200):
        print(f"epoch {epoch:3d}: loss = {loss:8.3f}  b0 = {b0:.3f}  b1 = {b1:.3f}")
print(f"slope in MPa per unit wc = {b1 / wc.std():.2f}")
`, 'gradient_descent.py')}
${kceOut(String.raw`
epoch   1: loss = 1339.650  b0 = 7.220  b1 = -1.202
epoch  10: loss =   24.442  b0 = 32.224  b1 = -5.365
epoch  50: loss =    0.315  b0 = 36.100  b1 = -6.010
epoch 200: loss =    0.315  b0 = 36.100  b1 = -6.010
`)}
<p>With scaled x, b₀ converges to the mean strength 36.1 MPa and the slope converts back to −85.0 MPa per unit w/c — the least-squares answer. The final loss 0.315 is RMSE² = 0.56².</p>` },
        { title: 'Multiple regression on 500 mixes', html: String.raw`
${kcePy(String.raw`
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from concrete_data import make_concrete_data

df = make_concrete_data()
df["wb"] = df["water"] / (df["cement"] + df["slag"] + df["fly_ash"])
df["log_age"] = np.log(df["age"])
y = df["strength"]

for name, cols in [("raw mix quantities", ["cement", "slag", "fly_ash", "water", "age"]),
                   ("with wb and log(age)", ["cement", "slag", "fly_ash", "water", "wb", "log_age"])]:
    X_tr, X_te, y_tr, y_te = train_test_split(df[cols], y, test_size=0.2, random_state=0)
    model = LinearRegression().fit(X_tr, y_tr)
    p = model.predict(X_te)
    print(f"{name:22s} R² = {r2_score(y_te, p):.3f}  "
          f"MAE = {mean_absolute_error(y_te, p):.2f}  RMSE = {mean_squared_error(y_te, p) ** 0.5:.2f} MPa")
`, 'multiple_regression.py')}
${kceOut(String.raw`
raw mix quantities     R² = 0.675  MAE = 4.29  RMSE = 5.13 MPa
with wb and log(age)   R² = 0.899  MAE = 2.38  RMSE = 2.86 MPa
`)}
<p class="result">Two features based on concrete technology cut the test error almost in half (RMSE 5.13 → 2.86 MPa) without changing the model.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Start with linear regression — it is the baseline every other model must beat.</li>
  <li>Transform features (ratios, logs) so the physics is linear.</li>
  <li>Report RMSE or MAE in engineering units, measured on the test set.</li>
  <li>Plot the data and the fit; never extrapolate far beyond the data.</li>
</ul>` }
      ]
    }
  ]
});
