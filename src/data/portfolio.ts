export const personal = {
  name: "Muhammad Ammar Khan",
  handle: "TheMR-777",
  role: "Software Architect & Security Engineer",
  location: "Jhelum, Pakistan · Remote",
  email: "m.shahzad.ms72@gmail.com",
  profileImage: "https://i.ibb.co/2Y8YWR1X/freepik-br-2a5d6513-6583-40a5-8ab6-1a77d56608c6.png",
  taglines: ["Creating what hasn't been built before.", "Ink-level detail. Paper-level clarity."],
  about:
    "I blend low-level mastery ([hi]C++[/hi], cryptography) with high-level architecture ([hi].NET[/hi], polyglot systems) to build things that didn't exist yet — enterprise platforms, security infrastructure, and small open-source tools that [ac]transform[/ac] rather than merely remember.",
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
    { value: "3.73", label: "CGPA · Punjab Univ." },
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

export const projects: Project[] = [
  {
    id: "ems",
    title: "Employee Monitoring Suite",
    kind: "Flagship · Solo · 1 year",
    summary: "Privacy-conscious, company-wide monitoring with a real-time Blazor dashboard.",
    description:
      "A year of solo design and engineering — the longest I've given any single system. It [em]solidified my approach to architecture[/em]: not memorizing patterns, but understanding what each one solves and where it falls short, so the architecture could be [hi]minimal, extendable, and predictable[/hi].",
    tech: [".NET", "Blazor", "GraphQL", "Micro-ORM"],
    impact: ["Zero defects at launch", "200% measured productivity lift", "Adopted as the company standard"],
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
    id: "reporting",
    title: "Unified Reporting Engine",
    kind: "Microservice · Polyglot",
    summary: "One Python service that replaced years of brittle, per-project reporting.",
    description:
      "Every project reported its own way. I proposed and solely built a Python 3.14 microservice whose API [ac]mirrors the underlying libraries directly[/ac] — zero wrapper tax, zero maintenance overhead. Consumed by .NET, Angular and Laravel alike. It also gave birth to SchemaFlow.",
    tech: ["Python", "ReportLab", "Pandas", "FastAPI"],
    impact: ["Replaced 5+ implementations", "Now the internal reporting standard"],
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
    id: "vault",
    title: "ACE Password Vault",
    kind: "Security · Cryptography",
    summary: "Defense-in-depth credential storage for financial secrets.",
    description:
      "C++ inner loops over OpenSSL for raw cryptography; .NET outer layers for secure memory and the interface. Zero-knowledge principles, custom auditing and key rotation — shaped by years as [hi]H4ck3R_777[/hi].",
    tech: ["C++", ".NET", "OpenSSL", "AES-256", "RSA-4096"],
    impact: ["Critical infrastructure", "Zero incidents since deployment"],
    flagship: true,
  },
  {
    id: "evolver",
    title: "Evolver — Auto-Update Engine",
    kind: "Infrastructure · EMS",
    summary: "Chromium-inspired, cross-platform updater with graceful rollback.",
    description:
      "IPC between the app and a dedicated updater, staged rollouts, error-resilient backups and recovery — on both Windows and macOS.",
    tech: [".NET", "IPC", "AvaloniaUI"],
    impact: ["Zero failed updates", "Deployment friction ≈ 0"],
  },
  {
    id: "jobs",
    title: "Background Jobs Framework",
    kind: "Infrastructure · Core",
    summary: "Job processing that other teams quietly adopted.",
    description:
      "Built for EMS out of necessity; proved solid enough that other teams ported it to fix their own long-standing job issues. Retry policies, dead-letters, graceful shutdown, zero job loss during deploys.",
    tech: [".NET 10", "Channels", "PostgreSQL"],
    impact: ["Adopted by 3+ projects", "Zero job failures since launch"],
  },
  {
    id: "ace-status",
    title: "ACE Status",
    kind: "Integrations · Dynamic Engine",
    summary: "Partner monitoring where onboarding went from days to minutes.",
    description:
      "Replaced per-partner C# files with a normalized engine: JSON/XML path parsing, dynamic headers, and multi-rule boolean validation ([code]posts[5].name[/code], AND/OR/XOR) — configurable by non-developers.",
    tech: [".NET 9", "EF Core", "PostgreSQL"],
    impact: ["Days → minutes onboarding", "Full audit trails"],
    flagship: true,
  },
  {
    id: "logging",
    title: "Logging Framework",
    kind: "Infrastructure / Observability",
    summary: "Less noise. More context. Logs built for the person investigating them.",
    description: "A pluggable .NET framework for readable, structured logs. Configurable verbosity keeps production quiet, while semantic context and source references make an investigation easier to follow. Source generators keep the hot path lean.",
    tech: [".NET", "Source Generators", "Serilog"],
    impact: ["Standardized logging across multiple projects", "Adopted alongside the Background Jobs Framework"],
  },
  {
    id: "mr-crypt",
    title: "mr_crypt",
    kind: "Open Source · C++23",
    summary: "Range-like syntax for OpenSSL. Cryptography that reads like a pipeline.",
    description:
      "OpenSSL's C API is verbose and easy to misuse. mr_crypt uses [ac]C++23 ranges[/ac] and template metaprogramming for fluent, type-safe operations.",
    tech: ["C++23", "OpenSSL 3", "Metaprogramming"],
    impact: ["~10× less boilerplate"],
    link: "https://github.com/TheMR-777/mr_crypt",
    personal: true,
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
    description: "A rich TUI that converts .md to GitHub-styled HTML without the broken CSS of existing plugins.",
    tech: ["Python", "Rich"],
    repo: "https://github.com/TheMR-777/githubify-md",
    personal: true,
  },
];

export const experiences = [
  {
    company: "ACE Money Transfer",
    role: ".NET Developer & Architecture Consultant",
    period: "Jun 2023 — Present",
    summary:
      "Progressed from UI/UX into owning core platform modules and multi-tenant decisions. My focus: [hi]reusable primitives[/hi] that power every business module.",
    highlights: [
      "Employee Monitoring Suite, solo — zero defects at launch",
      "ERP backbone: Rules, Approvals, Rights, Notifications",
      "Reporting Engine in Python — the company standard",
      "Mastercard, HBL and PNB payment integrations",
      "Direct CTO commendation for architectural work",
    ],
    tech: [".NET 9", "Blazor", "Angular", "GraphQL", "SignalR", "PostgreSQL", "C++", "Python"],
  },
  {
    company: "MIMOS Berhad · Malaysia",
    role: "Lead Developer & System Architect",
    period: "Dec 2024 — Jul 2025",
    summary:
      "Built the UWB Indoor Positioning Simulation as a [hi]solo project[/hi] — accurate placement planning without [ac]costly physical testing[/ac].",
    highlights: ["First-principles signal modeling", "NumPy/SciPy heatmaps", "Within 5% of physical results"],
    tech: ["C# 13", ".NET 9", "Python", "NumPy", "SciPy", "WPF"],
  },
  {
    company: "TeqHolic",
    role: "Flutter Development Intern",
    period: "2023 · 3 months",
    summary: "Two full MVPs — a real-time social app and a Shopify-backed store — optimized for low bandwidth.",
    highlights: ["Chirp: real-time feeds", "Sara Kuch: Shopify e-commerce"],
    tech: ["Flutter", "Firebase", "Shopify API"],
  },
];

export const journey = [
  {
    period: "Age 3 – 10",
    title: "The Genesis",
    text: "An uncle's computer, GTA Vice City, then a Windows XP PC with limited access. Limits became the teacher: [hi]troubleshoot[/hi], [hi]experiment[/hi], [hi]discover alone[/hi].",
  },
  {
    period: "Teenage years",
    title: "The Awakening",
    text: "An 'impossible' goal — hack an Android from another Android. A year of Linux, Python and networking later, it became the [ac]2nd most-read Null Byte article[/ac] (2018–2020) and a security community across 6 countries.",
  },
  {
    period: "2019 – 2023",
    title: "The Academy",
    text: "3.73 CGPA at University of the Punjab, every data structure implemented in modern C++ a year ahead of coursework — because [em]understanding beats memorization[/em]. Unofficial C++ TA from semester two.",
  },
  {
    period: "2023 – now",
    title: "The Craft",
    text: "Selected directly by ACE's CTO. A full year devoted to one system, followed by a family of platforms and reusable tools. A chance to turn [ac]engineering principles[/ac] into things people use every day.",
  },
];

export const philosophy = {
  quote: "The scale of the goal has [hi]never[/hi] mattered to me — what matters is the [ac]journey[/ac] of getting there.",
  restraint:
    "Design should be like seasoning — [hi]precise application[/hi] enhances, over-application ruins. Quiet zones give the eye a resting point so the accents can speak. [em]If everything is accented, nothing is.[/em]",
  transform:
    "Most software exists to [hi]remember[/hi]. What excites me is software that takes something [dim]in[/dim] and gives something [ac]genuinely new[/ac] back.",
  principles: [
    { title: "Beyond the recipe", text: "Challenge implementations until knowledge becomes intuition." },
    { title: "Precision", text: "Mastery shows in removing what doesn't belong." },
    { title: "Adaptability", text: "Each problem gets a solution shaped to its constraints." },
    { title: "Evolution", text: "Better, not just different — until it feels inevitable." },
  ],
  verbs: [
    { verb: "Reveal", icon: "◐", text: "Making the invisible visible" },
    { verb: "Simplify", icon: "◇", text: "Reducing complexity to clarity" },
    { verb: "Automate", icon: "↻", text: "Freeing hands from the mundane" },
    { verb: "Connect", icon: "⬡", text: "Bridging isolated systems" },
    { verb: "Simulate", icon: "◈", text: "Replacing costly trials with insight" },
    { verb: "Empower", icon: "△", text: "Enabling what didn't exist" },
  ],
  discovery: {
    title: "Rediscovering Horner's Method",
    text: "Frustrated with binary-to-decimal arithmetic, I found my own trick: from the leftmost 1, move right — double, add the digit, repeat. Years later I learned it was Horner's Method. Intuition, validated.",
  },
};

export const skills = {
  languages: [
    { name: "C++", level: "Expert", years: "6+", note: "Modern C++ / metaprogramming / lock-free" },
    { name: "C# / .NET", level: "Advanced", years: "3+", note: "Blazor / EF Core / source generators" },
    { name: "SQL", level: "Advanced", years: "4+", note: "PostgreSQL / optimization / query planning" },
    { name: "Python", level: "Intermediate", years: "5+", note: "NumPy / SciPy / automation" },
    { name: "TypeScript", level: "Intermediate", years: "2+", note: "Angular / React / RxJS" },
    { name: "Dart", level: "Proficient", years: "3+", note: "Flutter / state management" },
  ],
  core: [
    { name: "System Architecture", note: "Multi-tenant · Event-driven · DDD · CQRS" },
    { name: "Cryptography", note: "AES-256 · RSA-4096 · ECC · zero-knowledge" },
    { name: "Performance Engineering", note: "Profiling · low-latency · memory-aware" },
    { name: "Polyglot Engineering", note: ".NET + Python + C++ interop" },
    { name: "Security Research", note: "3 responsible disclosures / access control / information exposure" },
    { name: "AI as Force Multiplier", note: "Claude · GPT · Gemini as thinking partners" },
  ],
  tools: ["Docker", "Git", "Azure DevOps", "PostgreSQL", "Redis", "OpenSSL", "Rider", "DataGrip", "GitHub Actions", "Linux/WSL", "Nginx", "Cursor", "Copilot"],
};

export const recognition = [
  { label: "Null Byte", text: "2nd & 8th most-read articles, 2018–2020" },
  { label: "CyberMACS", text: "Erasmus Mundus · full tuition waiver offered" },
  { label: "Community", text: "Founded a 13-mentor security group across 6 countries" },
  { label: "Research", text: "2 publications · quantum photonics simulations" },
];
