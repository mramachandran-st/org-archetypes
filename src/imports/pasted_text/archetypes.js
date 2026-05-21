import { useState } from "react";

const archetypes = [
  {
    id: "franchise",
    label: "Archetype 1",
    name: "Franchise Network",
    tagline: "Territory is the organizing unit, not location",
    color: "#C84B1F",
    bg: "#FDF1EC",
    border: "#F5A98A",
    davidMapping: "Maps to David's Archetype 1 — Franchisors",
    customers: ["Authority Brands", "Ace Handyman"],
    gap: "Neighborly — no session yet",
    scale: "200–300+ tenants",
    growth: "Sell licensed territories (zip codes) to independent owners. Royalty model.",
    governance: "Franchisor can suggest, not mandate — unless it's in the contract. Each ownership layer has different authority.",
    keyTrait: "Multiple ownership layers coexist simultaneously: PE owner → franchisor → PE sub-networks → franchise owners → locations. Each layer has different governance rights and ST access needs.",
    stPain: [
      "No way to enforce territory boundaries — franchisees manually enter wrong zip codes to work outside their licensed area",
      "PE firm sub-networks sit outside the main EH — franchisor cannot see or manage them",
      "Open zipcodes have no ST representation — managed via API push or spreadsheet outside ST",
      "Franchise VPs (brand-specialist, cross-location) and corporate VPs (location-generalist) need completely different access models",
      "When brands tuck into one tenant, GBPs, marketing assets, and phone numbers merge — which franchisees may not want",
    ],
    orgLevels: [
      { label: "PE / Franchisor corporate", sublabel: "Authority Brands · PE above AB", role: "Network owner — defines roles, sets permission ceilings franchisees cannot exceed", top: true },
      { label: "PE sub-networks", sublabel: "3–4 firms · 4–12 tenants each · own EH", role: "Sub-admin — scoped to their tenants only. Franchisor cannot log into their EH today." },
      { label: "Franchise owner", sublabel: "1+ territories", role: "Local owner — P&L responsibility. Can be suggested to, not mandated. Local admin rights." },
      { label: "Location / Tenant", sublabel: "Physical location = tenant · can be tri-branded", role: "Local admin · office staff · dispatchers · service managers" },
      { label: "Brand (trade)", sublabel: "One Hour (HVAC) · Ben Franklin (Plumbing) · Sparky (Electrical)", role: "Trade VP — brand-specialist, cross-location for their trade only" },
      { label: "BU", sublabel: "Sales · Install · Service · Maintenance", role: "Technicians · CSRs — single location, single trade" },
    ],
    territory: {
      show: true,
      types: [
        { name: "Owned zipcodes", desc: "Licensed territory · legal/contractual · enforced · BU today", color: "#C84B1F" },
        { name: "Open zipcodes", desc: "Proximity-based · shared · no BU · no walls", color: "#888780" },
        { name: "Regions (FBC)", desc: "Franchise biz coach grouping · invisible in ST · Excel today", color: "#B4B2A9" },
      ]
    },
    quotes: [
      { text: "That's really what we sell as a franchise — zip codes that they can work in.", attr: "Amy · Ace Handyman · 00:17:49" },
      { text: "I get to say, you have to do it this way. Victor gets to say, I really strongly suggest — unless we get this written in the contract.", attr: "Margie · Authority Brands · 00:39:01" },
      { text: "I cannot log into their Enterprise Hub network.", attr: "Victor · Authority Brands · 00:14:57" },
      { text: "They can finagle it. They put the customer's zip code as their own zip code rather than the right one.", attr: "Amy · Ace Handyman · 00:20:54" },
    ]
  },
  {
    id: "singletenant",
    label: "Archetype 2",
    name: "Single-Tenant Enterprise",
    tagline: "Complex internal hierarchy within one tenant — or heading there",
    color: "#0F6E56",
    bg: "#EDF7F4",
    border: "#5DCAA5",
    davidMapping: "Maps to David's Archetypes 3 (Centralized Multi-Brand) + 4 (Centralized Single-Brand) — same platform requirements",
    customers: ["Hiller", "A1 Garage", "Turnpoint", "Michael & Son", "Horizon"],
    gap: "Goettl, Best Choice Roofing, DuraServ — no sessions yet",
    scale: "1 complex tenant to 60 tenants (multi-tenant by accident, consolidating)",
    growth: "Organic expansion + acquisition with rapid back-office integration. One customer-facing brand.",
    governance: "Centralized — corporate controls settings, config, and user management. No or minimal local admin.",
    keyTrait: "Many of these customers are multi-tenant today — but only because ST forced them there. Turnpoint has 55 tenants but one brand. Horizon has multiple tenants but one brand. The tenant boundary is a workaround, not a business requirement.",
    stPain: [
      "Multi-tenant by accident — ST couldn't scale single tenants, so customers were pushed into multi-tenant world they never wanted",
      "Every config change must be done tenant-by-tenant — no push-down model even for identical settings",
      "Corporate function users (call center, dispatch, accounting) have no proper access model — forced into admin or over-permissioned",
      "No way to group BUs into divisions or departments for reporting — customers do all grouping in Tableau or SQL outside ST",
      "Shared technicians occasionally work across locations — no home/temporary identity concept, no skill-based assignment",
      "Pricebook per geography needed — cost of living varies by market but ST only supports one pricebook per tenant",
    ],
    orgLevels: [
      { label: "Corporate HQ", sublabel: "ELT · IT · Finance · HR · Marketing · Call center · Accounting", role: "Org admin — full org, all settings. No local admin anywhere.", top: true },
      { label: "Centralized functions", sublabel: "Call center · Dispatch · Accounting · IT · Training", role: "Function user — cross-org visibility, department-scoped. Not admin, not field." },
      { label: "Regions / Districts", sublabel: "NE · SE · District 1 Nashville · East · West · Central", role: "Regional / district manager — aggregate visibility for benchmarking, not individual detail" },
      { label: "Locations / Branches / Markets", sublabel: "Cookville · Nashville Residential · Denver · Richmond", role: "Location manager / GM — single location, ops only. No settings access." },
      { label: "Trades / Divisions", sublabel: "HVAC · Plumbing · Electrical · Rooter & Drains", role: "Trade manager — single location, single trade. Skills-based tech assignment." },
      { label: "BUs → Job types", sublabel: "Install · Service · Sales · Maintenance · Duct Cleaning", role: "Technicians — home location primary, occasional temporary assignments." },
    ],
    territory: { show: false },
    quotes: [
      { text: "The way I look at this is I see us moving to one tenant across and consolidating all 60 to one. If all of these tenants are on one tenant, then we just have to slice — we just merge this into the other existing business unit and then all of a sudden it's done.", attr: "Nathan · Turnpoint · 00:13:30" },
      { text: "We as Michael and Son — we're actually 6 different LLCs that operate in this one ServiceTitan tenant. It's all Michael and Son. Unless you're at a number of conventions on our vehicles, you'll never know.", attr: "Jim · Michael & Son · 00:10:58" },
      { text: "Majority are single brand tenants. We don't really have a lot of division of like different brands within a tenant.", attr: "Billy · Horizon · 00:11:12" },
      { text: "Associate activity with a job, and then that naturally gives that association. Because I might do purchase orders for every single branch, but when associated with a job, I need that PO to give the right address.", attr: "Deborah · Hiller · 00:36:41" },
    ]
  },
  {
    id: "multibrand",
    label: "Archetype 3",
    name: "Multi-Brand Enterprise",
    tagline: "Genuinely distinct brands under one holding company — each needs structural separation",
    color: "#7A4F0A",
    bg: "#FDF6E8",
    border: "#FAC775",
    davidMapping: "Maps to David's Archetype 2 (Decentralized Multi-Brand) — transitional toward centralization, except Wrench (permanent)",
    customers: ["Service Experts", "Sila", "Wrench Group"],
    gap: "APEX — intro session only, likely fits here",
    scale: "20–100 tenants",
    growth: "Acquire businesses, scale through best practices, gradually centralize back-office. Some brands stay permanently separate.",
    governance: "Varies from fully centralized (Service Experts — no local admin, SOC controls) to semi-autonomous brands (Wrench — local locations run differently). The spectrum within this archetype is wide.",
    keyTrait: "Unlike single-tenant customers, these businesses have brands that are genuinely structurally distinct — different management, different data, sometimes competing in the same market. Multi-tenancy here reflects a real business boundary, not a ST workaround.",
    stPain: [
      "Every config change — integrations, BUs, job types, permissions, logos — must be done tenant-by-tenant. No push-down model.",
      "No way to group tenants under a region or holding company layer — tracked externally in spreadsheets",
      "Corporate users need cross-tenant access with scoped permissions — currently all-or-nothing",
      "Competitors in same market (Parker & Sons vs Collins in Phoenix) must stay permanently separated — this is intentional, not a legacy problem",
      "Role standardization across brands requires going brand-by-brand — no top-down role push across tenants",
      "BI reporting requires external tools because ST has no cross-tenant aggregation — the missing org unit above BU is the root cause",
    ],
    orgLevels: [
      { label: "Holding company", sublabel: "Wrench Group Enterprise · Sila Network · Service Experts Organization", role: "Network admin — all brands, all settings. Small team with full access.", top: true },
      { label: "Corporate layer", sublabel: "IT · Finance · Call center · HR · Marketing (centralized or thin)", role: "Function user — cross-brand, department-scoped. May be fully centralized (SE) or thin (Wrench)." },
      { label: "Regions", sublabel: "4 Regions (Sila) · Region 1 Central · Region 2 West (Wrench)", role: "Regional VP — subset of brands in region. Optional layer — Wrench doesn't use regions meaningfully today." },
      { label: "Brand / Tenant", sublabel: "Sila Boston · NETR · Collins · Parker & Sons · One Hour Heating", role: "Brand admin (Wrench) or corporate-controlled (SE/Sila). Brand = distinct business with own data." },
      { label: "Trades / Divisions", sublabel: "HVAC Collins · Plumbing Jarboe's · Divisions (Svc + Maintenance)", role: "Location manager — single brand. Technicians cannot cross-trade within Wrench." },
      { label: "BUs", sublabel: "Buckeye HVAC · Install · Service · Maintenance", role: "Technicians — home brand + occasional temporary cross-brand assignments." },
    ],
    territory: { show: false },
    quotes: [
      { text: "We have the corporate side of the house, and then we have the field side of the house. The field has regions, divisions, and then locations. The corporate side has departments.", attr: "Maria · Service Experts · 00:25:35" },
      { text: "Every time I have to do an integration, it has to be done tenant by tenant by tenant by tenant. That is not efficient.", attr: "Maria · Service Experts · 00:20:09" },
      { text: "There's no way in hell we're gonna be able to dictate at an enterprise level what every location does because they're their own businesses. We can standardize maybe 30% at most.", attr: "Tony · Wrench · 00:21:59" },
      { text: "Two brands merged into one tenant, separated by business unit. That's the only way for us right now. To work around it.", attr: "Tural · Sila · 00:20:21" },
    ]
  }
];

