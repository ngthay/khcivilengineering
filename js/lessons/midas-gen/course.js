/* =========================================================
   midas Gen course (Softwares -> Midas Gen)
   Based on the MIDAS IT tutorial "[GEN] Seismic Design for
   Reinforced Concrete Building" (support.midasuser.com, 2023):
   a 12-storey RC building with special moment frames and a
   dual wall–frame system, ASCE 7-10 loads, response spectrum
   and P-Delta analysis, ACI 318-11 design. The steps and input
   values follow the tutorial; the text is rewritten, the
   drawings are made for this course, the program screenshots
   are shown directly from the MIDAS IT help centre, and the
   code values were re-checked.
   US units: ft, kip, psf, psi.
   ========================================================= */
window.KCE_COURSE = {
  id: 'midas-gen',
  tag: 'GEN',
  title: 'midas Gen: Seismic Design of a Reinforced Concrete Building',
  category: 'Softwares',
  icon: '🏛️',
  subtitle: 'Five lessons that follow the midas Gen tutorial “Seismic Design for Reinforced Concrete Building” step by step: a 12-storey concrete building with special moment frames and shear walls, floor, wind and seismic loads to ASCE 7-10, response spectrum and P-Delta analysis, and ACI 318-11 design of beams, columns and walls — with the code values checked by hand.',
  chips: ['midas Gen', 'ASCE 7-10 · ACI 318-11', 'Response spectrum · P-Δ', '5 lessons'],
  lessons: []
};

/* Link to the original tutorial, used at the top of each lesson */
window.midasSource = `<div class="note">Source: MIDAS IT tutorial <a href="https://support.midasuser.com/hc/en-us/articles/17730317881113--GEN-Seismic-Design-for-Reinforced-Concrete-Building" target="_blank" rel="noopener">[GEN] Seismic Design for Reinforced Concrete Building</a>. The program pictures in the lessons are shown from that page; the steps and input values follow it.</div>`;

/* Pictures of the tutorial, shown from the MIDAS IT help centre (not copied
   into this site). Key = last 7 digits of the attachment id: [id, width, height] */
