export const personal = {
  name: "Muhammad Ammar Khan",
  handle: "TheMR-777",
  role: "Software Architect & Security Engineer",
  currentTitle: "Software Engineer & AI Solutions Architect",
  company: "ACE Money Transfer",
  location: "Jhelum, Pakistan · Remote",
  email: "m.shahzad.ms72@gmail.com",
  profileImage: "https://i.ibb.co/2Y8YWR1X/freepik-br-2a5d6513-6583-40a5-8ab6-1a77d56608c6.png",
  taglines: [
    "Creating what hasn't been built before.",
    "Software architect & security engineer.",
    "Agentic engineer & AI orchestrator.",
  ],
  about:
    "I blend low-level mastery ([hi]C++[/hi], cryptography) with high-level architecture ([hi].NET[/hi], polyglot systems, AI orchestration) to build things that didn't exist yet — enterprise platforms, security infrastructure, and small open-source tools that [ac]transform[/ac] rather than merely remember.",
  social: {
    github: "https://github.com/TheMR-777",
    linkedin: "https://www.linkedin.com/in/777-ammar",
    website: "https://TheMR-777.github.io/",
    nullbyte: "https://creator.wonderhowto.com/h4ck3r_777/",
  },
  stats: [
    { value: "6+", label: "years building" },
    { value: "20+", label: "projects & explorations" },
    { value: "0", label: "defects at EMS launch" },
    { value: "5", label: "international offers" },
  ],
};

export type Project = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  description: string;
  tech: string[];
  impact?: string[];
  link?: string;
  repo?: string;
  flagship?: boolean;
  personal?: boolean;
};

/**
 * Order matters. The first seven entries are the flagship grid, where index 0
 * and index 6 render wide; the remainder fill the quiet list and craft grid.
 */
