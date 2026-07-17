import { site, whatsappMensagens, type WhatsappContexto } from '../config';

/** Monta uma URL do WhatsApp (wa.me) com mensagem pré-preenchida. */
export function linkWhatsapp(contexto: WhatsappContexto = 'padrao'): string {
  const texto = encodeURIComponent(whatsappMensagens[contexto]);
  return `https://wa.me/${site.whatsappNumero}?text=${texto}`;
}

/**
 * Preenche todos os links com data-whatsapp no documento.
 * Use data-whatsapp="hero" para escolher a mensagem (padrão: "padrao").
 * Também injeta o telefone de exibição em elementos [data-tel].
 */
export function initWhatsapp(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[data-whatsapp]');
  links.forEach((link) => {
    const ctx = (link.dataset.whatsapp || 'padrao') as WhatsappContexto;
    link.href = linkWhatsapp(ctx in whatsappMensagens ? ctx : 'padrao');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  document.querySelectorAll<HTMLElement>('[data-tel]').forEach((el) => {
    el.textContent = site.telefoneExibicao;
  });
}