const patterns = [
  {
    id: "two-skeleton",
    icon: "⊞",
    name: "The Two-Skeleton Problem",
    short: "Every enterprise org has two parallel structures that require opposite logic",
    desc: "When asked to draw their ideal org, every customer independently drew two separate structures — not one. A field/operational skeleton (geographic, hierarchical — access flows downward) and a corporate/functional skeleton (flat, cross-cutting — config needs to push downward simultaneously). ST currently models neither correctly.",
    detail: "Field access flows down the tree. Corporate configuration needs to push down to all tenants at once. These are opposite directions and opposite product problems. Solving one does not solve the other.",
    appearsIn: ["Service Experts", "A1 Garage", "Sila", "Authority Brands", "Hiller", "Horizon"],
    quote: { text: "We have the corporate side of the house, and then we have the field side of the house. The field has regions, divisions, and then locations. The corporate side has departments.", attr: "Maria · Service Experts · 00:25:35" },
    color: "#534AB7"
  },
  {
    id: "brand",
    icon: "◈",
    name: "Brand Means Three Different Things",
    short: "Where brand sits in the hierarchy determines what the platform needs to do with it",
    desc: "Customers use the word 'brand' to mean three structurally different things — and each requires a different platform response. The reason brand creates so much BU bloat is that customers are forced to use BUs to simulate separation that should be native to a brand layer.",
    detail: "Top: enterprise umbrella — the single name covering everything externally. Purely presentational, no structural implications for ST. Local: which identity a tech or location operates under in a specific market. Needs to drive profiles and logos, not data walls. Entity: a genuinely distinct business with its own operations, data, and sometimes legal identity. Needs structural separation — data walls, access control, and in franchise cases, compliance rules.",
    appearsIn: ["All customers", "Most explicitly: Wrench, A1 Garage, Michael & Son, Authority Brands"],
    quote: { text: "You've got tenants, but then you've got brands within tenants. Not all the brands within the tenants are structured the same way either. If you lock it down at any one of those levels, we can't use it.", attr: "Tony · Wrench · 00:22:40" },
    color: "#C84B1F"
  },
  {
    id: "tenant-workaround",
    icon: "⬡",
    name: "Tenants and BUs Are Both Workarounds for the Same Problem",
    short: "ST has no data walls within a tenant and no brand layer between tenant and BU",
    desc: "Customers use two different workarounds for the same root cause — the absence of native data walls and brand hierarchy in ST. Some create new tenants to get data separation between brands. Others pile everything into BUs to simulate structure. Both are coping strategies for the same missing capability.",
    detail: "The missing capability: a configurable layer between tenant and BU that can carry data walls, brand identity, access control, and config rules. Without it, customers are stuck choosing between tenant proliferation (expensive, hard to manage) or BU bloat (no walls, no hierarchy, no separation).",
    appearsIn: ["All customers"],
    quote: { text: "We were forcing customers to deploy into multi-tenant world. And I think Horizon has been multi-tenant for over 5 or 6 years. That's more like shortcuts here and there that we had to make.", attr: "David · ST · Horizon session" },
    color: "#7A4F0A"
  },
  {
    id: "home-temp",
    icon: "⇄",
    name: "Home vs Temporary Identity",
    short: "The system treats home and temporary assignments as the same thing",
    desc: "Technicians and staff regularly work outside their primary location. The system treats home and temporary assignments identically — creating multiple logins, broken inventory, and wrong payroll attribution. Every customer tracks this distinction outside ST in BI tools and spreadsheets.",
    detail: "Primary assignment drives payroll, inventory (truck), performance tracking, and primary profile. Temporary assignment should drive access scope and profile context for that assignment. Today ST has no concept of this distinction — creating duplicate accounts, manual access management, and inventory reconciliation problems.",
    appearsIn: ["Service Experts", "A1 Garage", "Wrench", "Horizon"],
    quote: { text: "We're sharing a plumber working in 3 centers every week. He's not changing trucks.", attr: "Maria · Service Experts" },
    color: "#0F6E56"
  },
  {
    id: "consolidation",
    icon: "△",
    name: "Three Consolidation Postures",
    short: "Org Studio must serve three fundamentally different relationships to consolidation simultaneously",
    desc: "Customers are not uniformly moving toward consolidation. Three distinct postures exist and the platform must serve all three without assuming any one direction.",
    detail: "Consolidators (Sila, Service Experts, Turnpoint): want a migration path and a readiness checklist before they merge. Permanent multi-tenant (Wrench): need separation as a first-class option — Parker & Sons and Collins are competitors and will never consolidate. Undecided (Ace): need a portable structure that works whether they consolidate later or not.",
    appearsIn: ["All customers"],
    quote: { text: "I see us moving to one tenant across and consolidating all 60 to one. If all of these tenants are on one tenant, then we just have to slice — merge this into the other existing business unit and it's done.", attr: "Nathan · Turnpoint · 00:13:30" },
    color: "#534AB7"
  }
];