export const projects: Project[] = [
  {
    id: "ems",
    title: "Employee Monitoring Suite",
    kind: "Flagship · Solo · 1 year",
    summary: "Privacy-conscious, company-wide monitoring with a real-time Blazor dashboard.",
    description:
      "A year of solo design and engineering — the longest I've given any single system. It [em]solidified my approach to architecture[/em]: not memorizing patterns, but understanding what each one solves and where it falls short, so the architecture could be [hi]minimal, extendable, and predictable[/hi].",
    tech: [".NET", "Blazor", "GraphQL", "ApexCharts", "Micro-ORM"],
    impact: [
      "Zero defects at launch",
      "200% measured productivity lift",
      "35% fewer unauthorized breaks",
      "Adopted as the company standard",
    ],
    flagship: true,
  },
  {
    id: "erp-core",
    title: "ERP Platform Core",
    kind: "Platform · Multi-tenant",
    summary: "A SaaS backbone: Approvals, Rules, Rights and Notifications as reusable engines.",
    description:
      "Fragmented internal tools became one multi-tenant platform. Instead of one-off module logic, I built [hi]generic engines[/hi] every business module plugs into — a JSON form engine, a rights-aware command palette, audit trails, document storage.",
    tech: [".NET 9", "Angular", "SignalR", "PostgreSQL"],
    impact: ["5+ modules shipped on the backbone", "~90% less time per new module", "Multi-company without code changes"],
    flagship: true,
  },
  {
    id: "vault",
    title: "ACE Password Vault",
    kind: "Security · Cryptography",
    summary: "Defense-in-depth credential storage for financial secrets.",
    description:
      "C++ inner loops over OpenSSL for raw cryptography; .NET outer layers for secure memory and the interface. Zero-knowledge principles, custom auditing and key rotation — shaped by years as [hi]H4ck3R_777[/hi].",
    tech: ["C++", ".NET", "OpenSSL", "AES-256", "RSA-4096"],
    impact: ["Critical infrastructure", "Zero incidents since deployment", "Set an internal security standard"],
    flagship: true,
  },
  {
    id: "uwb",
    title: "UWB Indoor Positioning Simulation",
    kind: "Simulation · MIMOS Berhad",
    summary: "Plan UWB anchor placement before drilling a single hole.",
    description:
      "A hybrid .NET / Python engine modeling signal propagation with material-specific attenuation. My interest in [ac]physics[/ac] — electromagnetics, computational geometry — made it a natural fit.",
    tech: ["C# 13", ".NET 9", "NumPy", "SciPy", "WPF"],
    impact: ["~60% lower deployment cost", "Within 5% of physical tests", "Months → days"],
    flagship: true,
  },
  {
    id: "overwatch",
    title: "Overwatch",
    kind: "Flagship · Monitoring & Access",
    summary: "Partner monitoring rebuilt as a configurable platform — rules, rights, and evidence.",
    description:
      "The legacy status checker needed a code change for every new partner. Overwatch replaces that with dynamic onboarding: encrypted header storage, custom request and response shapes, and a [hi]logical expression engine[/hi] that validates JSON or XML with AND/OR blocks. A module-agnostic rights system controls access down to individual buttons, and the dashboard keeps audit evidence down to the HTTP response.",
    tech: [".NET 10", "Blazor", "Fluent UI 2", "JSON/XML parsing"],
    impact: [
      "Partner onboarding without code changes",
      "Rules engine for complex response verification",
      "Audit evidence down to the response payload",
    ],
    flagship: true,
  },
  {
    id: "apple-mdm",
    title: "Apple MDM Platform",
    kind: "Infrastructure · In development",
    summary: "A .NET 10 control plane commanding open-source MDM services for a 1,000+ device fleet.",
    description:
      "Began inside the Employee Monitoring Suite as a need for deeper, OS-level device control, then became its own platform after months inside Apple's MDM ecosystem — enrollment flows, certificates, subscriptions, compliance. A .NET 10 orchestrator now composes [hi]nanoMDM, microMDM, and SCEP[/hi] into one control plane, with a React interface in a shadcn-inspired language. Rollout is targeted for 2027, gated by testing, verification, and audits.",
    tech: [".NET 10", "React", "nanoMDM", "microMDM", "SCEP"],
    impact: [
      "Rollout targeted across 1,000+ devices",
      "One control plane over three MDM services",
      "Initiative spanning CEO, CTO, accounting and monitoring teams",
    ],
    flagship: true,
  },
  {
    id: "reporting",
    title: "Unified Reporting Engine",
    kind: "Microservice · Polyglot · AI-augmented",
    summary: "One Python service that replaced years of brittle reporting — now an analytics workspace.",
    description:
      "The idea behind [hi]Intelligent Scaffolding[/hi] was to turn a conversational request into deterministic code: generate it, review it, execute it, then register a reusable module. Reporting brought that idea into practice through Gemini-assisted Python inside an embedded Jupyter runtime.",
    tech: ["Python 3.14", "FastAPI", "Jupyter kernel", "Gemini API", "Graph schemas", "Pytest"],
    impact: [
      "Replaced 5+ separate implementations",
      "3,000+ automated tests, no regressions",
      "Called a “marvel of engineering” by ACE leadership",
    ],
    flagship: true,
  },

  {
    id: "evolver",
    title: "Evolver — Auto-Update Engine",
    kind: "Infrastructure · EMS · 1 month",
    summary: "Chromium-inspired, cross-platform updater with graceful rollback.",
    description:
      "IPC between the app and a dedicated updater, staged rollouts, error-resilient backups and recovery — on both Windows and macOS. A companion app handles on-demand updates; a deployment tool streamlines distribution.",
    tech: [".NET", "C#", "IPC", "AvaloniaUI"],
    impact: ["Zero failed updates", "Deployment friction ≈ 0"],
  },
  {
    id: "jobs",
    title: "Background Jobs Framework",
    kind: "Infrastructure · Core",
    summary: "Job processing that other teams quietly adopted.",
    description:
      "Built for EMS out of necessity; proved solid enough that other teams ported it to fix their own long-standing job issues. Retry policies with exponential backoff, dead-letter handling, graceful shutdown, zero job loss during deploys.",
    tech: [".NET 10", "Channels", "PostgreSQL"],
    impact: ["Adopted by 3+ projects", "Zero job failures since launch"],
  },
  {
    id: "logging",
    title: "Logging Framework",
    kind: "Infrastructure · Observability",
    summary: "Less noise. More context. Logs built for the person investigating them.",
    description:
      "A pluggable .NET framework for readable, structured logs. Configurable verbosity keeps production quiet, while semantic context and source references make an investigation easier to follow. Source generators keep the hot path lean.",
    tech: [".NET", "Source Generators", "Serilog"],
    impact: ["Standardized logging across projects", "Adopted alongside the Background Jobs Framework"],
  },
  {
    id: "realtime",
    title: "Real-time Infrastructure",
    kind: "Infrastructure · SignalR",
    summary: "The live layer under every ERP notification.",
    description:
      "Connection lifecycle, delivery semantics, and scale considerations for real-time features across the platform — applying RPC thinking inside an event-driven system.",
    tech: ["SignalR", ".NET", "WebSockets", "Redis"],
    impact: ["Live notifications across all modules", "Reliable delivery with fallbacks"],
  },
  {
    id: "partner-integrations",
    title: "External Partner Integrations",
    kind: "Integrations · Payments",
    summary: "Mastercard, HBL and PNB, connected with adapters built to survive the real world.",
    description:
      "Bank and card partner integrations with resilient adapters, retries, idempotency, and observability — consuming external services through well-typed clients and SLA-aware timeouts.",
    tech: [".NET", "REST", "SOAP", "OAuth2", "HMAC"],
    impact: ["Implementation quality praised by the Mastercard team", "Complete observability and retry handling"],
  },
  {
    id: "erp-modules",
    title: "ERP Business Modules",
    kind: "Business logic · Full-stack",
    summary: "Five production modules proving the backbone was worth building.",
    description:
      "Project management, budgeting with multi-currency conversion, an Odoo-inspired procurement lifecycle, liquidity and cash positioning, and a forecasting engine using weighted linear regression. Each one leans on the platform core instead of rebuilding it.",
    tech: ["Angular 20", ".NET 9", "PrimeNG", "PostgreSQL"],
    impact: ["5 major modules shipped", "Tight integration proving the architecture"],
  },
  {
    id: "costaz",
    title: "Costaz Desktop",
    kind: "Academic · Capstone · 2023",
    summary: "Offline-first academic records, designed after listening to the people using them.",
    description:
      "Built for University of the Punjab after surveying 10+ professors. Unreliable connectivity made cloud-only tools impractical, so the design went offline-first: Google accounts for decentralized auth, Sheets for familiar data handling, Excel export for reports.",
    tech: ["Flutter", "Google Sheets API", "Firebase"],
    impact: ["50% less manual data entry", "30% better data accuracy", "Adopted by multiple departments"],
  },

  {
    id: "schemaflow",
    title: "SchemaFlow",
    kind: "Dev Tool · Visualization",
    summary: "Paste DDL, drag tables, connect columns — watch the SQL write itself.",
    description:
      "Started as a stakeholder demo for the Reporting Engine; became a standalone visual query builder. Complex [dim]in[/dim], elegant [ac]out[/ac].",
    tech: ["React 19", "React Flow", "Zustand", "Tailwind 4"],
    link: "https://themr-777.github.io/SchemaFlow/",
    repo: "https://github.com/TheMR-777/SchemaFlow",
    personal: true,
  },
  {
    id: "mr-crypt",
    title: "mr_crypt",
    kind: "Open Source · C++23",
    summary: "Range-like syntax for OpenSSL. Cryptography that reads like a pipeline.",
    description:
      "OpenSSL's C API is verbose and easy to misuse. mr_crypt uses [ac]C++23 ranges[/ac] and template metaprogramming for fluent, type-safe operations.",
    tech: ["C++23", "OpenSSL 3", "Metaprogramming"],
    impact: ["~10× less boilerplate", "Actively maintained"],
    link: "https://github.com/TheMR-777/mr_crypt",
    personal: true,
  },
  {
    id: "schema-weaver",
    title: "Schema Weaver",
    kind: "Dev Tool · 3D",
    summary: "Auto-decluttered 3D maps of your database relationships.",
    description:
      "Takes raw SQL schemas, infers relationships from naming and FK patterns, and renders them in [ac]3D[/ac]. Where SchemaFlow builds queries, this one reveals structure.",
    tech: ["Three.js", "SQL parsing"],
    link: "https://themr-777.github.io/schema-weaver/",
    repo: "https://github.com/TheMR-777/schema-weaver",
    personal: true,
  },
  {
    id: "moire",
    title: "Moiré Effect Demo",
    kind: "Physics · Play",
    summary: "A pattern on a van door, turned into interactive understanding.",
    description:
      "Spotted an interference pattern on a ride home and couldn't rest until I understood it. Built the demo to gain the [ac]intuition[/ac] I chase in every physics detour.",
    tech: ["Canvas", "JS"],
    link: "https://themr-777.github.io/moire-effect-demo/",
    repo: "https://github.com/TheMR-777/moire-effect-demo",
    personal: true,
  },
  {
    id: "letitgo",
    title: "LetItGo",
    kind: "Mobile · Personal",
    summary: "A minimalist observer of elapsed time, to the second.",
    description:
      "Birthdays, joining dates, graduations — a tiny app with a lot of heart. Proof that [em]depth can live in the simplest ideas[/em].",
    tech: ["Flutter", "Dart"],
    repo: "https://github.com/TheMR-777/just_letitgo",
    personal: true,
  },
  {
    id: "githubify",
    title: "GitHubify-MD",
    kind: "Dev Tool · CLI",
    summary: "Pixel-perfect GitHub-flavored HTML from Markdown, in one line.",
    description: "A rich TUI that converts .md to GitHub-styled HTML without the broken CSS of existing plugins, with full CLI arguments for one-liner conversions.",
    tech: ["Python", "Rich TUI"],
    repo: "https://github.com/TheMR-777/githubify-md",
    personal: true,
  },
  {
    id: "smart-cleanup",
    title: "Simple Smart Cleanup",
    kind: "Utility · Automation",
    summary: "Genuinely simple, and quietly useful every week.",
    description:
      "A small Python program that scans and cleans specific directories on a schedule. Configurable, extensible, and shared because [em]good tools deserve to be shared, no matter how small[/em].",
    tech: ["Python", "OS APIs"],
    repo: "https://github.com/TheMR-777/simple-smart-cleanup.py",
    personal: true,
  },
  {
    id: "myportfolio",
    title: "MyPortfolio v3",
    kind: "Design · The detailed one",
    summary: "The long-form portfolio this one was distilled from.",
    description:
      "Built from scratch in a Fluent UI 2 / WinUI 3 acrylic design language, with a custom [ac]StyledText markup engine[/ac] that parses inline formatting straight from the data layer. It is still online, and still the fuller record — the enterprise case studies, the architecture decisions, the metrics behind each system. That idea survived the redesign: it still separates content from presentation on the site you're reading.",
    tech: ["React 19", "Tailwind CSS 4", "Framer Motion"],
    link: "https://themr-777.github.io/",
    repo: "https://github.com/TheMR-777/TheMR-777.github.io",
    personal: true,
  },
  {
    id: "this-site",
    title: "MyPortfolio v4",
    kind: "Design · The site you're reading",
    summary: "The same life, deliberately held to one page.",
    description:
      "v3 answers [em]what did you build[/em]. This one tries to answer [em]what are you like[/em] — and that needs a different shape. A single page of paper and ink, one accent at a time, nothing decorative. Everything here was cut from something longer until only the load-bearing parts remained. The restraint is the argument: [hi]a portfolio that over-explains has already decided for you what mattered.[/hi]",
    tech: ["React 19", "Tailwind CSS 4", "Framer Motion"],
    link: "https://themr-777.github.io/MyPortfolio-v4/",
    repo: "https://github.com/TheMR-777/MyPortfolio-v4",
    personal: true,
  },
];

