import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUp, ArrowUpRight, ArrowDown, ArrowRight, Terminal, Menu, X, MapPin, Code2, Puzzle, Bot, ChartNoAxesCombined, Server, Globe, Check, BriefcaseBusiness, GraduationCap, Store, Play, Clapperboard, ScanLine, Building2, MessageCircle, Mail, Github, Linkedin, Instagram, Music2, Headset, Workflow, PanelsTopLeft, Braces } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navigation, sectionId, roles, categories, filterProjects, projects, stack, metrics, workflow, businesses, channels, services, contactLinks, type Category } from '@/data/portfolio';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Reginaldo Silva — Portfólio' },
    { name: 'description', content: 'Suporte de TI, extensões de Chrome, automações e infraestrutura. Conheça os projetos e negócios de Reginaldo Silva, em Santa Catarina.' },
    { property: 'og:title', content: 'Reginaldo Silva — Portfólio' },
    { property: 'og:description', content: 'Transformo problemas reais em ferramentas que funcionam. Extensões, automações, painéis, bots e sites.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});

const categoryIcons = { 'Extensões': Puzzle, 'Finanças': ChartNoAxesCombined, 'Automação': Workflow, 'Infra': Server, 'Web': Globe };
const contactIcons = { WhatsApp: MessageCircle, 'E-mail': Mail, LinkedIn: Linkedin, GitHub: Github, Instagram, TikTok: Music2 };

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: ReactNode }) {
  return <section id={id} className="section"><div className="page-width reveal"><p className="section-prompt">~/{id} <span className="text-muted-foreground">$</span></p><h2 className="section-heading">{title}</h2>{subtitle && <p className="section-subtitle">{subtitle}</p>}{children}</div></section>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>('Todos');
  const [typed, setTyped] = useState(roles[0] ?? 'Suporte de TI');
  const [active, setActive] = useState('');
  const [contactNotice, setContactNotice] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let role = 0; let text = (roles[0] ?? 'Suporte de TI').length; let deleting = true; let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const target = roles[role] ?? roles[0] ?? "Suporte de TI";
      if (deleting) { text--; setTyped(target.slice(0, text)); if (text === 0) { deleting = false; role = (role + 1) % roles.length; } }
      else { text++; setTyped(target.slice(0, text)); if (text === target.length) { deleting = true; timer = setTimeout(tick, 2100); return; } }
      timer = setTimeout(tick, deleting ? 45 : 85);
    };
    timer = setTimeout(tick, 2300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => { el.classList.add('pending'); observer.observe(el); });
    const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('section[id]').forEach(el => navObserver.observe(el));
    return () => { observer.disconnect(); navObserver.disconnect(); };
  }, []);

  const visibleProjects = filterProjects(category);
  return <>
    <header className="site-header sticky top-0 z-50 border-b border-border">
      <div className="page-width flex h-full items-center justify-between">
        <a href="#top" aria-label="Reginaldo Silva, início" className="flex items-center gap-2.5 font-mono text-sm font-semibold"><Terminal size={20} className="text-primary" />reginaldo<span className="text-primary">.dev</span><span className="text-muted-foreground">_</span></a>
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">{navigation.map(n => <a key={n} href={`#${sectionId(n)}`} className={`nav-link ${active === sectionId(n) ? 'active' : ''}`}>{n}</a>)}<span className="ml-3 border-l border-border pl-5 font-mono text-[10px] text-muted-foreground"><span className="status-dot" />construindo</span></nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav id="mobile-menu" aria-label="Navegação móvel" className="absolute top-full flex w-full flex-col gap-1 border-b border-border bg-background px-5 py-4 md:hidden">{navigation.map(n => <a key={n} href={`#${sectionId(n)}`} className="nav-link py-3" onClick={() => setMenuOpen(false)}>{n}</a>)}</nav>}
    </header>

    <main id="top">
      <section className="hero">
        <div className="page-width">
          <div className="hero-grid">
            <div>
              <p className="mb-5 font-mono text-sm text-primary">&gt; olá, eu sou</p>
              <h1 className="hero-name">Reginaldo<span>Silva<span className="inline! text-primary">.</span></span></h1>
              <div className="hero-role mt-6" aria-label={roles.join(', ')}><span aria-hidden="true">{typed}<span className="cursor" /></span></div>
              <p className="body-copy mt-5 max-w-lg">Transformo problemas reais em ferramentas que funcionam: extensões, automações, painéis, bots e sites. Prototipo rápido com IA e rodo tudo na minha própria infraestrutura.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="portfolio"><a href="#projetos">Ver projetos <ArrowUpRight /></a></Button><Button asChild variant="portfolioOutline"><a href="#contato"><MessageCircle /> Falar comigo</a></Button></div>
            </div>
            <div className="terminal" aria-label="Resumo em terminal">
              <div className="terminal-bar"><span className="terminal-dot" /><span className="terminal-dot" /><span className="terminal-dot" /><span className="mx-auto font-mono text-[10px] text-muted-foreground">reginaldo@servidor: ~</span><Terminal size={12} className="text-muted-foreground" /></div>
              <div className="terminal-body">
                <p className="terminal-command"><span className="text-primary">$</span> whoami</p><p className="terminal-output">suporte de TI · dev de ferramentas<br />dono de 2 lojas</p>
                <p className="terminal-command"><span className="text-primary">$</span> stack --top</p><p className="terminal-output">Docker · Supabase · n8n<br />Chrome MV3 · Python</p>
                <p className="terminal-command"><span className="text-primary">$</span> status</p><p className="text-primary">construindo algo novo<span className="cursor h-3! w-1.5!" /></p>
                <div className="terminal-bottom"><span><span className="status-dot" />todos os sistemas online</span><span>↑ uptime 24/7</span></div>
              </div>
            </div>
          </div>
          <div className="hero-foot"><span className="flex items-center gap-2"><MapPin size={13} /> Santa Catarina, Brasil</span><a href="#sobre" className="flex items-center gap-3 hover:text-primary"><span className="hidden sm:inline">um pouco sobre mim</span><ArrowDown size={15} /></a></div>
        </div>
      </section>

      <Section id="sobre" title="Entre o código e o mundo real.">
        <div className="about-grid">
          <div className="body-copy"><p>Trabalho com TI no dia a dia, dando suporte técnico a unidades franqueadas (PDV, balanças, VTEX), e tenho negócios próprios: uma hamburgueria e uma açaiteria. Resolvo problemas reais construindo as ferramentas necessárias.</p><p className="mt-4">Prototipo com IA (Claude, Claude Code, Lovable, Gemini) e coloco em produção em servidor próprio (Ubuntu, VPS, Docker, SSH), iterando até funcionar de verdade. Cursando Análise e Desenvolvimento de Sistemas.</p><blockquote className="mt-6 flex gap-3 font-display text-lg text-foreground"><span className="font-mono text-primary">“</span>Soluções simples, que funcionam de verdade e que eu mesmo uso.</blockquote></div>
          <div className="metric-grid">{metrics.map(m => <div key={m.label} className="metric"><p className="metric-value">{m.value}<span className="text-primary/40">.</span></p><p className="metric-label">{m.label}</p></div>)}</div>
        </div>
        <div className="mt-12 border-t border-border pt-8"><h3 className="mb-6 font-mono text-xs text-muted-foreground">// experiência & formação</h3><div className="grid gap-7 md:grid-cols-[1.5fr_1fr]"><div className="flex gap-4"><BriefcaseBusiness size={18} className="mt-1 shrink-0 text-primary" /><div><h4 className="font-display text-lg">Suporte de TI <span className="ml-2 font-mono text-[10px] text-primary">ATUAL</span></h4><p className="mt-1 text-xs text-muted-foreground">Franqueadora · Fitland</p><p className="body-copy mt-3 text-xs!">Instalação, configuração e suporte de PDV e balanças; atendimento técnico aos franqueados; suporte à VTEX; administração do site WordPress de uma franquia (Hostinger); diagnóstico de falhas e orientação aos usuários.</p></div></div><div className="flex gap-4"><GraduationCap size={20} className="mt-1 shrink-0 text-primary" /><div><h4 className="font-display text-lg">Análise e Desenvolvimento de Sistemas</h4><p className="mt-2 font-mono text-[11px] text-muted-foreground">Formação · em andamento</p></div></div></div></div>
      </Section>

      <Section id="projetos" title="Ferramentas que saíram do papel." subtitle="Problemas reais. Código em produção. Uma ideia de cada vez.">
        <div className="my-8 flex flex-wrap items-center gap-2" aria-label="Filtrar projetos">{categories.map(c => <Button key={c} variant="filter" data-active={category === c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</Button>)}<span className="ml-auto font-mono text-[10px] text-muted-foreground" aria-live="polite">{String(visibleProjects.length).padStart(2, '0')} projetos</span></div>
        <div className="project-grid">{visibleProjects.map(p => { const Icon = categoryIcons[p.category]; return <article key={p.title} className={`project-card ${p.featured ? 'featured' : ''}`}><div className="project-art"><span className="project-number">/{String(projects.indexOf(p) + 1).padStart(2, '0')}</span><div className="project-symbol"><Icon size={28} strokeWidth={1.5} /></div>{p.featured && <span className="absolute right-4 top-4 font-mono text-[9px] text-primary">EM DESTAQUE <ArrowUpRight size={10} className="inline" /></span>}</div><div className="project-info"><p className="mb-3 font-mono text-[10px] uppercase text-primary">{p.category}</p><h3 className="font-display text-xl font-medium">{p.title}</h3><p className="mt-3 min-h-20 text-xs leading-6 text-muted-foreground">{p.description}</p>{p.developing && <p className="mt-3 font-mono text-[10px] text-warning">↳ em desenvolvimento</p>}<div className="mt-5 flex flex-wrap gap-1.5">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div></div></article>; })}</div>
      </Section>

      <Section id="stack" title="Meu kit de ferramentas." subtitle="A tecnologia certa é a que resolve o problema.">
        <div className="stack-grid">{stack.map((s, i) => <div className="stack-block" key={s.title}><h3 className="mb-4 flex items-center gap-3 font-display text-base"><span className="font-mono text-[10px] text-primary">0{i + 1}</span>{s.title}</h3><div className="flex flex-wrap gap-2">{s.items.map(t => <span key={t} className="tag">{t}</span>)}</div></div>)}</div>
        <div className="mt-14 border-t border-border pt-8"><h3 className="font-display text-xl">Como eu trabalho</h3><div className="mt-6 grid grid-cols-2 gap-7 md:grid-cols-4">{workflow.map((w, i) => <div key={w}><span className="font-mono text-2xl text-primary">0{i + 1}</span><p className="mt-3 text-sm">{w}</p></div>)}</div></div>
      </Section>

      <Section id="negocios" title="Empreender também é construir." subtitle="Duas lojas. Muitos problemas reais. Minhas próprias soluções."><div className="mt-9 grid gap-5 md:grid-cols-2">{businesses.map(b => <article key={b.title} className="business-card"><div className="mb-8 flex items-center justify-between"><Store size={30} strokeWidth={1.3} className="text-primary" /><span className="tag">{b.category}</span></div><h3 className="font-display text-2xl">{b.title}</h3><p className="body-copy mt-4">{b.description}</p></article>)}</div></Section>

      <Section id="conteudo" title="Ideias em outros formatos." subtitle="Código não é a única forma de criar."><div className="channel-grid">{channels.map((c, i) => { const Icon = [ScanLine, Globe, Clapperboard, Building2][i] ?? ScanLine; return <article key={c.title} className="channel"><span className="font-mono text-[9px] text-muted-foreground">{c.label}</span><div className="channel-visual"><Icon size={52} strokeWidth={1} /></div><div><Play size={14} className="mb-4 text-primary" /><h3 className="font-display text-2xl leading-tight">{c.title}</h3><p className="mt-3 text-xs leading-5 text-muted-foreground">{c.subtitle}</p></div></article>; })}</div><p className="mt-7 font-mono text-xs leading-6 text-muted-foreground">Também crio roteiros, prompts de imagem, cardápios e divulgação para pequenos negócios.</p></Section>

      <Section id="posso-ajudar" title="Posso ajudar com"><div className="mt-8 grid gap-x-16 md:grid-cols-2">{services.map((s, i) => { const Icon = [Headset, Bot, Puzzle, PanelsTopLeft, Braces, Server][i] ?? Headset; return <div key={s} className="flex items-center gap-4 border-b border-border py-5"><Icon size={20} className="shrink-0 text-primary" /><p className="text-sm">{s}</p><Check size={14} className="ml-auto shrink-0 text-muted-foreground" /></div>; })}</div></Section>

      <Section id="contato" title="Vamos construir algo?" subtitle="Um problema pra resolver, uma ideia pra tirar do papel. Vamos conversar."><div className="mt-9 flex flex-wrap gap-3">{Object.entries(contactLinks).map(([name, href]) => { const Icon = contactIcons[name as keyof typeof contactIcons]; return <Button key={name} asChild variant={name === 'WhatsApp' ? 'portfolio' : 'portfolioOutline'}><a href={href} aria-label={`${name}${href === '#' ? ', link ainda não configurado' : ''}`} onClick={e => { if (href === '#') { e.preventDefault(); setContactNotice(`O contato por ${name} será disponibilizado em breve.`); } }}><Icon />{name}<ArrowUpRight /></a></Button>; })}</div><p className="mt-5 min-h-5 font-mono text-xs text-muted-foreground" role="status">{contactNotice}</p></Section>
    </main>
    <footer className="page-width flex flex-wrap items-center justify-between gap-5 py-8 font-mono text-[10px] text-muted-foreground"><p>© 2026 Reginaldo Silva · feito com IA e café</p><a href="#top" className="flex items-center gap-3 hover:text-primary">voltar ao topo <ArrowUp size={14} /></a></footer>
  </>;
}