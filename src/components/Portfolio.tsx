import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, ExternalLink, Sparkles, Cpu, Award, GraduationCap, Briefcase, Hand } from "lucide-react";
import { CustomCursor } from "./CustomCursor";
import { Navbar } from "./Navbar";
import { TiltCard } from "./TiltCard";
import { Reveal } from "./Reveal";
import resumeAsset from "@/assets/resume.pdf.asset.json";


const HeroCanvas = lazy(() => import("./three/HeroCanvas").then((m) => ({ default: m.HeroCanvas })));
const TechCube = lazy(() => import("./three/TechCube").then((m) => ({ default: m.TechCube })));

const SKILLS = [
  "Python", "React.js", "Flask", "Node.js", "Docker", "Kubernetes",
  "AWS Bedrock", "CrewAI", "LangChain", "Groq API", "LLaMA 3",
  "Gemini AI", "Whisper", "Qdrant", "PostgreSQL", "Supabase",
  "Scikit-learn", "Sentence Transformers", "Slack API", "RabbitMQ",
];

const FEATURED = [
  {
    name: "CogniLearn",
    star: true,
    hero: true,
    tag: "AI Platform · React · Flask · Gemini · LLaMA · Whisper",
    line: "AI skilling platform that builds your roadmap, grades your GitHub, and coaches you for interviews — in seconds.",
    impact: "Roadmap creation: hours → seconds",
    badgeColor: "cyan",
    features: ["Personalized roadmaps", "GitHub profile analysis", "AI mock interviews (Whisper voice)", "ATS resume analysis", "LLM-graded responses", "Progress dashboard"],
    href: "https://github.com/Shreyash021104",
  },
  {
    name: "Autonomous SRE Agent",
    star: true,
    unique: true,
    tag: "AI Agent · Python · Claude SDK · Slack · RabbitMQ · LLM",
    line: "Agentic system that monitors Slack incidents, diagnoses RabbitMQ failures, and generates remediation plans — autonomously.",
    impact: "Built at Intangles Lab",
    badgeColor: "violet",
    features: ["Orchestrator + specialist multi-agent", "Root cause analysis", "Incident summarisation", "Autonomous workflows"],
    href: "https://github.com/Shreyash021104",
  },
  {
    name: "AI Market Research Analyzer",
    star: true,
    tag: "AI · Python · Groq · LLaMA 3 70B · Jina DeepSearch",
    line: "Turns a company name into a full market research report — SWOT, competitors, trends, investment signals — in 3 minutes.",
    impact: "95% faster than manual",
    badgeColor: "cyan",
    features: ["Automated competitor analysis", "SWOT generation", "Multi-format export (PDF/DOCX/PPTX)", "LLM business recommendations"],
    href: "https://github.com/Shreyash021104",
  },
  {
    name: "MediGuide",
    tag: "ML · Python · Flask · Scikit-learn · SVC",
    line: "Predicts diseases from symptoms and prescribes medicine, diet, and workout plans using a trained Support Vector Classifier.",
    impact: "Springer LNNS Publication",
    badgeColor: "violet",
    features: ["SVC disease prediction", "Medication + diet + workout recs", "5 curated medical datasets", "Responsive health dashboard"],
    href: "https://github.com/Shreyash021104",
  },
];

const OTHER = [
  { name: "Fashion AI Recommendation", tags: ["Python", "Qdrant", "Sentence Transformers", "Vector DB"], line: "Semantic fashion search using vector embeddings + Qdrant." },
  { name: "FitCheck.ai", tags: ["React", "Supabase", "PostgreSQL", "Auth"], line: "Digital wardrobe manager with outfit recommendations and marketplace integration." },
  { name: "Movie Recommendation System", tags: ["Python", "Streamlit", "Flask", "Scikit-learn", "NLP"], line: "Content-based movie recommender using cosine similarity." },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Runner-Up — INSPIRON 4.0 National Hackathon", sub: "College of Engineering, Pune (COEP)", color: "cyan" },
  { icon: "📄", title: "Research Paper — Springer Nature (LNNS)", sub: "Scopus-indexed · ML Approaches for Symptom-Based Syndrome Analysis Using SVC", color: "violet" },
  { icon: "🎓", title: "Campus Ambassador — IIT Kharagpur", sub: "National student outreach program", color: "cyan" },
  { icon: "🎓", title: "Campus Ambassador — VNIT Nagpur", sub: "National student outreach program", color: "violet" },
];

const TIMELINE = [
  { when: "Current · Pune", role: "Backend Developer Intern", org: "Intangles Lab", desc: "Building autonomous SRE agents and AI-powered infrastructure tools.", icon: Briefcase, color: "cyan" },
  { when: "Previous", role: "Intern", org: "Performena", desc: "Earlier industry exposure in tech product development.", icon: Briefcase, color: "violet" },
  { when: "2022–2026", role: "B.E. Electronics & Telecommunication", org: "PICT Pune", desc: "Final-year ECE. Hackathon finalist, published researcher.", icon: GraduationCap, color: "cyan" },
];

