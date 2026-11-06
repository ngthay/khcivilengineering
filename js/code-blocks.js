/* =========================================================
   code-blocks.js
   Code listings for the Python and AI lessons.

   In a lesson:
     ${kcePy(String.raw`print("hello")`, 'hello.py')}   -> highlighted Python
     ${kceOut(String.raw`hello`)}                        -> program output

   The source is escaped here, so <, > and & can be written
   as they are. js/lesson.js adds the Copy button.
   ========================================================= */

(function () {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Remove the first blank line, trailing spaces and the common indent
  function tidy(src) {
    const lines = src.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
    const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return lines.map((l) => l.slice(indent)).join('\n');
  }

  const KEYWORDS = new Set(('and as assert async await break class continue def del elif else except finally for ' +
    'from global if import in is lambda nonlocal not or pass raise return try while with yield True False None').split(' '));
  const BUILTINS = new Set(('abs all any bool dict enumerate float format int isinstance len list map max min ' +
    'open print range reversed round set sorted str sum tuple type zip self').split(' '));

  // comment | string (with prefix) | decorator | number | name
  const TOKEN = /(#[^\n]*)|((?:\b[rRbBuUfF]{1,2})?(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'))|(@[A-Za-z_][\w.]*)|(\b\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?j?|\.\d+(?:[eE][+-]?\d+)?)|([A-Za-z_]\w*)/g;

  function highlight(src) {
    let html = '', last = 0, m, prev = '';
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(src))) {
      html += esc(src.slice(last, m.index));
      const t = esc(m[0]);
      if (m[1]) html += `<span class="tk-c">${t}</span>`;
      else if (m[2]) html += `<span class="tk-s">${t}</span>`;
      else if (m[3]) html += `<span class="tk-d">${t}</span>`;
      else if (m[4]) html += `<span class="tk-n">${t}</span>`;
      else if (KEYWORDS.has(m[5])) html += `<span class="tk-k">${t}</span>`;
      else if (prev === 'def' || prev === 'class' || src[TOKEN.lastIndex] === '(') html += `<span class="tk-f">${t}</span>`;
      else if (BUILTINS.has(m[5])) html += `<span class="tk-b">${t}</span>`;
      else html += t;
      if (m[5]) prev = m[5];
      last = TOKEN.lastIndex;
    }
    return html + esc(src.slice(last));
  }

  const head = (label, cls) => `<div class="code-head"><span class="code-lang ${cls}">${label}</span></div>`;

  window.kcePy = function (src, file) {
    return `<div class="code-block">${head(file || 'Python', 'py')}<pre class="code"><code>${highlight(tidy(src))}</code></pre></div>`;
  };

  window.kceOut = function (src, label) {
    return `<div class="code-block out">${head(label || 'Output', 'out')}<pre class="code"><code>${esc(tidy(src))}</code></pre></div>`;
  };

  window.kceShell = function (src, label) {
    return `<div class="code-block">${head(label || 'Terminal', 'sh')}<pre class="code"><code>${esc(tidy(src))}</code></pre></div>`;
  };
})();
