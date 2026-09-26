export type StudyCategory = "Platforms" | "Infrastructure" | "Security" | "Simulation";
export type CaseStudy = {
  category: StudyCategory;
  role: string;
  period: string;
  thesis: string;
  challenge: string;
  approach: string;
  decisions: { title: string; detail: string }[];
  modules?: { name: string; detail: string }[];
};

export const caseStudies: Partial<Record<string, CaseStudy>> = {
  ems: {
    category: "Platforms",
    role: "Sole designer & engineer",
    period: "One year of development",
    thesis: "Meaningful signal. Human boundaries.",
    challenge: "Remote work patterns were difficult to understand. Existing tools either tracked too aggressively or produced reports without enough context. The challenge was useful visibility without treating people as a stream of surveillance data.",
    approach: "Built an OS-level agent and a real-time Blazor dashboard, connected through GraphQL. Privacy boundaries informed the collection layer; a lightweight Micro-ORM kept high-throughput logging efficient. The architecture grew from the actual constraints rather than a template.",
    decisions: [
      { title: "Keep the core small", detail: "Clear separation of concerns, with an abstraction only where it solved a real problem." },
      { title: "Design for the whole lifecycle", detail: "Background processing, structured logging, and the Evolver update engine were part of operating the system, not afterthoughts." },
      { title: "Make behavior predictable", detail: "Performance and deterministic production behavior were first-class design goals." },
    ],
  },
  "erp-core": {
    category: "Platforms",
    role: "Platform engineer & architecture consultant",
    period: "2023 – December 2025",
    thesis: "Build the backbone. Let modules follow.",
    challenge: "Internal tools were fragmented and single-tenant. Every new module repeated the same work: permissions, approvals, notifications, and auditing. That repetition made both delivery and maintenance expensive.",
    approach: "Designed a multi-tenant backbone of composable engines. Business modules plug into shared Approvals, Rules, Notifications, and Rights systems. Tenant isolation and flexible data modeling made the platform reusable across companies.",
    decisions: [
      { title: "Policies, not hard-coded branches", detail: "A centralized Rules and Thresholds framework supports changes without scattering business policy across modules." },
      { title: "One schema, many forms", detail: "A JSON form engine generates theme-compliant interfaces from reusable definitions." },
      { title: "Navigation that knows your rights", detail: "A fuzzy-search command palette respects access control while making the platform easier to navigate." },
    ],
    modules: [
      { name: "Permissions & Rights", detail: "Tenant-aware, module-agnostic access control, designed to be adopted in a few lines." },
      { name: "Approvals Orchestration", detail: "A generic approve, reject and escalate workflow layer any module can plug into." },
      { name: "Rules & Thresholds", detail: "Central policy engine driving approvals, restrictions, escalations and notifications." },
      { name: "Notifications & Templates", detail: "Email, in-app, push and WhatsApp delivery with runtime-managed, localizable templates." },
      { name: "Dynamic JSON Form Engine", detail: "Schema-driven interface generation that stays theme-compliant across modules." },
      { name: "Documents & Audit", detail: "Blob storage with time-bound links, plus action-level traceability for investigations." },
    ],
  },
  reporting: {
    category: "Infrastructure",
    role: "Proposer, architect & lead engineer",
    period: "2025 – present",
    thesis: "Many systems. One reporting language.",
    challenge: "More than five services had independent, brittle reporting implementations. Output differed across products and customization was difficult. Finance teams needed ad-hoc analysis, audit trails, and bespoke visuals, but every request queued behind an engineering release.",
    approach: "A Python microservice consumed over HTTP by .NET, Angular and Laravel systems, with an API that stays close to ReportLab, OpenPyXL and Pandas instead of wrapping them. It then grew into an analytics workspace: an embedded Jupyter runtime, Gemini-assisted script generation, graph-based schema inheritance, immutable audit snapshots, and a large automated test suite.",
    decisions: [
      { title: "Choose the right ecosystem", detail: "Python's reporting and data libraries fit the problem better than forcing every task into the existing application language." },
      { title: "Let schemas inherit", detail: "Moving from rigid JSON definitions to a directed graph model removed duplication and saved the accounting team significant time." },
      { title: "Earn the speed with tests", detail: "Implementation was accelerated with AI agents, so a 3,000+ case suite exercises execution, graph resolution, sandboxing and renderers." },
      { title: "Let useful side projects escape", detail: "A visual-query stakeholder demo grew into SchemaFlow, now a standalone open-source tool." },
    ],
    modules: [
      { name: "Embedded Jupyter runtime", detail: "Interactive Python execution inside the ERP, with notebook persistence, sharing and sandboxing — no local environment required." },
      { name: "Gemini script generation", detail: "Natural-language reporting requests become validated, executable Python analysis scripts." },
      { name: "Graph schema inheritance", detail: "A directed acyclic model where new reports inherit, extend and compose existing dataset pipelines." },
      { name: "Financial visualization presets", detail: "Treasury-ready components for cash flow, currency variance, liquidity and multi-year forecasting." },
      { name: "Frequency-based audit snapshots", detail: "Immutable point-in-time datasets captured on a schedule for regulatory and financial audits." },
      { name: "3,000+ test harness", detail: "Continuous pressure on the execution engine, graph resolution and output renderers under load." },
    ],
  },
  overwatch: {
    category: "Security",
    role: "Architect & lead engineer",
    period: "2024 – present",
    thesis: "Configure the partner. Not the codebase.",
    challenge: "The legacy monitoring tool was hardcoded. Every new partner service meant code changes for headers, payloads, authentication and success criteria — so scaling it was effectively impossible, and maintenance never stopped.",
    approach: "Rebuilt from the ground up on .NET 10 and Blazor, at the CEO's request. Partner onboarding became a dynamic interface with encrypted header storage, custom authentication, and base URL overrides. A logical expression evaluator lets administrators define verification rules against JSON or XML responses without a deployment.",
    decisions: [
      { title: "Make verification expressible", detail: "Administrators compose rules over nested JSON and XML values using logical AND and OR blocks, instead of requesting new code." },
      { title: "Parse for scale", detail: "An optimized, on-demand response parser keeps large payload monitoring workable under load." },
      { title: "Rights down to the button", detail: "A module-agnostic rights engine controls individual actions, not just pages." },
      { title: "Keep the evidence", detail: "The analytics dashboard retains audit evidence down to the individual HTTP response received." },
    ],
  },
  "apple-mdm": {
    category: "Infrastructure",
    role: "Architect & engineer",
    period: "Mid 2026 – rollout targeted 2027",
    thesis: "One control plane for a thousand machines.",
    challenge: "Deeper monitoring and hardware-level restriction could not be achieved with in-house tooling alone. Adopting Apple's MDM stack meant learning an entire unfamiliar ecosystem: enrollment flows, certificates, subscriptions and compliance obligations.",
    approach: "Months of research across the full Apple MDM lifecycle, securing the necessary rights and subscriptions and validating assumptions through trial and error. A .NET 10 backend acts as the single control plane over open-source MDM microservices, with a custom React interface in a shadcn-inspired visual language.",
    decisions: [
      { title: "Compose, don't reinvent", detail: "nanoMDM, microMDM and SCEP enrollment are orchestrated into one coherent platform rather than rebuilt." },
      { title: "Learn the ecosystem properly", detail: "Enrollment, certificates and compliance were studied end to end before committing to an architecture." },
      { title: "Gate the rollout", detail: "Company-wide deployment is staged behind testing, verification, compliance checks and audits." },
    ],
  },
  uwb: {
    category: "Simulation",
    role: "Lead developer & system architect / solo",
    period: "December 2024 – July 2025",
    thesis: "Test the placement. Not the building.",
    challenge: "Validating UWB anchor placements required expensive physical installation and testing. Poor placements were costly to correct. MIMOS needed a way to explore coverage before committing to hardware.",
    approach: "Built a hybrid .NET and Python simulation. C# handles the interface, geometry, and core logic; NumPy and SciPy model signal propagation and produce coverage heatmaps. Material-specific attenuation accounts for walls, glass, and obstacles.",
    decisions: [
      { title: "Work from first principles", detail: "Signal propagation and computational geometry informed the model, rather than a purely visual approximation." },
      { title: "Make uncertainty visible", detail: "Layered coverage visualization helps users compare anchor configurations and locate weak areas." },
      { title: "Split at the natural boundary", detail: ".NET provides the application shell; Python supplies the scientific-computing pipeline." },
    ],
  },
  vault: {
    category: "Security",
    role: "Security architect & engineer",
    period: "2023",
    thesis: "Trust is designed in layers.",
    challenge: "Financial credentials required storage aligned with internal access policies, audit requirements, and key rotation. The system needed defense in depth, not just an encrypted database field.",
    approach: "Used established cryptographic primitives through OpenSSL, with C++ handling low-level operations and .NET providing application orchestration and the interface. The design combines layered encryption, auditing, key management, and zero-knowledge principles where applicable.",
    decisions: [
      { title: "Use established primitives", detail: "AES-256 and RSA-4096 form part of the design; bespoke application architecture does not require inventing cryptography." },
      { title: "Reduce the exposure surface", detail: "Credential handling, memory considerations, and access boundaries are treated as one security problem." },
      { title: "Make access accountable", detail: "Auditing and key rotation are built into the operational model." },
    ],
  },
};

