/**
 * Acordeão acessível para a seção de FAQ.
 * Cada item usa <button aria-expanded> controlando um painel [data-faq-panel].
 */
export function initFaq(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-faq-toggle]');

  buttons.forEach((button) => {
    const panel = button.nextElementSibling as HTMLElement | null;
    if (!panel) return;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) {
        panel.style.maxHeight = '0px';
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}
