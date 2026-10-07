/* PRIME — pointer interactions: cursor spotlight + gentle parallax */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduce || !finePointer) return;

  var glow = document.querySelector('.cursor-glow');
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));

  var targetX = window.innerWidth / 2;
  var targetY = window.innerHeight / 2;
  var curX = targetX;
  var curY = targetY;
  var raf = null;

  function step() {
    curX += (targetX - curX) * 0.12;
    curY += (targetY - curY) * 0.12;

    if (glow) {
      glow.style.setProperty('--cx', curX + 'px');
      glow.style.setProperty('--cy', curY + 'px');
    }

    var nx = curX / window.innerWidth - 0.5;
    var ny = curY / window.innerHeight - 0.5;
    for (var i = 0; i < parallaxEls.length; i++) {
      var el = parallaxEls[i];
      var depth = parseFloat(el.dataset.parallax) || 0;
      el.style.transform = 'translate3d(' + (nx * depth) + 'px,' + (ny * depth) + 'px,0)';
    }

    if (Math.abs(targetX - curX) > 0.3 || Math.abs(targetY - curY) > 0.3) {
      raf = requestAnimationFrame(step);
    } else {
      raf = null;
    }
  }

  window.addEventListener('pointermove', function (e) {
    document.body.classList.add('has-pointer');
    targetX = e.clientX;
    targetY = e.clientY;
    if (!raf) raf = requestAnimationFrame(step);
  }, { passive: true });
})();
