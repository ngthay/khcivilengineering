/* Lesson 10 — AI in engineering practice: surrogates, physics and responsible use */
KCE_COURSE.lessons.push({
  id: 'ai-in-practice',
  num: 10,
  title: 'AI in Practice — Surrogate Models, Physics-Guided Learning and Responsible Use',
  desc: 'Surrogate models that replace slow analyses, why physics-guided features extrapolate and black boxes do not, generative AI assistants for code and documents, verification, data protection and professional responsibility, and a checklist for deploying a model.',
  icon: '🛡️',
  color: 'amber',
  meta: ['Surrogates', 'Physics-guided ML', 'Responsible AI'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The most valuable uses of AI in civil engineering are usually not replacing design methods, but <strong>speeding up</strong> and <strong>checking</strong> work: surrogate models for many analyses, screening of inspection data, and assistants that help write code and documents. Each brings a responsibility: the engineer remains accountable for every number that leaves the office.</p>` },
        { title: 'Surrogate models', html: String.raw`
<p>A <strong>surrogate</strong> (meta-model) is a fast approximation of a slow model, for example a finite element analysis that takes minutes per run:</p>
<ol>
  <li>Choose the inputs and their ranges (span, load, section, material).</li>
  <li>Sample the input space evenly (Latin hypercube sampling: <code>scipy.stats.qmc.LatinHypercube</code>) and run the slow model at those points.</li>
  <li>Fit a surrogate (polynomial, Gaussian process, random forest, neural network) and validate it on extra runs.</li>
  <li>Use it for thousands of evaluations: optimisation, reliability analysis, fragility curves, parametric studies — <em>only inside the sampled ranges</em>.</li>
</ol>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Physics-guided machine learning', html: String.raw`
<p>Engineering knowledge can be built into a model at several levels:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Level</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Features</td><td>w/b ratio, log(age), slenderness λ, dimensionless groups</td></tr>
    <tr><td>Model form</td><td>Fit log δ linearly because δ ∝ PᵃLᵇIᶜ; learn only a correction to a code formula</td></tr>
    <tr><td>Constraints</td><td>Monotonic trends (strength rises with age) — supported by gradient-boosting libraries</td></tr>
    <tr><td>Loss function</td><td>Physics-informed neural networks (PINNs) penalise violations of the governing differential equation</td></tr>
  </tbody>
</table></div>
<p>The worked example shows the payoff: a model with the right physical form extrapolates; a flexible black box does not.</p>` },
        { title: 'Generative AI assistants', html: String.raw`
<p>Large language models (ChatGPT, Claude, Copilot, Gemini …) can draft Python scripts, explain a clause, summarise a report or produce a first version of a calculation note. They are fluent, fast and often right — and sometimes confidently wrong.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Good use</th><th>Required check</th></tr></thead>
  <tbody>
    <tr><td>Writing or explaining code</td><td>Run it on a case with a known answer (as every script in the Python course was)</td></tr>
    <tr><td>Finding the relevant clauses</td><td>Read the clause in the current edition of the code; assistants may quote old editions or invent clause numbers</td></tr>
    <tr><td>Drafting text and reports</td><td>Check every number, unit and reference against the calculations</td></tr>
    <tr><td>Brainstorming options</td><td>Judge them with engineering analysis, not with the assistant’s confidence</td></tr>
  </tbody>
</table></div>
<div class="warn">Do not paste client drawings, personal data or confidential project information into public AI services unless your organisation’s agreement allows it.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'A surrogate that fails, and one that does not', html: String.raw`
<p>The “slow model” here is the cantilever formula δ = PL³/3EI (steel, E = 200 GPa), so the true answer is known everywhere. 300 samples with spans of 1–4 m train two surrogates, which are then tested inside that range and on spans of 5–6 m.</p>
${kcePy(String.raw`
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# "Expensive model" stand-in: tip deflection of a steel cantilever, delta = P L³ / 3EI
def deflection(P, L, I, E=200e6):                  # kN, m, m⁴, kN/m² -> mm
    return P * L**3 / (3 * E * I) * 1000

rng = np.random.default_rng(4)
def sample(n, L_range):
    P = rng.uniform(5, 50, n); L = rng.uniform(*L_range, n); I = rng.uniform(2e-5, 2e-4, n)
    return np.column_stack([P, L, I]), deflection(P, L, I)

X_tr, y_tr = sample(300, (1, 4))                   # 300 "analyses" with L = 1-4 m
X_in, y_in = sample(200, (1, 4))                   # new cases inside the range
X_out, y_out = sample(200, (5, 6))                 # new cases with longer spans

rf = RandomForestRegressor(n_estimators=300, random_state=0).fit(X_tr, y_tr)
print(f"Random forest  R² inside = {r2_score(y_in, rf.predict(X_in)):.3f}, "
      f"outside = {r2_score(y_out, rf.predict(X_out)):.3f}")

# Physics-guided: log(delta) = c0 + a log P + b log L + c log I is exactly linear
lin = LinearRegression().fit(np.log(X_tr), np.log(y_tr))
print("exponents of P, L, I:", lin.coef_.round(3))
print(f"Log-linear     R² inside = {r2_score(y_in, np.exp(lin.predict(np.log(X_in)))):.3f}, "
      f"outside = {r2_score(y_out, np.exp(lin.predict(np.log(X_out)))):.3f}")
`, 'surrogate.py')}
${kceOut(String.raw`
Random forest  R² inside = 0.911, outside = 0.050
exponents of P, L, I: [ 1.  3. -1.]
Log-linear     R² inside = 1.000, outside = 1.000
`)}
<ul>
  <li>The random forest is reasonable inside its range (R² = 0.91) but useless for longer spans (R² = 0.05): it has never seen deflections that large and cannot produce them.</li>
  <li>The log-linear model <em>rediscovers the formula</em> — exponents 1, 3 and −1 for P, L and I — and is exact everywhere.</li>
</ul>
<p class="result">Put the physics into the model form whenever you know it; use flexible models for what you do not know, and only where you have data.</p>` },
        { title: 'Before you deploy a model', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Question</th><th>Evidence</th></tr></thead>
  <tbody>
    <tr><td>Is the purpose clear and is ML the right tool?</td><td>Written problem statement; comparison with a physical or code method</td></tr>
    <tr><td>Are the data representative and correct?</td><td>Source, ranges, cleaning log, split by structure / site</td></tr>
    <tr><td>How accurate is it on new cases?</td><td>Test or cross-validated error in engineering units, per sub-group</td></tr>
    <tr><td>Does it behave physically?</td><td>Trend plots, limits, extrapolation checks</td></tr>
    <tr><td>Where may it be used?</td><td>Stated input ranges; the tool refuses inputs outside them</td></tr>
    <tr><td>Can it be reproduced?</td><td>Code, data version, random seeds, library versions stored together</td></tr>
    <tr><td>Who checks and signs?</td><td>Independent review; a responsible engineer</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use AI to speed up and check engineering work, not to replace judgement.</li>
  <li>Build known physics into features and model form.</li>
  <li>Verify every AI-generated script, clause and number independently.</li>
  <li>Protect confidential data; document the model, its data and its limits.</li>
</ul>` }
      ]
    }
  ]
});