export const contributions = [
  { name: "AvaloniaUI", role: "Contributor", note: "Performance fixes for the cross-platform .NET UI framework", href: "https://github.com/AvaloniaUI/Avalonia" },
  { name: "Flutter", role: "Contributor", note: "Architecture and documentation improvements", href: "https://github.com/flutter/flutter" },
  { name: "fluent_ui", role: "Contributor", note: "Component work for Fluent Design in Flutter", href: "https://github.com/bdlukaa/fluent_ui" },
  { name: "MyUniversity", role: "Creator", note: "Every data structure and algorithm from my degree, in modern C++", href: "https://github.com/TheMR-777/MyUniversity" },
];

export const experiences = [
  {
    company: "ACE Money Transfer",
    role: "Software Engineer & AI Solutions Architect",
    period: "Jun 2023 — Present",
    summary:
      "From UI/UX into core platform ownership and multi-tenant decisions. My focus is [hi]reusable primitives[/hi] — and increasingly, [ac]orchestrating the agents[/ac] that build on them.",
    highlights: [
      "Employee Monitoring Suite, solo — zero defects at launch",
      "ERP backbone: Rules, Approvals, Rights, Notifications",
      "Unified Reporting Engine — now the company standard",
      "Overwatch: dynamic partner monitoring and a rules engine",
      "Apple MDM platform: one control plane for 1,000+ devices",
      "Pitched agentic AI workflows to the C-suite, then led them",
      "Mastercard, HBL and PNB payment integrations",
    ],
    tech: [".NET 9", "Python 3.14", "Blazor", "Angular", "GraphQL", "SignalR", "PostgreSQL", "C++"],
  },
  {
    company: "MIMOS Berhad · Malaysia",
    role: "Software Engineer & Researcher",
    period: "Dec 2024 — Jul 2025",
    summary:
      "Built the UWB Indoor Positioning Simulation as a [hi]solo project[/hi] — accurate placement planning without [ac]costly physical testing[/ac].",
    highlights: [
      "First-principles signal propagation modeling",
      "Real-time NumPy/SciPy coverage heatmaps",
      "Material-specific attenuation for walls and glass",
      "Within 5% of physical test results",
    ],
    tech: ["C# 13", ".NET 9", "Python 3.13", "NumPy", "SciPy", "WPF", "Matplotlib"],
  },
  {
    company: "TeqHolic",
    role: "Flutter Development Intern",
    period: "2023 · 3 months",
    summary: "Two full MVPs — a real-time social app and a Shopify-backed store — optimized for low bandwidth.",
    highlights: ["Chirp: real-time feeds and notifications", "Sara Kuch: Shopify cart, checkout and tracking"],
    tech: ["Flutter", "Dart", "Firebase", "Shopify API"],
  },
];

