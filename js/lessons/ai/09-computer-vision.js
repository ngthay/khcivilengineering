/* Lesson 9 — Computer vision: convolutional networks for crack detection */
KCE_COURSE.lessons.push({
  id: 'computer-vision',
  num: 9,
  title: 'Computer Vision — Convolutional Networks for Crack Detection',
  desc: 'Images as arrays, convolution and edge filters worked by hand, the layers of a convolutional neural network, output sizes, transfer learning from a pretrained network, public crack datasets, and classification, detection and segmentation for inspection.',
  icon: '📷',
  color: 'lilac',
  meta: ['CNN', 'Transfer learning', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A digital photo is an array of numbers: a grey image of 227 × 227 pixels is a 227 × 227 matrix of values 0 (black) to 255 (white); a colour image has three such layers (red, green, blue). A <strong>convolutional neural network</strong> (CNN) learns to recognise patterns — edges, then textures, then objects such as cracks — directly from these numbers.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Task</th><th>Output</th><th>Inspection use</th></tr></thead>
  <tbody>
    <tr><td>Classification</td><td>One label per image: crack / no crack</td><td>Screening thousands of drone photos</td></tr>
    <tr><td>Object detection (e.g. YOLO)</td><td>Boxes around each defect</td><td>Counting and locating spalls, exposed bars</td></tr>
    <tr><td>Segmentation (e.g. U-Net)</td><td>A label for every pixel</td><td>Crack length and width, area of corrosion</td></tr>
  </tbody>
</table></div>` },
        { title: 'Layers of a CNN', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Layer</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td>Convolution</td><td>Slides small filters (3 × 3, 5 × 5) over the image; each filter’s weights are learned and respond to one pattern</td></tr>
    <tr><td>ReLU</td><td>Keeps positive responses, sets the rest to 0</td></tr>
    <tr><td>Pooling (max 2 × 2)</td><td>Halves the size, keeping the strongest response — makes the network tolerant to small shifts</td></tr>
    <tr><td>Fully connected + softmax</td><td>Turns the final features into class probabilities</td></tr>
  </tbody>
</table></div>
<p>Output size of a convolution or pooling layer with input size n, filter k, padding p and stride s:</p>
$$n_{out} = \frac{n - k + 2p}{s} + 1$$
<p>For example a 227-pixel image, 3 × 3 filter, no padding, stride 1 → 225; then 2 × 2 max pooling with stride 2 → 112.</p>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Convolution by hand', html: String.raw`
<p>The output at each position is the sum of the products of the filter with the patch under it. The Sobel filter responds to vertical edges — a change of brightness from left to right:</p>
$$K_x = \begin{bmatrix}-1 & 0 & 1\\ -2 & 0 & 2\\ -1 & 0 & 1\end{bmatrix}$$
<p>A 5 × 5 patch of concrete with a dark vertical crack in the middle column (grey value 40 on a background of 200):</p>
${kcePy(String.raw`
import numpy as np

img = np.array([[200, 200, 40, 200, 200]] * 5, dtype=float)   # grey levels: a dark vertical crack
sobel_x = np.array([[-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]])

out = np.zeros((3, 3))
for r in range(3):
    for c in range(3):
        out[r, c] = (img[r:r+3, c:c+3] * sobel_x).sum()     # slide the 3x3 window
print(out)
print("ReLU:", np.maximum(out, 0)[0], " |edge|:", np.abs(out)[0])
`, 'convolution.py')}
${kceOut(String.raw`
[[-640.    0.  640.]
 [-640.    0.  640.]
 [-640.    0.  640.]]
ReLU: [  0.   0. 640.]  |edge|: [640.   0. 640.]
`)}
<ol class="steps">
  <li>First position (columns 0–2): each row gives −200 + 40 = −160, weighted 1 + 2 + 1 = 4 → −640 (bright-to-dark edge).</li>
  <li>Centre (columns 1–3): −200 + 200 = 0 — symmetric about the crack.</li>
  <li>Last (columns 2–4): −40 + 200 = 160 × 4 = +640 (dark-to-bright edge).
    <span class="result">The filter marks both edges of the crack; a CNN learns many such filters by itself</span></li>
</ol>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Transfer learning for crack classification', html: String.raw`
<p>Training a CNN from scratch needs hundreds of thousands of images. <strong>Transfer learning</strong> takes a network already trained on millions of general photos (ImageNet) — whose early layers already detect edges and textures — and retrains only the last layer on crack images. A few thousand images are then enough.</p>
<p>Public datasets for practice:</p>
<ul>
  <li><strong>Concrete Crack Images for Classification</strong> (Özgenel, Mendeley Data): about 40,000 images of 227 × 227 pixels, half with cracks, half without.</li>
  <li><strong>SDNET2018</strong> (Utah State University): more than 56,000 images of cracked and uncracked bridge decks, walls and pavements.</li>
</ul>
<p>A template with <strong>PyTorch</strong> (<code>pip install torch torchvision</code>). Put the images in folders <code>cracks/train/Positive</code> and <code>cracks/train/Negative</code>:</p>
${kcePy(String.raw`
import torch
import torch.nn as nn
from torchvision import datasets, transforms, models

tf = transforms.Compose([transforms.Resize((224, 224)), transforms.ToTensor(),
                         transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])
train = datasets.ImageFolder("cracks/train", transform=tf)      # one folder per class
loader = torch.utils.data.DataLoader(train, batch_size=32, shuffle=True)

model = models.resnet18(weights="IMAGENET1K_V1")                 # pretrained network
for p in model.parameters():
    p.requires_grad = False                                       # freeze the feature layers
model.fc = nn.Linear(model.fc.in_features, 2)                     # new output: crack / no crack

opt = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()
for epoch in range(3):
    for images, labels in loader:
        opt.zero_grad()
        loss = loss_fn(model(images), labels)
        loss.backward()                                           # backpropagation
        opt.step()
    print(f"epoch {epoch + 1}: last batch loss = {loss.item():.3f}")
torch.save(model.state_dict(), "crack_resnet18.pt")
`, 'train_cracks.py')}
<div class="note">This template was not run for this page: it needs the image dataset and PyTorch, which are not part of the course setup. It uses standard PyTorch / torchvision calls; on a laptop without a graphics card, three epochs on a few thousand images take some minutes. Test the trained model on a separate folder of images that it never saw.</div>` },
        { title: 'Pitfalls in inspection imagery', html: String.raw`
<ul>
  <li><strong>Look-alikes</strong>: joints, formwork marks, shadows, cables and stains are often confused with cracks — include them in the “no crack” class.</li>
  <li><strong>Domain shift</strong>: a model trained on clean lab photos may fail on wet, dirty or poorly lit surfaces; test on images from your own structures.</li>
  <li><strong>Scale</strong>: crack <em>width</em> needs the pixel size (distance to the surface, camera resolution) — a classifier alone does not measure it.</li>
  <li><strong>Leakage</strong>: crops cut from the same photo must not be split between training and test sets.</li>
  <li><strong>Human review</strong>: use the network to sort and prioritise; an inspector confirms the findings.</li>
</ul>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Choose the task: classification, detection or segmentation.</li>
  <li>Start from a pretrained network; collect images representative of your structures.</li>
  <li>Split by photo or by structure, not by crop.</li>
  <li>Report precision and recall on an independent test set; keep an inspector in the loop.</li>
</ul>` }
      ]
    }
  ]
});
