// ============================================================
// Frontend Practice / Code Lab validation harness
// Each entry is JS injected into the sandbox iframe AFTER the user's
// code runs. It inspects the DOM/output and must call:
//   window.__report({ passed: boolean, message: string })
// Referenced from challenge JSON via `validationId`.
// ============================================================

export const FRONTEND_VALIDATIONS: Record<string, string> = {
  // React: a counter button that increments its label on click.
  'react-counter': `
    var root = document.getElementById('root');
    var btn = root && root.querySelector('button');
    if (!btn) { window.__report({ passed: false, message: 'No <button> was rendered.' }); }
    else {
      btn.click();
      setTimeout(function(){
        var txt = (root.innerText || '');
        if (/\\b1\\b/.test(txt)) window.__report({ passed: true, message: 'Counter increments to 1 on click. ✔' });
        else window.__report({ passed: false, message: 'Clicking the button should show 1. Got: "' + txt.trim().slice(0,60) + '"' });
      }, 50);
    }
  `,

  // React: renders a list of items as <li> elements.
  'react-list': `
    var root = document.getElementById('root');
    var items = root ? root.querySelectorAll('li') : [];
    if (items.length >= 3) window.__report({ passed: true, message: 'Rendered ' + items.length + ' list items. ✔' });
    else window.__report({ passed: false, message: 'Expected at least 3 <li> items, found ' + items.length + '.' });
  `,

  // React: renders an <h1> containing "Hello".
  'react-greeting': `
    var r = document.getElementById('root');
    var h = r && r.querySelector('h1');
    var t = h ? (h.textContent || '') : '';
    if (/hello/i.test(t)) window.__report({ passed: true, message: 'Renders a greeting containing "Hello". ✔' });
    else window.__report({ passed: false, message: 'Expected an <h1> containing "Hello".' });
  `,

  // React: a button that toggles its label (e.g., OFF -> ON) on click.
  'react-toggle': `
    var r = document.getElementById('root');
    var b = r && r.querySelector('button');
    if (!b) { window.__report({ passed: false, message: 'No <button> rendered.' }); }
    else {
      var before = (r.innerText || '');
      b.click();
      setTimeout(function(){
        var after = (r.innerText || '');
        if (/on/i.test(after) && before !== after) window.__report({ passed: true, message: 'Toggles label on click. ✔' });
        else window.__report({ passed: false, message: 'Clicking should toggle the label (e.g., to ON). Got: "' + after.trim().slice(0,40) + '"' });
      }, 50);
    }
  `,

  // React: clicking the button should double the number (starts at 1 -> 2).
  'react-double': `
    var r = document.getElementById('root');
    var b = r && r.querySelector('button');
    if (!b) { window.__report({ passed: false, message: 'No <button> rendered.' }); }
    else {
      b.click();
      setTimeout(function(){
        if (/\\b2\\b/.test(r.innerText || '')) window.__report({ passed: true, message: 'Doubles the value on click. ✔' });
        else window.__report({ passed: false, message: 'Clicking once should show 2.' });
      }, 50);
    }
  `,

  // React: one click should increment by 3 (functional updates).
  'react-counter-three': `
    var r = document.getElementById('root');
    var b = r && r.querySelector('button');
    if (!b) { window.__report({ passed: false, message: 'No <button> rendered.' }); }
    else {
      b.click();
      setTimeout(function(){
        if (/\\b3\\b/.test(r.innerText || '')) window.__report({ passed: true, message: 'One click adds 3 — functional updates work. ✔' });
        else window.__report({ passed: false, message: 'One click should increment the count to 3.' });
      }, 50);
    }
  `,

  // JavaScript function challenges — the user defines a global function which
  // these tests invoke and assert on. (Functions declared at top level of the
  // sandbox script are global, so they're reachable here.)
  'js-reverse-string': `
    try {
      if (typeof reverseString === 'function' && reverseString('hello') === 'olleh' && reverseString('a') === 'a' && reverseString('') === '')
        window.__report({ passed: true, message: 'reverseString works for all cases. ✔' });
      else window.__report({ passed: false, message: 'reverseString("hello") should return "olleh".' });
    } catch (e) { window.__report({ passed: false, message: String(e && e.message || e) }); }
  `,
  'js-sum-array': `
    try {
      if (typeof sumArray === 'function' && sumArray([1,2,3,4]) === 10 && sumArray([]) === 0 && sumArray([5]) === 5)
        window.__report({ passed: true, message: 'sumArray works (incl. empty array). ✔' });
      else window.__report({ passed: false, message: 'sumArray([1,2,3,4]) should return 10 and sumArray([]) should return 0.' });
    } catch (e) { window.__report({ passed: false, message: String(e && e.message || e) }); }
  `,
  'js-palindrome': `
    try {
      if (typeof isPalindrome === 'function' && isPalindrome('racecar') === true && isPalindrome('hello') === false)
        window.__report({ passed: true, message: 'isPalindrome works. ✔' });
      else window.__report({ passed: false, message: 'isPalindrome("racecar") should be true, isPalindrome("hello") false.' });
    } catch (e) { window.__report({ passed: false, message: String(e && e.message || e) }); }
  `,
  'js-count-vowels': `
    try {
      if (typeof countVowels === 'function' && countVowels('hello') === 2 && countVowels('xyz') === 0 && countVowels('AEIOU') === 5)
        window.__report({ passed: true, message: 'countVowels works (case-insensitive). ✔' });
      else window.__report({ passed: false, message: 'countVowels("hello") should be 2 and countVowels("AEIOU") should be 5.' });
    } catch (e) { window.__report({ passed: false, message: String(e && e.message || e) }); }
  `,
  'js-unique': `
    try {
      var r = typeof unique === 'function' ? unique([1,2,2,3,3,3]) : null;
      if (Array.isArray(r) && r.length === 3 && r.indexOf(1) > -1 && r.indexOf(2) > -1 && r.indexOf(3) > -1)
        window.__report({ passed: true, message: 'unique removes duplicates. ✔' });
      else window.__report({ passed: false, message: 'unique([1,2,2,3,3,3]) should return [1,2,3].' });
    } catch (e) { window.__report({ passed: false, message: String(e && e.message || e) }); }
  `,
  'js-max': `
    try {
      if (typeof maxValue === 'function' && maxValue([3,7,2,9,4]) === 9 && maxValue([-1,-5,-2]) === -1)
        window.__report({ passed: true, message: 'maxValue works (incl. negatives). ✔' });
      else window.__report({ passed: false, message: 'maxValue([3,7,2,9,4]) should return 9.' });
    } catch (e) { window.__report({ passed: false, message: String(e && e.message || e) }); }
  `,

  // CSS challenges — inspect computed styles of the rendered elements.
  'css-center-flex': `
    var s = document.querySelector('.stage');
    if (!s) { window.__report({ passed: false, message: 'No .stage element found.' }); }
    else {
      var cs = getComputedStyle(s);
      if (cs.display === 'flex' && /center/.test(cs.justifyContent) && /center/.test(cs.alignItems))
        window.__report({ passed: true, message: '.stage centers its child with flexbox. ✔' });
      else window.__report({ passed: false, message: 'Make .stage display:flex with justify-content:center and align-items:center.' });
    }
  `,
  'css-grid-three': `
    var g = document.querySelector('.grid');
    if (!g) { window.__report({ passed: false, message: 'No .grid element found.' }); }
    else {
      var cs = getComputedStyle(g);
      var cols = (cs.gridTemplateColumns || '').trim().split(/\\s+/).filter(Boolean);
      if (cs.display === 'grid' && cols.length === 3)
        window.__report({ passed: true, message: 'Created a 3-column grid. ✔' });
      else window.__report({ passed: false, message: 'Make .grid display:grid with 3 columns, e.g. grid-template-columns: repeat(3, 1fr).' });
    }
  `,
  'css-ellipsis': `
    var t = document.querySelector('.title');
    if (!t) { window.__report({ passed: false, message: 'No .title element found.' }); }
    else {
      var cs = getComputedStyle(t);
      if (cs.textOverflow === 'ellipsis' && cs.overflow !== 'visible' && cs.whiteSpace === 'nowrap')
        window.__report({ passed: true, message: 'Text truncates with an ellipsis. ✔' });
      else window.__report({ passed: false, message: 'Use white-space:nowrap; overflow:hidden; text-overflow:ellipsis on .title.' });
    }
  `,

  // HTML: page uses semantic landmarks (header, nav, main, footer) instead of divs.
  'html-landmarks': `
    var ok = document.querySelector('header') && document.querySelector('nav') && document.querySelector('main') && document.querySelector('footer');
    var mains = document.querySelectorAll('main').length;
    if (ok && mains === 1) window.__report({ passed: true, message: 'Page uses header, nav, a single main, and footer landmarks. ✔' });
    else if (mains !== 1) window.__report({ passed: false, message: 'There should be exactly one <main> on the page (found ' + mains + ').' });
    else window.__report({ passed: false, message: 'Use semantic landmarks: <header>, <nav>, <main>, and <footer>.' });
  `,

  // HTML: every image has a non-empty alt attribute (or explicit alt="" only on decorative ones — here we require alt present).
  'html-img-alt': `
    var imgs = Array.prototype.slice.call(document.querySelectorAll('img'));
    if (imgs.length === 0) { window.__report({ passed: false, message: 'No <img> elements found.' }); }
    else {
      var missing = imgs.filter(function(i){ return !i.hasAttribute('alt'); });
      if (missing.length === 0) window.__report({ passed: true, message: 'All ' + imgs.length + ' image(s) have an alt attribute. ✔' });
      else window.__report({ passed: false, message: missing.length + ' image(s) are missing an alt attribute.' });
    }
  `,

  // HTML: a data table is accessible — has <caption>, <thead>, and <th scope> headers.
  'html-table-a11y': `
    var t = document.querySelector('table');
    if (!t) { window.__report({ passed: false, message: 'No <table> found.' }); }
    else {
      var cap = t.querySelector('caption');
      var thead = t.querySelector('thead');
      var scoped = t.querySelector('th[scope]');
      if (cap && thead && scoped) window.__report({ passed: true, message: 'Accessible table: caption, thead, and scoped headers. ✔' });
      else window.__report({ passed: false, message: 'Add a <caption>, a <thead>, and scope attributes on <th> header cells.' });
    }
  `,

  // HTML: every form control is labelled (a <label for> / wrapping label, or aria-label).
  'html-label-controls': `
    var controls = Array.prototype.slice.call(document.querySelectorAll('input, select, textarea')).filter(function(c){ return c.type !== 'hidden' && c.type !== 'submit' && c.type !== 'button'; });
    if (controls.length === 0) { window.__report({ passed: false, message: 'No form controls found.' }); }
    else {
      function labelled(c){
        if (c.getAttribute('aria-label') || c.getAttribute('aria-labelledby')) return true;
        if (c.id && document.querySelector('label[for="' + c.id + '"]')) return true;
        var p = c.closest && c.closest('label');
        return !!p;
      }
      var bad = controls.filter(function(c){ return !labelled(c); });
      if (bad.length === 0) window.__report({ passed: true, message: 'All ' + controls.length + ' control(s) are labelled. ✔' });
      else window.__report({ passed: false, message: bad.length + ' control(s) have no associated <label>. Use <label for> or wrap the control.' });
    }
  `,

  // HTML: logical heading outline — exactly one <h1>, and no skipped levels.
  'html-heading-outline': `
    var hs = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(function(h){ return parseInt(h.tagName[1], 10); });
    var h1s = hs.filter(function(n){ return n === 1; }).length;
    var skipped = false, prev = 0;
    for (var i = 0; i < hs.length; i++) { if (hs[i] > prev + 1 && prev !== 0) { skipped = true; break; } prev = hs[i]; }
    if (hs.length === 0) { window.__report({ passed: false, message: 'No headings found.' }); }
    else if (h1s === 1 && !skipped) window.__report({ passed: true, message: 'Logical outline: one <h1>, no skipped levels. ✔' });
    else if (h1s !== 1) window.__report({ passed: false, message: 'There should be exactly one <h1> (found ' + h1s + ').' });
    else window.__report({ passed: false, message: 'Heading levels should not skip (e.g., h2 then h4).' });
  `,

  // Web: an element with id "out" contains the text "Hello".
  'web-hello': `
    var out = document.getElementById('out');
    var txt = out ? (out.textContent || '') : '';
    if (/hello/i.test(txt)) window.__report({ passed: true, message: '#out contains "Hello". ✔' });
    else window.__report({ passed: false, message: '#out should contain "Hello". Got: "' + txt + '"' });
  `,
};