export const journey = [
  {
    period: "Age 3 – 10",
    title: "The Genesis",
    text: "It started in Rawalpindi, in my uncle's computer lab. Then a PC of my own in Jhelum, with no internet and no English to lean on. Fixing Windows XP by trial and error turned a curious kid into a [hi]self-taught technician[/hi].",
  },
  {
    period: "Teenage years",
    title: "The Awakening",
    text: "A TV segment on ethical hacking set an impossible goal: reach an Android from another Android, with no real hardware. A year of Linux, Python and shell scripting later, that research became the [ac]2nd most-read Null Byte article[/ac] and a security community across 6 countries.",
  },
  {
    period: "2019 – 2023",
    title: "The Academy",
    text: "3.73 CGPA at University of the Punjab, with every data structure implemented in modern C++ a year ahead of coursework — because [em]understanding beats memorization[/em]. Unofficial C++ TA from semester two, and the first team to ship a capstone and two papers together.",
  },
  {
    period: "2023 – now",
    title: "The Craft",
    text: "An offer from Rev9's AI team became leverage in negotiation, and a direct selection at ACE won out for enterprise scale. One year on a single system, then a family of platforms — and the Reporting Engine, where [ac]Intelligent Scaffolding[/ac] stopped being a concept and went into production.",
  },
];

