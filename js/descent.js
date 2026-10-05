/* ==========================================================================
   The descent — "from the sky into the café"
   98 frames cut from The Lookout's own drone reel
   (instagram.com/reel/DdjNdqdTKzn, 21 Sep 2026), played in reverse:
     frames 001–044  pink sky → down onto the rooftop deck
     frames 045–098  down into the lit corridor
   A short crossfade hides the cut between the two shots.
   The hero rests on three beats: the sky (001), the deck (044) and the
   corridor (098). While it fills the screen, one swipe, wheel flick or
   arrow key plays the shot on to the next beat by itself (and back again
   going up); from the last beat the page scrolls on as normal.
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
  var shade = root.querySelector(".descent__shade");
  var bar = root.querySelector(".descent__progress");
  var beats = [].slice.call(root.querySelectorAll("[data-beat]"));
  var header = document.querySelector("[data-header]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var N = 98;          // frames on disk
  var CUT = 44;        // first frame of the second shot (0-based)
  var FADE = 3;        // timeline units spent crossfading across the cut
  var LEN = (CUT - 1) + FADE + (N - 1 - CUT); // timeline length
  var STOPS = [0, CUT - 1, LEN];              // where each beat rests on the timeline
  var LAST = STOPS.length - 1;
  var W = 4.4;         // spring rate: a beat-to-beat move lands in about 1.2 s
  var NEAR = 16;       // a beat's words come in once the shot is this close to it
  var SIZE = { m: [720, 1280], d: [1440, 810] }; // frame size per set

  var set = null, frames = [], ready = [];
  var cur = 0, vel = 0;    // timeline position on screen, and its speed (units/s)
  var beat = 0;            // the beat we're resting on, or heading to
  var raf = 0, last = 0;
  var drawn = "", shown = [], tone = "";

  function pickSet() { return window.innerWidth / window.innerHeight > 0.85 ? "d" : "m"; }
  function src(i) { return "images/descent/" + set + "/" + String(i + 1).padStart(3, "0") + ".webp"; }

  /* ---------- loading: beat frames first, then coarse to fine ---------- */
  function load() {
    set = pickSet();
    frames = new Array(N);
    ready = new Array(N).fill(false);
    var order = [], seen = {};
    [0, CUT - 1, CUT, N - 1].forEach(function (i) { seen[i] = 1; order.push(i); });
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
            // decode up front, off the main thread, so drawing it mid-move costs nothing
            var done = function () {
              active--;
              if (mySet !== set) return;
              frames[idx] = img; ready[idx] = true;
              draw();
              next();
            };
            if (img.decode) img.decode().then(done, done); else done();
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
    // no more canvas pixels than the frames carry: sharper doesn't exist, slower does
    var w = stage.clientWidth, h = stage.clientHeight, f = SIZE[set];
    var k = Math.min(window.devicePixelRatio || 1, 2, f[0] / w, f[1] / h);
    var cw = Math.round(w * k), ch = Math.round(h * k);
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; drawn = ""; }
  }
  function paint(img, alpha) {
    var cw = canvas.width, ch = canvas.height;
    var s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    var w = img.naturalWidth * s, h = img.naturalHeight * s;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }
  function draw() { // repaints only when the picture actually changes
    var a, b = -1, mix = 0;
    if (cur > CUT - 1 && cur < CUT - 1 + FADE) {
      a = nearest(CUT - 1); b = nearest(CUT);
      mix = Math.round((cur - (CUT - 1)) / FADE * 24) / 24;
    } else {
      a = nearest(frameAt(cur));
    }
    if (a < 0) return;
    var key = a + "/" + b + "/" + mix;
    if (key === drawn) return;
    if (!drawn) stage.style.backgroundImage = "none";
    paint(frames[a], 1);
    if (b >= 0 && mix > 0) paint(frames[b], mix);
    ctx.globalAlpha = 1;
    drawn = key;
  }

  /* ---------- words, shade, progress line, header tone ---------- */
  function ramp(p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); }
  function ui() {
    var p = cur / LEN;
    shade.style.opacity = ramp(p, 0.18, 0.42).toFixed(3);
    bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
    beats.forEach(function (el, i) { // leaving words go at once, arriving ones as the shot lands
      var on = i === beat && Math.abs(cur - STOPS[i]) < NEAR;
      if (on === shown[i]) return;
      shown[i] = on;
      el.classList.toggle("is-on", on);
      el.setAttribute("aria-hidden", on ? "false" : "true");
    });
    var t = p < 0.2 ? "ink" : "cream";
    if (t !== tone) {
      tone = t;
      root.setAttribute("data-tone", t);
      if (header) header.setAttribute("data-tone", t);
    }
  }

  /* ---------- playback: a critically damped spring towards the beat ----------
     Starts at once, lands softly, and a second swipe mid-move just bends the
     path towards the next beat without a stop. */
  function moving() { return cur !== STOPS[beat]; }
  function tick(now) {
    raf = 0;
    var dt = Math.min(0.064, Math.max(0, (now - last) / 1000)); last = now;
    var x = cur - STOPS[beat], e = Math.exp(-W * dt), c = vel + W * x;
    cur = STOPS[beat] + (x + c * dt) * e;
    vel = (vel - W * c * dt) * e;
    if (Math.abs(cur - STOPS[beat]) < 0.02 && Math.abs(vel) < 0.2) { cur = STOPS[beat]; vel = 0; }
    draw(); ui();
    if (moving()) raf = requestAnimationFrame(tick);
  }
  function go(to) {
    if (to < 0 || to > LAST || to === beat) return false;
    beat = to;
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    return true;
  }

  /* ---------- boot ---------- */
  if (reduce) {
    document.documentElement.classList.add("reduced");
    set = pickSet(); size();
    var still = new Image();
    still.onload = function () { frames[0] = still; ready = [true]; draw(); };
    still.src = src(0);
    return;
  }

  load();
  size();
  ui();

  /* ---------- input: only while the hero fills the screen ---------- */
  function engaged() {
    var vv = window.visualViewport;
    return window.scrollY < 2 && !(vv && vv.scale > 1.01) && !document.body.classList.contains("menu-open");
  }

  // wheel / trackpad: one flick = one beat; the rest of that flick (and its
  // inertia) is swallowed so it can't carry the page on by itself
  var wheel = { at: 0, size: 0, mine: false, used: false };
  window.addEventListener("wheel", function (e) {
    if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // pinch-zoom, sideways
    var now = performance.now(), size = Math.abs(e.deltaY);
    if (now - wheel.at > 160 || (!moving() && size > 20 && size > wheel.size * 2.5)) { // a new flick
      wheel.mine = engaged(); wheel.used = false;
    }
    wheel.at = now; wheel.size = size;
    if (!wheel.mine) return;
    var dir = e.deltaY > 0 ? 1 : -1;
    if (!wheel.used && go(beat + dir)) { wheel.used = true; e.preventDefault(); return; }
    if (wheel.used || moving()) { wheel.used = true; e.preventDefault(); return; }
    wheel.mine = false; // resting on the first or last beat: the page scrolls as normal
  }, { passive: false });

  // touch: a short swipe plays to the next beat; swiping up off the last beat
  // (or down at the very top) is left to the browser
  var touch = null;
  window.addEventListener("touchstart", function (e) {
    touch = e.touches.length === 1 && engaged() ? { y: e.touches[0].clientY, used: false } : null;
  }, { passive: true });
  window.addEventListener("touchmove", function (e) {
    if (!touch) return;
    if (e.touches.length > 1) { touch = null; return; }
    if (!touch.used) {
      var dy = touch.y - e.touches[0].clientY;
      var dir = dy > 0 ? 1 : dy < 0 ? -1 : 0;
      if (!dir) return;
      var to = beat + dir;
      if ((to < 0 || to > LAST) && !moving()) {
        if (Math.abs(dy) > 6) touch = null;
        return;
      }
      if (Math.abs(dy) > 12) { touch.used = true; go(to); }
    }
    if (e.cancelable) e.preventDefault();
  }, { passive: false });
  var endTouch = function () { touch = null; };
  window.addEventListener("touchend", endTouch, { passive: true });
  window.addEventListener("touchcancel", endTouch, { passive: true });

  // keyboard
  var KEYS = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
  window.addEventListener("keydown", function (e) {
    var dir = KEYS[e.key], t = e.target;
    if (!dir || e.altKey || e.ctrlKey || e.metaKey || !engaged()) return;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(t.tagName))) return;
    if (e.key === " " && e.shiftKey) dir = -1;
    if (go(beat + dir) || moving()) e.preventDefault();
  });

  // tabbing onto a beat's link brings that beat up
  root.addEventListener("focusin", function (e) {
    for (var i = 0; i < beats.length; i++) if (beats[i].contains(e.target)) { go(i); return; }
  });

  window.addEventListener("resize", function () {
    if (pickSet() !== set) load();
    size();
    drawn = ""; draw();
  });
})();
