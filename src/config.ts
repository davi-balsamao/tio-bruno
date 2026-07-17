/**
 * Configuração central do site.
 * ------------------------------------------------------------------
 * Edite APENAS este arquivo para atualizar os dados do consultório.
 * Itens marcados com "TODO" são placeholders — troque quando o
 * Dr. Bruno enviar as informações.
 */

export const site = {
  nome: 'Dr. Bruno Ladeira',
  especialidade: 'Endodontia — Tratamento de Canal',
  anosExperiencia: 16,
  clinica: 'Líder Odontologia',
  clinicaDesde: 2008,
  cidade: 'Sete Lagoas',
  estado: 'MG',

  // TODO: confirmar com o Dr. Bruno
  cro: 'CRO-MG 00000', // TODO: número real do CRO
  rqe: 'RQE 0000', // TODO: registro de especialista em endodontia
  endereco: 'Rua Exemplo, 000 — Centro, Sete Lagoas/MG', // TODO: endereço real
  cep: '35700-000', // TODO
  horarios: 'Segunda a sexta, das 8h às 18h', // TODO: horários reais
  email: 'contato@drbrunoladeira.com.br', // TODO (opcional)
  instagram: '', // TODO (opcional) ex: 'https://instagram.com/...'

  // Contato / WhatsApp — (31) 99911-8647
  whatsappNumero: '5531999118647',
  telefoneExibicao: '(31) 99911-8647',

  convenios: ['Unimed', 'Amil', 'SulAmérica'],

  // URL de produção (usada em canonical / sitemap / Open Graph)
  urlBase: 'https://www.drbrunoladeira.com.br', // TODO: domínio real
} as const;

/** Mensagens pré-preenchidas para os diferentes botões de WhatsApp. */
export const whatsappMensagens = {
  padrao:
    'Olá, Dr. Bruno! Vim pelo site e gostaria de agendar uma avaliação de endodontia (canal).',
  hero:
    'Olá, Dr. Bruno! Vim pelo site e quero agendar minha consulta de tratamento de canal.',
  convenio:
    'Olá, Dr. Bruno! Gostaria de saber se meu convênio é atendido e agendar uma avaliação.',
  duvida:
    'Olá, Dr. Bruno! Tenho uma dúvida sobre tratamento de canal e gostaria de conversar.',
} as const;

export type WhatsappContexto = keyof typeof whatsappMensagens;