const glossary = [
  { term: "Tenant", customer: "companies, centers, locations, brands", def: "A ServiceTitan instance. A technical container — not how customers describe their business. No customer in Phase 1 said 'tenant' first when describing their org structure. For single-tenant enterprise customers, multi-tenancy was imposed by ST, not chosen." },
  { term: "Brand", customer: "brand, company, trade, name", def: "Means three different things: (1) enterprise umbrella — one name covering everything externally, purely presentational; (2) local identity — which trade company operates in a specific market, drives profiles not structure; (3) entity — a structurally distinct business needing data walls and access control." },
  { term: "Location", customer: "centers, offices, markets, branches, shops", def: "A physical office or service area. The primary organizing unit for most customers. Can contain multiple brands (Wrench) or represent just one brand in one market (A1 Garage)." },
  { term: "Region", customer: "regions, districts, divisions, areas", def: "A management grouping — but means different things per customer. Geographic cluster (Service Experts), pricebook zone only (Horizon), franchise biz coach portfolio (Ace), invisible Excel grouping (Wrench/Sila). Wrench explicitly doesn't want regions enforced — 'having the option is nice, being locked into it is terrible.'" },
  { term: "Territory", customer: "zip codes, zones, areas", def: "A legally-bounded geographic concept specific to franchise businesses. Three types: owned zipcodes (licensed, enforced), open zipcodes (shared, proximity-based), regions (management only). Completely different from a Location — not modeled in ST today." },
  { term: "Business Unit (BU)", customer: "departments, brands, territories, job types, divisions", def: "Currently doing 6+ different jobs across customers: financial departments, territory zones, brand separation, brand × trade combos, geographic markets, job type groupings. A flat list with no hierarchy and no data walls. The universal workaround for everything ST can't model natively." },
  { term: "Corporate layer", customer: "corporate, HQ, back office, the office", def: "Centralized functions (IT, finance, call center, HR, marketing) that serve all locations. Needs cross-org visibility but is NOT part of the field hierarchy. Drawn separately in every FigJam session. Config from here needs to push down to all tenants simultaneously." },
  { term: "Home market", customer: "home market, home center, home branch", def: "A technician's primary location — where payroll is attributed, truck inventory registered, and performance tracked. Customers track variance from home market outside ST in BI tools. ST treats home and temporary assignments as identical." },
  { term: "Push-down config", customer: "centralized settings, propagate, apply to all", def: "The ability to define a configuration at the corporate level and have it automatically apply to all tenants — not tenant-by-tenant. Currently doesn't exist in ST. Maria (Service Experts): 'every integration has to be done tenant by tenant by tenant by tenant.'" },
  { term: "Non-human account", customer: "service account, display user, reporting user", def: "Accounts that should never be logged into — used for scheduled reports, dispatch board displays, or vendor tech profiles. Currently hacked as employee accounts. Piper (Wrench): 'there are accounts that really should never be logged into. They just exist.'" },
];

