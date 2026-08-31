export type Status = "success" | "warning" | "critical" | "neutral";

export type Customer = {
  id: string;
  name: string;
  segment: "Private" | "Priority" | "Business" | "Corporate";
  aum: number;
  revenueYtd: number;
  risk: "Low" | "Moderate" | "High";
  health: Status;
  lastContact: string;
  nextAction: string;
  manager: string;
  since: string;
  email: string;
  phone: string;
  products: { name: string; balance: number; rate: string; matures: string }[];
  notes: { date: string; text: string }[];
};

export const customers: Customer[] = [
  {
    id: "C-10241",
    name: "Amelia Hartwell",
    segment: "Private",
    aum: 12_450_000,
    revenueYtd: 184_500,
    risk: "Moderate",
    health: "success",
    lastContact: "2026-08-24",
    nextAction: "Review structured note allocation",
    manager: "Daniel Okoro",
    since: "2011",
    email: "a.hartwell@northgate.example",
    phone: "+65 8123 4471",
    products: [
      { name: "Discretionary Portfolio", balance: 8_900_000, rate: "—", matures: "—" },
      { name: "Fixed Deposit — 12M", balance: 2_300_000, rate: "4.15%", matures: "2026-09-18" },
      { name: "Mortgage — Sentosa", balance: 1_250_000, rate: "3.20%", matures: "2033-04-01" },
    ],
    notes: [
      { date: "2026-08-24", text: "Discussed reallocating 15% into short-duration credit." },
      { date: "2026-07-02", text: "Family trust review scheduled with legal." },
    ],
  },
  {
    id: "C-10388",
    name: "Rajiv Menon",
    segment: "Priority",
    aum: 3_120_000,
    revenueYtd: 41_200,
    risk: "Low",
    health: "warning",
    lastContact: "2026-06-11",
    nextAction: "Overdue outreach — 81 days",
    manager: "Daniel Okoro",
    since: "2018",
    email: "r.menon@vellore.example",
    phone: "+65 9002 1188",
    products: [
      { name: "Savings Plus", balance: 420_000, rate: "2.10%", matures: "—" },
      { name: "Unit Trust — Global Equity", balance: 2_700_000, rate: "—", matures: "—" },
    ],
    notes: [{ date: "2026-06-11", text: "Requested ESG fund shortlist. Not yet sent." }],
  },
  {
    id: "C-10455",
    name: "Nordvik Logistics Pte Ltd",
    segment: "Corporate",
    aum: 28_700_000,
    revenueYtd: 512_000,
    risk: "Moderate",
    health: "success",
    lastContact: "2026-08-28",
    nextAction: "Trade facility renewal pack",
    manager: "Priya Ramesh",
    since: "2009",
    email: "treasury@nordvik.example",
    phone: "+65 6234 9900",
    products: [
      { name: "Revolving Credit Facility", balance: 15_000_000, rate: "SORA + 1.4%", matures: "2026-10-31" },
      { name: "FX Forward Book", balance: 9_400_000, rate: "—", matures: "2026-12-15" },
      { name: "Operating Accounts", balance: 4_300_000, rate: "0.80%", matures: "—" },
    ],
    notes: [{ date: "2026-08-28", text: "CFO flagged appetite for hedging 2027 EUR exposure." }],
  },
  {
    id: "C-10512",
    name: "Clara Bennett",
    segment: "Priority",
    aum: 1_880_000,
    revenueYtd: 22_400,
    risk: "High",
    health: "critical",
    lastContact: "2026-08-01",
    nextAction: "Suitability re-assessment required",
    manager: "Daniel Okoro",
    since: "2021",
    email: "c.bennett@bennettco.example",
    phone: "+65 8877 3120",
    products: [
      { name: "Leveraged Note Portfolio", balance: 1_500_000, rate: "—", matures: "2027-02-10" },
      { name: "Current Account", balance: 380_000, rate: "0.05%", matures: "—" },
    ],
    notes: [{ date: "2026-08-01", text: "Risk profile expired. Compliance flag raised." }],
  },
  {
    id: "C-10630",
    name: "Hiroshi Tanaka",
    segment: "Private",
    aum: 7_640_000,
    revenueYtd: 96_800,
    risk: "Low",
    health: "success",
    lastContact: "2026-08-19",
    nextAction: "Present bond ladder proposal",
    manager: "Priya Ramesh",
    since: "2014",
    email: "h.tanaka@tanakaholdings.example",
    phone: "+81 90 4412 2201",
    products: [
      { name: "Fixed Income Mandate", balance: 6_100_000, rate: "—", matures: "—" },
      { name: "Fixed Deposit — 6M", balance: 1_540_000, rate: "3.85%", matures: "2026-09-06" },
    ],
    notes: [{ date: "2026-08-19", text: "Prefers JPY-hedged share classes." }],
  },
  {
    id: "C-10711",
    name: "Sundara Textiles Sdn Bhd",
    segment: "Business",
    aum: 4_210_000,
    revenueYtd: 63_900,
    risk: "Moderate",
    health: "warning",
    lastContact: "2026-07-22",
    nextAction: "Covenant documentation missing",
    manager: "Daniel Okoro",
    since: "2016",
    email: "finance@sundara.example",
    phone: "+60 3 2288 7710",
    products: [
      { name: "Term Loan", balance: 3_400_000, rate: "5.05%", matures: "2028-01-20" },
      { name: "Business Account", balance: 810_000, rate: "0.40%", matures: "—" },
    ],
    notes: [{ date: "2026-07-22", text: "Awaiting FY25 audited statements." }],
  },
];

