import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo, type ReactNode } from "react";
import {
  Shield,
  ScanSearch,
  Database,
  Network,
  Activity,
  Package,
  ArrowUp,
  ArrowUpRight,
  ArrowDown,
  Terminal,
  Menu,
  X,
  MapPin,
  Puzzle,
  Bot,
  ChartNoAxesCombined,
  Server,
  Globe,
  Check,
  BriefcaseBusiness,
  GraduationCap,
  Play,
  Clapperboard,
  ScanLine,
  Building2,
  MessageCircle,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Music2,
  Headset,
  Webhook,
  Workflow,
  PanelsTopLeft,
  Braces,
  Search,
  Copy,
  CheckCheck,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  security,
  securitySection,
  heroStack,
  projectLabels,
  projectStatus,
  shareImage,
  type Project,
  navigation,
  sectionId,
  roles,
  categories,
  filterProjects,
  projects,
  stack,
  metrics,
  workflow,
  channels,
  services,
  contactLinks,
  type Category,
} from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reginaldo Silva — Portfólio" },
      {
        name: "description",
        content:
          "Suporte de TI, extensões de Chrome, automações e infraestrutura. Conheça os projetos de Reginaldo Silva, em Santa Catarina.",
      },
      { property: "og:title", content: "Reginaldo Silva — Portfólio" },
      {
        property: "og:description",
        content:
          "Transformo problemas reais em ferramentas que funcionam. Extensões, automações, painéis, bots e sites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: shareImage },
      { name: "twitter:image", content: shareImage },
    ],
  }),
  component: Portfolio,
});

const categoryIcons = {
  Extensões: Puzzle,
  Finanças: ChartNoAxesCombined,
  Automação: Workflow,
  Infra: Server,
  Web: Globe,
  Segurança: Shield,
};
const contactIcons = {
  WhatsApp: MessageCircle,
  "E-mail": Mail,
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram,
  TikTok: Music2,
};

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="page-width reveal pending">
        <p className="section-prompt">
          ~/{id} <span className="text-muted-foreground">$</span>
        </p>
        <h2 className="section-heading">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

