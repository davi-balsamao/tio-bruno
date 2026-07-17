import './style.css';
import { site } from './config';
import { initMenu } from './modules/menu';
import { initFaq } from './modules/faq';
import { initReveal } from './modules/reveal';
import { initGallery } from './modules/gallery';
import { initWhatsapp } from './modules/whatsapp';

/** Injeta dados do config nos elementos [data-*] correspondentes. */
function fillData(): void {
  const map: Record<string, string> = {
    '[data-cro]': site.cro,
    '[data-rqe]': site.rqe,
    '[data-endereco]': site.endereco,
    '[data-horarios]': site.horarios,
    '[data-year]': String(new Date().getFullYear()),
  };
  for (const [selector, value] of Object.entries(map)) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }
}

function boot(): void {
  initWhatsapp();
  fillData();
  initMenu();
  initFaq();
  initReveal();
  initGallery();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