export const currency = (n: number, compact = false) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(n);

export type Alert = {
  id: string;
  title: string;
  customer: string;
  customerId: string;
  severity: Status;
  category: string;
  raised: string;
  summary: string;
  signals: string[];
  recommended: string;
};

export const alerts: Alert[] = [
  {
    id: "AL-4412",
    title: "Large outflow detected",
    customer: "Amelia Hartwell",
    customerId: "C-10241",
    severity: "critical",
    category: "Retention",
    raised: "2h ago",
    summary:
      "SGD 1.8M transferred to an external institution over three transactions in 48 hours. Pattern matches known attrition precursors.",
    signals: [
      "3 outbound transfers > SGD 500k in 48h",
      "Portfolio review meeting declined twice",
      "Competitor rate campaign active in segment",
    ],
    recommended: "Schedule a same-week retention call and prepare a rate-match proposal.",
  },
  {
    id: "AL-4409",
    title: "Suitability assessment expired",
    customer: "Clara Bennett",
    customerId: "C-10512",
    severity: "critical",
    category: "Compliance",
    raised: "5h ago",
    summary:
      "Client holds leveraged structured products while the risk profile lapsed on 01 Aug 2026. Trading restrictions apply until refreshed.",
    signals: ["Risk profile expired 30 days ago", "High-risk holdings 80% of portfolio"],
    recommended: "Book a suitability re-assessment and freeze new structured product orders.",
  },
  {
    id: "AL-4398",
    title: "Deposit maturing without rollover instruction",
    customer: "Hiroshi Tanaka",
    customerId: "C-10630",
    severity: "warning",
    category: "Maturity",
    raised: "1d ago",
    summary: "SGD 1.54M 6-month deposit matures 06 Sep 2026 with no standing instruction on file.",
    signals: ["Matures in 6 days", "No rollover instruction", "Client historically rolls over"],
    recommended: "Send a pre-filled rollover confirmation with the current 6M board rate.",
  },
  {
    id: "AL-4381",
    title: "Contact SLA breached",
    customer: "Rajiv Menon",
    customerId: "C-10388",
    severity: "warning",
    category: "Engagement",
    raised: "2d ago",
    summary: "81 days since last meaningful contact against a 60-day Priority segment SLA.",
    signals: ["Last contact 11 Jun 2026", "Open request: ESG fund shortlist"],
    recommended: "Send the outstanding ESG shortlist and propose a 20-minute call.",
  },
  {
    id: "AL-4370",
    title: "Covenant documentation outstanding",
    customer: "Sundara Textiles Sdn Bhd",
    customerId: "C-10711",
    severity: "warning",
    category: "Credit",
    raised: "3d ago",
    summary: "FY25 audited financial statements are 22 days past the covenant submission date.",
    signals: ["Term loan covenant clause 7.2", "22 days overdue"],
    recommended: "Escalate to the credit officer and issue a formal reminder letter.",
  },
  {
    id: "AL-4362",
    title: "Hedging opportunity identified",
    customer: "Nordvik Logistics Pte Ltd",
    customerId: "C-10455",
    severity: "success",
    category: "Opportunity",
    raised: "4d ago",
    summary: "Projected 2027 EUR payables of EUR 6.2M are unhedged while forward points are favourable.",
    signals: ["EUR exposure up 34% YoY", "CFO expressed hedging appetite"],
    recommended: "Prepare a layered forward hedging proposal for the treasury committee.",
  },
];