export const reading = [
  {
    title: "Identification of Paddy Disease Along Its Processing Time",
    category: "Co-authored research / 2023",
    publication: "Quantum Journal of Social Sciences and Humanities, 4(3), 72-80",
    href: "https://doi.org/10.55197/qjssh.v4i3.251",
  },
  {
    title: "Paddy Leaf Disease Symptoms Detection Through Artificial Neural Network",
    category: "Co-authored research / 2023",
    publication: "Quantum Journal of Engineering, Science and Technology, 4(4), 1-10",
    href: "https://qjoest.com/index.php/qjoest/article/view/123/75",
  },
  {
    title: "Quantum computing & photonics simulation",
    category: "Research collaboration / 2023 – 2024",
    publication:
      "C++, Python and MATLAB prototypes for mirror-array and emitter-detector setups, alongside a visiting PhD professor. She coached me on framing hypotheses and writing for publication; the modeling discipline carried directly into the MIMOS simulation work.",
  },
  {
    title: "Notes from a hands-on security education",
    category: "Educational writing / Null Byte",
    publication: "Ten articles published as H4ck3R_777, including the 2nd and 8th most-read on the platform (2018–2020).",
    href: "https://creator.wonderhowto.com/h4ck3r_777/",
  },
  {
    title: "A forty-second fix for a lost save file",
    category: "Shared discovery / 2022",
    publication:
      "A power cut corrupted months of game progress with no fix online. Inspecting the save files revealed a numbered counterpart holding real data. The method still helps players across four titles.",
    href: "https://www.youtube.com/watch?v=cPH_SZKI_Cg",
  },
];
