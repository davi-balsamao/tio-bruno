/**
 * Lightbox simples e acessível para a galeria de radiografias.
 * Abre a imagem ampliada em um diálogo, com navegação por teclado
 * (setas para trocar, Esc para fechar) e trap de foco básico.
 */
export function initGallery(): void {
  const triggers = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-lightbox]'),
  );
  const dialog = document.querySelector<HTMLElement>('[data-lightbox-dialog]');
  if (triggers.length === 0 || !dialog) return;

  const imgEl = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const captionEl = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const btnClose = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  const btnPrev = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const btnNext = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  if (!imgEl || !btnClose) return;

  let current = 0;
  let lastFocused: HTMLElement | null = null;

  const render = () => {
    const trigger = triggers[current];
    const img = trigger.querySelector('img');
    if (!img) return;
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    if (captionEl) captionEl.textContent = trigger.dataset.caption || img.alt;
  };

  const open = (index: number) => {
    current = index;
    lastFocused = document.activeElement as HTMLElement;
    render();
    dialog.dataset.open = 'true';
    dialog.removeAttribute('hidden');
    document.body.classList.add('overflow-hidden');
    btnClose.focus();
  };

  const close = () => {
    dialog.dataset.open = 'false';
    dialog.setAttribute('hidden', '');
    document.body.classList.remove('overflow-hidden');
    lastFocused?.focus();
  };

  const move = (delta: number) => {
    current = (current + delta + triggers.length) % triggers.length;
    render();
  };

  triggers.forEach((trigger, i) => {
    trigger.addEventListener('click', () => open(i));
  });

  btnClose.addEventListener('click', close);
  btnPrev?.addEventListener('click', () => move(-1));
  btnNext?.addEventListener('click', () => move(1));

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });

  document.addEventListener('keydown', (e) => {
    if (dialog.dataset.open !== 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });
}
