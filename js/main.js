/* Priyanshu Chatterjee portfolio: interactions.
   Content lives in js/content.js. You don't need to edit this file. */
(function () {
  "use strict";
  var S = window.SITE;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  document.documentElement.classList.add("js");

  /* ---------- 1. Fill content ---------- */
  var textMap = { name: S.name, role: S.role, city: S.city, available: S.available, tagline: S.tagline,
    email: S.email, lookingFor: S.about.lookingFor, ighandle: S.instagram.handle };
  $$("[data-text]").forEach(function (el) { var v = textMap[el.dataset.text]; if (v != null) el.textContent = v; });
  var hrefMap = { mailto: "mailto:" + S.email, igdm: S.instagram.dm, ig: S.instagram.url, linkedin: S.linkedin };
  $$("[data-href]").forEach(function (el) { el.href = hrefMap[el.dataset.href]; });

  // Role ticker (content duplicated for a seamless loop)
  var tick = "";
  for (var r = 0; r < 2; r++) S.roles.forEach(function (role) { tick += "<span>" + esc(role) + "</span><span class='glyph' aria-hidden='true'>✺</span>"; });
  $("#ticker").innerHTML = tick;

  $("#aboutText").innerHTML = S.about.lines.map(function (l) { return "<p class='reveal'>" + esc(l) + "</p>"; }).join("");
  $("#facts").innerHTML = S.about.facts.map(function (f) { return "<div class='reveal'><dt>" + esc(f.k) + "</dt><dd>" + esc(f.v) + "</dd></div>"; }).join("");

  $("#services").innerHTML = S.services.map(function (s, i) {
    var th = (s.thumbs || []).map(function (t) { return "<img src='" + t + "' alt='' loading='lazy' width='76' height='76'>"; }).join("");
    return "<li class='service reveal'><h3 class='service__name'><span class='mono'>0" + (i + 1) + "</span>" + esc(s.name) + "</h3>" +
      "<p class='service__line'>" + esc(s.line) + "</p><div class='service__thumbs' aria-hidden='true'>" + th + "</div></li>";
  }).join("");

  $("#clients").innerHTML = "Clients: " + S.projects.map(function (p) { return "<b>" + esc(p.client) + "</b>"; }).join(" ✺ ");

  $("#projects").innerHTML = S.projects.map(function (p, i) {
    return "<article class='project reveal'>" +
      "<div class='project__media' role='button' tabindex='0' data-yt='" + p.youtubeId + "' data-url='" + p.youtube + "' aria-label='Play " + esc(p.client) + " video'>" +
        "<span class='project__badge'>" + esc(p.type) + "</span>" +
        "<img src='" + p.poster + "' alt='Frame from the " + esc(p.client) + " Reel' loading='lazy' width='540' height='960'>" +
        "<video muted loop playsinline preload='none' data-src='" + p.preview + "' aria-hidden='true'></video>" +
        "<span class='project__cta'><span class='play-icon' aria-hidden='true'></span>Play full video</span>" +
      "</div>" +
      "<div class='project__info'>" +
        "<p class='project__num' aria-hidden='true'>" + p.num + "</p>" +
        "<div class='project__meta'><span class='tag tag--client'>" + esc(p.client) + "</span><span class='tag'>" + p.year + "</span></div>" +
        "<h3 class='project__title'>" + esc(p.title) + "</h3>" +
        "<p class='project__desc'>" + esc(p.desc) + "</p>" +
        "<p class='project__role'><b>My role:</b> " + esc(p.role) + "</p>" +
        "<a class='link-arrow' href='" + p.youtube + "' target='_blank' rel='noopener'>Watch on YouTube <span aria-hidden='true'>↗</span></a>" +
      "</div></article>";
  }).join("");

  $("#tools").innerHTML = S.tools.map(function (t, i) {
    return "<li class='tool reveal'><span class='tool__n'>0" + (i + 1) + "</span><p class='tool__name'>" + esc(t.name) + "</p><p class='tool__use'>" + esc(t.use) + "</p></li>";
  }).join("");

  var e = S.education;
  $("#facts").innerHTML += "<div class='facts__wide reveal'><dt>Education</dt><dd>" + esc(e.degree) + "</dd><p>" + esc(e.college) + ", " + esc(e.university) + "</p></div>" +
    "<div class='facts__wide facts__looking reveal'><dt><span class='status__dot'></span>Looking for</dt><p>" + esc(S.about.lookingFor) + "</p></div>";
  $("#year").textContent = new Date().getFullYear();

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- 2. Split headings into letters (for the wave) ---------- */
  $$(".wave").forEach(function (h) {
    var txt = h.textContent; h.setAttribute("aria-label", txt); h.textContent = "";
    txt.split(" ").forEach(function (w, wi, arr) {
      var word = document.createElement("span"); word.className = "word"; word.setAttribute("aria-hidden", "true");
      for (var i = 0; i < w.length; i++) { var c = document.createElement("span"); c.className = "ch"; c.textContent = w[i]; word.appendChild(c); }
      h.appendChild(word);
      if (wi < arr.length - 1) h.appendChild(document.createTextNode(" "));
    });
  });

  /* ---------- 3. Loader: max ~1.2 s, skippable, shown once per visit ---------- */
  var loader = $("#loader"), seen = false;
  try { seen = sessionStorage.getItem("pc_seen") === "1"; } catch (err) {}
  var started = false;
  function finishLoader() {
    if (started) return; started = true;
    loader.classList.add("is-done"); document.body.classList.remove("is-loading");
    try { sessionStorage.setItem("pc_seen", "1"); } catch (err) {}
    intro();
  }
  if (reduce || seen) { loader.style.display = "none"; finishLoader(); }
  else {
    var t0 = performance.now(), DUR = 1100, cnt = $("#loaderCount"), bar = $("#loaderBar");
    (function step(now) {
      var p = Math.min((now - t0) / DUR, 1), eased = 1 - Math.pow(1 - p, 3);
      cnt.textContent = Math.round(eased * 100); bar.style.width = eased * 100 + "%";
      if (p < 1 && !started) requestAnimationFrame(step); else setTimeout(finishLoader, 120);
    })(t0);
    $("#loaderSkip").addEventListener("click", finishLoader);
    document.addEventListener("keydown", function k(ev) { if (ev.key === "Escape") { finishLoader(); document.removeEventListener("keydown", k); } });
  }

  /* ---------- 4. Hero video: start after first paint, only if allowed ---------- */
  var heroVideo = $("#heroVideo");
  var saveData = navigator.connection && navigator.connection.saveData;
  function startHeroVideo() {
    var heroVideo = $("#heroVideo"), saveData = navigator.connection && navigator.connection.saveData;
    if (reduce || saveData) return;
    heroVideo.preload = "auto"; heroVideo.load();
    var pr = heroVideo.play(); if (pr && pr.catch) pr.catch(function () {});
  }

  /* ---------- 5. Motion (no libraries: CSS transitions + one scroll loop) ---------- */
  function intro() {
    startHeroVideo();
    $$("#heroName .ch").forEach(function (c, i) { c.style.transitionDelay = (i * 0.035) + "s"; });
    $$(".hero .rise").forEach(function (el, i) { el.style.transitionDelay = (0.25 + i * 0.08) + "s"; });
    requestAnimationFrame(function () { document.body.classList.add("is-ready"); });
    // after the intro, clear delays so scroll-driven motion responds instantly
    setTimeout(function () { $$("#heroName .ch").forEach(function (c) { c.style.transitionDelay = "0s"; c.style.transition = "none"; }); }, 1800);
  }

  // Reveal on scroll
  if ("IntersectionObserver" in window && !reduce) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); rio.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    $$(".reveal").forEach(function (el, i) { el.style.transitionDelay = ((i % 4) * 0.07) + "s"; rio.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }

  // Scroll-linked letter wave: middle letters start lowest and settle as the heading reaches its place
  var waves = $$(".section__title.wave, .footer__title.wave").map(function (h) {
    var chars = $$(".ch", h), n = chars.length;
    chars.forEach(function (c, i) { c._lift = Math.sin((n > 1 ? i / (n - 1) : 0.5) * Math.PI); });
    return { h: h, chars: chars, last: -1 };
  });
  var heroChars = $$("#heroName .ch"), hero = $(".hero");
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  function update() {
    ticking = false; var vh = window.innerHeight;
    waves.forEach(function (w) {
      var top = w.h.getBoundingClientRect().top;
      var p = Math.min(1, Math.max(0, (vh * 0.98 - top) / (vh * 0.38)));
      p = 1 - Math.pow(1 - p, 2);
      if (Math.abs(p - w.last) < 0.002) return; w.last = p;
      w.chars.forEach(function (c) { c.style.transform = "translateY(" + (c._lift * 0.42 * (1 - p)).toFixed(3) + "em)"; });
    });
    if (document.body.classList.contains("is-ready") && heroChars.length) {
      var hp = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || vh)));
      if (hp > 0 || heroChars[0]._moved) {
        heroChars.forEach(function (c, i) { var l = Math.sin((i / Math.max(heroChars.length - 1, 1)) * Math.PI); c.style.transform = "translateY(" + (-(20 + 30 * l) * hp).toFixed(1) + "%)"; });
        heroChars[0]._moved = hp > 0;
      }
    }
    if (window._film) window._film();
  }
  if (!reduce) { window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll); }

  // Active nav link
  if ("IntersectionObserver" in window) {
    var nio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { var id = en.target.id; $$(".nav__links a").forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + id); }); } });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["intro", "about", "work", "contact"].forEach(function (id) { var el = document.getElementById(id); if (el) nio.observe(el); });
  }

  /* ---------- 6. Hero phone: tilt with mouse (desktop) or device motion (phones) ---------- */
  var phone = $(".phone"), media = $("#heroMedia");
  if (!reduce && phone) {
    var fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      media.addEventListener("mousemove", function (ev) {
        var b = media.getBoundingClientRect(), x = (ev.clientX - b.left) / b.width - 0.5, y = (ev.clientY - b.top) / b.height - 0.5;
        phone.style.transform = "rotateY(" + (x * 16).toFixed(2) + "deg) rotateX(" + (-y * 12).toFixed(2) + "deg)";
      });
      media.addEventListener("mouseleave", function () { phone.style.transform = ""; });
    } else if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== "function") {
      // Android: works without a permission prompt. (iPhone needs a prompt, so we skip it rather than interrupt.)
      window.addEventListener("deviceorientation", function (ev) {
        if (ev.gamma == null) return;
        var gx = Math.max(-20, Math.min(20, ev.gamma)), by = Math.max(-20, Math.min(20, (ev.beta || 0) - 45));
        phone.style.transform = "rotateY(" + (gx * 0.6).toFixed(2) + "deg) rotateX(" + (-by * 0.4).toFixed(2) + "deg)";
      }, { passive: true });
    }
  }

  /* ---------- 7. Project previews: muted preview on hover / in view ---------- */
  var touch = !window.matchMedia("(hover: hover)").matches;
  $$(".project__media").forEach(function (m) {
    var v = $("video", m);
    function play() { if (reduce || saveData) return; if (!v.src) v.src = v.dataset.src; m.classList.add("is-playing"); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    function stop() { m.classList.remove("is-playing"); v.pause(); }
    if (touch && "IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { es.forEach(function (en) { en.isIntersecting ? play() : stop(); }); }, { threshold: 0.6 }).observe(m);
    } else { m.addEventListener("mouseenter", play); m.addEventListener("mouseleave", stop); m.addEventListener("focus", play); m.addEventListener("blur", stop); }
    function open() { openLightbox({ yt: m.dataset.yt, url: m.dataset.url }); }
    m.addEventListener("click", open);
    m.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(); } });
  });

  /* ---------- 8. Lightbox (showreel file, or YouTube embed) ---------- */
  var lb = $("#lightbox"), lbIn = $("#lightboxInner"), lbYT = $("#lightboxYT"), lastFocus = null;
  function openLightbox(o) {
    lastFocus = document.activeElement;
    if (o.yt) {
      lbIn.innerHTML = "<iframe src='https://www.youtube-nocookie.com/embed/" + o.yt + "?autoplay=1&rel=0&playsinline=1' title='Video player' allow='autoplay; encrypted-media; picture-in-picture; fullscreen' allowfullscreen></iframe>";
      lbYT.href = o.url; lbYT.hidden = false;
    } else {
      lbIn.innerHTML = "<video src='assets/video/showreel.mp4' controls autoplay playsinline poster='assets/img/hero-poster.jpg'></video>";
      lbYT.hidden = true;
    }
    lb.hidden = false; document.body.style.overflow = "hidden"; $("#lightboxClose").focus();
    if (heroVideo) heroVideo.pause();
  }
  function closeLightbox() {
    lb.hidden = true; lbIn.innerHTML = ""; document.body.style.overflow = "";
    if (heroVideo && !reduce && !saveData) { var p = heroVideo.play(); if (p && p.catch) p.catch(function () {}); }
    if (lastFocus) lastFocus.focus();
  }
  $("#reelOpen").addEventListener("click", function () { openLightbox({}); });
  $("#lightboxClose").addEventListener("click", closeLightbox);
  lb.addEventListener("click", function (ev) { if (ev.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (ev) {
    if (lb.hidden) return;
    if (ev.key === "Escape") closeLightbox();
    if (ev.key === "Tab") { // keep focus inside the dialog
      var f = $$("button, a:not([hidden]), iframe, video", lb); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
  });

  /* ---------- 9. Copy email + live IST clock ---------- */
  var copyBtn = $("#copyEmail");
  copyBtn.addEventListener("click", function () {
    var done = function () { copyBtn.textContent = "Copied ✓"; setTimeout(function () { copyBtn.textContent = "Copy email"; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(S.email).then(done, function () {}); else done();
  });

  /* ---------- 10. 3D film strip: frames on a rotating ring (CSS 3D, no library) ---------- */
  (function film() {
    var FR = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10"], N = 14;
    var ring = $("#filmRing"), sec = $(".timeline3d"); if (!ring) return;
    var cells = [];
    for (var i = 0; i < N; i++) {
      var d = document.createElement("div"); d.className = "cell";
      d.innerHTML = "<img src='assets/img/film/" + FR[i % FR.length] + ".jpg' alt='' loading='lazy' decoding='async' width='200' height='356'>";
      ring.appendChild(d); cells.push(d);
    }
    var radius = 0;
    function place() {
      var cw = cells[0].offsetWidth || 150; radius = Math.round((cw + 18) / (2 * Math.tan(Math.PI / N)));
      cells.forEach(function (c, i) { c.style.transform = "rotateY(" + (i * 360 / N) + "deg) translateZ(" + radius + "px)"; });
    }
    place(); window.addEventListener("resize", place);
    var mx = 0, my = 0, tx = 0, ty = 0, sp = 0, visible = false, running = false, t0 = performance.now();
    if (window.matchMedia("(pointer: fine)").matches) window.addEventListener("pointermove", function (ev) { tx = ev.clientX / window.innerWidth - 0.5; ty = ev.clientY / window.innerHeight - 0.5; }, { passive: true });
    window._film = function () { var b = sec.getBoundingClientRect(); sp = 1 - (b.top + b.height) / (window.innerHeight + b.height); };
    function draw(now) {
      mx += (tx - mx) * 0.07; my += (ty - my) * 0.07;
      var drift = reduce ? 0 : (now - t0) * 0.004;
      ring.style.transform = "translateZ(" + (-radius) + "px) rotateX(" + (-8 + my * 10).toFixed(2) + "deg) rotateZ(" + (-6 + mx * 4).toFixed(2) + "deg) rotateY(" + (-(sp * 160) - drift + mx * 20).toFixed(2) + "deg)";
    }
    function loop(now) { if (!visible) { running = false; return; } draw(now); requestAnimationFrame(loop); }
    window._film(); draw(t0);
    if (reduce) return;
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible && !running) { running = true; requestAnimationFrame(loop); } }).observe(sec);
  })();
  update && !reduce && update();
})();