export const philosophy = {
  quote: "The scale of the goal has [hi]never[/hi] mattered to me — what matters is the [ac]journey[/ac] of getting there.",
  restraint:
    "Design should be like seasoning — [hi]precise application[/hi] enhances, over-application ruins. Quiet zones give the eye a resting point so the accents can speak. [em]If everything is accented, nothing is.[/em]",
  transform:
    "Most software exists to [hi]remember[/hi]. What excites me is software that takes something [dim]in[/dim] and gives something [ac]genuinely new[/ac] back.",
  learning:
    "Sherlock Holmes called the mind an attic: finite, and ruined by hoarding. Rote facts are hoarding. [hi]Understanding[/hi] is a network — new ideas tied to what I already know, until forgetting becomes difficult. It is the one skill that [ac]improves every other skill[/ac] at the same time.",
  learningQuote: "Not learning to remember — learning to learn.",
  principles: [
    { title: "Beyond the recipe", text: "Challenge implementations until knowledge becomes intuition." },
    { title: "Precision", text: "Mastery shows in removing what doesn't belong." },
    { title: "Adaptability", text: "Each problem gets a solution shaped to its constraints." },
    { title: "Evolution", text: "Better, not just different — until it feels inevitable." },
  ],
  discovery: {
    title: "Rediscovering Horner's Method",
    text: "Frustrated with binary-to-decimal arithmetic, I found my own trick: from the leftmost 1, move right — double, add the digit, repeat. Years later I learned it was Horner's Method. Intuition, validated.",
  },
  fibonacci: {
    title: "The zero-branch Fibonacci",
    text: "The standard sequence checks for 0 and 1 on every single iteration. That bothered me enough to spend hours on paper with it.",
    points: [
      "Project the sequence backward, into negative indices.",
      "Start the generation there instead of at zero.",
      "The conditional branch stops being needed at all.",
    ],
  },
  levels: [
    { level: "01", state: "Unconscious incompetence", line: "He who knows not, and knows not that he knows not, is a fool — shun him." },
    { level: "02", state: "Conscious incompetence", line: "He who knows not, and knows that he knows not, is hungry — teach him.", marker: "Where I stand" },
    { level: "03", state: "Unconscious competence", line: "He who knows, and knows not that he knows, is asleep — wake him." },
    { level: "04", state: "Conscious competence", line: "He who knows, and knows that he knows, is wise — follow him.", marker: "Where I'm heading" },
  ],
  levelsNote:
    "Level two, honestly. Able to build robust, secure systems — and very aware of how much is still unknown. Level four is the goal: knowing deeply enough to architect systems that optimize and defend themselves. That gap is what keeps me working.",
};

