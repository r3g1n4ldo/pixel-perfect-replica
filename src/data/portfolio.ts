export const contactLinks = {
  WhatsApp: '#', 'E-mail': '#', LinkedIn: '#', GitHub: '#', Instagram: '#', TikTok: '#',
};

export const navigation = ['Sobre', 'Projetos', 'Stack', 'Segurança', 'Negócios', 'Conteúdo', 'Posso ajudar', 'Contato'];
export const sectionId = (label: string) => label === 'Posso ajudar' ? 'posso-ajudar' : label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const roles = ['Suporte de TI', 'Infraestrutura', 'Automação', 'Extensões de Chrome', 'Empreendedor'];
export const categories = ['Todos', 'Extensões', 'Finanças', 'Automação', 'Infra', 'Web', 'Segurança'] as const;
export type Category = (typeof categories)[number];
export type Project = { title: string; category: Exclude<Category, 'Todos'>; description: string; tags: string[]; featured?: boolean; status?: 'no ar' | 'em uso interno' | 'em desenvolvimento'; image?: string; link?: string; problem?: string; solution?: string; howItWorks?: string[] };
export const projects: Project[] = [
  { title: 'LovableX / Relovable', category: 'Extensões', description: 'Chat de IA no painel lateral do Lovable. Lê o projeto, conversa com Claude e envia alterações. Painel admin e acesso por chave.', tags: ['Chrome MV3', 'Claude API', 'Supabase'], featured: true, problem: 'Editar projetos no Lovable exigia sair do editor e gastar créditos em ajustes pequenos.', solution: 'Um chat de IA dentro do próprio editor, que lê o projeto aberto e aplica as alterações.', howItWorks: ['Painel lateral em Manifest V3', 'Leitura do projeto aberto', 'Envio das alterações via API', 'Liberação por chave de acesso com painel admin no Supabase'] },
  { title: 'Agente de ajuda', category: 'Extensões', description: 'Um agente que lê a página e o código, pesquisa na web e guia o usuário. Modos guia e autônomo, com ditado por voz.', tags: ['Gemini', 'OpenRouter', 'MV3'], featured: true, problem: 'Usuários se perdem em sistemas e páginas complexas.', solution: 'Um agente que entende a página e guia passo a passo, ou executa sozinho.', howItWorks: ['Lê o DOM e o código-fonte', 'Pesquisa na web', 'Modo guia e modo autônomo', 'Ditado por voz; Gemini ou OpenRouter'] },
  { title: 'FinanceLab', category: 'Finanças', description: 'Preço-teto de Bazin, preço justo de Graham, fundo de emergência com CDB e carteira com alertas no WhatsApp.', tags: ['Python', 'brapi.dev', 'Evolution API'], featured: true, problem: 'Acompanhar carteira e calcular preço-teto em planilhas era lento.', solution: 'Um app modular rodando no meu servidor, com alertas no WhatsApp.', howItWorks: ['Preço-teto pelo método Bazin com três bases de DPA', 'Preço justo de Graham', 'Fundo de emergência com CDB após IR', 'Monitor de ações e FIIs com alertas via Evolution API'] },
  { title: 'Ilimitado Lov AI', category: 'Extensões', description: 'Painel administrativo de chaves de acesso, limites e erros, com proxy de IA.', tags: ['Supabase', 'Edge Functions'] },
  { title: 'Chat Pop-up', category: 'Extensões', description: 'WhatsApp e Telegram Web em janela compacta, com ocultação de conteúdo e bloqueio por PIN.', tags: ['MV3'] },
  { title: 'Extensão de cupons', category: 'Extensões', description: 'Busca e testa cupons do Mercado Livre e Mercado Pago.', tags: ['n8n', 'Google Sheets', 'Telegram'] },
  { title: 'Editor visual de CSS com IA', category: 'Extensões', description: 'Seleciona elementos da página e altera estilos por chat.', tags: ['MV3', 'IA'] },
  { title: 'Reformulação de mensagens', category: 'Extensões', description: 'Reescreve textos e e-mails, com ditado por voz.', tags: ['MV3', 'IA'] },
  { title: 'tl;dv Downloader', category: 'Extensões', description: 'Download de gravações com chave de acesso por máquina.', tags: ['MV3', 'Supabase'] },
  { title: 'Comparador de seguidores', category: 'Extensões', description: 'Lista seguidores e seguindo, compara as listas e ajuda a deixar de seguir ou remover.', tags: ['MV3', 'Instagram'] },
  { title: 'Facilitador do Messenger', category: 'Extensões', description: 'Seleciona e exclui conversas ou sai de grupos com poucos cliques.', tags: ['MV3', 'Messenger'] },
  { title: 'Migração Lovable → Supabase', category: 'Extensões', description: 'Automatiza a migração de um projeto do Lovable para um Supabase próprio.', tags: ['Lovable', 'Supabase'] },
  { title: 'DOM Inspector Pro', category: 'Extensões', description: 'Engenharia reversa visual de páginas: DOM, XHR/fetch e listeners.', tags: ['Especificação'], status: 'em desenvolvimento' },
  { title: 'Caixa Burger & Açaí', category: 'Finanças', description: 'Controle de gastos, lucro e ficha técnica de preços das minhas duas lojas.', tags: ['HTML/JS', 'Docker'] },
  { title: 'IRadar', category: 'Finanças', description: 'Painel de acompanhamento de investimentos com alertas.', tags: ['Investimentos'], status: 'em desenvolvimento' },
  { title: 'Automações n8n + WhatsApp', category: 'Automação', description: 'E-mails com ações, bot de gastos de casal, CRM de campanhas, leads e alertas do Netdata reescritos por IA.', tags: ['n8n', 'Evolution API', 'ElevenLabs'] },
  { title: 'Bots de Telegram', category: 'Automação', description: 'IA própria na VPS, roteador de links de afiliado e captura de ofertas.', tags: ['Telegram', 'Claude Code'] },
  { title: 'DM automática no Instagram', category: 'Automação', description: 'Gatilhos por comentário e resposta a story.', tags: ['Make'] },
  { title: 'RMT HOST', category: 'Infra', description: 'Hospedagem de sites e servidores de jogos.', tags: ['Ubuntu', 'Docker', 'Portainer', 'Pterodactyl', 'WHMCS', 'Cloudflare Tunnel'] },
  { title: 'Servidor próprio', category: 'Infra', description: 'Notebook Ubuntu e VPS com Docker, SSH/SFTP, Netdata e n8n em produção com proxy reverso.', tags: ['Linux', 'Docker'] },
  { title: 'Gravaai', category: 'Web', description: 'PWA de gravação de tela com áudio da aba e microfone, com exportação em MP4.', tags: ['PWA'] },
  { title: 'Redesign do CyberPanel', category: 'Web', description: 'Login em 3D com fundo animado e modo escuro.', tags: ['CyberPanel', '3D'] },
  { title: 'E-commerce Facilita', category: 'Web', description: 'Busca de produto que gera imagens, descrições e informação nutricional.', tags: ['E-commerce', 'IA'] },
  { title: 'VulnScan Pro', category: 'Segurança', description: 'Ferramenta de análise de vulnerabilidades de front-end assistida por IA, com interface estilo terminal, criada para testar os meus sites.', tags: ['IA', 'Front-end', 'Terminal UI'] },
  { title: 'Projetocode Games', category: 'Web', description: 'Jogos de navegador em um site estilo fliperama.', tags: ['Web', 'Games'] },
];
export const projectStatus = (project: Project) => project.status ?? 'em uso interno';
export const filterProjects = (category: Category) => projects.filter(p => category === 'Todos' || p.category === category);
export const stack = [
  { title: 'Front-end', items: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind', 'shadcn/ui'] },
  { title: 'Back-end e dados', items: ['Python', 'Node/Next.js', 'Supabase'] },
  { title: 'Extensões', items: ['Chrome/Edge', 'Manifest V3'] },
  { title: 'Automação', items: ['n8n', 'Make', 'webhooks', 'Evolution API', 'Telegram'] },
  { title: 'IA', items: ['Claude', 'Claude Code', 'Gemini', 'OpenRouter', 'ElevenLabs'] },
  { title: 'Infra', items: ['Linux/Ubuntu', 'Docker', 'Portainer', 'VPS', 'SSH', 'Cloudflare Tunnel', 'Netdata', 'Railway'] },
  { title: 'Web', items: ['WordPress', 'Elementor', 'Hostinger', 'CyberPanel'] },
  { title: 'Segurança', items: ['Burp Suite', 'Wireshark', 'RLS', 'análise de CVE', 'varredura de portas'] },
  { title: 'Sistemas', items: ['PDV', 'balanças', 'VTEX', 'Mercado Pago/Pix'] },
];
export const metrics = [{ value: '12+', label: 'extensões de Chrome' }, { value: '02', label: 'lojas próprias' }, { value: '07', label: 'frentes de segurança' }, { value: '01', label: 'servidor próprio 24/7' }];
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
export const services = ['Suporte técnico e sistemas de franquia', 'Automação de atendimento e vendas', 'Extensões de navegador e ferramentas internas', 'Painéis de gestão para pequenos negócios', 'Sites WordPress e redesign', 'Servidor, Docker e self-hosting', 'Revisão de segurança de apps Supabase e extensões'];
export const security = [
  { title: 'VulnScan Pro', description: 'Ferramenta de análise de vulnerabilidades de front-end assistida por IA, com interface estilo terminal, criada para testar os meus sites.', tags: ['IA', 'Front-end', 'Terminal UI'] },
  { title: 'Supabase e Realtime', description: 'Análise de exposição de dados com a chave anon, políticas de RLS e a diferença entre canais postgres_changes (protegidos por RLS) e broadcast (que ignoram RLS), além do risco de vazamento de eventos em tempo real.', tags: ['Supabase', 'RLS', 'Realtime'] },
  { title: 'Verificador de banco e permissões', description: 'Checagem de conexão e de permissões pelo navegador, em um único arquivo HTML.', tags: ['HTML', 'Supabase'] },
  { title: 'Verificador de rede e links', description: 'Varredura de IPs e portas configurável, em modo rápido ou com portas específicas.', tags: ['Rede', 'Portas'] },
  { title: 'Análise de tráfego', description: 'Burp Suite e Wireshark para entender o protocolo do meu próprio servidor de jogo, capturando os dois lados da conexão.', tags: ['Burp Suite', 'Wireshark'] },
  { title: 'Triagem de dependências', description: 'Análise de alertas de CVE em deploy (Next.js no Railway), conferindo no lockfile quais versões estão em uso e se o aviso é real antes de atualizar.', tags: ['CVE', 'Next.js', 'Railway'] },
  { title: 'Revisão das minhas extensões', description: 'Requisições, permissões e armazenamento de chaves nas extensões que construí.', tags: ['Chrome MV3', 'Permissões'] },
];
export const securitySection = {
  title: 'Quebro antes que alguém quebre.',
  subtitle: 'Análise de vulnerabilidades de forma defensiva: testo e reforço os sistemas que eu mesmo construo e hospedo.',
  notice: '// todos os testes são feitos apenas em sistemas próprios ou com autorização.',
  terminalTitle: 'vulnscan@reginaldo: ~/seguranca',
  command: 'vulnscan --defensive --own-systems',
  simulation: 'SAÍDA SIMULADA',
  lines: ['[ok] RLS ativo em 12 tabelas', '[!] canal broadcast sem filtro de RLS → corrigido', '[ok] lockfile conferido: aviso de CVE não se aplica'],
  result: 'scan concluído · 0 críticos',
};
export const heroStack = 'Docker · Supabase · n8n · MV3 · Burp Suite';
export const projectLabels = { problem: 'Problema', solution: 'Solução', howItWorks: 'Como funciona', stack: 'Stack', view: 'Ver projeto' };
export const pageMessages = {
  notFound: 'Página não encontrada', notFoundDescription: 'A página que você procura não existe ou foi movida.',
  home: 'Voltar ao início', error: 'Algo deu errado', errorDescription: 'Não foi possível carregar esta página. Tente de novo ou volte ao início.', retry: 'Tentar de novo', close: 'Fechar',
};
export const shareImage = 'https://id-preview--2bda36ac-b52d-455e-91ce-57f78e93d8f1.lovable.app/og.png';
