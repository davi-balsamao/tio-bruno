/**
 * Menu mobile (hambúrguer) + destaque do link ativo conforme o scroll.
 * O scroll suave é feito via CSS (scroll-behavior), respeitando
 * prefers-reduced-motion.
 */
export function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-menu-panel]');
  if (!toggle || !panel) return;

  const setOpen = (open: boolean) => {
    panel.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('overflow-hidden', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Fecha ao clicar em um link do menu.
  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Fecha com Esc.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  initActiveLink();
}

/** Destaca no menu a seção visível na tela. */
function initActiveLink(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'),
  );
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href') || ''))
    .filter((el): el is Element => el instanceof Element);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.dataset.active = String(link.getAttribute('href') === id);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}
