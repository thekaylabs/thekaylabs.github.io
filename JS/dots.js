'use strict';

/* ============================================================
   DOTS.JS — dot grid factory
   Usage: buildDotGrid('element-id', cols, rows)
   ============================================================ */

function buildDotGrid(id, cols, rows) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.gridTemplateColumns = `repeat(${cols}, 3px)`;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cols * rows; i++) {
    fragment.appendChild(document.createElement('span'));
  }
  el.appendChild(fragment);
}
