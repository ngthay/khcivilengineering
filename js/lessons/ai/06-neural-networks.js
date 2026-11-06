/* Lesson 6 — Neural networks */
KCE_COURSE.lessons.push({
  id: 'neural-networks',
  num: 6,
  title: 'Neural Networks — Neurons, Layers, Backpropagation and Training',
  desc: 'The artificial neuron and activation functions, layers and the forward pass, the loss, backpropagation with the chain rule, learning rate and epochs, a network written from scratch in NumPy, and a multilayer perceptron for concrete strength with scikit-learn.',
  icon: '🧠',
  color: 'violet',
  meta: ['MLP', 'Backpropagation', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>An artificial <strong>neuron</strong> forms a weighted sum of its inputs plus a bias, and passes it through a non-linear <strong>activation function</strong>:</p>
$$z = \sum_i w_ix_i + b,\qquad h = g(z)$$
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Activation</th><th>g(z)</th><th>Used for</th></tr></thead>
  <tbody>
    <tr><td>ReLU</td><td>max(0, z)</td><td>Hidden layers (default)</td></tr>
    <tr><td>tanh</td><td>\((e^z - e^{-z})/(e^z + e^{-z})\)</td><td>Hidden layers of small networks; smooth</td></tr>
    <tr><td>Sigmoid</td><td>\(1/(1 + e^{-z})\)</td><td>Output probability (yes / no)</td></tr>
    <tr><td>Linear</td><td>z</td><td>Output of a regression (a number)</td></tr>
  </tbody>
</table></div>
<p>Neurons are arranged in <strong>layers</strong>. A <em>multilayer perceptron</em> (MLP) such as 5–32–16–1 has 5 inputs, two hidden layers of 32 and 16 neurons, and one output. With enough neurons it can represent any smooth relationship — which is also why it can overfit.</p>
<div data-widget="neuron" data-title="One neuron — change inputs, weights and bias"></div>` },
        { title: 'Network diagram', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="A neural network with two inputs, two hidden neurons and one output">
    <g class="thin">
      <path d="M112 70 L228 60 M112 70 L228 160 M112 150 L228 60 M112 150 L228 160 M272 60 L388 110 M272 160 L388 110"/>
    </g>
    <g class="conc"><circle cx="90" cy="70" r="22"/><circle cx="90" cy="150" r="22"/><circle cx="250" cy="60" r="22"/><circle cx="250" cy="160" r="22"/><circle cx="410" cy="110" r="22"/></g>
    <g text-anchor="middle"><text x="90" y="75">x₁</text><text x="90" y="155">x₂</text><text x="250" y="65">h₁</text><text x="250" y="165">h₂</text><text x="410" y="115">ŷ</text></g>
    <text x="170" y="52" class="a" text-anchor="middle">0.8</text><text x="170" y="182" class="a" text-anchor="middle">0.9</text>
    <text x="330" y="72" class="a" text-anchor="middle">1.5</text><text x="330" y="160" class="a" text-anchor="middle">−0.7</text>
    <g class="m" text-anchor="middle"><text x="90" y="208">input layer</text><text x="250" y="208">hidden (ReLU)</text><text x="410" y="208">output</text></g>
  </svg>
  <figcaption>Figure 1 — The small network of the first worked example, with some of its weights. The crossing lines carry x₁→h₂ = 0.3 and x₂→h₁ = −0.4.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Training: loss, backpropagation and gradient descent', html: String.raw`
<ol>
  <li><strong>Forward pass</strong>: compute the prediction ŷ layer by layer.</li>
  <li><strong>Loss</strong>: for regression the mean squared error \(L = \frac1n\sum(\hat y - y)^2\).</li>
  <li><strong>Backward pass (backpropagation)</strong>: the chain rule gives ∂L/∂w for every weight, from the output back to the input. For a tanh layer \(h = \tanh(xW_1 + b_1)\) and a linear output \(\hat y = hW_2 + b_2\):
  $$\frac{\partial L}{\partial W_2} = h^T\delta,\quad \delta = \frac{2}{n}(\hat y - y),\qquad \frac{\partial L}{\partial W_1} = x^T\left[(\delta W_2^T)\odot(1 - h^2)\right]$$</li>
  <li><strong>Update</strong> every weight: \(w \leftarrow w - \eta\,\partial L/\partial w\) (or a refined version such as the Adam optimiser).</li>
  <li>One pass through all the training data is an <strong>epoch</strong>; training runs many epochs until the loss stops falling.</li>
</ol>
<div class="note">Practical rules: scale the inputs; start small (one or two hidden layers); use a validation set or early stopping; add a little regularisation (<code>alpha</code> in scikit-learn) against overfitting; fix the random seed so that results can be repeated.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'A forward pass by hand', html: String.raw`
<div class="ex">
  <div class="ex-head">Inputs x = (0.5, −1.0); hidden weights (0.8, −0.4) and (0.3, 0.9), biases 0.1 and −0.2, ReLU; output weights (1.5, −0.7), bias 0.2. Find ŷ.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>z₁ = 0.8 × 0.5 + (−0.4)(−1.0) + 0.1 = 0.9 → h₁ = ReLU(0.9) = 0.9</li>
      <li>z₂ = 0.3 × 0.5 + 0.9 × (−1.0) − 0.2 = −0.95 → h₂ = ReLU(−0.95) = 0 (neuron “off”)</li>
      <li>ŷ = 1.5 × 0.9 + (−0.7) × 0 + 0.2 = 1.55 <span class="result">ŷ = 1.55</span></li>
    </ol>
${kcePy(String.raw`
import numpy as np

x = np.array([0.5, -1.0])                          # two scaled inputs
W1 = np.array([[0.8, -0.4],                        # hidden layer: 2 neurons
               [0.3,  0.9]])
b1 = np.array([0.1, -0.2])
w2 = np.array([1.5, -0.7]);  b2 = 0.2              # output neuron

z = W1 @ x + b1                                    # weighted sums
h = np.maximum(z, 0)                               # ReLU
y = w2 @ h + b2
print("z =", z, " h =", h, " y =", y)
`, 'forward.py')}
${kceOut(String.raw`
z = [ 0.9  -0.95]  h = [0.9 0. ]  y = 1.55
`)}
  </div>
</div>` },
        { title: 'A network trained from scratch', html: String.raw`
<p>One hidden layer of 8 tanh neurons learns Abrams’ law from 40 noisy points. Every line of training is visible — this is what libraries do inside.</p>
${kcePy(String.raw`
import numpy as np

# Learn f(w/c) from noisy data with one hidden layer of 8 tanh neurons
rng = np.random.default_rng(0)
wc = rng.uniform(0.35, 0.65, 40)
f = 100 / 8 ** wc * rng.normal(1, 0.03, 40)        # Abrams' law + 3 % scatter
x = ((wc - 0.5) / 0.1).reshape(-1, 1)              # scaled input  (40 x 1)
y = ((f - 35) / 10).reshape(-1, 1)                 # scaled target (40 x 1)

W1 = rng.normal(0, 1, (1, 8)); b1 = np.zeros(8)
W2 = rng.normal(0, 1, (8, 1)); b2 = np.zeros(1)
lr = 0.05
for epoch in range(1, 2001):
    h = np.tanh(x @ W1 + b1)                       # forward pass
    p = h @ W2 + b2
    loss = ((p - y) ** 2).mean()
    dp = 2 * (p - y) / len(x)                      # backward pass (chain rule)
    dW2 = h.T @ dp;  db2 = dp.sum(0)
    dh = dp @ W2.T * (1 - h ** 2)                  # tanh' = 1 - tanh²
    dW1 = x.T @ dh;  db1 = dh.sum(0)
    W1 -= lr * dW1; b1 -= lr * db1; W2 -= lr * dW2; b2 -= lr * db2
    if epoch in (1, 100, 500, 2000):
        print(f"epoch {epoch:4d}: loss = {loss:.4f}")

for w in (0.40, 0.50, 0.60):
    xs = np.array([[(w - 0.5) / 0.1]])
    pred = (np.tanh(xs @ W1 + b1) @ W2 + b2).item() * 10 + 35
    print(f"wc = {w}: network {pred:.1f} MPa, Abrams {100 / 8 ** w:.1f} MPa")
`, 'network_numpy.py')}
${kceOut(String.raw`
epoch    1: loss = 0.2353
epoch  100: loss = 0.0149
epoch  500: loss = 0.0141
epoch 2000: loss = 0.0135
wc = 0.4: network 44.2 MPa, Abrams 43.5 MPa
wc = 0.5: network 35.5 MPa, Abrams 35.4 MPa
wc = 0.6: network 29.0 MPa, Abrams 28.7 MPa
`)}
<p>The remaining loss, 0.0135 in scaled units (about 1.2 MPa), is the 3 % scatter of the data — the network cannot and should not fit noise. The predictions are within 0.7 MPa of the law that generated the data.</p>` },
        { title: 'A multilayer perceptron with scikit-learn', html: String.raw`
${kcePy(String.raw`
from sklearn.neural_network import MLPRegressor
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error
from concrete_data import make_concrete_data

df = make_concrete_data()
cols = ["cement", "slag", "fly_ash", "water", "age"]
X_tr, X_te, y_tr, y_te = train_test_split(df[cols], df["strength"], test_size=0.2, random_state=0)

net = make_pipeline(StandardScaler(),
                    MLPRegressor(hidden_layer_sizes=(32, 16), activation="relu",
                                 alpha=1e-3, max_iter=5000, random_state=0))
net.fit(X_tr, y_tr)
p = net.predict(X_te)
print(f"MLP 5-32-16-1: R² = {r2_score(y_te, p):.3f}  RMSE = {mean_squared_error(y_te, p) ** 0.5:.2f} MPa")
print("weights:", sum(w.size for w in net[-1].coefs_) + sum(b.size for b in net[-1].intercepts_))
`, 'mlp.py')}
${kceOut(String.raw`
MLP 5-32-16-1: R² = 0.942  RMSE = 2.16 MPa
weights: 737
`)}
<ul>
  <li><code>make_pipeline</code> puts the scaler inside the model, so scaling is learned from the training data only and applied automatically to new data.</li>
  <li>737 weights = 5×32 + 32 + 32×16 + 16 + 16×1 + 1, learned from 400 mixes.</li>
  <li>The MLP is the best of the models so far (RMSE 2.16 MPa against 2.31 for gradient boosting and 5.13 for linear regression), with the same raw inputs.</li>
</ul>
<div class="note">For images, text and very large datasets, networks are built with <strong>PyTorch</strong> or <strong>TensorFlow/Keras</strong>, which train on graphics cards. The ideas — layers, loss, backpropagation, epochs — are exactly the same.</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Scale inputs and keep the scaler inside a pipeline.</li>
  <li>Start with a small network and compare it with a random forest and linear regression.</li>
  <li>Watch the training and validation loss; stop when validation stops improving.</li>
  <li>Fix the random seed and record the architecture and settings.</li>
</ul>` }
      ]
    }
  ]
});
