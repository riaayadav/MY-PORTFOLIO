const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const menu = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); mobileNav.hidden = true; }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); mobileNav.hidden = !open; });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 721px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => { closeMenu(); const target = document.querySelector(link.getAttribute('href')); if (target && !reducedMotion.matches) { target.classList.remove('section-flash'); requestAnimationFrame(() => target.classList.add('section-flash')); } }));
if ('IntersectionObserver' in window && !reducedMotion.matches) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 }); document.querySelectorAll('.reveal').forEach(element => observer.observe(element)); document.body.classList.add('motion-ready'); }
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const progress = document.querySelector('.scroll-progress');
let scrollScheduled = false;
function updateScroll() { const maxScroll = document.documentElement.scrollHeight - window.innerHeight; progress.style.transform = `scaleX(${maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0})`; let current = sections[0].id; for (const section of sections) if (section.getBoundingClientRect().top <= window.innerHeight * .35) current = section.id; navLinks.forEach(link => { const active = link.hash === `#${current}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); scrollScheduled = false; }
window.addEventListener('scroll', () => { if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
window.addEventListener('resize', updateScroll, { passive: true }); updateScroll();
const cursor = document.querySelector('.cursor'); const cursorLabel = cursor.querySelector('span');
let pointerX = -100, pointerY = -100, cursorX = -100, cursorY = -100, frame = null;
function animateCursor() { cursorX += (pointerX - cursorX) * .24; cursorY += (pointerY - cursorY) * .24; cursor.style.transform = `translate3d(${cursorX}px,${cursorY}px,0)`; if (Math.abs(pointerX - cursorX) + Math.abs(pointerY - cursorY) > .1) frame = requestAnimationFrame(animateCursor); else frame = null; }
document.addEventListener('pointermove', event => { if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return; pointerX = event.clientX; pointerY = event.clientY; cursor.style.display = 'flex'; cursor.style.opacity = '1'; if (frame === null) frame = requestAnimationFrame(animateCursor); }, { passive: true });
document.addEventListener('pointerover', event => { const image = event.target.closest('[data-cursor]'); const button = event.target.closest('button,.button'); const link = event.target.closest('a,summary'); cursor.classList.toggle('is-image', !!image && !button && !link); cursor.classList.toggle('is-button', !!button); cursor.classList.toggle('is-link', !!link && !button); cursorLabel.textContent = image && !link && !button ? image.dataset.cursor : ''; });
document.addEventListener('pointerleave', () => { cursor.style.opacity = '0'; }); window.addEventListener('blur', () => { cursor.style.opacity = '0'; });
document.querySelectorAll('[data-tilt]').forEach(card => { let tiltFrame = null; card.addEventListener('pointermove', event => { if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return; const rect = card.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5; if (tiltFrame) cancelAnimationFrame(tiltFrame); tiltFrame = requestAnimationFrame(() => { card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-3px)`; }); }, { passive: true }); card.addEventListener('pointerleave', () => { if (tiltFrame) cancelAnimationFrame(tiltFrame); card.style.transform = ''; }); });
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { cursor.style.display = 'none'; document.body.classList.remove('motion-ready'); document.querySelectorAll('[data-tilt]').forEach(card => { card.style.transform = ''; }); } }); finePointer.addEventListener('change', () => { if (!finePointer.matches) cursor.style.display = 'none'; });
const copyButton = document.querySelector('.copy-email'); const copyStatus = document.querySelector('.copy-status'); let copyReset;
copyButton.addEventListener('click', async () => { clearTimeout(copyReset); try { await navigator.clipboard.writeText('yriya7013@gmail.com'); copyButton.innerHTML = 'Email copied <span>✓</span>'; copyStatus.textContent = 'Ready to paste into your email app.'; copyReset = setTimeout(() => { copyButton.innerHTML = 'Copy email <span>⧉</span>'; copyStatus.textContent = ''; }, 4000); } catch { copyStatus.textContent = 'Select and copy yriya7013@gmail.com, or use the email link above.'; } });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('.project-preview').forEach(preview => {
  const details = preview.closest('.project-row').querySelector('details');
  preview.setAttribute('role', 'button'); preview.tabIndex = 0;
  preview.setAttribute('aria-label', `Explore ${details.querySelector('h4').textContent}`);
  preview.dataset.cursor = 'Explore';
  const openProject = () => { details.open = true; details.querySelector('summary').focus({ preventScroll: true }); details.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' }); };
  preview.addEventListener('click', openProject);
  preview.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(); } });
});
