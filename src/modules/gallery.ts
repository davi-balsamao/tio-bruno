import { casos } from '../config';

/**
 * Galeria de radiografias:
 *  1. Renderiza o grid a partir de `casos` (config.ts);
 *  2. Mostra os primeiros itens e revela o restante com "Ver mais";
 *  3. Liga o lightbox acessível (setas para trocar, Esc para fechar).
 */
const VISIVEIS_INICIAL = 9;

export function initGallery(): void {
  const grid = document.querySelector<HTMLUListElement>('[data-gallery]');
  const dialog = document.querySelector<HTMLElement>('[data-lightbox-dialog]');
  if (!grid || !dialog) return;

  renderGrid(grid);
  initVerMais(grid);
  initLightbox(dialog);
}

/** Monta os cards da galeria dentro do <ul data-gallery>. */
function renderGrid(grid: HTMLUListElement): void {
  grid.innerHTML = casos
    .map((caso, i) => {
      const oculto = i >= VISIVEIS_INICIAL ? 'data-extra hidden' : '';
      return `
        <li ${oculto}>
          <button
            type="button"
            data-lightbox
            data-index="${i}"
            data-caption="${escapeAttr(caso.caption)}"
            class="group block w-full cursor-pointer overflow-hidden rounded-2xl border border-cream-deep bg-white shadow-sm"
          >
            <span class="block aspect-[4/3] overflow-hidden">
              <img
                src="${caso.src}"
                alt="${escapeAttr(caso.alt)}"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </span>
          </button>
        </li>`;
    })
    .join('');
}

/** Botão "Ver mais" que revela os casos ocultos. */
function initVerMais(grid: HTMLUListElement): void {
  const botao = document.querySelector<HTMLButtonElement>('[data-gallery-more]');
  if (!botao) return;

  const extras = grid.querySelectorAll<HTMLElement>('[data-extra]');
  if (extras.length === 0) {
    botao.hidden = true;
    return;
  }

  botao.addEventListener('click', () => {
    extras.forEach((el) => el.removeAttribute('hidden'));
    botao.hidden = true;
  });
}

/** Lightbox acessível para as imagens da galeria. */
function initLightbox(dialog: HTMLElement): void {
  const imgEl = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const captionEl = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const btnClose = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  const btnPrev = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const btnNext = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  if (!imgEl || !btnClose) return;

  let current = 0;
  let lastFocused: HTMLElement | null = null;

  const render = () => {
    const caso = casos[current];
    if (!caso) return;
    imgEl.src = caso.src;
    imgEl.alt = caso.alt;
    if (captionEl) captionEl.textContent = caso.caption;
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
    current = (current + delta + casos.length) % casos.length;
    render();
  };

  // Delegação: cobre também os cards revelados pelo "Ver mais".
  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-lightbox]');
    if (!trigger) return;
    open(Number(trigger.dataset.index) || 0);
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

function escapeAttr(value: string): string {
  return value.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
