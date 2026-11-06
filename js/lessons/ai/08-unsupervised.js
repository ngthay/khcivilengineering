/* Lesson 8 — Unsupervised learning: clustering and anomaly detection */
KCE_COURSE.lessons.push({
  id: 'unsupervised',
  num: 8,
  title: 'Unsupervised Learning — Clustering CPT Data and Detecting Damage',
  desc: 'k-means clustering step by step, scaling and choosing the number of clusters with inertia and the silhouette score, grouping CPT readings into soil behaviour types, and detecting bridge damage by removing the temperature effect from monitored frequencies.',
  icon: '🧭',
  color: 'pink',
  meta: ['k-means', 'Anomaly detection', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In <strong>unsupervised learning</strong> there is no target column. The aim is to find structure: groups of similar samples (<strong>clustering</strong>) or samples that do not fit the usual pattern (<strong>anomaly detection</strong>).</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Method</th><th>Finds</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>k-means</td><td>k compact groups</td><td>Soil behaviour types from CPT; traffic patterns by day</td></tr>
    <tr><td>DBSCAN, Gaussian mixtures</td><td>Groups of any shape / with probabilities</td><td>Defect regions in point clouds</td></tr>
    <tr><td>PCA</td><td>The main directions of variation</td><td>Reducing 50 sensor channels to a few components</td></tr>
    <tr><td>Residual / z-score, Isolation Forest</td><td>Unusual samples</td><td>Damage or sensor faults in monitoring data</td></tr>
  </tbody>
</table></div>` },
        { title: 'The k-means algorithm', html: String.raw`
<ol>
  <li>Choose k and place k centres (for example at k random samples).</li>
  <li><strong>Assign</strong> every sample to its nearest centre.</li>
  <li><strong>Update</strong> each centre to the mean of its samples.</li>
  <li>Repeat 2–3 until nothing changes. The result minimises the <em>inertia</em> \(\sum\|x_i - \mu_{c(i)}\|^2\).</li>
</ol>
<div class="warn">k-means uses distances, so <strong>scale the features</strong> first. Unscaled, qc in MPa (0.5–25) would swamp the friction ratio in % (0.5–6), and the clusters would be decided by qc alone.</div>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Choosing k', html: String.raw`
<ul>
  <li><strong>Inertia</strong> always falls as k grows; look for the “elbow” where it stops falling quickly.</li>
  <li>The <strong>silhouette score</strong> compares, for every point, the mean distance to its own cluster (a) with that to the nearest other cluster (b): \(s = (b - a)/\max(a, b)\). It lies between −1 and 1; higher is better.</li>
  <li><strong>Engineering sense</strong> decides in the end: clusters must mean something (soil types, operating states).</li>
</ul>
<h4>One iteration by hand</h4>
<p>Six CPT readings (qc MPa, Rf %): A (1.0, 4.5), B (1.2, 4.0), C (0.8, 5.0), D (10, 0.8), E (12, 0.6), F (14, 0.7); start with centres at A and D.</p>
<ol class="steps">
  <li>Assign: A, B, C are nearest to A; D, E, F nearest to D.</li>
  <li>Update: centre 1 = (1.0, 4.5), centre 2 = (12.0, 0.7). Assigning again changes nothing → converged.
    <span class="result">Two clusters: soft fine-grained soil (qc ≈ 1 MPa, Rf ≈ 4.5 %) and sand (qc ≈ 12 MPa, Rf ≈ 0.7 %)</span></li>
</ol>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Soil behaviour types from a CPT sounding', html: String.raw`
<p>A synthetic CPT log, 20 m deep, readings every 0.1 m: clay 0–6 m, sand 6–12 m, silt 12–16 m, dense sand 16–20 m. The clustering uses log qc and Rf, without the depth.</p>
${kcePy(String.raw`
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

# Synthetic CPT sounding every 0.1 m: cone resistance qc (MPa), friction ratio Rf (%)
rng = np.random.default_rng(5)
depth = np.arange(0.1, 20.01, 0.1)
layers = [(0, 6, 0.8, 4.5), (6, 12, 12.0, 0.7), (12, 16, 3.0, 2.2), (16, 20.1, 20.0, 0.6)]
qc = np.empty_like(depth); Rf = np.empty_like(depth)
for top, bot, q, r in layers:
    i = (depth > top) & (depth <= bot)
    qc[i] = q * rng.lognormal(0, 0.18, i.sum())
    Rf[i] = r * rng.lognormal(0, 0.15, i.sum())

X = StandardScaler().fit_transform(np.column_stack([np.log(qc), Rf]))
for k in (2, 3, 4, 5):
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    print(f"k = {k}: inertia = {km.inertia_:7.1f}, silhouette = {silhouette_score(X, km.labels_):.3f}")

km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
print("\nk = 3 clusters:")
for c in range(3):
    m = km.labels_ == c
    print(f"  cluster {c}: {m.sum():3d} points, mean qc = {qc[m].mean():5.1f} MPa, "
          f"mean Rf = {Rf[m].mean():.1f} %, depths {depth[m].min():.1f}-{depth[m].max():.1f} m")
`, 'cpt_clusters.py')}
${kceOut(String.raw`
k = 2: inertia =    78.3, silhouette = 0.718
k = 3: inertia =    15.5, silhouette = 0.789
k = 4: inertia =    11.1, silhouette = 0.703
k = 5: inertia =     7.2, silhouette = 0.570

k = 3 clusters:
  cluster 0: 100 points, mean qc =  15.4 MPa, mean Rf = 0.7 %, depths 6.1-20.0 m
  cluster 1:  60 points, mean qc =   0.8 MPa, mean Rf = 4.4 %, depths 0.1-6.0 m
  cluster 2:  40 points, mean qc =   3.1 MPa, mean Rf = 2.1 %, depths 12.1-16.0 m
`)}
<figure class="fig shot"><img src="images/ai/cpt-clusters.png" alt="CPT readings against depth coloured by k-means cluster" width="1500" height="690" loading="lazy"><figcaption>Figure 1 — Clusters plotted against depth (left, centre) and in the qc–Rf plane (right).</figcaption></figure>
<ul>
  <li>The elbow (inertia 78 → 16 → 11) and the highest silhouette (0.789) both point to k = 3.</li>
  <li>The two sand layers (6–12 m and 16–20 m) fall in one cluster: clustering finds soil <em>behaviour types</em> — like the Robertson SBT chart — not layers. The depth plot then shows the layering.</li>
</ul>` },
        { title: 'Detecting damage in bridge monitoring data', html: String.raw`
<p>The first natural frequency of a bridge is measured daily for two years. Temperature changes the stiffness (here −4 mHz per °C), which hides small damage. On day 600 damage lowers the frequency by 2 %. The method: learn the normal temperature effect from the first year, then watch the <em>residual</em>.</p>
${kcePy(String.raw`
import numpy as np
from sklearn.linear_model import LinearRegression

# Daily first natural frequency of a bridge (Hz) for 2 years, with temperature
rng = np.random.default_rng(11)
day = np.arange(730)
temp = 15 + 12 * np.sin(2 * np.pi * (day - 110) / 365) + rng.normal(0, 3, 730)   # °C
freq = 3.20 - 0.004 * (temp - 15) + rng.normal(0, 0.008, 730)
freq[600:] *= 0.98                                    # damage on day 600: -2 % frequency (about -4 % stiffness)

# Learn the normal temperature effect from the first year only
train = day < 365
model = LinearRegression().fit(temp[train].reshape(-1, 1), freq[train])
resid = freq - model.predict(temp.reshape(-1, 1))
sigma = resid[train].std()
z = resid / sigma

alarm = np.where((z < -3) & (np.roll(z, 1) < -3) & (np.roll(z, 2) < -3))[0]
print(f"slope = {model.coef_[0]*1000:.2f} mHz per °C, residual sigma = {sigma*1000:.1f} mHz")
print(f"raw frequency range in year 1: {freq[train].min():.3f}-{freq[train].max():.3f} Hz")
print(f"first alarm (3 days in a row below -3 sigma): day {alarm[alarm > 365][0]}")
print(f"false alarms before day 600: {np.sum(alarm < 600)}")
`, 'shm_alarm.py')}
${kceOut(String.raw`
slope = -3.99 mHz per °C, residual sigma = 8.3 mHz
raw frequency range in year 1: 3.129-3.279 Hz
first alarm (3 days in a row below -3 sigma): day 602
false alarms before day 600: 0
`)}
<figure class="fig shot"><img src="images/ai/shm.png" alt="Bridge frequency over two years and the temperature-corrected residual" width="1200" height="780" loading="lazy"><figcaption>Figure 2 — Top: the seasonal swing (150 mHz) is larger than the damage (64 mHz). Bottom: after removing the temperature effect, the damage stands out clearly.</figcaption></figure>
<p class="result">The 2 % frequency drop is detected on day 602, with no false alarms. Requiring three days in a row avoids alarms from single noisy readings.</p>
<p>Because f ∝ √k, a 2 % drop in frequency means about a 4 % loss of stiffness — damage that would be invisible in the raw data.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Scale features before any distance-based method.</li>
  <li>Choose k with inertia, silhouette and engineering meaning together.</li>
  <li>In monitoring, model the normal environmental effects before looking for damage.</li>
  <li>Set alarm rules that balance missed damage against false alarms.</li>
</ul>` }
      ]
    }
  ]
});