function Portfolio() {
  const headerRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [typed, setTyped] = useState(roles[0] ?? "Suporte de TI");
  const [active, setActive] = useState("");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [contactNotice, setContactNotice] = useState("");
  const [activeCommand, setActiveCommand] = useState<string>("vulnscan --defensive");

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target))
        setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let role = 0;
    let text = (roles[0] ?? "Suporte de TI").length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const target = roles[role] ?? roles[0] ?? "Suporte de TI";
      if (deleting) {
        text--;
        setTyped(target.slice(0, text));
        if (text === 0) {
          deleting = false;
          role = (role + 1) % roles.length;
        }
      } else {
        text++;
        setTyped(target.slice(0, text));
        if (text === target.length) {
          deleting = true;
          timer = setTimeout(tick, 2100);
          return;
        }
      }
      timer = setTimeout(tick, deleting ? 45 : 85);
    };
    timer = setTimeout(tick, 2300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("pending");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const navObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((el) => navObserver.observe(el));
    return () => {
      observer.disconnect();
      navObserver.disconnect();
    };
  }, []);

  const visibleProjects = useMemo(() => {
    const catFiltered = filterProjects(category);
    if (!searchQuery.trim()) return catFiltered;
    const q = searchQuery.toLowerCase();
    return catFiltered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [category, searchQuery]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const terminalOutputs: Record<string, { lines: string[]; result: string }> = {
    "vulnscan --defensive": {
      lines: securitySection.lines,
      result: securitySection.result,
    },
    "check-rls --supabase": {
      lines: [
        "[ok] Supabase JWT auth verification: ACTIVE",
        "[ok] RLS policies enforced on all user tables",
        "[info] Realtime channel broadcast sanitized",
      ],
      result: "RLS & Supabase audit complete · 100% compliant",
    },
    "net-audit --cloudflare": {
      lines: [
        "[ok] Cloudflare Tunnel: zero open inbound ports",
        "[ok] SSL/TLS Strict encryption mode active",
        "[ok] DNSSEC verified on primary domain",
      ],
      result: "Cloudflare proxy active · zero port exposure",
    },
  };

  const currentTerminalOutput = terminalOutputs[activeCommand] ?? terminalOutputs["vulnscan --defensive"];

  return (
    <>
      <header ref={headerRef} className="site-header sticky top-0 z-50 border-b border-border">
        <div className="page-width flex h-full items-center justify-between">
          <a
            href="#top"
            aria-label="Reginaldo Silva, início"
            className="flex items-center gap-2.5 font-mono text-sm font-semibold"
          >
            <Terminal size={20} className="text-primary" />
            reginaldo<span className="text-primary">.dev</span>
            <span className="text-muted-foreground">_</span>
          </a>
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-4 xl:gap-7 lg:flex"
          >
            {navigation.map((n) => (
              <a
                key={n}
                href={`#${sectionId(n)}`}
                className={`nav-link ${active === sectionId(n) ? "active" : ""}`}
              >
                {n}
              </a>
            ))}
            <span className="ml-3 border-l border-border pl-5 font-mono text-[10px] text-muted-foreground">
              <span className="status-dot" />
              construindo
            </span>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Navegação móvel"
            className="absolute top-full flex w-full flex-col gap-1 border-b border-border bg-background px-5 py-4 lg:hidden"
          >
            {navigation.map((n) => (
              <a
                key={n}
                href={`#${sectionId(n)}`}
                className="nav-link py-3"
                onClick={() => setMenuOpen(false)}
              >
                {n}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="page-width">
            <div className="hero-grid">
              <div>
                <p className="mb-5 font-mono text-sm text-primary">&gt; olá, eu sou</p>
                <h1 className="hero-name">
                  Reginaldo
                  <span>
                    Silva<span className="inline! text-primary">.</span>
                  </span>
                </h1>
                <div className="hero-role mt-6" aria-label={roles.join(", ")}>
                  <span aria-hidden="true">
                    {typed}
                    <span className="cursor" />
                  </span>
                </div>
                <p className="body-copy mt-5 max-w-lg">
                  Transformo problemas reais em ferramentas que funcionam: extensões, automações,
                  painéis, bots e sites. Prototipo rápido com IA e rodo tudo na minha própria
                  infraestrutura.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="portfolio">
                    <a href="#projetos">
                      Ver projetos <ArrowUpRight />
                    </a>
                  </Button>
                  <Button asChild variant="portfolioOutline">
                    <a href="#contato">
                      <MessageCircle /> Falar comigo
                    </a>
                  </Button>
                </div>
              </div>
              <div className="terminal" aria-label="Resumo em terminal">
                <div className="terminal-bar">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                  <span className="mx-auto font-mono text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <Terminal size={12} className="text-primary" /> reginaldo@vps-prod: ~
                  </span>
                </div>
                <div className="terminal-body">
                  <p className="terminal-command">
                    <span className="text-primary">$</span> whoami
                  </p>
                  <p className="terminal-output">
                    suporte de TI · dev de ferramentas
                    <br />
                    infra · automação · segurança
                  </p>
                  <p className="terminal-command">
                    <span className="text-primary">$</span> stack --top
                  </p>
                  <p className="terminal-output">{heroStack}</p>
                  <p className="terminal-command">
                    <span className="text-primary">$</span> status
                  </p>
                  <p className="text-primary font-mono text-xs flex items-center gap-1">
                    <Sparkles size={13} className="animate-spin" /> construindo algo novo
                    <span className="cursor" />
                  </p>
                  <div className="terminal-bottom">
                    <span className="flex items-center">
                      <span className="status-dot" />
                      sistemas online
                    </span>
                    <span>uptime 24/7 (Docker/VPS)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-foot">
              <span className="flex items-center gap-2">
                <MapPin size={13} /> Santa Catarina, Brasil
              </span>
              <a href="#sobre" className="flex items-center gap-3 hover:text-primary">
                <span className="hidden sm:inline">um pouco sobre mim</span>
                <ArrowDown size={15} />
              </a>
            </div>
          </div>
        </section>

        <Section id="sobre" title="Entre o código e o mundo real.">
          <div className="about-grid">
            <div className="body-copy">
              <p>
                Trabalho com TI no dia a dia, dando suporte técnico a unidades franqueadas (PDV,
                balanças, VTEX). Resolvo problemas reais construindo as ferramentas necessárias.
              </p>
              <p className="mt-4">
                Prototipo com IA (Claude, Claude Code, Lovable, Gemini) e coloco em produção em
                servidor próprio (Linux Ubuntu, Debian e Fedora, VPS, Docker, SSH), publicando com
                domínio, DNS e Cloudflare Tunnel, e itero até funcionar de verdade. Cursando Análise
                e Desenvolvimento de Sistemas.
              </p>
              <blockquote className="mt-6 flex gap-3 font-display text-lg text-foreground">
                <span className="font-mono text-primary">“</span>Soluções simples, que funcionam de
                verdade e que eu mesmo uso.
              </blockquote>
            </div>
            <div className="metric-grid">
              {metrics.map((m) => (
                <div key={m.label} className="metric">
                  <p className="metric-value">
                    {m.value}
                    <span className="text-primary/40">.</span>
                  </p>
                  <p className="metric-label">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <h3 className="mb-6 font-mono text-xs text-muted-foreground">
              // experiência & formação
            </h3>
            <div className="grid gap-7 md:grid-cols-[1.5fr_1fr]">
              <div className="flex gap-4">
                <BriefcaseBusiness size={18} className="mt-1 shrink-0 text-primary" />
                <div>
                  <h4 className="font-display text-lg">
                    Suporte de TI{" "}
                    <span className="ml-2 font-mono text-[10px] text-primary">ATUAL</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">Franqueadora · Fitland</p>
                  <p className="body-copy mt-3 text-xs!">
                    Instalação, configuração e suporte de PDV e balanças; atendimento técnico aos
                    franqueados; suporte à VTEX; administração do site WordPress de uma franquia
                    (Hostinger); diagnóstico de falhas e orientação aos usuários.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <GraduationCap size={20} className="mt-1 shrink-0 text-primary" />
                <div>
                  <h4 className="font-display text-lg">Análise e Desenvolvimento de Sistemas</h4>
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                    Formação · em andamento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="projetos"
          title="Ferramentas que saíram do papel."
          subtitle="Problemas reais. Código em produção. Uma ideia de cada vez."
        >
          <div className="my-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Filtrar projetos">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((c) => (
                <Button
                  key={c}
                  variant="filter"
                  data-active={category === c}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar projetos ou tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 font-mono text-xs bg-card border-border"
              />
            </div>
          </div>
          <div className="mb-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span>
              Exibindo <strong className="text-primary">{visibleProjects.length}</strong> de {projects.length} projetos
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-primary hover:underline"
              >
                Limpar busca
              </button>
            )}
          </div>
          <div className="project-grid">
            {visibleProjects.map((p) => {
              const Icon = categoryIcons[p.category];
              const status = projectStatus(p);
              const details = p.featured && p.problem;
              return (
                <article
                  key={p.title}
                  className={`project-card ${p.featured ? "featured" : ""} ${details ? "has-details" : ""}`}
                >
                  {details && (
                    <Button
                      variant="ghost"
                      className="project-detail-trigger"
                      aria-label={`Detalhes de ${p.title}`}
                      onClick={() => setSelectedProject(p)}
                    >
                      <span className="sr-only">{p.title}</span>
                    </Button>
                  )}
                  <div className="project-art">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="project-image" loading="lazy" />
                    ) : (
                      <div className="project-symbol">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                    )}
                    <span className="project-number">
                      /{String(projects.indexOf(p) + 1).padStart(2, "0")}
                    </span>
                    {p.featured && (
                      <span className="absolute right-4 top-4 font-mono text-[9px] text-primary">
                        EM DESTAQUE <ArrowUpRight size={10} className="inline" />
                      </span>
                    )}
                  </div>
                  <div className="project-info">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-[10px] uppercase text-primary">{p.category}</p>
                      <span
                        className={`project-status ${status === "no ar" ? "text-primary" : status === "em desenvolvimento" ? "text-warning" : "text-muted-foreground"}`}
                      >
                        {status}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-medium">{p.title}</h3>
                    <p className="mt-3 min-h-20 text-xs leading-6 text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.link && (
                      <Button asChild variant="portfolioOutline" className="relative z-10 mt-5">
                        <a href={p.link} target="_blank" rel="noopener noreferrer">
                          {projectLabels.view}
                          <ArrowUpRight />
                        </a>
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section
          id="stack"
          title="Meu kit de ferramentas."
          subtitle="A tecnologia certa é a que resolve o problema."
        >
          <div className="stack-grid">
            {stack.map((s, i) => (
              <div className="stack-block" key={s.title}>
                <h3 className="mb-4 flex items-center gap-3 font-display text-base">
                  <span className="font-mono text-[10px] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 border-t border-border pt-8">
            <h3 className="font-display text-xl">Como eu trabalho</h3>
            <div className="mt-6 grid grid-cols-2 gap-7 md:grid-cols-4">
              {workflow.map((w, i) => (
                <div key={w}>
                  <span className="font-mono text-2xl text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="seguranca" title={securitySection.title} subtitle={securitySection.subtitle}>
          <div className="security-grid">
            <div
              className="terminal security-terminal"
              aria-label="Varredura de segurança interativa"
            >
              <div className="terminal-bar">
                <Shield size={16} className="text-primary" />
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                  {securitySection.terminalTitle}
                </span>
              </div>
              <div className="terminal-body">
                <div className="mb-5 flex flex-wrap gap-2 border-b border-border pb-4">
                  <span className="text-[10px] font-mono text-muted-foreground w-full">EXEOUTAR COMANDO:</span>
                  {Object.keys(terminalOutputs).map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => setActiveCommand(cmd)}
                      className={`font-mono text-[11px] px-2.5 py-1 rounded border transition-colors ${
                        activeCommand === cmd
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      $ {cmd.split(" ")[0]}
                    </button>
                  ))}
                </div>
                <p className="terminal-command mb-4">
                  <span className="text-primary">$</span> {activeCommand}
                </p>
                <div className="space-y-3 min-h-24">
                  {currentTerminalOutput.lines.map((line) => (
                    <p
                      key={line}
                      className={line.startsWith("[!]") ? "text-warning font-mono text-xs" : "text-muted-foreground font-mono text-xs"}
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <p className="mt-6 border-t border-border pt-4 text-primary font-mono text-xs">
                  {currentTerminalOutput.result}
                  <span className="cursor" />
                </p>
              </div>
            </div>
            <div className="security-items">
              {security.map((item, i) => {
                const Icon =
                  [Shield, ScanSearch, Database, Network, Activity, Package, Puzzle][i] ?? Shield;
                return (
                  <article className="security-item" key={item.title}>
                    <Icon size={21} strokeWidth={1.5} className="mt-1 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-display text-base">{item.title}</h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span className="tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <p className="mt-7 font-mono text-[10px] leading-6 text-muted-foreground">
            {securitySection.notice}
          </p>
        </Section>

        <Section
          id="conteudo"
          title="Ideias em outros formatos."
          subtitle="Código não é a única forma de criar."
        >
          <div className="channel-grid">
            {channels.map((c, i) => {
              const Icon = [ScanLine, Globe, Clapperboard, Building2][i] ?? ScanLine;
              return (
                <article key={c.title} className="channel">
                  <span className="font-mono text-[9px] text-muted-foreground">{c.label}</span>
                  <div className="channel-visual">
                    <Icon size={52} strokeWidth={1} />
                  </div>
                  <div>
                    <Play size={14} className="mb-4 text-primary" />
                    <h3 className="font-display text-2xl leading-tight">{c.title}</h3>
                    <p className="mt-3 text-xs leading-5 text-muted-foreground">{c.subtitle}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-7 font-mono text-xs leading-6 text-muted-foreground">
            Também crio roteiros, prompts de imagem, materiais de divulgação para pequenos negócios.
          </p>
        </Section>

        <Section id="posso-ajudar" title="Posso ajudar com">
          <div className="mt-8 grid gap-x-16 md:grid-cols-2">
            {services.map((s, i) => {
              const Icon =
                [Headset, Bot, Webhook, Puzzle, PanelsTopLeft, Braces, Server, Globe, Shield][i] ??
                Headset;
              return (
                <div key={s} className="flex items-center gap-4 border-b border-border py-5">
                  <Icon size={20} className="shrink-0 text-primary" />
                  <p className="text-sm">{s}</p>
                  <Check size={14} className="ml-auto shrink-0 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </Section>

        <Section
          id="contato"
          title="Vamos construir algo?"
          subtitle="Um problema pra resolver, uma ideia pra tirar do papel. Vamos conversar."
        >
          <div className="mt-9 flex flex-wrap gap-3">
            {Object.entries(contactLinks).map(([name, href]) => {
              const Icon = contactIcons[name as keyof typeof contactIcons];
              return (
                <Button
                  key={name}
                  asChild
                  variant={name === "WhatsApp" ? "portfolio" : "portfolioOutline"}
                >
                  <a
                    href={href}
                    aria-label={`${name}${href === "#" ? ", link ainda não configurado" : ""}`}
                    onClick={(e) => {
                      if (href === "#") {
                        e.preventDefault();
                        if (name === "E-mail") {
                          copyToClipboard("contato@reginaldo.dev", "E-mail");
                          setContactNotice("E-mail fictício copiado para a área de transferência.");
                        } else {
                          setContactNotice(`O contato por ${name} será disponibilizado em breve.`);
                        }
                      }
                    }}
                  >
                    <Icon />
                    {name}
                    {href === "#" && name === "E-mail" ? <Copy size={13} className="ml-1" /> : <ArrowUpRight />}
                  </a>
                </Button>
              );
            })}
          </div>
          <p className="mt-5 min-h-5 font-mono text-xs text-muted-foreground flex items-center gap-2" role="status">
            {copiedLink && <CheckCheck size={14} className="text-primary" />}
            {contactNotice}
          </p>
        </Section>
      </main>
      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent className="project-dialog">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="pr-6 font-display text-2xl">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {[
                  [projectLabels.problem, selectedProject.problem],
                  [projectLabels.solution, selectedProject.solution],
                ].map(([label, text]) => (
                  <div key={label}>
                    <h4 className="mb-2 font-mono text-xs text-primary">{label}</h4>
                    <p className="text-sm leading-7 text-muted-foreground">{text}</p>
                  </div>
                ))}
                <div>
                  <h4 className="mb-3 font-mono text-xs text-primary">
                    {projectLabels.howItWorks}
                  </h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                    {selectedProject.howItWorks?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-mono text-xs text-primary">{projectLabels.stack}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <footer className="page-width flex flex-wrap items-center justify-between gap-5 py-8 font-mono text-[10px] text-muted-foreground">
        <p>© 2026 Reginaldo Silva · feito com IA e café</p>
        <a href="#top" className="flex items-center gap-3 hover:text-primary">
          voltar ao topo <ArrowUp size={14} />
        </a>
      </footer>
    </>
  );
}
