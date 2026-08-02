/* OPHANARK — scroll-guide spiral.
   Self-initializing. Injects the red scroll-progress spiral into #app on any page
   that doesn't already have one (zodiac.html / natal.html keep their built-in copy).
   As the user scrolls #app down, the spiral draws in and its star descends —
   a wayfinding cue that there is more below. Matches the zodiac/natal visual. */
(function () {
  if (window.__ophSpiral) return;
  window.__ophSpiral = 1;

  function init() {
    var app = document.getElementById('app');
    if (!app) return;
    if (document.getElementById('spiral')) return; // page already has its own spiral

    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('id', 'spiral');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:0;pointer-events:none;z-index:6';
    svg.innerHTML =
      '<defs>' +
        '<linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#e0503a"/><stop offset="1" stop-color="#a52318"/>' +
        '</linearGradient>' +
        '<filter id="glow" x="-60%" y="-60%" width="220%" height="220%">' +
          '<feGaussianBlur stdDeviation="3.2" result="b"/>' +
          '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
        '</filter>' +
        '<radialGradient id="starGlow">' +
          '<stop offset="0" stop-color="#fff4cf" stop-opacity=".95"/>' +
          '<stop offset="1" stop-color="#fff4cf" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<path id="sPath" d="" fill="none" stroke="url(#sg)" stroke-width="2.4" stroke-linecap="round" opacity=".7" filter="url(#glow)"/>' +
      '<g id="sStar" filter="url(#glow)">' +
        '<circle r="13" fill="url(#starGlow)"/>' +
        '<path d="M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z" fill="#fff6d8"/>' +
      '</g>';

    if (getComputedStyle(app).position === 'static') app.style.position = 'relative';
    app.insertBefore(svg, app.firstChild);

    var sPath = svg.querySelector('#sPath');
    var sStar = svg.querySelector('#sStar');
    var spiralLen = 0;

    function build() {
      svg.style.height = '0px';               // measure content without the svg inflating it
      var W = app.clientWidth, H = app.scrollHeight;
      if (W < 40 || H < 40) return;
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.style.height = H + 'px';
      var cx = W / 2, A = W * 0.34, y0 = 70, y1 = H - 70, span = Math.max(1, y1 - y0);
      var loops = Math.max(2, Math.round(span / 640)), N = Math.max(260, loops * 90), d = '';
      for (var k = 0; k <= N; k++) {
        var t = k / N, th = t * loops * Math.PI * 2, amp = A * (0.72 + 0.28 * Math.sin(t * Math.PI));
        d += (k ? 'L' : 'M') + (cx + amp * Math.sin(th)).toFixed(1) + ' ' + (y0 + t * span).toFixed(1) + ' ';
      }
      sPath.setAttribute('d', d);
      spiralLen = sPath.getTotalLength();
      sPath.style.strokeDasharray = spiralLen;
      update();
    }

    function update() {
      if (!spiralLen) return;
      var max = app.scrollHeight - app.clientHeight, p = max > 0 ? app.scrollTop / max : 0;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      sPath.style.strokeDashoffset = spiralLen * (1 - p);
      var pt = sPath.getPointAtLength(spiralLen * p);
      sStar.setAttribute('transform', 'translate(' + pt.x + ',' + pt.y + ')');
    }

    var ticking = false;
    app.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; update(); }); }
    }, { passive: true });
    window.addEventListener('resize', build);
    window.addEventListener('load', build);

    // rebuild a few times to catch late layout (fonts, images, fetched content)
    build();
    [250, 700, 1400, 2600].forEach(function (ms) { setTimeout(build, ms); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
