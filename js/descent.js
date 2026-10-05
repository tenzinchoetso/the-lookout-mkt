/* ==========================================================================
   The descent — "from the sky into the café"
   Scroll scrubs through 98 frames cut from The Lookout's own drone reel
   (instagram.com/reel/DdjNdqdTKzn, 21 Sep 2026), played in reverse:
     frames 001–044  pink sky → down onto the rooftop deck
     frames 045–098  down into the lit corridor
   A short crossfade hides the cut between the two shots.
   Phones get portrait frames (images/descent/m), wider screens get
   16:9 frames (images/descent/d). Reduced motion shows a still frame.
   ========================================================================== */
(function () {
  "use strict";
  var root = document.querySelector("[data-descent]");
  if (!root) return;

  var stage = root.querySelector(".descent__stage");
  var canvas = root.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var beats = [].slice.call(root.querySelectorAll("[data-beat]"));
  var header = document.querySelector("[data-header]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var N = 98;          // frames on disk
  var CUT = 44;        // first frame of the second shot (0-based)
  var FADE = 3;        // timeline units spent crossfading across the cut
  var LEN = (CUT - 1) + FADE + (N - 1 - CUT); // timeline length

  var set = null, frames = [], ready = [];
  var cur = 0, target = 0, drawn = -1, running = false, visible = true;

  function pickSet() { return window.innerWidth / window.innerHeight > 0.85 ? "d" : "m"; }
  function src(i) { return "images/descent/" + set + "/" + String(i + 1).padStart(3, "0") + ".webp"; }

  /* ---------- loading: coarse frames first, then fill the gaps ---------- */
  function load() {
    set = pickSet();
    frames = new Array(N);
    ready = new Array(N).fill(false);
    var order = [], seen = {};
    [0, CUT - 1, CUT].forEach(function (i) { seen[i] = 1; order.push(i); });
    [8, 4, 2, 1].forEach(function (step) {
      for (var i = 0; i < N; i += step) if (!seen[i]) { seen[i] = 1; order.push(i); }
    });
    var k = 0, active = 0, mySet = set;
    function next() {
      while (active < 6 && k < order.length) {
        (function (idx) {
          var img = new Image();
          img.decoding = "async";
          active++;
          img.onload = function () {
            active--;
            if (mySet !== set) return;
            frames[idx] = img; ready[idx] = true;
            if (idx === 0 || Math.abs(idx - frameAt(cur)) < 4) { drawn = -1; draw(); }
            next();
          };
          img.onerror = function () { active--; next(); };
          img.src = src(idx);
        })(order[k++]);
      }
    }
    next();
  }

  /* ---------- timeline → frame ---------- */
  function frameAt(t) { // nearest frame index for timeline position t
    if (t <= CUT - 1) return Math.round(t);
    if (t < CUT - 1 + FADE) return CUT - 1;
    return Math.min(N - 1, Math.round(t - FADE + 1));
  }
  function nearest(i) {
    if (ready[i]) return i;
    for (var d = 1; d < N; d++) {
      if (i - d >= 0 && ready[i - d]) return i - d;
      if (i + d < N && ready[i + d]) return i + d;
    }
    return -1;
  }

  /* ---------- drawing ---------- */
  function size() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.round(stage.clientWidth * dpr), h = Math.round(stage.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; drawn = -1; }
  }
  function paint(img, alpha) {
    var cw = canvas.width, ch = canvas.height;
    var s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    var w = img.naturalWidth * s, h = img.naturalHeight * s;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }
  function draw() {
    var t = cur;
    var key = Math.round(t * 20) / 20;
    if (key === drawn) return;
    if (t > CUT - 1 && t < CUT - 1 + FADE) {
      var a = nearest(CUT - 1), b = nearest(CUT);
      if (a < 0) return;
      paint(frames[a], 1);
      if (b >= 0) paint(frames[b], (t - (CUT - 1)) / FADE);
    } else {
      var i = nearest(frameAt(t));
      if (i < 0) return;
      paint(frames[i], 1);
    }
    ctx.globalAlpha = 1;
    drawn = key;
    stage.style.backgroundImage = "none";
  }

  /* ---------- scroll → progress, beats, header tone ---------- */
  function progress() {
    var r = root.getBoundingClientRect();
    var total = root.offsetHeight - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  }
  function ramp(p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); }
  function update(p) {
    root.style.setProperty("--p", p.toFixed(4));
    root.style.setProperty("--shade", ramp(p, 0.18, 0.42).toFixed(3));
    var on = [p < 0.17, p > 0.36 && p < 0.66, p > 0.8];
    beats.forEach(function (el, i) { el.classList.toggle("is-on", on[i]); el.setAttribute("aria-hidden", on[i] ? "false" : "true"); });
    var tone = p < 0.2 ? "ink" : "cream";
    root.setAttribute("data-tone", tone);
    if (header && header.getAttribute("data-solid") !== "true") header.setAttribute("data-tone", tone);
  }

  function tick() {
    var p = progress();
    target = p * LEN;
    cur += (target - cur) * 0.2;
    if (Math.abs(target - cur) < 0.01) cur = target;
    draw();
    update(p);
    if (visible && Math.abs(target - cur) > 0.001) { requestAnimationFrame(tick); }
    else running = false;
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(tick); } }

  /* ---------- boot ---------- */
  if (reduce) {
    document.documentElement.classList.add("reduced");
    set = pickSet(); size();
    var still = new Image();
    still.onload = function () { frames[0] = still; ready = [true]; cur = 0; draw(); };
    still.src = src(0);
    return;
  }

  size();
  load();
  update(progress());
  kick();

  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", function () {
    size();
    if (pickSet() !== set) load();
    drawn = -1; kick();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) kick();
    }).observe(root);
  }
})();