export const orchestration = {
  lead:
    "I lead the architecture and review the result. Implementation workloads are steered through Claude Fable and GPT-6 Astra; the quality boundary stays human.",
  squad:
    "For the reporting engine's module presets, four specialists worked as one: frontend, backend, database-schema, and data. Each assembled part of the picture; together they produced the JSON schemas for multi-currency budgeting and the full procurement lifecycle.",
  story: {
    title: "The 100× pivot",
    text: "Bringing Cursor into an enterprise workflow took a deliberate campaign with the PMs, the CTO, and the CEO. Automating cognitive boilerplate left more attention for architecture, security, and interface. Speed without standards would have been a liability:",
    points: [
      "Write less boilerplate; spend the time on architecture instead.",
      "Hold the quality line — review and correct every generated output.",
      "Direct intelligence toward intent, rather than typing the result.",
    ],
  },
  outcomes: [
    { value: "100×", label: "faster deployment cycles" },
    { value: "3,000+", label: "tests guarding the engine" },
    { value: "2+ yrs", label: "working this way, daily" },
  ],
  pipeline: ["Incident", "Ticket", "Raise", "Resolution", "Report", "Human review", "Test suite", "Deployment"],
  pipelineNote:
    "What began as one engineer's initiative is now shared infrastructure. Internal orchestrations run the full lifecycle, closed by a human review, an automated suite, and a deployment. The MCP tooling is approachable enough that the CEO runs some of it himself.",
  models: [
    "Claude Fable — implementation & code synthesis",
    "GPT-6 Astra — reasoning & execution",
    "Gemini 3.1 — Pro, Flash, Colab-style workflows",
    "Claude 4.7 · GPT-5.5 · Codex",
    "Grok 4.3 · GLM 5.1 · Kimi K2.7",
    "Qwen 3.6 · Deepseek V4 · Gemma 4 (local)",
  ],
  tools: ["Cursor", "Gemini CLI", "Antigravity", "GitHub Copilot", "Google AI Studio", "OpenCode", "Kiro", "Qoder", "OpenClaw", "LMArena", "Design Arena"],
  methods: [
    "Multi-agent orchestration for end-to-end feature work",
    "Production LLM integration for live code synthesis",
    "Test harness engineering to stress-test generated systems",
    "Strict iterative refinement and review of every output",
    "AI-assisted architecture design and schema synthesis",
  ],
};