window.MIDAS_IMG = {
  '3103769': ['33935363103769', 600, 500],
  '6637081': ['33935346637081', 500, 213],
  '6646937': ['33935346646937', 550, 388],
  '6656153': ['33935346656153', 601, 681],
  '6661785': ['33935346661785', 17, 17],
  '3165081': ['33935363165081', 58, 17],
  '3169689': ['33935363169689', 17, 17],
  '3174041': ['33935363174041', 60, 17],
  '6685209': ['33935346685209', 17, 17],
  '6692249': ['33935346692249', 17, 17],
  '3202457': ['33935363202457', 600, 378],
  '3206297': ['33935363206297', 599, 445],
  '3210393': ['33935363210393', 17, 17],
  '3216153': ['33935363216153', 17, 17],
  '3224601': ['33935363224601', 17, 17],
  '6725401': ['33935346725401', 17, 17],
  '3236761': ['33935363236761', 600, 430],
  '6737689': ['33935346737689', 17, 17],
  '3258905': ['33935363258905', 17, 17],
  '3263385': ['33935363263385', 17, 17],
  '6764441': ['33935346764441', 56, 17],
  '6771865': ['33935346771865', 600, 433],
  '3590425': ['33936193590425', 17, 17],
  '6778137': ['33935346778137', 58, 17],
  '3596185': ['33936193596185', 17, 17],
  '3608601': ['33936193608601', 600, 434],
  '3618969': ['33936193618969', 601, 436],
  '6419097': ['33936226419097', 17, 16],
  '6444441': ['33936226444441', 17, 17],
  '3652249': ['33936193652249', 17, 17],
  '3658393': ['33936193658393', 17, 17],
  '3662873': ['33936193662873', 17, 17],
  '6467865': ['33936226467865', 17, 17],
  '3719833': ['33936193719833', 56, 17],
  '3731993': ['33936193731993', 56, 17],
  '6549017': ['33936226549017', 601, 443],
  '6571161': ['33936226571161', 602, 430],
  '3788185': ['33936193788185', 600, 449],
  '3792793': ['33936193792793', 60, 17],
  '6601241': ['33936226601241', 600, 427],
  '3808409': ['33936193808409', 148, 17],
  '3819417': ['33936193819417', 58, 17],
  '6665881': ['33936226665881', 56, 17],
  '6674713': ['33936226674713', 601, 643],
  '6700441': ['33936226700441', 17, 17],
  '3854617': ['33936193854617', 56, 17],
  '3865625': ['33936193865625', 601, 429],
  '6728089': ['33936226728089', 499, 437],
  '6048281': ['33937216048281', 60, 17],
  '8029081': ['33937248029081', 250, 632],
  '8036505': ['33937248036505', 60, 17],
  '6091673': ['33937216091673', 60, 17],
  '6099737': ['33937216099737', 58, 17],
  '8081433': ['33937248081433', 350, 439],
  '8101529': ['33937248101529', 600, 428],
  '6136473': ['33937216136473', 600, 428],
  '8145689': ['33937248145689', 56, 17],
  '6150809': ['33937216150809', 301, 623],
  '6169497': ['33937216169497', 500, 269],
  '6181913': ['33937216181913', 500, 407],
  '6186009': ['33937216186009', 60, 17],
  '6193689': ['33937216193689', 300, 640],
  '5832601': ['33941635832601', 59, 17],
  '5856281': ['33941635856281', 60, 17],
  '5872537': ['33941635872537', 58, 17],
  '0536729': ['33941620536729', 500, 269],
  '0557081': ['33941620557081', 350, 735],
  '0565017': ['33941620565017', 58, 17],
  '5953177': ['33941635953177', 60, 17],
  '5963545': ['33941635963545', 601, 723],
  '5979929': ['33941635979929', 57, 17],
  '5994777': ['33941635994777', 499, 661],
  '0701593': ['33941620701593', 60, 17],
  '0741913': ['33941620741913', 501, 282],
  '6040601': ['33941636040601', 300, 463],
  '6050457': ['33941636050457', 59, 17],
  '0781977': ['33941620781977', 500, 862],
  '6073241': ['33941636073241', 601, 279],
  '0813721': ['33941620813721', 499, 348],
  '0819225': ['33941620819225', 300, 256],
  '0055705': ['33942690055705', 17, 17],
  '0070681': ['33942690070681', 55, 17],
  '0107417': ['33942690107417', 250, 328],
  '0121369': ['33942690121369', 17, 17],
  '0145561': ['33942690145561', 60, 17],
  '0150681': ['33942690150681', 250, 356],
  '6815897': ['33942706815897', 250, 289],
  '0178969': ['33942690178969', 59, 17],
  '0192921': ['33942690192921', 250, 486],
  '2375065': ['33944102375065', 352, 216],
  '2382105': ['33944102382105', 400, 676],
  '4044313': ['33944094044313', 73, 17],
  '2399513': ['33944102399513', 58, 17],
  '2403737': ['33944102403737', 401, 338],
  '2410393': ['33944102410393', 28, 17],
  '2424089': ['33944102424089', 600, 379],
  '2431897': ['33944102431897', 600, 490],
  '6935577': ['33944156935577', 500, 460],
  '6953753': ['33944156953753', 601, 779]
};
const midasUrl = (k) => 'https://support.midasuser.com/hc/article_attachments/' + MIDAS_IMG[k][0];

/* A step picture with its caption */
window.mImg = (k, cap) => `<figure class="fig shot"><img src="${midasUrl(k)}" width="${MIDAS_IMG[k][1]}" height="${MIDAS_IMG[k][2]}" alt="${cap}" loading="lazy" referrerpolicy="no-referrer"><figcaption>${cap} <span class="credit">(image: MIDAS IT)</span></figcaption></figure>`;

/* Several step pictures side by side, one caption */
window.mRow = (ks, cap) => `<figure class="fig shot"><div class="shot-row">${ks.map((k) => `<img src="${midasUrl(k)}" width="${MIDAS_IMG[k][1]}" height="${MIDAS_IMG[k][2]}" alt="${cap}" loading="lazy" referrerpolicy="no-referrer">`).join('')}</div><figcaption>${cap} <span class="credit">(image: MIDAS IT)</span></figcaption></figure>`;

/* A toolbar icon or dialog button inside the text */
window.mIco = (k) => `<img class="ico${MIDAS_IMG[k][1] > 30 ? ' wide' : ''}" src="${midasUrl(k)}" width="${MIDAS_IMG[k][1]}" height="${MIDAS_IMG[k][2]}" alt="" referrerpolicy="no-referrer">`;
