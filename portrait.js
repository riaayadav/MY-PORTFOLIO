// Hover, keyboard and touch all share the same reveal state.
export function initPortrait(button) {
  if (!button) return;
  const robot = button.querySelector('.portrait-robot');
  let hovered = false;
  let pinned = false;
  let ready = robot.complete && robot.naturalWidth > 0;
  const render = () => {
    const show = ready && (hovered || pinned);
    button.classList.toggle('is-robot', show);
    button.setAttribute('aria-pressed', String(show));
    button.setAttribute('aria-label', show ? 'Show original portrait' : 'Show futuristic portrait');
  };
  robot.addEventListener('load', () => { ready = true; render(); });
  robot.addEventListener('error', () => { ready = false; render(); });
  button.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; render(); } });
  button.addEventListener('pointerleave', () => { hovered = false; pinned = false; render(); });
  button.addEventListener('click', () => { const showing = ready && (hovered || pinned); hovered = false; pinned = !showing; render(); });
  button.addEventListener('blur', () => { hovered = false; pinned = false; render(); });
  button.addEventListener('keydown', event => { if (event.key === 'Escape') { hovered = false; pinned = false; render(); } });
  render();
}