export const skills = {
  languages: [
    { name: "C++", level: "Expert", years: "6+", note: "C++23/26 · metaprogramming · lock-free · RAII" },
    { name: "C# / .NET", level: "Advanced", years: "3+", note: "Blazor · EF Core · source generators · SignalR" },
    { name: "Python", level: "Advanced", years: "5+", note: "FastAPI · Jupyter · Pandas · NumPy · Pytest" },
    { name: "SQL", level: "Advanced", years: "4+", note: "PostgreSQL · optimization · query planning" },
    { name: "TypeScript", level: "Intermediate", years: "2+", note: "Angular · React · RxJS" },
    { name: "Dart", level: "Proficient", years: "3+", note: "Flutter · state management" },
    { name: "MATLAB", level: "Intermediate", years: "2+", note: "Signal processing · quantum simulation" },
  ],
  core: [
    { name: "System Architecture", note: "Multi-tenant · event-driven · graph schemas · DDD · CQRS" },
    { name: "Cryptography", note: "AES-256 · RSA-4096 · ECC · key management · zero-knowledge" },
    { name: "Performance Engineering", note: "Profiling · low-latency · memory-aware design" },
    { name: "Polyglot Engineering", note: ".NET + Python (Jupyter, FastAPI) + C++ interop" },
    { name: "Agentic Engineering", note: "Multi-agent workflows · strict quality control · large test harnesses" },
    { name: "Security Research", note: "3 responsible disclosures · access control · information exposure" },
  ],
  tools: ["Docker", "Git", "Azure DevOps", "PostgreSQL", "Redis", "MongoDB", "OpenSSL", "Rider", "DataGrip", "TablePlus", "GitHub Actions", "Linux/WSL", "Nginx", "Google Colab", "Jira"],
  dsa: "A year before the coursework, every fundamental structure and algorithm written in modern C++ — trees, graphs, heaps, hash tables, sorting and searching — with RAII, move semantics and STL-style interfaces, benchmarked against the reference implementations.",
};

export const globalRecognition = [
  {
    institution: "Imperial College London",
    place: "United Kingdom",
    programme: "MSc · via Chevening 2025/26",
    outcome: "Offer received",
    detail: "Ranked #2 worldwide, #1 in Europe. Declined — no funding attached.",
    emphasis: true,
  },
  {
    institution: "CyberMACS Erasmus Mundus",
    place: "EU joint programme",
    programme: "Joint Master in Cybersecurity",
    outcome: "Full tuition waiver + insurance, then declined",
    detail:
      "A reserved seat that became a complete fee waiver. Declined because an Erasmus Mundus MSc relocates you across Europe, and the cost of living was not covered.",
    emphasis: true,
  },
  {
    institution: "University of York",
    place: "United Kingdom",
    programme: "MSc · via Chevening 2025/26",
    outcome: "Offer + 80% scholarship",
    detail: "An independent 80% merit scholarship. The remaining 20% was still beyond reach.",
  },
  {
    institution: "University of Southampton",
    place: "United Kingdom",
    programme: "MSc · 2025 application cycle",
    outcome: "Admission offer received",
    detail: "Declined — the Chevening award did not come through, so the place was unfunded.",
  },
  {
    institution: "ESIEE Paris",
    place: "France",
    programme: "MSc · Eiffel nomination",
    outcome: "Admission + nomination",
    detail: "Nominated for the Eiffel Scholarship; fees remained unaffordable.",
  },
];

export const community = {
  description:
    "A security community that grew from 2 people to 13 mentors across six countries, plus peer programming sessions and students taught in C++ and system design.",
  stats: [
    { value: "13", label: "mentors" },
    { value: "50+", label: "sessions" },
    { value: "20+", label: "students" },
  ],
  countries: ["Iran", "Pakistan", "India", "Australia", "Finland", "Bangladesh"],
};

export const disclosures = [
  { target: "HRMS platform", severity: "Critical", type: "Broken access control" },
  { target: "Internal ticketing", severity: "High", type: "Insecure direct object reference" },
  { target: "University portal", severity: "Medium", type: "Information exposure" },
];

export const education = {
  degree: "BS (Honors) Computer Science",
  institution: "University of the Punjab, Jhelum Campus",
  period: "2019 – 2023",
  result: "3.73 / 4.0 CGPA",
  achievements: [
    "Unofficial C++ teaching assistant from the second semester",
    "Deputy class representative through COVID-19",
    "First team to ship a capstone and two papers together",
  ],
};

