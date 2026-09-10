export function initCustomCursor(doc = document, win = window) {
  const cursor = doc.querySelector('.cursor');
  if (!cursor) return;
  const label = cursor.querySelector('span');
  const fine = win.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
  const root = doc.documentElement;
  let active = false;
  let x = 0, y = 0;
  function hide() {
    active = false;
    root.classList.remove('custom-cursor');
    cursor.style.display = 'none';
    cursor.classList.remove('is-pressed');
  }
  function updateTarget(target) {
    const image = target?.closest?.('[data-cursor],.portrait-original');
    const button = target?.closest?.('button,.button,[role="button"]');
    const link = target?.closest?.('a,summary');
    cursor.classList.toggle('is-image', !!image);
    cursor.classList.toggle('is-button', !image && !!button);
    cursor.classList.toggle('is-link', !image && !button && !!link);
    label.textContent = image ? (image.dataset.cursor || 'RIYA') : (button || link ? '↗' : '');
  }
  doc.addEventListener('pointermove', event => {
    if (!fine.matches || reduced.matches || event.pointerType === 'touch') { hide(); return; }
    x = event.clientX; y = event.clientY;
    // Render at the real pointer position before replacing the native cursor.
    cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
    cursor.style.display = 'flex';
    cursor.style.opacity = '1';
    updateTarget(event.target);
    root.classList.add('custom-cursor');
    active = true;
  }, { passive: true });
  doc.addEventListener('pointerover', event => { if (active) updateTarget(event.target); });
  doc.addEventListener('pointerdown', () => { if (active) cursor.classList.add('is-pressed'); });
  doc.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
  doc.addEventListener('pointerleave', hide);
  doc.addEventListener('pointercancel', hide);
  doc.addEventListener('keydown', event => { if (event.key === 'Tab') hide(); });
  doc.addEventListener('visibilitychange', () => { if (doc.hidden) hide(); });
  win.addEventListener('blur', hide);
  win.addEventListener('scroll', () => { if (active) updateTarget(doc.elementFromPoint(x, y)); }, { passive: true });
  fine.addEventListener('change', hide);
  reduced.addEventListener('change', hide);
  return { hide };
}
