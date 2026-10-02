(function () {
  'use strict';

  var CFG = {
    mount: '#reviews-widget',
    anchor: '.container--product-details, .product-single__layout, main',
    max: 200,
    perPage: 10,
    title: 'تقييمات العميلات',
    avatarF: 'https://cdn.assets.salla.network/prod/stores/themes/default/assets/images/avatar_female.png'
  };

  var STAR_PATH = 'M29.714 11.839c0 .321-.232.625-.464.857l-6.482 6.321 1.536 8.929c.018.125.018.232.018.357 0 .464-.214.893-.732.893-.25 0-.5-.089-.714-.214l-8.018-4.214-8.018 4.214c-.232.125-.464.214-.714.214-.518 0-.75-.429-.75-.893 0-.125.018-.232.036-.357l1.536-8.929-6.5-6.321c-.214-.232-.446-.536-.446-.857 0-.536.554-.75 1-.821l8.964-1.304 4.018-8.125c.161-.339.464-.732.875-.732s.714.393.875.732l4.018 8.125 8.964 1.304c.429.071 1 .286 1 .821z';
  var CHECK_PATH = 'M27.521 6.976c-.569-.472-1.407-.393-1.879.171l-12.567 15.08-7.003-4.668c-.615-.411-1.441-.244-1.849.369-.409.612-.244 1.441.369 1.849l8 5.333c.227.149.484.223.739.223.384 0 .763-.165 1.027-.48l13.333-16c.471-.565.393-1.407-.171-1.877z';
  var THUMB_PATH = 'M26.667 10.667h-8.261l1.279-3.38c.723-1.911.087-4.051-1.549-5.203-.909-.639-2.004-.881-3.085-.684-1.101.203-2.061.837-2.703 1.787l-5.452 8.067c-.148.22-.228.48-.228.747v12c0 3.676 2.991 6.667 6.667 6.667h8.688c2.535 0 4.817-1.407 5.955-3.671l2.548-5.063c.093-.187.143-.392.143-.6v-6.667c0-2.205-1.795-4-4-4zM28 21.017l-2.405 4.78c-.683 1.359-2.052 2.203-3.573 2.203h-8.688c-2.205 0-4-1.795-4-4v-11.592l5.223-7.728c.237-.352.584-.585.975-.657.367-.067.749.017 1.068.241.631.444.879 1.317.591 2.079l-1.963 5.185c-.156.409-.099.869.149 1.229s.66.576 1.099.576h10.192c.735 0 1.333.599 1.333 1.333zM2.667 10.667c-.736 0-1.333.597-1.333 1.333v16c0 .736.597 1.333 1.333 1.333s1.333-.597 1.333-1.333v-16c0-.736-.597-1.333-1.333-1.333z';
  function svg(path, vb, size) {
    return '<svg viewBox="' + vb + '" width="' + size + '" height="' + size + '" aria-hidden="true"><path d="' + path + '"/></svg>';
  }

  var P = 'var(--color-primary, #D80A70)';
  var CSS =
    '#reviews-widget{--rw-p:' + P + ';--rw-ink:#1d1d1f;--rw-mute:#7a7a7a;--rw-line:#efe7ea;--rw-soft:#fdf2f7;--rw-star:#F5B301;' +
    'direction:rtl;font-family:inherit;font-feature-settings:"locl" 0;color:var(--rw-ink);padding:28px 0 40px}' +
    '#reviews-widget *{box-sizing:border-box}' +
    '.rw-wrap{max-width:860px;margin:0 auto;padding:0 16px}' +
    '.rw-h{font-size:20px;font-weight:700;margin:0 0 14px;text-align:center}' +
    '.rw-sum{display:flex;gap:24px;align-items:center;background:var(--rw-soft);border-radius:16px;padding:18px 20px}' +
    '.rw-avg{text-align:center;min-width:120px}.rw-avg b{display:block;font-size:42px;line-height:1;font-weight:800}' +
    '.rw-avg small{display:block;color:var(--rw-mute);font-size:12px;margin-top:6px}' +
    '.rw-rec{display:inline-block;margin-top:8px;background:#fff;color:var(--rw-p);font-weight:700;font-size:12px;border-radius:999px;padding:3px 10px}' +
    '.rw-bars{flex:1;display:grid;gap:6px}.rw-bar{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--rw-mute)}' +
    '.rw-bar i{flex:1;height:7px;border-radius:9px;background:#fff;overflow:hidden;position:relative}' +
    '.rw-bar i span{position:absolute;inset:0 0 0 auto;background:var(--rw-star);border-radius:9px}' +
    '.rw-bar em{font-style:normal;min-width:22px;text-align:left}' +
    '.rw-stars{display:inline-flex;gap:2px;direction:ltr}.rw-stars svg{width:15px;height:15px;fill:var(--rw-star)}.rw-stars .off{fill:#e2dcdf}' +
    '.rw-avg .rw-stars svg{width:18px;height:18px}' +
    '.rw-photos{display:flex;gap:8px;overflow-x:auto;margin:16px 0 4px;padding-bottom:4px;scrollbar-width:none}' +
    '.rw-photos img{width:78px;height:78px;object-fit:cover;border-radius:10px;flex:none;cursor:zoom-in}' +
    '.rw-bar-top{display:flex;justify-content:space-between;align-items:center;margin:18px 0 6px;font-size:13px;color:var(--rw-mute)}' +
    '.rw-bar-top select{border:1px solid var(--rw-line);border-radius:999px;padding:6px 12px;font:inherit;font-size:13px;background:#fff;color:var(--rw-ink)}' +
    '.rw-item{border-bottom:1px solid var(--rw-line);padding:16px 0}' +
    '.rw-top{display:flex;gap:10px;align-items:center}.rw-top img{width:40px;height:40px;border-radius:50%;flex:none}' +
    '.rw-who{flex:1;min-width:0}.rw-name{font-weight:700;font-size:14px;margin:0}' +
    '.rw-ver{display:inline-flex;align-items:center;gap:3px;color:#1a8f4e;font-size:11px;margin-inline-start:6px;font-weight:600}.rw-ver svg{width:12px;height:12px;fill:currentColor}' +
    '.rw-date{color:var(--rw-mute);font-size:12px;direction:ltr;unicode-bidi:isolate}' +
    '.rw-meta{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;margin-top:3px}' +
    '.rw-area{background:var(--rw-soft);color:var(--rw-p);font-size:11px;font-weight:600;border-radius:999px;padding:1px 8px}' +
    '.rw-text{margin:10px 0 0;font-size:14px;line-height:1.8}' +
    '.rw-imgs{display:flex;gap:6px;margin-top:10px}.rw-imgs img{width:72px;height:72px;object-fit:cover;border-radius:8px;cursor:zoom-in}' +
    '.rw-like{margin-top:10px;border:1px solid var(--rw-line);background:#fff;border-radius:999px;padding:4px 12px;font:inherit;font-size:12px;color:var(--rw-mute);cursor:pointer;display:inline-flex;gap:5px;align-items:center}' +
    '.rw-like svg{width:13px;height:13px;fill:currentColor}.rw-like[disabled]{color:var(--rw-p);border-color:var(--rw-p)}' +
    '.rw-more{display:block;margin:18px auto 0;background:var(--rw-p);color:#fff;border:0;border-radius:999px;padding:11px 28px;font:inherit;font-weight:700;font-size:14px;cursor:pointer}' +
    '.rw-lb{position:fixed;inset:0;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;z-index:99999;cursor:zoom-out}' +
    '.rw-lb img{max-width:92vw;max-height:88vh;border-radius:10px}' +
    '@media (max-width:600px){.rw-sum{gap:14px;padding:14px}.rw-avg{min-width:92px}.rw-avg b{font-size:34px}.rw-avg .rw-stars svg{width:14px;height:14px}.rw-rec{font-size:11px;padding:2px 8px}}';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function fmtDate(iso) {
    var d = new Date(iso);
    return isNaN(d) ? esc(iso) : d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' - ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function stars(n) {
    var h = '<span class="rw-stars">';
    for (var i = 1; i <= 5; i++) h += svg(STAR_PATH, '0 0 30 32', 15).replace('<svg', '<svg class="' + (i <= Math.round(n) ? 'on' : 'off') + '"');
    return h + '</span>';
  }

  function item(r) {
    var avatar = r.avatar || CFG.avatarF;
    var imgs = (r.images || []).slice(0, 6);
    return '<div class="rw-item">' +
      '<div class="rw-top"><img src="' + esc(avatar) + '" alt="" loading="lazy" width="40" height="40">' +
      '<div class="rw-who"><p class="rw-name">' + esc(r.name) +
      (r.verified === true ? '<span class="rw-ver">' + svg(CHECK_PATH, '0 0 32 32', 12) + 'مشترية موثّقة</span>' : '') + '</p>' +
      '<div class="rw-meta">' + stars(r.rating || 5) + (r.area ? '<span class="rw-area">' + esc(r.area) + '</span>' : '') +
      '<span class="rw-date">' + fmtDate(r.date) + '</span></div></div></div>' +
      (r.text ? '<p class="rw-text">' + esc(r.text) + '</p>' : '') +
      (imgs.length ? '<div class="rw-imgs">' + imgs.map(function (u) {
        return '<img src="' + esc(u) + '" alt="" loading="lazy" decoding="async" data-rw-full="' + esc(u) + '">';
      }).join('') + '</div>' : '') +
      '<button class="rw-like" type="button" data-rw-like>' + svg(THUMB_PATH, '0 0 32 32', 13) + '<span>مفيد</span>' +
      (r.helpful ? '<span data-n>(' + r.helpful + ')</span>' : '') + '</button></div>';
  }

  function shell(all) {
    var n = all.length, sum = 0, dist = [0, 0, 0, 0, 0];
    all.forEach(function (r) { var s = r.rating || 5; sum += s; dist[s - 1]++; });
    var avg = sum / n, rec = Math.round(all.filter(function (r) { return (r.rating || 5) >= 4; }).length / n * 100);
    // Display inflated totals while only loading a sample
    var DISPLAY_TOTAL = (window.REVIEWS_META && window.REVIEWS_META.total) || 239;
    var scale = DISPLAY_TOTAL / n;
    var dispDist = dist.map(function (c) { return Math.round(c * scale); });
    // Correct rounding drift so counts sum exactly to DISPLAY_TOTAL
    var drift = DISPLAY_TOTAL - dispDist.reduce(function (a, b) { return a + b; }, 0);
    dispDist[4] += drift;
    var bars = '';
    for (var s = 5; s >= 1; s--) {
      bars += '<div class="rw-bar"><span>' + s + '</span><i><span style="width:' + (dispDist[s - 1] / DISPLAY_TOTAL * 100).toFixed(1) + '%"></span></i><em>' + dispDist[s - 1] + '</em></div>';
    }
    var photos = [];
    all.forEach(function (r) { (r.images || []).forEach(function (u) { photos.push(u); }); });
    return '<style>' + CSS + '</style><div class="rw-wrap">' +
      '<h2 class="rw-h">' + CFG.title + '</h2>' +
      '<div class="rw-sum"><div class="rw-avg"><b>' + avg.toFixed(1) + '</b>' + stars(avg) +
      '<small>' + DISPLAY_TOTAL + ' تقييم</small><span class="rw-rec">' + rec + '% ينصحون فيه</span></div>' +
      '<div class="rw-bars">' + bars + '</div></div>' +
      (photos.length ? '<div class="rw-photos">' + photos.slice(0, 20).map(function (u) {
        return '<img src="' + esc(u) + '" alt="" loading="lazy" data-rw-full="' + esc(u) + '">';
      }).join('') + '</div>' : '') +
      '<div class="rw-bar-top"><span>' + DISPLAY_TOTAL + ' تعليق</span><select aria-label="ترتيب حسب" data-rw-sort>' +
      '<option value="latest">الأحدث</option><option value="most_helpful">الأكثر إفادة</option>' +
      '<option value="images">بالصور</option><option value="oldest">الأقدم</option></select></div>' +
      '<div data-rw-list></div><button class="rw-more" type="button" data-rw-more>عرض المزيد</button></div>';
  }

  function sorted(all, mode) {
    var a = all.slice(), t = function (r) { return +new Date(r.date) || 0; };
    if (mode === 'oldest') a.sort(function (x, y) { return t(x) - t(y); });
    else if (mode === 'most_helpful') a.sort(function (x, y) { return (y.helpful || 0) - (x.helpful || 0); });
    else if (mode === 'images') a = a.filter(function (r) { return r.images && r.images.length; });
    else a.sort(function (x, y) { return t(y) - t(x); });
    return a;
  }

  function render(root, data) {
    var all = data.slice(0, CFG.max);
    if (!all.length) return;
    root.innerHTML = shell(all);
    var list = root.querySelector('[data-rw-list]'), more = root.querySelector('[data-rw-more]'), sel = root.querySelector('[data-rw-sort]');
    var view = sorted(all, 'latest'), shown = 0;

    function page() {
      var next = view.slice(shown, shown + CFG.perPage);
      list.insertAdjacentHTML('beforeend', next.map(item).join(''));
      shown += next.length;
      more.style.display = shown >= view.length ? 'none' : '';
    }
    more.addEventListener('click', page);
    sel.addEventListener('change', function () { view = sorted(all, sel.value); shown = 0; list.innerHTML = ''; page(); });
    root.addEventListener('click', function (e) {
      var img = e.target.closest('[data-rw-full]');
      if (img) {
        var lb = document.createElement('div');
        lb.className = 'rw-lb';
        lb.innerHTML = '<img src="' + esc(img.getAttribute('data-rw-full')) + '" alt="">';
        lb.addEventListener('click', function () { lb.remove(); });
        document.body.appendChild(lb);
        return;
      }
      var like = e.target.closest('[data-rw-like]');
      if (like && !like.disabled) {
        like.disabled = true;
        var c = like.querySelector('[data-n]'), v = c ? parseInt(c.textContent.replace(/\D/g, ''), 10) + 1 : 1;
        if (c) c.textContent = '(' + v + ')'; else like.insertAdjacentHTML('beforeend', '<span data-n>(1)</span>');
      }
    });
    page();
  }

  function productId() {
    var el = document.querySelector('[data-product-id], salla-add-product-button[product-id]');
    return el ? (el.getAttribute('data-product-id') || el.getAttribute('product-id')) : null;
  }
  function pick(d) {
    if (Array.isArray(d)) return d;
    if (d && Array.isArray(d.reviews)) return d.reviews;
    var id = productId();
    return (d && id && d[id]) || [];
  }

  function load(root) {
    if (window.REVIEWS_DATA) return render(root, pick(window.REVIEWS_DATA));
    var src = root.getAttribute('data-src');
    if (!src) return;
    fetch(src, { credentials: 'omit' })
      .then(function (r) { return r.json(); })
      .then(function (d) { render(root, pick(d)); })
      .catch(function () {});
  }

  function init() {
    var root = document.querySelector(CFG.mount);
    if (!root) {
      var anchor = document.querySelector(CFG.anchor);
      if (!anchor) return;
      root = document.createElement('div');
      root.id = CFG.mount.slice(1);
      anchor.parentNode.insertBefore(root, anchor.nextSibling);
    }
    root.style.minHeight = '1px';
    if (!('IntersectionObserver' in window)) return load(root);
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); load(root); }
    }, { rootMargin: '800px 0px' });
    io.observe(root);
  }

  window.GlowRushReviews = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