/**
 * Interests outside computing, each with the work it demonstrably fed.
 * The tie-back is the point: curiosity in one domain sharpening another.
 */
export const interests = [
  {
    name: "Astronomy",
    weight: "Second-largest passion",
    text: "Studied through expert voices, chasing [ac]intuition[/ac] rather than rote facts — black holes, stellar evolution, cosmic structure.",
    reaches: "The same discipline as learning how to learn: build the model, not the list.",
  },
  {
    name: "Physics",
    weight: "A late-blooming love",
    text: "Electromagnetism, chip fabrication, GPUs, hardware architecture — each understood by building the mental model myself.",
    reaches: "Became the UWB positioning simulation, and the Moiré interference demo.",
    linkTo: "uwb",
  },
  {
    name: "Psychology",
    weight: "Nurtured at home",
    text: "Cognitive bias and learning science, raised on open conversation with my mother — a psychologist.",
    reaches: "Now shapes how I model the reasoning of AI agents, so they align with how people actually think.",
    linkTo: "reporting",
  },
];

/** A personal conviction, stated as one — not a forecast. */
export const vision = {
  lead:
    "I want AI to be more than a productivity gain. The question that holds me is quieter and larger: what does a person build [hi]when they are free to choose to[/hi] — when the work is no longer the price of staying alive?",
  pillars: [
    {
      title: "An open-source ethos",
      text: "People contribute because they want to, not because they must. Decouple survival from labour, and open source stops being the alternative.",
    },
    {
      title: "Breaking the cycle",
      text: "Survival pressure is what creates most harmful hierarchy. Remove the coercion and a great deal of exploitation loses its grip.",
    },
    {
      title: "Passion over desperation",
      text: "A world where contribution is voluntary, and attention goes to the problems we inflicted on ourselves.",
    },
  ],
  origin:
    "Since childhood I have asked one question of every system I designed: what would happen if this were [em]genuinely[/em] intelligent — not a thousand if-statements, but actually thinking?",
  originClose:
    "I don't expect to arrive there alone, or soon. But a person should aim at the horizon they actually believe in — and then do the nearest honest thing that points toward it.",
  next:
    "The nearest honest thing, for now: making trustworthy AI reach the people usually priced out of it — starting where I stand, in Pakistan.",
  venture: {
    title: "The nearer horizon",
    text: "A Pakistan-based venture studio for smaller firms, and an AI commons beside it. Not a consultancy that sells intelligence to whoever can pay — infrastructure that [em]evolves with the company using it[/em], priced so a small team can actually afford to run on it. The working relationship is the point: partners rather than clients, the way a family firm treats a family firm.",
  },
};

/** Formative stories that predate or sit outside the flagship work. */
/** Stories, not specs — deliberately no tech stack. */
export const milestones = [
  {
    title: "The ARMA II traffic module",
    period: "Early teens",
    text: "Every custom mission needed tedious manual setup, so I decompiled a packaged addon, reverse-engineered its source, and refactored the bindings to embed a traffic script of my own. It repackaged cleanly and ran on the [hi]first launch[/hi].",
    note: "First contact with reverse engineering and binary-level thinking — the habit that later became a security career.",
  },
  {
    title: "The monitoring proposal that didn't ship",
    period: "2024",
    text: "I proposed an AI-driven evolution of the Employee Monitoring Suite to automate worklogging and remove the trust problems manual monitoring creates. Built the plan with a colleague; the CTO backed the architecture. Commercial priorities pulled the team toward ERP instead, and it never materialised.",
    note: "A real failure, and a useful one. It validated the instinct — and sharpened the pull toward somewhere more research-oriented.",
  },
];

export const certifications = [
  { name: "Modern C++ Mastery with Game Development", issuer: "TheCherno", note: "Performance-focused engineering mentorship" },
  { name: "Advanced Cryptography", issuer: "Christof Paar", note: "Cryptographic theory and its implementation" },
  { name: "Flutter Development", issuer: "The App Brewery", note: "Cross-platform mobile development" },
  { name: ".NET Basic to Advanced", issuer: "CodeWithMosh & Tim Corey", note: "Enterprise .NET patterns" },
  { name: "IELTS Academic", issuer: "British Council", note: "Band 7.5 · L 8.5 · R 7.0 · W 7.0 · S 7.0" },
];