export const maturities = [
  { id: "M-901", customer: "Hiroshi Tanaka", customerId: "C-10630", product: "Fixed Deposit — 6M", amount: 1_540_000, date: "2026-09-06", days: 6, instruction: "None" },
  { id: "M-902", customer: "Amelia Hartwell", customerId: "C-10241", product: "Fixed Deposit — 12M", amount: 2_300_000, date: "2026-09-18", days: 18, instruction: "Roll over" },
  { id: "M-903", customer: "Nordvik Logistics Pte Ltd", customerId: "C-10455", product: "Revolving Credit Facility", amount: 15_000_000, date: "2026-10-31", days: 61, instruction: "Renewal review" },
  { id: "M-904", customer: "Rajiv Menon", customerId: "C-10388", product: "Structured Deposit — 9M", amount: 600_000, date: "2026-09-29", days: 29, instruction: "None" },
  { id: "M-905", customer: "Clara Bennett", customerId: "C-10512", product: "Leveraged Note", amount: 1_500_000, date: "2027-02-10", days: 163, instruction: "Under review" },
];

export const recommendations = [
  { id: "R-501", customer: "Rajiv Menon", customerId: "C-10388", product: "ESG Global Equity Fund", fit: 92, rationale: "Stated ESG preference; current allocation has no sustainable sleeve.", revenue: 14_800 },
  { id: "R-502", customer: "Hiroshi Tanaka", customerId: "C-10630", product: "5-Year Bond Ladder", fit: 88, rationale: "Low risk appetite and a maturing deposit needing redeployment.", revenue: 22_400 },
  { id: "R-503", customer: "Amelia Hartwell", customerId: "C-10241", product: "Private Credit Feeder II", fit: 81, rationale: "Qualifies as accredited; seeking yield above deposit rates.", revenue: 61_000 },
  { id: "R-504", customer: "Nordvik Logistics Pte Ltd", customerId: "C-10455", product: "EUR Layered Forward Hedge", fit: 95, rationale: "Unhedged 2027 EUR payables of EUR 6.2M.", revenue: 38_500 },
  { id: "R-505", customer: "Sundara Textiles Sdn Bhd", customerId: "C-10711", product: "Supply Chain Finance Line", fit: 74, rationale: "Lengthening payable cycle observed in account flows.", revenue: 19_200 },
];

export const approvals = [
  { id: "AP-330", product: "Private Credit Feeder II", customer: "Amelia Hartwell", amount: 2_000_000, stage: "Credit review", submitted: "2026-08-26", status: "pending" as const, owner: "Credit Desk" },
  { id: "AP-331", product: "EUR Layered Forward Hedge", customer: "Nordvik Logistics Pte Ltd", amount: 6_200_000, stage: "Treasury sign-off", submitted: "2026-08-27", status: "pending" as const, owner: "Treasury" },
  { id: "AP-329", product: "Term Loan Restructure", customer: "Sundara Textiles Sdn Bhd", amount: 3_400_000, stage: "Completed", submitted: "2026-08-12", status: "approved" as const, owner: "Credit Desk" },
  { id: "AP-327", product: "Leveraged Note Top-up", customer: "Clara Bennett", amount: 500_000, stage: "Completed", submitted: "2026-08-04", status: "rejected" as const, owner: "Compliance" },
];

