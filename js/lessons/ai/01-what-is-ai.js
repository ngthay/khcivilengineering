/* Lesson 1 — What AI and machine learning are, and where they help civil engineers */
KCE_COURSE.lessons.push({
  id: 'what-is-ai',
  num: 1,
  title: 'What AI and Machine Learning Are — and Where They Help Civil Engineers',
  desc: 'AI, machine learning and deep learning; supervised, unsupervised and reinforcement learning; the machine learning workflow; applications in structures, geotechnics, materials, transport and construction; and when not to use machine learning.',
  icon: '🤖',
  color: 'mag',
  meta: ['Concepts', 'Workflow', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Artificial intelligence (AI)</strong> is the broad field of making computers perform tasks that normally need human judgement. <strong>Machine learning (ML)</strong> is the part of AI in which a program <em>learns a relationship from data</em> instead of being given the formula. <strong>Deep learning</strong> is machine learning with large neural networks, used for images, sound and text.</p>
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="AI contains machine learning, which contains deep learning">
    <ellipse cx="260" cy="100" rx="245" ry="90" class="conc"/>
    <ellipse cx="300" cy="112" rx="175" ry="66" class="soil"/>
    <ellipse cx="335" cy="122" rx="100" ry="40" class="accf" style="opacity:.35"/>
    <text x="40" y="70">Artificial intelligence</text>
    <text x="145" y="100">Machine learning</text>
    <text x="280" y="127">Deep learning</text>
  </svg>
  <figcaption>Figure 1 — Deep learning is a kind of machine learning, which is one approach to AI.</figcaption>
</figure>
<p>An engineering formula such as \(M = wL^2/8\) is derived from mechanics. A machine learning model is instead <em>fitted</em>: given many examples of inputs x and outputs y, it finds a function \(\hat y = f(x)\) that reproduces them and — if done well — predicts new cases.</p>` },
        { title: 'Three kinds of learning', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Kind</th><th>Data</th><th>Task</th><th>Civil engineering example</th></tr></thead>
  <tbody>
    <tr><td><strong>Supervised</strong> — regression</td><td>Inputs with a known numerical answer</td><td>Predict a number</td><td>Concrete strength from the mix; settlement from load; pavement roughness from traffic and age</td></tr>
    <tr><td><strong>Supervised</strong> — classification</td><td>Inputs with a known class</td><td>Predict a category</td><td>Liquefied / not; cracked / sound image; damage state of a building after an earthquake</td></tr>
    <tr><td><strong>Unsupervised</strong></td><td>Inputs only</td><td>Find groups or unusual points</td><td>Soil layers from CPT data; abnormal sensor readings on a bridge</td></tr>
    <tr><td><strong>Reinforcement</strong></td><td>An environment that gives rewards</td><td>Learn a sequence of actions</td><td>Traffic signal timing; maintenance scheduling</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'The machine learning workflow', html: String.raw`
<ol>
  <li><strong>Define the problem</strong>: what is predicted, from which inputs, how accurately, and what an error costs (a missed liquefaction case is worse than a false alarm).</li>
  <li><strong>Collect data</strong>: lab tests, site investigations, sensors, inspection records, analysis results.</li>
  <li><strong>Prepare</strong>: clean errors, handle missing values, create meaningful features (w/b ratio, log of age), split into training and test sets (Lesson 2).</li>
  <li><strong>Train</strong> one or more models: linear regression, trees, neural networks (Lessons 3–6).</li>
  <li><strong>Validate honestly</strong> on data the model has never seen; check physical sense (Lesson 7).</li>
  <li><strong>Use and monitor</strong>: only inside the range of the training data; record the model version; retrain when new data arrive.</li>
</ol>` },
        { title: 'When not to use machine learning', html: String.raw`
<ul>
  <li><strong>The physics is known and cheap to compute.</strong> A beam deflection formula beats any learned model.</li>
  <li><strong>There are few data.</strong> Twenty test results support a straight line, not a neural network.</li>
  <li><strong>The question is outside the data.</strong> A model trained on 3–6-storey buildings says nothing reliable about a 40-storey tower.</li>
  <li><strong>The result must be justified in a code check.</strong> Design codes require transparent methods; ML is better used for screening, prioritising and checking.</li>
</ul>
<div class="warn">A model is only as good as its data. Biased, mislabelled or unrepresentative data give confident but wrong answers.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Applications by field', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Field</th><th>Problem</th><th>Typical method</th></tr></thead>
  <tbody>
    <tr><td>Materials</td><td>Compressive strength from mix proportions and age</td><td>Random forest, gradient boosting, neural network</td></tr>
    <tr><td>Structures</td><td>Surrogate models that replace slow FE analyses; seismic damage prediction</td><td>Neural network, Gaussian process</td></tr>
    <tr><td>Monitoring (SHM)</td><td>Detecting damage from changes in frequencies or strains</td><td>Regression of environmental effects + anomaly detection</td></tr>
    <tr><td>Inspection</td><td>Cracks, spalling, corrosion in photos and drone images</td><td>Convolutional neural networks</td></tr>
    <tr><td>Geotechnics</td><td>Soil classification from CPT; liquefaction triggering; pile capacity</td><td>Clustering, logistic regression, trees</td></tr>
    <tr><td>Transport</td><td>Traffic flow forecasting; pavement condition</td><td>Time-series models, neural networks</td></tr>
    <tr><td>Construction</td><td>Cost and schedule risk; safety monitoring on site</td><td>Trees, computer vision</td></tr>
  </tbody>
</table></div>
<p>The rest of this course works through the main methods with small, complete Python examples. You need the setup of Python Lesson 1 (Anaconda includes <code>scikit-learn</code>).</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>State the output, the inputs and the cost of each type of error before collecting data.</li>
  <li>Prefer a physical formula when one exists.</li>
  <li>Have enough data that represent the cases you will predict.</li>
  <li>Plan how the model will be validated and who will check it.</li>
</ul>` }
      ]
    }
  ]
});
