'use strict';

/* ============================================================
   PARALLAX.JS — cursor parallax for accent squares & dot grids
                  + dot scatter repel effect

   Usage: call initParallax(elementsArray) after DOM ready
   Each element: { el: DOMNode, speedX: float, speedY: float }
   ============================================================ */

function initParallax(elements) {
  const items = elements.filter(item => item.el !== null);
  if (!items.length) return;

  let rafId = null;
  let targetX = 0, targetY = 0;
  let positions = items.map(() => ({ x: 0, y: 0 }));

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX - window.innerWidth  / 2;
    targetY = e.clientY - window.innerHeight / 2;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }, { passive: true });

  function tick() {
    rafId = null;
    items.forEach((item, i) => {
      const destX = targetX * item.speedX * 60;
      const destY = targetY * item.speedY * 60;
      positions[i].x += (destX - positions[i].x) * 0.08;
      positions[i].y += (destY - positions[i].y) * 0.08;
      item.el.style.transform =
        `translate(${positions[i].x.toFixed(2)}px, ${positions[i].y.toFixed(2)}px)`;
    });

    const stillMoving = items.some((_, i) => {
      const destX = targetX * items[i].speedX * 60;
      const destY = targetY * items[i].speedY * 60;
      return (
        Math.abs(destX - positions[i].x) > 0.05 ||
        Math.abs(destY - positions[i].y) > 0.05
      );
    });

    if (stillMoving) rafId = requestAnimationFrame(tick);
  }
}


/* ── Dot scatter: dots repel from cursor within radius ─────── */

function initDotScatter(selector) {
  selector = selector || '.dot-grid span';
  let dotRafId = null;
  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!dotRafId) dotRafId = requestAnimationFrame(tickDots);
  }, { passive: true });

  function tickDots() {
    dotRafId = null;
    const dots = document.querySelectorAll(selector);
    dots.forEach((dot) => {
      const rect   = dot.getBoundingClientRect();
      const dx     = mouseX - (rect.left + 1.5);
      const dy     = mouseY - (rect.top  + 1.5);
      const dist   = Math.sqrt(dx * dx + dy * dy);
      const radius = 120;

      if (dist < radius) {
        const strength = 1 - dist / radius;
        const pushX    = -(dx / dist) * strength * 8;
        const pushY    = -(dy / dist) * strength * 8;
        dot.style.transform  = `translate(${pushX.toFixed(2)}px, ${pushY.toFixed(2)}px)`;
        dot.style.opacity    = String(0.4 + strength * 0.5);
        dot.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
      } else {
        dot.style.transform  = 'translate(0,0)';
        dot.style.opacity    = '0.4';
        dot.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      }
    });
  }
}