export const campaigns = [
  { id: "CM-21", name: "Q3 Deposit Rate Match", audience: 148, engaged: 63, converted: 21, status: "Active", ends: "2026-09-30" },
  { id: "CM-22", name: "Sustainable Investing Series", audience: 96, engaged: 41, converted: 9, status: "Active", ends: "2026-10-15" },
  { id: "CM-19", name: "Corporate FX Hedging Clinic", audience: 34, engaged: 22, converted: 12, status: "Closing", ends: "2026-09-05" },
  { id: "CM-17", name: "Wealth Transfer Workshop", audience: 61, engaged: 18, converted: 4, status: "Draft", ends: "2026-11-01" },
];

export const meetings = [
  { id: "EV-1", day: 31, time: "09:30", title: "Portfolio review", customer: "Amelia Hartwell", type: "Meeting" },
  { id: "EV-2", day: 31, time: "14:00", title: "Rollover call", customer: "Hiroshi Tanaka", type: "Call" },
  { id: "EV-3", day: 2, time: "11:00", title: "Trade facility renewal", customer: "Nordvik Logistics Pte Ltd", type: "Meeting" },
  { id: "EV-4", day: 3, time: "16:30", title: "Suitability re-assessment", customer: "Clara Bennett", type: "Compliance" },
  { id: "EV-5", day: 8, time: "10:00", title: "ESG shortlist walkthrough", customer: "Rajiv Menon", type: "Call" },
  { id: "EV-6", day: 10, time: "15:00", title: "Covenant escalation", customer: "Sundara Textiles Sdn Bhd", type: "Internal" },
];

export const revenueTrend = [
  { month: "Mar", revenue: 712, target: 700 },
  { month: "Apr", revenue: 748, target: 720 },
  { month: "May", revenue: 690, target: 740 },
  { month: "Jun", revenue: 812, target: 760 },
  { month: "Jul", revenue: 869, target: 780 },
  { month: "Aug", revenue: 921, target: 800 },
];

export const rmLeaderboard = [
  { name: "Priya Ramesh", team: "Corporate", aum: 62.4, revenue: 1.21, attainment: 118 },
  { name: "Daniel Okoro", team: "Private", aum: 41.9, revenue: 0.92, attainment: 104 },
  { name: "Mei Ling Chua", team: "Priority", aum: 33.2, revenue: 0.71, attainment: 96 },
  { name: "Tomas Berg", team: "Business", aum: 28.7, revenue: 0.58, attainment: 84 },
];

export const complianceItems = [
  { id: "CP-77", item: "Suitability profile expired", customer: "Clara Bennett", severity: "critical" as Status, due: "2026-09-02", owner: "Daniel Okoro" },
  { id: "CP-78", item: "KYC periodic review due", customer: "Rajiv Menon", severity: "warning" as Status, due: "2026-09-14", owner: "Daniel Okoro" },
  { id: "CP-79", item: "Source of wealth documentation", customer: "Nordvik Logistics Pte Ltd", severity: "warning" as Status, due: "2026-09-21", owner: "Priya Ramesh" },
  { id: "CP-80", item: "Annual attestation submitted", customer: "Amelia Hartwell", severity: "success" as Status, due: "2026-08-15", owner: "Daniel Okoro" },
];

export const auditLog = [
  { id: "LG-1", actor: "Daniel Okoro", action: "Opened Customer 360 — C-10241", at: "08:42" },
  { id: "LG-2", actor: "System", action: "Alert AL-4412 raised (Retention)", at: "07:15" },
  { id: "LG-3", actor: "Priya Ramesh", action: "Submitted approval AP-331", at: "Yesterday 17:02" },
  { id: "LG-4", actor: "Compliance Bot", action: "Suitability lapse flagged — C-10512", at: "Yesterday 03:00" },
];

export const users = [
  { id: "U-1", name: "Daniel Okoro", role: "Relationship Manager", team: "Private", active: true },
  { id: "U-2", name: "Priya Ramesh", role: "Senior Relationship Manager", team: "Corporate", active: true },
  { id: "U-3", name: "Mei Ling Chua", role: "Relationship Manager", team: "Priority", active: true },
  { id: "U-4", name: "Arun Prakash", role: "Compliance Officer", team: "Risk", active: false },
];