export function Portfolio() {
  const [waving, setWaving] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      if (!contact) return;
      const rect = contact.getBoundingClientRect();
      setWaving(rect.top < window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-deep text-foreground">
      <CustomCursor />
      <Navbar />

      {/* Ambient glow blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/3 h-[40rem] w-[40rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,245,255,0.18), transparent 60%)" }} />
        <div className="absolute top-1/2 -right-40 h-[40rem] w-[40rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(123,94,248,0.22), transparent 60%)" }} />
        <div className="absolute inset-0 scanlines opacity-40" />
      </div>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen overflow-hidden">
        {/* Perspective grid floor */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] [mask-image:linear-gradient(to_top,black,transparent)]">
          <div className="grid-floor absolute inset-0" style={{ transform: "perspective(600px) rotateX(60deg) scale(2)", transformOrigin: "50% 100%" }} />
        </div>

        <div className="absolute inset-0">
          <Suspense fallback={<div className="grid h-full place-items-center text-xs text-cyan/60">Loading 3D…</div>}>
            <HeroCanvas wave={false} />
          </Suspense>
        </div>

        <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-end px-6 pb-28 text-center sm:justify-center sm:pb-0">
          <div className="pointer-events-auto">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan" style={{ background: "#00F5FF" }} />
                <span className="h-2 w-2 rounded-full" style={{ background: "#00F5FF" }} />
              </span>
              Open to SDE / AI Engineer roles — June 2026
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
              Hey, I'm <span className="text-grad text-glow-cyan">Shreyash</span>{" "}
              <span className="inline-block animate-floaty">👋</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              I build <span className="text-cyan">AI Agents</span>, <span className="text-cyan">Backend Systems</span> &{" "}
              <span className="text-violet">Intelligent Platforms</span>.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#projects"
                className="group inline-flex items-center gap-2 rounded-full grad-cyan-violet px-6 py-3 font-display text-sm font-semibold text-deep glow-cyan transition-transform hover:scale-105">
                View Projects
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a href={resumeAsset.url} target="_blank" rel="noreferrer" download="ShreyashPatange_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-display text-sm font-semibold text-cyan transition-colors hover:bg-white/5">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-floaty text-cyan/60">
          <ArrowDown className="h-5 w-5" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-cyan">// About</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Infrastructure meets intelligence — in three dimensions.
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-[420px] glass rounded-3xl">
              <Suspense fallback={null}>
                <TechCube />
              </Suspense>
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-muted-foreground">
                Stack · rotating
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Final-year <span className="text-foreground">ECE student at PICT Pune</span> building
                production-grade AI agents and backend infrastructure. Currently at{" "}
                <span className="text-cyan">Intangles Lab</span> where I ship autonomous systems that
                save hours of manual SRE work. Published researcher. Hackathon finalist.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {SKILLS.map((s, i) => (
                  <span key={s}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
                    style={{
                      boxShadow: i % 3 === 0 ? "0 0 12px rgba(0,245,255,0.08)" : i % 3 === 1 ? "0 0 12px rgba(123,94,248,0.08)" : undefined,
                    }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="relative mx-auto max-w-7xl px-6 py-32">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-violet">// Featured Work</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Things I've <span className="text-grad">shipped</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {FEATURED.map((p, i) => {
            const isCyan = p.badgeColor === "cyan";
            return (
              <Reveal key={p.name} delay={i * 0.08} className={p.hero ? "md:col-span-2" : ""}>
                <TiltCard glowColor={isCyan ? "0, 245, 255" : "123, 94, 248"}>
                  <div className={`relative overflow-hidden rounded-2xl glass-strong p-7 sm:p-9 ${p.hero ? "min-h-[360px]" : "min-h-[320px]"}`}
                    style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(${isCyan ? "0,245,255" : "123,94,248"},0.08)` }}>
                    {/* badges */}
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                      {p.star && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-cyan/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan">
                          <Sparkles className="h-3 w-3" /> Featured
                        </span>
                      )}
                      {p.unique && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet">
                          <Cpu className="h-3 w-3" /> Most Unique
                        </span>
                      )}
                      <span className={`ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${isCyan ? "bg-cyan/10 text-cyan" : "bg-violet/10 text-violet"}`}>
                        {p.impact}
                      </span>
                    </div>

                    <h3 className={`font-display font-bold leading-tight ${p.hero ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>
                      {p.name}
                    </h3>
                    <p className={`mt-2 text-xs uppercase tracking-wider ${isCyan ? "text-cyan/80" : "text-violet/80"}`}>
                      {p.tag}
                    </p>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{p.line}</p>

                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${isCyan ? "bg-cyan glow-cyan-sm" : "bg-violet glow-violet"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a href={p.href} target="_blank" rel="noreferrer"
                      className="absolute bottom-6 right-6 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-cyan transition-colors hover:bg-white/5">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* OTHER PROJECTS */}
        <Reveal className="mt-24">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">// More Projects</p>
          <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Side experiments & studies</h3>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {OTHER.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.08}>
              <TiltCard intensity={8}>
                <div className="rounded-2xl glass p-6 transition-colors hover:border-cyan/30">
                  <h4 className="font-display text-lg font-semibold">{o.name}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{o.line}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {o.tags.map((t) => (
                      <span key={t} className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="relative mx-auto max-w-7xl px-6 py-32">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-cyan">// Recognition</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Achievements & Publications</h2>
        </Reveal>

        <div className="relative mt-14">
          {/* connector */}
          <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,245,255,0.4), rgba(123,94,248,0.4), transparent)" }} />
          <div className="grid gap-6 md:grid-cols-2">
            {ACHIEVEMENTS.map((a, i) => {
              const isCyan = a.color === "cyan";
              return (
                <Reveal key={a.title} delay={i * 0.1}>
                  <TiltCard intensity={6} glowColor={isCyan ? "0, 245, 255" : "123, 94, 248"}>
                    <div className="flex items-start gap-4 rounded-2xl glass p-6">
                      <div className={`grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl text-2xl ${isCyan ? "bg-cyan/10 glow-cyan-sm" : "bg-violet/10 glow-violet"}`}>
                        {a.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Award className={`h-4 w-4 ${isCyan ? "text-cyan" : "text-violet"}`} />
                          <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{a.sub}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative mx-auto max-w-7xl px-6 py-32">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-violet">// Experience</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">The road so far</h2>
        </Reveal>

        <div className="relative mt-16">
          <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-px md:block"
            style={{ background: "linear-gradient(to right, transparent, #00F5FF, #7B5EF8, transparent)" }} />
          <div className="grid gap-6 md:grid-cols-3">
            {TIMELINE.map((t, i) => {
              const Icon = t.icon;
              const isCyan = t.color === "cyan";
              return (
                <Reveal key={t.role} delay={i * 0.12}>
                  <div className="relative">
                    <div className={`relative z-10 mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full glass-strong ${isCyan ? "glow-cyan" : "glow-violet"}`}>
                      <Icon className={`h-6 w-6 ${isCyan ? "text-cyan" : "text-violet"}`} />
                    </div>
                    <div className="rounded-2xl glass p-6 text-center">
                      <p className={`text-[10px] uppercase tracking-widest ${isCyan ? "text-cyan" : "text-violet"}`}>{t.when}</p>
                      <h3 className="mt-2 font-display text-lg font-semibold">{t.role}</h3>
                      <p className="text-sm text-foreground/80">{t.org}</p>
                      <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative mx-auto max-w-5xl px-6 py-32">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-16">
          {/* corner avatar */}
          <div className="pointer-events-none absolute -right-4 -top-4 h-44 w-44 sm:h-56 sm:w-56">
            <Suspense fallback={null}>
              <HeroCanvas wave={waving} />
            </Suspense>
          </div>

          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-cyan">// Contact</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
              Let's build something <span className="text-grad">intelligent</span>.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Open to full-time <span className="text-cyan">SDE / AI Engineer</span> roles — June 2026. I reply within 24 hours.
            </p>
          </Reveal>

          {/* 3D envelope */}
          <div className="mt-10 flex justify-center">
            <a href="mailto:shreyashpatange@gmail.com"
              className="group relative block h-32 w-56 [perspective:800px]">
              <div className="absolute inset-0 rounded-md border border-cyan/40 bg-deep glow-cyan transition-transform duration-500"
                style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 origin-top rounded-md border-b border-cyan/40 grad-cyan-violet opacity-90 transition-transform duration-500 group-hover:[transform:rotateX(-150deg)]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 60%)" }} />
                <div className="absolute inset-x-0 bottom-0 grid place-items-center pb-4">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-cyan opacity-0 transition-opacity delay-200 duration-300 group-hover:opacity-100">
                    <Mail className="h-4 w-4" /> Open mail
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="https://github.com/Shreyash021104" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm transition-colors hover:text-cyan">
              <Github className="h-4 w-4" /> Shreyash021104 <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a href="https://www.linkedin.com/in/shreyash-patange-674111252/" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm transition-colors hover:text-cyan">
              <Linkedin className="h-4 w-4" /> LinkedIn <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a href="mailto:shreyashpatange@gmail.com"
              className="inline-flex items-center gap-2 rounded-full grad-cyan-violet px-5 py-3 text-sm font-semibold text-deep glow-cyan">
              <Mail className="h-4 w-4" /> Email me
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Hand className="h-3.5 w-3.5 text-cyan" /> Thanks for scrolling. — Shreyash
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© 2026 Shreyash Patange · Built with React Three Fiber</span>
          <span>PICT Pune · ECE '26</span>
        </footer>
      </section>
    </div>
  );
}
