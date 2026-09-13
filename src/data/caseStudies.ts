export type StudyCategory = "Platforms" | "Infrastructure" | "Security" | "Simulation";
export type CaseStudy = {
  category: StudyCategory;
  role: string;
  period: string;
  thesis: string;
  challenge: string;
  approach: string;
  decisions: { title: string; detail: string }[];
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
    period: "2023 - December 2025",
    thesis: "Build the backbone. Let modules follow.",
    challenge: "Internal tools were fragmented and single-tenant. Every new module repeated the same work: permissions, approvals, notifications, and auditing. That repetition made both delivery and maintenance expensive.",
    approach: "Designed a multi-tenant backbone of composable engines. Business modules plug into shared Approvals, Rules, Notifications, and Rights systems. Tenant isolation and flexible data modeling made the platform reusable across companies.",
    decisions: [
      { title: "Policies, not hard-coded branches", detail: "A centralized Rules and Thresholds framework supports changes without scattering business policy across modules." },
      { title: "One schema, many forms", detail: "A JSON form engine generates theme-compliant interfaces from reusable definitions." },
      { title: "Navigation that knows your rights", detail: "A fuzzy-search command palette respects access control while making the platform easier to navigate." },
    ],
  },
  reporting: {
    category: "Infrastructure",
    role: "Proposer & sole engineer",
    period: "2025 - present",
    thesis: "Many systems. One reporting language.",
    challenge: "More than five services had independent, brittle reporting implementations. Output differed across products, customization was difficult, and fixes had to be repeated in different codebases.",
    approach: "Created a Python microservice consumed through HTTP by .NET, Angular, and Laravel systems. ReportLab, OpenPyXL, and Pandas provide the underlying capabilities. The API stays close to those libraries, minimizing the custom wrapper surface to maintain.",
    decisions: [
      { title: "Choose the right ecosystem", detail: "Python's reporting and data-processing libraries offered a better fit than forcing every task into the existing application language." },
      { title: "Keep integration language-agnostic", detail: "A REST boundary gives every product the same path to PDF, Excel, and CSV output." },
      { title: "Let useful side projects escape", detail: "A visual-query stakeholder demo grew into SchemaFlow, now a standalone open-source tool." },
    ],
  },
  uwb: {
    category: "Simulation",
    role: "Lead developer & system architect / solo",
    period: "December 2024 - July 2025",
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
  "ace-status": {
    category: "Infrastructure",
    role: "Integration engine architect & engineer",
    period: "2024",
    thesis: "Configure the partner. Not the codebase.",
    challenge: "Each new partner needed a manual C# configuration file and custom request-response logic. Onboarding was slow, data relationships were inconsistent, and the audit trail was incomplete.",
    approach: "Rebuilt the system around a normalized EF Core data model and a dynamic request-response pipeline. Administrators can configure headers, request bodies, JSON/XML paths, and multi-rule validation without writing partner-specific C#.",
    decisions: [
      { title: "Normalize the configuration", detail: "Code-first database relationships replace manually maintained string associations." },
      { title: "Model verification explicitly", detail: "Nested JSON/XML fields can participate in AND, OR, and XOR rule combinations." },
      { title: "Keep the evidence", detail: "Reporting, export, and audit trails make integrations easier to operate and investigate." },
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
    title: "Notes from a hands-on security education",
    category: "Educational writing / Null Byte",
    publication: "Published as H4ck3R_777, exploring Linux, networking, and ethical security research.",
    href: "https://creator.wonderhowto.com/h4ck3r_777/",
  },
];