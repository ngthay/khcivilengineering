/* Lesson 2 — Data: features, cleaning, splitting and scaling */
KCE_COURSE.lessons.push({
  id: 'data',
  num: 2,
  title: 'Data — Features, Cleaning, Train/Test Split and Scaling',
  desc: 'Features and targets, the concrete-mix dataset used in this course, finding missing values and typing errors, feature engineering with engineering knowledge, splitting into training and test sets, standardisation, and data leakage.',
  icon: '🧹',
  color: 'mint',
  meta: ['pandas · scikit-learn', 'Feature engineering', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In machine learning each row of a table is one <strong>sample</strong> (a concrete mix, a borehole, a bridge on a given day). The input columns are <strong>features</strong> X and the column to predict is the <strong>target</strong> y.</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>cement</th><th>slag</th><th>fly_ash</th><th>water</th><th>age</th><th>strength</th></tr></thead>
  <tbody>
    <tr><td>277.4</td><td>65.9</td><td>61.4</td><td>185.8</td><td>7</td><td>24.5</td></tr>
    <tr><td>322.9</td><td>191.4</td><td>144.9</td><td>216.5</td><td>7</td><td>24.8</td></tr>
    <tr><td>281.2</td><td>90.2</td><td>55.0</td><td>160.1</td><td>7</td><td>29.6</td></tr>
    <tr><td colspan="5" style="text-align:right">features X (kg/m³, days)</td><td>target y (MPa)</td></tr>
  </tbody>
</table></div>
<p>Most of the work in a real project is in the data: collecting it, checking it, and turning it into features that carry the physics.</p>` },
        { title: 'The dataset used in this course', html: String.raw`
<p>To make every example reproducible, the course generates concrete mixes from known laws — Abrams’ law for the 28-day strength and the ACI 209 curve for strength gain with age — plus 6 % random scatter. Save this as <code>concrete_data.py</code>; later lessons import it.</p>
${kcePy(String.raw`
import numpy as np
import pandas as pd

def make_concrete_data(n=500, seed=1):
    """Synthetic concrete mixes (kg/m³, days, MPa) following Abrams' law
    and the ACI 209 strength-gain curve, with 6 % random scatter."""
    rng = np.random.default_rng(seed)
    water = rng.uniform(150, 220, n)                   # kg/m³
    wb = rng.uniform(0.32, 0.65, n)                    # water / binder
    binder = water / wb
    slag = binder * rng.uniform(0, 0.30, n)
    fly_ash = binder * rng.uniform(0, 0.25, n)
    cement = binder - slag - fly_ash
    age = rng.choice([3, 7, 14, 28, 56, 90], n)
    efficiency = (cement + 0.8 * slag + 0.5 * fly_ash) / binder
    f28 = 100 / 8 ** wb * efficiency                   # Abrams: A / B^(w/b)
    gain = age / (4 + 0.85 * age)                      # ACI 209, moist-cured
    strength = f28 * gain * rng.normal(1, 0.06, n)
    return pd.DataFrame({"cement": cement, "slag": slag, "fly_ash": fly_ash,
                         "water": water, "age": age, "strength": strength}).round(1)

if __name__ == "__main__":
    df = make_concrete_data()
    print(df.head())
    print()
    print(df.describe().round(1))
`, 'concrete_data.py')}
${kceOut(String.raw`
   cement   slag  fly_ash  water  age  strength
0   277.4   65.9     61.4  185.8    7      24.5
1   322.9  191.4    144.9  216.5    7      24.8
2   281.2   90.2     55.0  160.1    7      29.6
3   260.6   62.4     58.4  216.4    3      10.5
4   337.1   68.7     88.4  171.8   14      35.8

       cement   slag  fly_ash  water    age  strength
count   500.0  500.0    500.0  500.0  500.0     500.0
mean    284.0   60.1     48.2  184.4   32.0      28.7
std      79.7   38.1     30.3   20.1   31.2      10.1
min     117.7    0.0      0.4  150.1    3.0       9.9
25%     224.7   29.2     23.5  168.0    7.0      20.9
50%     272.6   58.2     47.0  183.4   14.0      28.1
75%     330.4   86.8     69.1  202.6   56.0      36.0
max     567.5  191.4    144.9  219.9   90.0      54.9
`)}
<div class="note">For practice with real test results, the <strong>Concrete Compressive Strength</strong> dataset (I-C. Yeh, 1998; 1030 mixes with cement, slag, fly ash, water, superplasticiser, aggregates and age) is freely available from the UCI Machine Learning Repository. The code of this course works on it after renaming the columns.</div>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Cleaning, features, splitting and scaling', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Step</th><th>Why</th><th>How</th></tr></thead>
  <tbody>
    <tr><td>Missing values</td><td>Most models cannot use empty cells</td><td>Fill with the median, or drop the row; never fill the target</td></tr>
    <tr><td>Impossible values</td><td>Typing errors (2400 instead of 240), sensor faults</td><td>Physical limits, plots, z-scores</td></tr>
    <tr><td>Feature engineering</td><td>Gives the model the physics you already know</td><td>Ratios (w/b), logs (log age), normalised quantities</td></tr>
    <tr><td>Categorical features</td><td>Soil type, cement type are words</td><td>One-hot encoding: <code>pd.get_dummies(df, columns=["soil"])</code></td></tr>
    <tr><td>Train / test split</td><td>The test set measures performance on new data</td><td>Typically 80 % / 20 %, random but reproducible</td></tr>
    <tr><td>Scaling</td><td>Features of very different size slow or bias many methods</td><td>Standardise: \(z = (x - \bar x)/s\)</td></tr>
  </tbody>
</table></div>
<div class="warn"><strong>Data leakage.</strong> Anything learned from the data — scaling means, filled medians, selected features — must be learned from the <em>training</em> set only, then applied to the test set. Otherwise information from the test set leaks into the model and the test score is too optimistic. Leakage also happens when nearly identical samples (the same mix tested at several ages, several readings from one sensor) end up on both sides of the split.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Clean, engineer features, split and scale', html: String.raw`
${kcePy(String.raw`
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from concrete_data import make_concrete_data

df = make_concrete_data()

# 1. Problems in real data: a few missing values and a typing error
df.loc[[5, 17, 42], "slag"] = np.nan
df.loc[99, "water"] = 2400.0                        # 240.0 typed with an extra zero
print("Missing values:\n", df.isna().sum()[df.isna().sum() > 0])

# 2. Clean: fill missing slag with the median, drop impossible water contents
df["slag"] = df["slag"].fillna(df["slag"].median())
df = df[df["water"].between(120, 250)]          # kg/m³ possible in practice
print("Rows after cleaning:", len(df))

# 3. Feature engineering: engineers know strength depends on w/b and log(age)
df["wb"] = df["water"] / (df["cement"] + df["slag"] + df["fly_ash"])
df["log_age"] = np.log(df["age"])

# 4. Split BEFORE scaling, then fit the scaler on the training set only
X = df[["cement", "slag", "fly_ash", "water", "wb", "log_age"]]
y = df["strength"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
scaler = StandardScaler().fit(X_train)
X_train_s, X_test_s = scaler.transform(X_train), scaler.transform(X_test)
print("Train / test:", X_train.shape, X_test.shape)
print("Scaled training means:", X_train_s.mean(axis=0).round(2))
print("Scaled training std:  ", X_train_s.std(axis=0).round(2))
`, 'prepare.py')}
${kceOut(String.raw`
Missing values:
 slag    3
dtype: int64
Rows after cleaning: 499
Train / test: (399, 6) (100, 6)
Scaled training means: [-0.  0. -0.  0. -0.  0.]
Scaled training std:   [1. 1. 1. 1. 1. 1.]
`)}
<ul>
  <li>The typing error removed one row (499 left). For simplicity the missing values were filled with the median of all rows; strictly it should be the training median.</li>
  <li><code>random_state=0</code> makes the split the same every time, so results can be compared.</li>
  <li>After scaling, each training feature has mean 0 and standard deviation 1. The test set is transformed with the <em>training</em> mean and standard deviation.</li>
</ul>
<p class="result">Lesson 3 shows that the two engineered features (w/b and log age) raise the accuracy of a linear model from R² = 0.68 to 0.90.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Look at the data (<code>describe</code>, plots) before modelling; check units and ranges.</li>
  <li>Use engineering knowledge to build features.</li>
  <li>Split first; fit every preprocessing step on the training set only.</li>
  <li>Keep related samples (same mix, same structure) on one side of the split.</li>
</ul>` }
      ]
    }
  ]
});
