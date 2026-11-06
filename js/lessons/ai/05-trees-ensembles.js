/* Lesson 5 — Decision trees, random forests and gradient boosting */
KCE_COURSE.lessons.push({
  id: 'trees-ensembles',
  num: 5,
  title: 'Decision Trees, Random Forests and Gradient Boosting',
  desc: 'How a regression tree chooses a split, depth and overfitting, averaging many trees in a random forest, correcting errors step by step with gradient boosting, feature importance, and a comparison with linear regression on the concrete dataset.',
  icon: '🌳',
  color: 'mint',
  meta: ['Trees · ensembles', 'Feature importance', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>decision tree</strong> asks a sequence of yes/no questions — “is w/b ≤ 0.51?”, “is age ≤ 10 days?” — and predicts the average target of the training samples that end in the same leaf. Trees need no scaling, handle non-linear effects and interactions automatically, and can be read by an engineer.</p>
<figure class="fig">
  <svg viewBox="0 0 520 210" role="img" aria-label="A small regression tree">
    <rect x="190" y="12" width="140" height="34" rx="8" class="conc"/><text x="207" y="34">w/c ≤ 0.51 ?</text>
    <path class="thin" d="M230 46 L130 92 M290 46 L390 92"/>
    <text x="150" y="70" class="m">yes</text><text x="345" y="70" class="m">no</text>
    <rect x="60" y="92" width="140" height="34" rx="8" class="conc"/><text x="75" y="114">age ≤ 10 d ?</text>
    <rect x="320" y="92" width="140" height="34" rx="8" class="soil"/><text x="342" y="114">f = 27.0 MPa</text>
    <path class="thin" d="M100 126 L60 168 M160 126 L200 168"/>
    <rect x="10" y="168" width="110" height="32" rx="8" class="soil"/><text x="22" y="189">f = 31 MPa</text>
    <rect x="150" y="168" width="110" height="32" rx="8" class="soil"/><text x="162" y="189">f = 46 MPa</text>
  </svg>
  <figcaption>Figure 1 — A regression tree: questions at the nodes, averages in the leaves (illustrative values; the first split is worked out below).</figcaption>
</figure>` },
        { title: 'Ensembles', html: String.raw`
<p>A single deep tree memorises the training data (overfits); a shallow one is too coarse. <strong>Ensembles</strong> combine many trees:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Method</th><th>Idea</th><th>Main settings</th></tr></thead>
  <tbody>
    <tr><td><strong>Random forest</strong></td><td>Hundreds of deep trees, each grown on a random resample of the data and random subsets of features; the prediction is their average. Robust, hard to overfit, little tuning.</td><td><code>n_estimators</code>, <code>max_depth</code>, <code>min_samples_leaf</code></td></tr>
    <tr><td><strong>Gradient boosting</strong></td><td>Shallow trees added one after another, each fitting the errors left by the previous ones. Usually the most accurate on tables of data.</td><td><code>n_estimators</code>, <code>learning_rate</code>, <code>max_depth</code></td></tr>
  </tbody>
</table></div>
<p>Popular fast implementations of boosting are XGBoost, LightGBM and CatBoost; scikit-learn’s <code>GradientBoostingRegressor</code> and <code>HistGradientBoostingRegressor</code> work the same way.</p>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'How a split is chosen', html: String.raw`
<p>For every feature and every possible threshold s, the tree computes the sum of squared errors (SSE) of the two groups about their own means, and keeps the split with the smallest total:</p>
$$\text{SSE}(s) = \sum_{x_i \le s}(y_i - \bar y_L)^2 + \sum_{x_i > s}(y_i - \bar y_R)^2$$
<p>The same is then repeated inside each group until a stopping rule (maximum depth, minimum samples per leaf) is reached. Classification trees use the Gini index or entropy instead of SSE.</p>
<p><strong>Feature importance</strong> adds up how much each feature reduced the SSE over all splits of all trees — a useful first look at what drives the prediction, though it favours features with many distinct values. Permutation importance (<code>sklearn.inspection.permutation_importance</code>) is more reliable.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'The first split by hand', html: String.raw`
<div class="ex">
  <div class="ex-head">Six cylinders: w/c = 0.38, 0.42, 0.47, 0.55, 0.60, 0.65 with strengths 48, 44, 41, 30, 27, 24 MPa. Where does a tree make its first split?</div>
  <div class="ex-body">
${kcePy(String.raw`
import numpy as np
# One split by hand: 6 cylinders, strength (MPa) and w/c
wc = np.array([0.38, 0.42, 0.47, 0.55, 0.60, 0.65])
f = np.array([48, 44, 41, 30, 27, 24], dtype=float)

def sse(v):                       # sum of squared errors around the mean
    return ((v - v.mean()) ** 2).sum() if len(v) else 0.0

print(f"no split: SSE = {sse(f):.1f}")
for s in (wc[:-1] + wc[1:]) / 2:  # candidate thresholds between the points
    left, right = f[wc <= s], f[wc > s]
    print(f"wc <= {s:.3f}: left mean {left.mean():5.1f}, right mean {right.mean():5.1f}, SSE = {sse(left) + sse(right):6.1f}")
`, 'one_split.py')}
${kceOut(String.raw`
no split: SSE = 493.3
wc <= 0.400: left mean  48.0, right mean  33.2, SSE =  310.8
wc <= 0.445: left mean  46.0, right mean  30.5, SSE =  173.0
wc <= 0.510: left mean  44.3, right mean  27.0, SSE =   42.7
wc <= 0.575: left mean  40.8, right mean  25.5, SSE =  183.2
wc <= 0.625: left mean  38.0, right mean  24.0, SSE =  330.0
`)}
    <ol class="steps">
      <li>Check the best split by hand: left {48, 44, 41}, mean 44.33, SSE = 13.4 + 0.1 + 11.1 = 24.7; right {30, 27, 24}, mean 27, SSE = 9 + 0 + 9 = 18; total 42.7.</li>
      <li>The split w/c ≤ 0.51 reduces the SSE from 493.3 to 42.7 — it explains 91 % of the variation.
        <span class="result">First split at w/c = 0.51: predict 44.3 MPa below, 27.0 MPa above</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Comparing models on 500 mixes', html: String.raw`
<p>Here the models get only the raw quantities — no w/b or log(age) — to see whether they can find the non-linear effects by themselves.</p>
${kcePy(String.raw`
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import r2_score, mean_squared_error
from concrete_data import make_concrete_data

df = make_concrete_data()
cols = ["cement", "slag", "fly_ash", "water", "age"]          # raw quantities only
X_tr, X_te, y_tr, y_te = train_test_split(df[cols], df["strength"], test_size=0.2, random_state=0)

models = {
    "Linear regression": LinearRegression(),
    "Decision tree (depth 6)": DecisionTreeRegressor(max_depth=6, random_state=0),
    "Random forest (300 trees)": RandomForestRegressor(n_estimators=300, random_state=0),
    "Gradient boosting": GradientBoostingRegressor(n_estimators=400, learning_rate=0.05,
                                                   max_depth=3, random_state=0),
}
for name, m in models.items():
    m.fit(X_tr, y_tr)
    p = m.predict(X_te)
    print(f"{name:26s} R² = {r2_score(y_te, p):.3f}  RMSE = {mean_squared_error(y_te, p) ** 0.5:.2f} MPa")

rf = models["Random forest (300 trees)"]
imp = pd.Series(rf.feature_importances_, index=cols).sort_values(ascending=False)
print("\nRandom forest feature importance:")
print(imp.round(3).to_string())
`, 'trees.py')}
${kceOut(String.raw`
Linear regression          R² = 0.675  RMSE = 5.13 MPa
Decision tree (depth 6)    R² = 0.768  RMSE = 4.34 MPa
Random forest (300 trees)  R² = 0.917  RMSE = 2.60 MPa
Gradient boosting          R² = 0.934  RMSE = 2.31 MPa

Random forest feature importance:
age        0.638
cement     0.227
slag       0.069
water      0.042
fly_ash    0.024
`)}
<ul>
  <li>The ensembles learn the curved age effect and the cement–water interaction from raw data and halve the error of the linear model.</li>
  <li>Linear regression with the two engineered features (Lesson 3: RMSE 2.86 MPa) is almost as good as the forest — knowledge of the physics is worth as much as a more complex model.</li>
  <li>Importance ranks age first and cement second; water ranks low only because its range (150–220 kg/m³) is narrow here — importance depends on the data, not only on the physics.</li>
</ul>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Try a random forest early: it is a strong default for tables of data.</li>
  <li>Limit tree depth or leaf size to avoid memorising noise.</li>
  <li>Trees cannot extrapolate: outside the training range they predict a constant.</li>
  <li>Read importances with care; confirm with permutation importance and engineering sense.</li>
</ul>` }
      ]
    }
  ]
});
