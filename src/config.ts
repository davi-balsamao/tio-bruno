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

  // TODO: preencher quando o Dr. Bruno confirmar (vazio = não exibido no site)
  cro: '', // TODO: número real do CRO-MG
  rqe: '', // TODO: registro de especialista em endodontia (RQE)
  endereco: '', // TODO: endereço real do consultório
  cep: '', // TODO
  horarios: 'Horários flexíveis durante a semana', // ajustar quando confirmar dias/horas
  email: '', // TODO (opcional)
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

/**
 * Casos clínicos exibidos na galeria (radiografias de canais tratados).
 * As legendas são genéricas/ilustrativas — ajuste à vontade.
 * Para adicionar/remover casos, basta editar esta lista.
 */
export interface Caso {
  src: string;
  alt: string;
  caption: string;
}

const legendas = [
  'Tratamento de canal — dentes posteriores',
  'Canais radiculares obturados',
  'Tratamento endodôntico concluído',
  'Canais tratados em dente molar',
  'Obturação dos canais radiculares',
  'Endodontia — vista radiográfica',
  'Canais radiculares tratados',
  'Tratamento de canal finalizado',
  'Endodontia de precisão',
  'Retratamento endodôntico',
  'Canais calcificados tratados',
  'Obturação de múltiplos canais',
  'Tratamento de canal em pré-molar',
  'Endodontia em dente anterior',
  'Canais tratados — vista apical',
  'Tratamento endodôntico completo',
  'Selamento dos canais radiculares',
  'Endodontia com precisão de ápice',
  'Tratamento de canal bem-sucedido',
];

export const casos: Caso[] = legendas.map((caption, i) => ({
  src: `/img/caso-${i + 1}.jpg`,
  alt: `Radiografia de tratamento de canal realizado pelo Dr. Bruno Ladeira — ${caption.toLowerCase()}`,
  caption,
}));
