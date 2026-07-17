/**
 * Animação sutil de entrada dos elementos [data-reveal] ao entrar na tela.
 * Respeita prefers-reduced-motion: se o usuário prefere menos movimento,
 * tudo aparece imediatamente sem animação.
 */
export function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (items.length === 0) return;

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  items.forEach((item) => observer.observe(item));
}
