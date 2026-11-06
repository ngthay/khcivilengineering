/* Lesson 4 — Classification: logistic regression and the confusion matrix */
KCE_COURSE.lessons.push({
  id: 'classification',
  num: 4,
  title: 'Classification — Logistic Regression for Liquefaction',
  desc: 'Predicting a category, the sigmoid and the probability of an event, the decision threshold, the confusion matrix, accuracy, precision, recall, F1 and ROC AUC, and why missed failures matter more than false alarms — on liquefaction case histories.',
  icon: '🌊',
  color: 'blue',
  meta: ['Logistic regression', 'Precision · recall', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In <strong>classification</strong> the target is a category: liquefied or not, cracked or sound, damage state A/B/C. <strong>Logistic regression</strong> calculates a linear score and turns it into a probability with the sigmoid function:</p>
$$z = b_0 + b_1x_1 + \dots + b_px_p,\qquad P(\text{yes}) = \sigma(z) = \frac{1}{1 + e^{-z}}$$
<p>A case is labelled “yes” when P exceeds a <strong>threshold</strong>, usually 0.5. The boundary where P = 0.5 (z = 0) is a straight line in the feature space — in this lesson a line in the (N₁)₆₀–ln CSR plane, the same kind of boundary used in simplified liquefaction charts.</p>` },
        { title: 'Confusion matrix and scores', html: String.raw`
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th></th><th>Predicted: liquefies</th><th>Predicted: no</th></tr></thead>
  <tbody>
    <tr><th>Actually liquefied</th><td>TP (true positive)</td><td>FN (missed — dangerous)</td></tr>
    <tr><th>Actually not</th><td>FP (false alarm — costly)</td><td>TN (true negative)</td></tr>
  </tbody>
</table></div>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Score</th><th>Formula</th><th>Question it answers</th></tr></thead>
  <tbody>
    <tr><td>Accuracy</td><td>(TP + TN)/n</td><td>How often is the model right? Misleading when one class is rare.</td></tr>
    <tr><td>Precision</td><td>TP/(TP + FP)</td><td>When it says “liquefies”, how often is that true?</td></tr>
    <tr><td>Recall (sensitivity)</td><td>TP/(TP + FN)</td><td>Of the sites that liquefied, how many did it catch?</td></tr>
    <tr><td>F1</td><td>2PR/(P + R)</td><td>Balance of precision and recall</td></tr>
    <tr><td>ROC AUC</td><td>Area under the ROC curve</td><td>How well the probabilities rank cases, for all thresholds (1 = perfect, 0.5 = random)</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Choosing the threshold', html: String.raw`
<p>In safety problems a missed failure (FN) costs far more than a false alarm (FP). Lowering the threshold catches more true cases (higher recall) at the price of more false alarms (lower precision). The threshold is an <strong>engineering decision</strong>, not a statistical one.</p>
<div data-widget="confusion-metrics" data-title="Scores from a confusion matrix"></div>
<p>The defaults are the test results at threshold 0.5 in the worked example. Enter the counts for threshold 0.2 (TP 37, FP 14, FN 1, TN 48) to see recall rise to 0.97 while precision falls.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Liquefaction from (N₁)₆₀ and CSR', html: String.raw`
<p>400 synthetic case histories (clean sand, M = 7.5) are generated around the Idriss &amp; Boulanger (2008) triggering curve</p>
$$CRR_{7.5} = \exp\!\left(\frac{N}{14.1} + \left(\frac{N}{126}\right)^2 - \left(\frac{N}{23.6}\right)^3 + \left(\frac{N}{25.4}\right)^4 - 2.8\right)$$
<p>with random scatter, so that the “true” boundary is known and the learned one can be compared with it.</p>
${kcePy(String.raw`
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score

# Synthetic case histories: clean sand, M = 7.5. The "true" boundary is the
# Idriss & Boulanger (2008) CRR curve; field scatter is added to it.
rng = np.random.default_rng(3)
n = 400
N = rng.uniform(3, 35, n)                                  # (N1)60
CSR = np.exp(rng.uniform(np.log(0.05), np.log(0.6), n))    # cyclic stress ratio
CRR = np.exp(N / 14.1 + (N / 126) ** 2 - (N / 23.6) ** 3 + (N / 25.4) ** 4 - 2.8)
liquefied = (np.log(CSR / CRR) + rng.normal(0, 0.25, n) > 0).astype(int)

X = np.column_stack([N, np.log(CSR)])
X_tr, X_te, y_tr, y_te = train_test_split(X, liquefied, test_size=0.25,
                                          random_state=0, stratify=liquefied)
clf = LogisticRegression().fit(X_tr, y_tr)
p = clf.predict_proba(X_te)[:, 1]

print("Coefficients:", clf.coef_.round(3), "intercept:", clf.intercept_.round(3))
for threshold in (0.5, 0.2):
    pred = (p >= threshold).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_te, pred).ravel()
    print(f"\nthreshold {threshold}: TP={tp} FP={fp} FN={fn} TN={tn}")
    print(f"  accuracy {(tp+tn)/len(y_te):.3f}  precision {tp/(tp+fp):.3f}  recall {tp/(tp+fn):.3f}")
print(f"\nROC AUC = {roc_auc_score(y_te, p):.3f}")

# Probability of liquefaction for a new site
site = np.array([[15, np.log(0.25)]])
print(f"(N1)60 = 15, CSR = 0.25 -> P(liquefaction) = {clf.predict_proba(site)[0, 1]:.2f}")
N0 = 15
print(f"IB08 CRR at N = 15: {np.exp(N0/14.1 + (N0/126)**2 - (N0/23.6)**3 + (N0/25.4)**4 - 2.8):.3f}")
`, 'liquefaction.py')}
${kceOut(String.raw`
Coefficients: [[-0.348  4.498]] intercept: [13.671]

threshold 0.5: TP=33 FP=3 FN=5 TN=59
  accuracy 0.920  precision 0.917  recall 0.868

threshold 0.2: TP=37 FP=14 FN=1 TN=48
  accuracy 0.850  precision 0.725  recall 0.974

ROC AUC = 0.976
(N1)60 = 15, CSR = 0.25 -> P(liquefaction) = 0.90
IB08 CRR at N = 15: 0.156
`)}
<ol class="steps">
  <li>The coefficients make sense: a higher (N₁)₆₀ lowers the probability (−0.348), a higher CSR raises it (+4.498).</li>
  <li><code>stratify=liquefied</code> keeps the same proportion of liquefied cases in the training and test sets.</li>
  <li>At threshold 0.5 the model misses 5 of 38 liquefied cases; at 0.2 it misses only 1, with 14 false alarms instead of 3.</li>
  <li>The new site has CSR = 0.25 &gt; CRR = 0.156, so the deterministic method also predicts liquefaction (factor of safety 0.62); the model gives a probability of 0.90.</li>
</ol>
<figure class="fig shot"><img src="images/ai/liquefaction.png" alt="Liquefaction case histories with the true triggering curve and logistic boundaries" width="1050" height="660" loading="lazy"><figcaption>Figure 1 — The learned boundary (P = 0.5) is a straight line close to the true curve over most of the data. Lowering the threshold to P = 0.2 moves the line down, to the safe side.</figcaption></figure>
<p>The learned line departs from the curve at high (N₁)₆₀, where the true boundary bends upward. A non-linear model or the feature N² would follow it better — or use the physics directly and learn only the scatter around the CRR curve.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Look at the confusion matrix, not only accuracy.</li>
  <li>Set the threshold from the consequences of a missed failure.</li>
  <li>Use <code>stratify</code> when one class is rare.</li>
  <li>Compare the learned boundary with established engineering methods.</li>
</ul>` }
      ]
    }
  ]
});
