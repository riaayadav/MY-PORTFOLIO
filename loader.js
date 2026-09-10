export function initLoader() {
  const loader = document.querySelector('.site-loader');
  if (!loader) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fill = loader.querySelector('.loader-fill');
  const count = loader.querySelector('.loader-count');
  const skip = loader.querySelector('.loader-skip');
  const surfaces = [...document.querySelectorAll('body > header, body > main, body > footer')];
  const previousInert = surfaces.map(element => element.inert);
  const previousFocus = document.activeElement;
  let finished = false;
  let progress = 0;
  let target = 8;
  let animation;
  let exitTimer;
  function release() {
    loader.hidden = true;
    surfaces.forEach((element, index) => { element.inert = previousInert[index]; });
    document.body.classList.remove('is-loading');
    document.body.classList.add('page-ready');
    document.removeEventListener('keydown', onKey);
    if (loader.contains(document.activeElement)) {
      if (previousFocus && previousFocus !== document.body && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
      else { const main = document.querySelector('main'); main?.setAttribute('tabindex', '-1'); main?.focus({ preventScroll: true }); }
    }
  }
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(safety);
    cancelAnimationFrame(animation);
    fill.style.transform = 'scaleX(1)';
    count.textContent = '100';
    loader.classList.add('loader-exit');
    exitTimer = setTimeout(release, reduced ? 0 : 450);
  }
  function onKey(event) { if (event.key === 'Escape') finish(); }
  // Install the escape hatch before making the rest of the page inert.
  const safety = setTimeout(finish, 3200);
  loader.hidden = false;
  document.body.classList.add('is-loading');
  surfaces.forEach(element => { element.inert = true; });
  skip.addEventListener('click', finish);
  document.addEventListener('keydown', onKey);
  skip.focus({ preventScroll: true });
  function paint() {
    progress += (target - progress) * .13;
    count.textContent = String(Math.round(progress)).padStart(2, '0');
    fill.style.transform = `scaleX(${progress / 100})`;
    if (!finished) animation = requestAnimationFrame(paint);
  }
  animation = requestAnimationFrame(paint);
  const image = document.querySelector('.portrait-original img');
  const portraitReady = !image || image.complete ? Promise.resolve() : new Promise(resolve => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  });
  const fontsReady = document.fonts?.ready || Promise.resolve();
  const assetsReady = Promise.allSettled([
    portraitReady.then(() => { target = Math.min(95, target + 45); }),
    fontsReady.then(() => { target = Math.min(95, target + 42); }),
  ]);
  const minimumIntro = new Promise(resolve => setTimeout(resolve, reduced ? 0 : 1100));
  Promise.all([assetsReady, minimumIntro]).then(finish, finish);
  // Restore the page when returning through the browser's back/forward cache.
  window.addEventListener('pageshow', event => {
    if (event.persisted) { finish(); clearTimeout(exitTimer); release(); }
  });
}
