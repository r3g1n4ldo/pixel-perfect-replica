export const contactLinks = {
  WhatsApp: '#', 'E-mail': '#', LinkedIn: '#', GitHub: '#', Instagram: '#', TikTok: '#',
};

export const navigation = ['Sobre', 'Projetos', 'Stack', 'Negócios', 'Conteúdo', 'Contato'];
export const sectionId = (label: string) => label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const roles = ['Suporte de TI', 'Infraestrutura', 'Automação', 'Extensões de Chrome', 'Empreendedor'];
export const categories = ['Todos', 'Extensões', 'Finanças', 'Automação', 'Infra', 'Web'] as const;
export type Category = (typeof categories)[number];
export type Project = { title: string; category: Exclude<Category, 'Todos'>; description: string; tags: string[]; featured?: boolean; developing?: boolean };
export const projects: Project[] = [
  { title: 'LovableX / Relovable', category: 'Extensões', description: 'Chat de IA no painel lateral do Lovable. Lê o projeto, conversa com Claude e envia alterações. Painel admin e acesso por chave.', tags: ['Chrome MV3', 'Claude API', 'Supabase'], featured: true },
  { title: 'Agente de ajuda', category: 'Extensões', description: 'Um agente que lê a página e o código, pesquisa na web e guia o usuário. Modos guia e autônomo, com ditado por voz.', tags: ['Gemini', 'OpenRouter', 'MV3'], featured: true },
  { title: 'FinanceLab', category: 'Finanças', description: 'Preço-teto de Bazin, preço justo de Graham, fundo de emergência com CDB e carteira com alertas no WhatsApp.', tags: ['Python', 'brapi.dev', 'Evolution API'], featured: true },
  { title: 'Ilimitado Lov AI', category: 'Extensões', description: 'Painel administrativo de chaves de acesso, limites e erros, com proxy de IA.', tags: ['Supabase', 'Edge Functions'] },
  { title: 'Chat Pop-up', category: 'Extensões', description: 'WhatsApp e Telegram Web em janela compacta, com ocultação de conteúdo e bloqueio por PIN.', tags: ['MV3'] },
  { title: 'Extensão de cupons', category: 'Extensões', description: 'Busca e testa cupons do Mercado Livre e Mercado Pago.', tags: ['n8n', 'Google Sheets', 'Telegram'] },
  { title: 'Editor visual de CSS com IA', category: 'Extensões', description: 'Seleciona elementos da página e altera estilos por chat.', tags: ['MV3', 'IA'] },
  { title: 'Reformulação de mensagens', category: 'Extensões', description: 'Reescreve textos e e-mails, com ditado por voz.', tags: ['MV3', 'IA'] },
  { title: 'tl;dv Downloader', category: 'Extensões', description: 'Download de gravações com chave de acesso por máquina.', tags: ['MV3', 'Supabase'] },
  { title: 'Comparador de seguidores', category: 'Extensões', description: 'Comparação de seguidores do Instagram.', tags: ['Instagram'] },
  { title: 'Facilitador do Messenger', category: 'Extensões', description: 'Ferramenta para facilitar o uso do Messenger.', tags: ['Messenger'] },
  { title: 'Migração Lovable → Supabase', category: 'Extensões', description: 'Ferramenta de migração de projetos Lovable para Supabase.', tags: ['Lovable', 'Supabase'] },
  { title: 'DOM Inspector Pro', category: 'Extensões', description: 'Engenharia reversa visual de páginas: DOM, XHR/fetch e listeners.', tags: ['Especificação'], developing: true },
  { title: 'Caixa Burger & Açaí', category: 'Finanças', description: 'Controle de gastos, lucro e ficha técnica de preços das minhas duas lojas.', tags: ['HTML/JS', 'Docker'] },
  { title: 'IRadar', category: 'Finanças', description: 'Painel de acompanhamento de investimentos com alertas.', tags: ['Investimentos'], developing: true },
  { title: 'Automações n8n + WhatsApp', category: 'Automação', description: 'E-mails com ações, bot de gastos de casal, CRM de campanhas, leads e alertas do Netdata reescritos por IA.', tags: ['n8n', 'Evolution API', 'ElevenLabs'] },
  { title: 'Bots de Telegram', category: 'Automação', description: 'IA própria na VPS, roteador de links de afiliado e captura de ofertas.', tags: ['Telegram', 'Claude Code'] },
  { title: 'DM automática no Instagram', category: 'Automação', description: 'Gatilhos por comentário e resposta a story.', tags: ['Make'] },
  { title: 'RMT HOST', category: 'Infra', description: 'Hospedagem de sites e servidores de jogos.', tags: ['Ubuntu', 'Docker', 'Portainer', 'Pterodactyl', 'WHMCS', 'Cloudflare Tunnel'] },
  { title: 'Servidor próprio', category: 'Infra', description: 'Notebook Ubuntu e VPS com Docker, SSH/SFTP, Netdata e n8n em produção com proxy reverso.', tags: ['Linux', 'Docker'] },
  { title: 'Gravaai', category: 'Web', description: 'PWA de gravação de tela com áudio da aba e microfone, com exportação em MP4.', tags: ['PWA'] },
  { title: 'Redesign do CyberPanel', category: 'Web', description: 'Login em 3D com fundo animado e modo escuro.', tags: ['CyberPanel', '3D'] },
  { title: 'E-commerce Facilita', category: 'Web', description: 'Busca de produto que gera imagens, descrições e informação nutricional.', tags: ['E-commerce', 'IA'] },
  { title: 'Projetocode Games', category: 'Web', description: 'Jogos de navegador em um site estilo fliperama.', tags: ['Web', 'Games'] },
];
export const filterProjects = (category: Category) => projects.filter(p => category === 'Todos' || p.category === category);
export const stack = [
  { title: 'Front-end', items: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind', 'shadcn/ui'] },
  { title: 'Back-end e dados', items: ['Python', 'Node/Next.js', 'Supabase'] },
  { title: 'Extensões', items: ['Chrome/Edge', 'Manifest V3'] },
  { title: 'Automação', items: ['n8n', 'Make', 'webhooks', 'Evolution API', 'Telegram'] },
  { title: 'IA', items: ['Claude', 'Claude Code', 'Gemini', 'OpenRouter', 'ElevenLabs'] },
  { title: 'Infra', items: ['Linux/Ubuntu', 'Docker', 'Portainer', 'VPS', 'SSH', 'Cloudflare Tunnel', 'Netdata', 'Railway'] },
  { title: 'Web', items: ['WordPress', 'Elementor', 'Hostinger', 'CyberPanel'] },
  { title: 'Sistemas', items: ['PDV', 'balanças', 'VTEX', 'Mercado Pago/Pix'] },
];
export const metrics = [{ value: '12+', label: 'extensões de Chrome' }, { value: '02', label: 'lojas próprias' }, { value: '04', label: 'canais de conteúdo' }, { value: '01', label: 'servidor próprio 24/7' }];
export const workflow = ['Começo pelo problema real', 'Prototipo com IA', 'Rodo na minha infra', 'Itero até funcionar'];
export const businesses = [
  { title: 'Sabor Gaúcho', category: 'Hamburgueria', description: 'Delivery pelo Pedidos10, foco em smash burger, com xis e cachorro-quente de volta ao cardápio. Pix via Mercado Pago e modelagem 3D da loja no SketchUp.' },
  { title: 'Maníacos do Açaí', category: 'Açaiteria', description: 'Minha segunda loja, gerida com as mesmas ferramentas internas que eu criei.' },
];
export const channels = [
  { title: 'Mercenário Hacker', subtitle: 'Curiosidades “Você sabia?” com vídeos gerados por IA.', label: 'TECNOLOGIA & CURIOSIDADES' },
  { title: 'Teoria e Fatos', subtitle: '@teoriaefatos · Teorias, fatos e curiosidades.', label: 'TEORIAS & FATOS' },
  { title: 'Histórias animadas', subtitle: 'Animações 2D de histórias curtas.', label: 'ANIMAÇÃO & HISTÓRIAS' },
  { title: 'O Dono do Prédio', subtitle: 'Novela vertical produzida com IA.', label: 'NOVELA VERTICAL' },
];
export const services = ['Suporte técnico e sistemas de franquia', 'Automação de atendimento e vendas', 'Extensões de navegador e ferramentas internas', 'Painéis de gestão para pequenos negócios', 'Sites WordPress e redesign', 'Servidor, Docker e self-hosting'];