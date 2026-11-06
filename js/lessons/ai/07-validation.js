/* Lesson 7 — Validation, overfitting and tuning */
KCE_COURSE.lessons.push({
  id: 'validation',
  num: 7,
  title: 'Validation — Overfitting, Cross-Validation, Tuning and Extrapolation',
  desc: 'Underfitting and overfitting, the bias–variance trade-off, k-fold cross-validation, tuning hyperparameters with a grid search, the danger of extrapolation, and the checks an engineer should make before trusting a model.',
  icon: '✅',
  color: 'peach',
  meta: ['Cross-validation', 'GridSearchCV', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A model that fits its training data perfectly can still be useless. What matters is the error on <strong>new</strong> data. Two failures are possible:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th></th><th>Underfitting (high bias)</th><th>Overfitting (high variance)</th></tr></thead>
  <tbody>
    <tr><td>Model</td><td>Too simple for the physics</td><td>So flexible it follows the noise</td></tr>
    <tr><td>Training error</td><td>High</td><td>Very low</td></tr>
    <tr><td>Error on new data</td><td>High</td><td>High — much higher than training</td></tr>
    <tr><td>Remedy</td><td>Better features, more flexible model</td><td>More data, simpler model, regularisation, limits on depth</td></tr>
  </tbody>
</table></div>` },
        { title: 'Cross-validation', html: String.raw`
<p>With little data, one train/test split is a matter of luck. In <strong>k-fold cross-validation</strong> the data are divided into k parts; the model is trained k times, each time tested on a different part, and the k scores are averaged.</p>
<figure class="fig">
  <svg viewBox="0 0 520 170" role="img" aria-label="Five-fold cross-validation">
    <g font-size="12">
      <text x="10" y="32">Fold 1</text><text x="10" y="62">Fold 2</text><text x="10" y="92">Fold 3</text><text x="10" y="122">Fold 4</text><text x="10" y="152">Fold 5</text>
    </g>
    <g class="soil">
      <rect x="140" y="20" width="70" height="18"/><rect x="210" y="50" width="70" height="18"/><rect x="280" y="80" width="70" height="18"/><rect x="350" y="110" width="70" height="18"/><rect x="420" y="140" width="70" height="18"/>
    </g>
    <g class="conc">
      <rect x="70" y="20" width="70" height="18"/><rect x="210" y="20" width="280" height="18"/>
      <rect x="70" y="50" width="140" height="18"/><rect x="280" y="50" width="210" height="18"/>
      <rect x="70" y="80" width="210" height="18"/><rect x="350" y="80" width="140" height="18"/>
      <rect x="70" y="110" width="280" height="18"/><rect x="420" y="110" width="70" height="18"/>
      <rect x="70" y="140" width="350" height="18"/>
    </g>
  </svg>
  <figcaption>Figure 1 — Five-fold cross-validation: each part (coloured) is the test set once; the rest is training data.</figcaption>
</figure>
<p>Cross-validation is also how <strong>hyperparameters</strong> (tree depth, number of neurons, regularisation) are chosen: try several values and keep the one with the best cross-validated score. The final test set is used <em>once</em>, at the end.</p>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Extrapolation and engineering checks', html: String.raw`
<p>Machine learning models interpolate. Outside the range of the training data their predictions have no basis — trees predict a constant, polynomials and networks may shoot off in any direction. Before using a model, check:</p>
<ul>
  <li><strong>Range</strong>: is every input of the new case inside the training range — and is the <em>combination</em> represented (high cement with high water may never occur in the data)?</li>
  <li><strong>Trends</strong>: does strength rise with age and fall with w/b? Plot predictions while varying one input.</li>
  <li><strong>Limits</strong>: no negative strengths or settlements, probabilities between 0 and 1.</li>
  <li><strong>Residuals</strong>: errors should look random, not grow with one input.</li>
  <li><strong>Uncertainty</strong>: give a range, not one number — for example from cross-validation errors or quantile regression.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Overfitting a settlement curve', html: String.raw`
<p>Fifteen plate load tests (settlement against pressure) are fitted with polynomials of increasing degree. The training error keeps falling; the cross-validated error does not.</p>
${kcePy(String.raw`
import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score, KFold

# 15 plate load tests: settlement (mm) against applied pressure (kPa)
rng = np.random.default_rng(2)
q = np.sort(rng.uniform(50, 400, 15)).reshape(-1, 1)
s = 0.02 * q.ravel() + 1.5e-4 * q.ravel() ** 2 + rng.normal(0, 0.5, 15)

cv = KFold(n_splits=5, shuffle=True, random_state=0)
for degree in (1, 2, 5, 9):
    model = make_pipeline(StandardScaler(), PolynomialFeatures(degree), LinearRegression())
    train_rmse = np.sqrt(((model.fit(q, s).predict(q) - s) ** 2).mean())
    cv_rmse = -cross_val_score(model, q, s, cv=cv, scoring="neg_root_mean_squared_error").mean()
    print(f"degree {degree}: training RMSE = {train_rmse:.2f} mm, 5-fold CV RMSE = {cv_rmse:.2f} mm")
`, 'overfitting.py')}
${kceOut(String.raw`
degree 1: training RMSE = 0.82 mm, 5-fold CV RMSE = 0.84 mm
degree 2: training RMSE = 0.46 mm, 5-fold CV RMSE = 0.52 mm
degree 5: training RMSE = 0.45 mm, 5-fold CV RMSE = 0.95 mm
degree 9: training RMSE = 0.38 mm, 5-fold CV RMSE = 69.12 mm
`)}
<figure class="fig shot"><img src="images/ai/overfit.png" alt="Linear, quadratic and ninth-degree polynomial fits to fifteen settlement tests" width="1500" height="510" loading="lazy"><figcaption>Figure 2 — Degree 1 misses the curvature; degree 2 matches the law that generated the data; degree 9 wiggles through the points and explodes between and beyond them.</figcaption></figure>
<p class="result">Choose degree 2: the lowest cross-validated error (0.52 mm), close to the 0.5 mm scatter of the tests. The training error alone would have chosen degree 9.</p>` },
        { title: 'Tuning a random forest and testing extrapolation', html: String.raw`
${kcePy(String.raw`
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.metrics import r2_score
from concrete_data import make_concrete_data

df = make_concrete_data()
cols = ["cement", "slag", "fly_ash", "water", "age"]
X_tr, X_te, y_tr, y_te = train_test_split(df[cols], df["strength"], test_size=0.2, random_state=0)

grid = GridSearchCV(RandomForestRegressor(n_estimators=200, random_state=0),
                    {"max_depth": [4, 8, None], "min_samples_leaf": [1, 3, 10]},
                    cv=5, scoring="r2")
grid.fit(X_tr, y_tr)
print("best:", grid.best_params_, f"CV R² = {grid.best_score_:.3f}")
print(f"test R² = {r2_score(y_te, grid.predict(X_te)):.3f}")

# Extrapolation: train on ages up to 28 days, then ask about 90 days
young = df[df["age"] <= 28]
rf = RandomForestRegressor(n_estimators=300, random_state=0).fit(young[cols], young["strength"])
old = df[df["age"] == 90]
ratio = rf.predict(old[cols]).mean() / old["strength"].mean()
print(f"90-day mixes: true mean {old['strength'].mean():.1f} MPa, "
      f"forest trained to 28 days predicts {rf.predict(old[cols]).mean():.1f} MPa ({ratio:.0%})")
`, 'tuning.py')}
${kceOut(String.raw`
best: {'max_depth': None, 'min_samples_leaf': 1} CV R² = 0.917
test R² = 0.919
90-day mixes: true mean 38.1 MPa, forest trained to 28 days predicts 32.7 MPa (86%)
`)}
<ul>
  <li>The grid search tried 9 combinations × 5 folds = 45 fits; the cross-validated R² (0.917) agrees with the final test R² (0.919), a sign that the validation is honest.</li>
  <li>Trained only on ages up to 28 days, the forest cannot know that strength keeps rising: for 90-day concrete it predicts the 28-day strength, 14 % too low. A model with log(age) as a feature, or the ACI 209 curve, would extrapolate correctly.</li>
</ul>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Judge models by cross-validated or test error, never by training error.</li>
  <li>Tune hyperparameters with cross-validation; touch the test set once.</li>
  <li>Refuse to predict outside the training range; check trends and limits.</li>
  <li>Report the expected error with every prediction.</li>
</ul>` }
      ]
    }
  ]
});