const OrgTree = ({ archetype: a }) => (
  <div style={{ fontFamily: "monospace", fontSize: 12 }}>
    {a.orgLevels.map((l, i) => (
      <div key={i} style={{ display: "flex", marginBottom: 8, alignItems: "flex-start", gap: 10 }}>
        <div style={{ paddingLeft: i === 0 ? 0 : i * 12, flexShrink: 0, display: "flex", alignItems: "flex-start", gap: 4 }}>
          {i > 0 && <span style={{ color: "#ddd", paddingTop: 5, fontSize: 10 }}>└</span>}
          <div>
            <div style={{ background: l.top ? a.color : "white", color: l.top ? "white" : a.color, border: `1.5px solid ${a.color}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>{l.label}</div>
            {l.sublabel && <div style={{ fontSize: 10, color: "#999", paddingLeft: 4, paddingTop: 2 }}>{l.sublabel}</div>}
          </div>
        </div>
        <div style={{ color: "#777", fontSize: 11, paddingTop: 5, lineHeight: 1.5, fontFamily: "sans-serif" }}>{l.role}</div>
      </div>
    ))}
    {a.territory?.show && (
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px dashed #ddd" }}>
        <div style={{ fontSize: 10, color: "#999", marginBottom: 8, fontStyle: "italic" }}>Territory layer — separate from org hierarchy</div>
        {a.territory.types.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
            <span style={{ fontWeight: 600, color: t.color, fontSize: 11 }}>{t.name}</span>
            <span style={{ color: "#888", fontSize: 11, fontFamily: "sans-serif" }}>— {t.desc}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default function App() {
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState(null);
  const go = (v, data = null) => { setView(v); setSelected(data); window.scrollTo && window.scrollTo(0, 0); };

  if (view === "archetype" && selected) {
    const a = selected;
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF9", fontFamily: "Georgia, serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ background: a.color, padding: "40px 48px 36px" }}>
          <button onClick={() => go("home")} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", marginBottom: 20, fontFamily: "sans-serif" }}>← All archetypes</button>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>{a.label}</div>
          <h1 style={{ fontSize: 38, fontWeight: 400, margin: "0 0 8px", color: "white" }}>{a.name}</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", margin: "0 0 14px", fontStyle: "italic" }}>{a.tagline}</p>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace", background: "rgba(0,0,0,0.15)", display: "inline-block", padding: "4px 10px", borderRadius: 6 }}>{a.davidMapping}</div>
        </div>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
            {[
              { label: "Sessions completed", value: a.customers.join(" · ") },
              { label: "Coverage gap", value: a.gap },
              { label: "Scale", value: a.scale },
            ].map((item, i) => (
              <div key={i} style={{ background: a.bg, border: `1px solid ${a.border}`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: a.color, marginBottom: 5, fontFamily: "'DM Mono', monospace" }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "#404040", lineHeight: 1.5, fontFamily: "sans-serif" }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 400, marginBottom: 12, color: "#1a1a1a" }}>Org structure</h2>
              <div style={{ background: "white", border: `1px solid ${a.border}`, borderRadius: 12, padding: 20, overflowX: "auto" }}>
                <OrgTree archetype={a} />
              </div>
              <div style={{ marginTop: 12, background: a.bg, border: `1px solid ${a.border}`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: a.color, marginBottom: 5, fontFamily: "'DM Mono', monospace" }}>Key trait</div>
                <p style={{ fontSize: 13, color: "#404040", margin: "0 0 8px", lineHeight: 1.6, fontFamily: "sans-serif" }}>{a.keyTrait}</p>
                <p style={{ fontSize: 12, color: "#666", margin: 0, lineHeight: 1.5, fontFamily: "sans-serif" }}>Governance: {a.governance}</p>
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 400, marginBottom: 12, color: "#1a1a1a" }}>What breaks in ST today</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {a.stPain.map((p, i) => (
                  <div key={i} style={{ background: "#FAECE7", border: "1px solid #F5A98A", borderRadius: 8, padding: "9px 13px", fontSize: 12.5, color: "#4A1B0C", lineHeight: 1.55, fontFamily: "sans-serif", display: "flex", gap: 8 }}>
                    <span style={{ color: "#D85A30", flexShrink: 0 }}>✕</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 400, marginBottom: 12, color: "#1a1a1a" }}>What customers said</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {a.quotes.map((q, i) => (
              <div key={i} style={{ display: "flex", background: "white", borderRadius: 10, overflow: "hidden", border: "1px solid #E8E6E1" }}>
                <div style={{ width: 3, background: a.color, flexShrink: 0 }} />
                <div style={{ padding: "12px 14px" }}>
                  <p style={{ fontStyle: "italic", fontSize: 13.5, color: "#404040", margin: "0 0 6px", lineHeight: 1.6 }}>"{q.text}"</p>
                  <p style={{ fontSize: 11, color: a.color, margin: 0, fontFamily: "'DM Mono', monospace" }}>— {q.attr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "patterns") {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF9", fontFamily: "Georgia, serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ background: "#1a1a1a", padding: "40px 48px 36px" }}>
          <button onClick={() => go("home")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", marginBottom: 20, fontFamily: "sans-serif" }}>← Back</button>
          <h1 style={{ fontSize: 38, fontWeight: 400, margin: "0 0 8px", color: "white" }}>Cross-cutting patterns</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: 0, fontStyle: "italic" }}>Five things that show up across all archetypes</p>
        </div>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 32px" }}>
          {patterns.map((p, i) => (
            <div key={i} style={{ background: "white", border: "1px solid #E8E6E1", borderRadius: 14, padding: "24px 28px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 20, background: p.color + "18", width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: p.color }}>{p.icon}</div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 400, margin: "0 0 4px" }}>{p.name}</h2>
                  <p style={{ fontSize: 13, color: p.color, margin: 0, fontFamily: "sans-serif", fontWeight: 500 }}>{p.short}</p>
                </div>
              </div>
              <p style={{ fontSize: 13.5, color: "#404040", margin: "0 0 10px", lineHeight: 1.7, fontFamily: "sans-serif" }}>{p.desc}</p>
              <p style={{ fontSize: 13, color: "#666", margin: "0 0 14px", lineHeight: 1.6, fontFamily: "sans-serif" }}>{p.detail}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                <span style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace", paddingTop: 3 }}>Seen in:</span>
                {p.appearsIn.map((c, j) => (
                  <span key={j} style={{ background: "#F5F4F0", border: "1px solid #E8E6E1", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontFamily: "sans-serif" }}>{c}</span>
                ))}
              </div>
              <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid #E8E6E1" }}>
                <div style={{ width: 3, background: p.color, flexShrink: 0 }} />
                <div style={{ padding: "10px 14px" }}>
                  <p style={{ fontStyle: "italic", fontSize: 13, color: "#404040", margin: "0 0 4px" }}>"{p.quote.text}"</p>
                  <p style={{ fontSize: 11, color: p.color, margin: 0, fontFamily: "'DM Mono', monospace" }}>— {p.quote.attr}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "glossary") {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF9", fontFamily: "Georgia, serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ background: "#1E2B1E", padding: "40px 48px 36px" }}>
          <button onClick={() => go("home")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", marginBottom: 20, fontFamily: "sans-serif" }}>← Back</button>
          <h1 style={{ fontSize: 38, fontWeight: 400, margin: "0 0 8px", color: "white" }}>Glossary</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: 0, fontStyle: "italic" }}>What customers call things vs what ST calls them</p>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "36px 32px" }}>
          {glossary.map((t, i) => (
            <div key={i} style={{ borderBottom: "1px solid #E8E6E1", padding: "18px 0", display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 400, color: "#1a1a1a", marginBottom: 4 }}>{t.term}</div>
                <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace" }}>customers say: {t.customer}</div>
              </div>
              <div style={{ fontSize: 13.5, color: "#555", lineHeight: 1.7, fontFamily: "sans-serif", paddingTop: 2 }}>{t.def}</div>
            </div>
          ))}
          <div style={{ marginTop: 32, background: "#FDF6E8", border: "1px solid #FAC775", borderRadius: 10, padding: "16px 20px" }}>
            <p style={{ fontSize: 13, color: "#7A4F0A", margin: 0, lineHeight: 1.6, fontFamily: "sans-serif" }}>
              <strong>Note:</strong> No customer in Phase 1 said "tenant" first when describing their business. Tenant is ServiceTitan's word. The vocabulary customers use — region, brand, center, market, territory — should drive Org Studio's naming and UX.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (view === "compare") {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF9", fontFamily: "Georgia, serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ background: "#2A1F3D", padding: "40px 48px 36px" }}>
          <button onClick={() => go("home")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", marginBottom: 20, fontFamily: "sans-serif" }}>← Back</button>
          <h1 style={{ fontSize: 38, fontWeight: 400, margin: "0 0 8px", color: "white" }}>Research vs PM framework</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: 0, fontStyle: "italic" }}>How this maps to David's 4-archetype framework — and where they diverge</p>
        </div>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 32px" }}>
          <div style={{ background: "white", border: "1px solid #E8E6E1", borderRadius: 14, padding: "24px 28px", marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 400, marginBottom: 16 }}>Mapping</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#F5F4F0" }}>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid #E8E6E1", fontWeight: 500 }}>David's archetype</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid #E8E6E1", fontWeight: 500 }}>Research archetype</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", borderBottom: "1px solid #E8E6E1", fontWeight: 500 }}>Sessions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1. Franchisors", "1. Franchise Network", "Authority Brands ✓ · Ace Handyman ✓", "#C84B1F"],
                  ["2. Decentralized Multi-Brand", "3. Multi-Brand Enterprise", "Wrench ✓ · Sila ✓", "#7A4F0A"],
                  ["3. Centralized Multi-Brand", "3. Multi-Brand Enterprise", "Service Experts ✓", "#7A4F0A"],
                  ["4a. Centralized Single-Brand (Residential)", "2. Single-Tenant Enterprise", "Hiller ✓ · A1 Garage ✓ · Turnpoint ✓ · Michael & Son ✓ · Horizon ✓", "#0F6E56"],
                  ["4b. Exteriors", "2. Single-Tenant Enterprise (likely)", "No sessions yet — Best Choice Roofing", "#888"],
                  ["4c. Commercial", "2. Single-Tenant Enterprise (likely)", "No sessions yet — DuraServ", "#888"],
                ].map(([d, r, s, c], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F0EFEB" }}>
                    <td style={{ padding: "10px 14px", color: "#404040" }}>{d}</td>
                    <td style={{ padding: "10px 14px" }}><span style={{ background: c + "18", color: c, border: `1px solid ${c}40`, borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 500 }}>{r}</span></td>
                    <td style={{ padding: "10px 14px", color: "#888", fontSize: 12 }}>{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div style={{ background: "#E1F5EE", border: "1px solid #5DCAA5", borderRadius: 12, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 10, color: "#085041" }}>Key insight: organized by platform requirements, not business strategy</h3>
              <p style={{ fontSize: 13, color: "#0F6E56", margin: 0, lineHeight: 1.6, fontFamily: "sans-serif" }}>David's framework segments by growth model — useful for sales and segmentation. This research segments by what the platform needs to build. Archetypes 3 and 4 in David's framework are combined here because Hiller and Service Experts drew the same FigJam diagram and need identical platform capabilities.</p>
            </div>
            <div style={{ background: "#FAECE7", border: "1px solid #F5A98A", borderRadius: 12, padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 10, color: "#4A1B0C" }}>Coverage gaps</h3>
              <p style={{ fontSize: 13, color: "#D85A30", margin: 0, lineHeight: 1.6, fontFamily: "sans-serif" }}>No sessions from David's 4b (Exteriors — Best Choice Roofing) or 4c (Commercial — DuraServ). These sub-types may have distinct platform requirements. APEX was an intro session only — likely Multi-Brand Enterprise but unconfirmed.</p>
            </div>
          </div>
          <div style={{ background: "#F0EFFE", border: "1px solid #AFA9EC", borderRadius: 12, padding: "20px 22px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 8, color: "#3C3489" }}>Two customers not in David's framework</h3>
            <p style={{ fontSize: 13, color: "#534AB7", margin: 0, lineHeight: 1.6, fontFamily: "sans-serif" }}><strong>Sila</strong> — fits Decentralized Multi-Brand (current) transitioning toward Centralized Multi-Brand (aspirational). Adds the M&A tuck-in pattern and BI data model pain. <strong>Turnpoint</strong> — 55 tenants consolidating to 1 brand. Most explicit consolidation roadmap of any customer. Both validate the transition arc from Multi-Brand → Single-Tenant Enterprise.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF9", fontFamily: "Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ background: "#0C1710", padding: "68px 48px 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 15% 60%, rgba(15,110,86,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(200,75,31,0.12) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 820 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 18, fontFamily: "'DM Mono', monospace" }}>Org Studio Design Partner Program · Phase 1 · 2026</div>
          <h1 style={{ fontSize: 52, fontWeight: 400, margin: "0 0 18px", color: "white", lineHeight: 1.08 }}>Enterprise org<br /><em style={{ color: "rgba(255,255,255,0.7)" }}>archetypes</em></h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: "0 0 28px", lineHeight: 1.75, maxWidth: 560, fontFamily: "sans-serif" }}>How home services enterprise customers actually organize their businesses — and where ServiceTitan gets in the way. Based on 10 customer sessions and FigJam whiteboarding.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["10 customers", "3 archetypes", "5 cross-cutting patterns", "Phase 1 · April–May 2026"].map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.45)" }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", padding: "52px 32px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <h2 style={{ fontSize: 24, fontWeight: 400, margin: 0, color: "#1a1a1a" }}>The three archetypes</h2>
            <span style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace" }}>Organized by platform requirements, not business strategy</span>
          </div>
          <p style={{ fontSize: 13.5, color: "#888", margin: "0 0 24px", fontFamily: "sans-serif" }}>Click any archetype to explore the org structure, what breaks in ST today, and direct customer quotes with timestamps.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {archetypes.map(a => (
              <div key={a.id} onClick={() => go("archetype", a)}
                style={{ background: "white", border: `1.5px solid ${a.border}`, borderRadius: 14, padding: "22px 26px", cursor: "pointer", display: "grid", gridTemplateColumns: "3fr 2fr 2fr", gap: 20, alignItems: "start", transition: "box-shadow 0.15s, transform 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: a.color, marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>{a.label}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 400, margin: "0 0 6px", color: "#1a1a1a" }}>{a.name}</h3>
                  <p style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.5, fontFamily: "sans-serif" }}>{a.tagline}</p>
                </div>
                <div>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>Sessions</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {a.customers.map((c, i) => (
                      <span key={i} style={{ background: a.bg, border: `1px solid ${a.border}`, borderRadius: 10, padding: "2px 8px", fontSize: 11, color: a.color, fontFamily: "sans-serif" }}>{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>Top ST pain</div>
                  <p style={{ fontSize: 12, color: "#555", margin: 0, lineHeight: 1.5, fontFamily: "sans-serif" }}>{a.stPain[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 48 }}>
          {[
            { label: "Cross-cutting patterns", desc: "5 patterns across all archetypes", icon: "⊞", action: () => go("patterns"), bg: "#1a1a1a" },
            { label: "Glossary", desc: "What customers call things vs ST", icon: "⌨", action: () => go("glossary"), bg: "#1E2B1E" },
            { label: "vs PM framework", desc: "How this maps to David's 4 archetypes", icon: "⇌", action: () => go("compare"), bg: "#2A1F3D" },
          ].map((item, i) => (
            <div key={i} onClick={item.action} style={{ background: item.bg, borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              <div style={{ fontSize: 20, marginBottom: 10, color: "white" }}>{item.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 400, margin: "0 0 6px", color: "white" }}>{item.label}</h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5, fontFamily: "sans-serif" }}>{item.desc}</p>
            </div>
          ))}
          <div style={{ background: "#F5F4F0", border: "1px solid #E8E6E1", borderRadius: 14, padding: "22px 20px" }}>
            <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace", lineHeight: 1.7 }}>
              <strong style={{ color: "#404040", display: "block", marginBottom: 6 }}>Research note</strong>
              Archetypes organized by platform requirements. David's 3 + 4 collapse here — same ST needs regardless of brand count. No sessions from Exteriors (4b) or Commercial (4c).
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E8E6E1", padding: "20px 48px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>Org Studio Design Partner Program · Phase 1 · Meera Ramachandran, UXR</span>
        <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>DRAFT — do not distribute</span>
      </div>
    </div>
  );
}