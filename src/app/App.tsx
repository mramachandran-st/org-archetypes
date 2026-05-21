import React, { useState } from "react";
import { MapPin, Tag, Wrench, LayoutGrid, Globe, Flag } from "lucide-react";

const archetypes = [
  {
    id: "singlebrand",
    label: "Archetype 1",
    name: "Single-Brand Enterprise",
    tagline: "One brand everywhere. Hiller is Hiller in Nashville and Denver. A1 Garage is A1 in every market. The org may be complex; the customer-facing identity is not.",
    color: "#A07808",
    bg: "#FDF8E2",
    border: "#E8D058",
    customers: ["Hiller", "A1 Garage", "Turnpoint", "Michael & Son", "Horizon"],
    scale: "1 complex instance to 60 instances, consolidating toward one",
    growth: "Organic expansion + acquisition with rapid back-office integration. One customer-facing brand.",
    governance: "Centralized. Corporate controls settings, config, and user management. No or minimal local admin.",
    keyTrait: "These customers operate as one brand everywhere. They needed clean data separation between divisions, markets, or acquired businesses, but ST had no native way to provide it. Turnpoint has 55 instances but one brand. Horizon has multiple instances but one brand. The boundary exists to fill a gap, not to reflect how the business actually works.",
    findings: [
      {
        label: "Missing layer above the operating unit",
        pain: "No division or market layer between corporate and the location. BUs carry the entire org structure but are flat, with no hierarchy and no data walls.",
        quote: { text: "We as Michael and Son — we're actually 6 different LLCs that operate in this one ServiceTitan tenant. It's all Michael and Son. Unless you're at a number of conventions on our vehicles, you'll never know.", attr: "Jim · Michael & Son · 00:10:58" },
      },
    ],
    orgLevels: [
      { label: "Corporate HQ", sublabel: "ELT · IT · Finance · HR · Marketing · Call center · Accounting", role: "Org admin, full org, all settings. No local admin anywhere.", top: true },
      { label: "Centralized functions", sublabel: "Call center · Dispatch · Accounting · IT · Training", role: "Function user, cross-org visibility, department-scoped. Not admin, not field." },
      { label: "Regions / Districts", sublabel: "NE · SE · District 1 Nashville · East · West · Central", role: "Regional / district manager, aggregate visibility for benchmarking, not individual detail" },
      { label: "Locations / Branches / Markets", sublabel: "Cookeville TN · Nashville · Denver · Richmond VA", role: "Location manager / GM, single location, ops only. No settings access." },
      { label: "Trades / Divisions", sublabel: "HVAC · Plumbing · Electrical · Rooter & Drains", role: "Trade manager, single location, single trade. Skills-based tech assignment." },
      { label: "BUs", sublabel: "Install · Service · Sales · Maintenance · Duct Cleaning", role: "Technicians, home location primary, occasional temporary assignments." },
    ],
    territory: { show: false },
  },
  {
    id: "multibrand",
    label: "Archetype 2",
    name: "Multi-Brand Enterprise",
    tagline: "Distinct brands under one holding company, each with its own structural separation.",
    color: "#6050A8",
    bg: "#EDEAF8",
    border: "#B8AEE0",
    customers: ["Service Experts", "Sila", "Wrench Group"],
    scale: "20–100 tenants",
    growth: "Acquire businesses, scale through best practices, gradually centralize back-office. Some brands stay permanently separate.",
    governance: "Varies from fully centralized (Service Experts: central ops mandates all settings) to semi-autonomous brands (Wrench: local locations run differently). The spectrum within this archetype is wide.",
    keyTrait: "Unlike single-brand customers, these businesses have brands that are structurally distinct, with different management, different data, sometimes competing in the same market. Multi-tenancy here reflects a real business boundary, not a ST workaround.",
    findings: [
      {
        label: "No push-down model",
        pain: "Every integration, permission change, logo, and job type must be configured tenant-by-tenant. No mechanism to push from the holding company to all brands at once.",
        quote: { text: "Every time I have to do an integration, it has to be done tenant by tenant by tenant by tenant. That is not efficient.", attr: "Maria · Service Experts · 00:20:09" },
      },
      {
        label: "Access model too coarse",
        pain: "Corporate users who need visibility across some brands — not all — have no model. Cross-tenant access is all-or-nothing. ST can't express a role that spans a subset of tenants.",
        quote: { text: "We have the corporate side of the house, and then we have the field side of the house. The field has regions, divisions, and then locations. The corporate side has departments.", attr: "Maria · Service Experts · 00:25:35" },
      },
      {
        label: "Missing layer above the operating unit",
        pain: "No holding-company or brand layer above the tenant exists in ST. Customers simulate it with BUs, which have no hierarchy and no data walls.",
        quote: { text: "Two brands merged into one tenant, separated by business unit. That's the only way for us right now. To work around it.", attr: "Tural · Sila · 00:20:21" },
      },
    ],
    orgLevels: [
      { label: "Holding company", sublabel: "Wrench Group Enterprise · Sila Network · Service Experts Organization", role: "Network admin, all brands, all settings. Small team with full access.", top: true },
      { label: "Corporate layer", sublabel: "IT · Finance · Call center · HR · Marketing (centralized or thin)", role: "Function user, cross-brand, department-scoped. May be fully centralized (SE) or thin (Wrench)." },
      { label: "Regions", sublabel: "4 Regions (Sila) · Region 1 Central · Region 2 West (Wrench)", role: "Regional VP, subset of brands in region. Optional layer. Wrench doesn't use regions meaningfully today." },
      { label: "Brand / Tenant", sublabel: "Sila Boston · NETR · Collins · Parker & Sons · One Hour Heating", role: "Brand admin (Wrench) or corporate-controlled (SE/Sila). Brand = distinct business with own data." },
      { label: "Trades / Divisions", sublabel: "HVAC Collins · Plumbing Jarboe's · Divisions (Svc + Maintenance)", role: "Location manager, single brand. Technicians cannot cross-trade within Wrench." },
      { label: "BUs", sublabel: "Buckeye HVAC · Install · Service · Maintenance", role: "Technicians, home brand + occasional temporary cross-brand assignments." },
    ],
    territory: { show: false },
  },
  {
    id: "franchise",
    label: "Archetype 3",
    name: "Franchise Network",
    tagline: "A franchise sells licensed zip codes, not locations. The same owner can hold multiple territories across multiple brands, with a franchisor who can suggest but rarely mandate.",
    color: "#0B7A6C",
    bg: "#E8F7F4",
    border: "#7ED4C8",
    customers: ["Authority Brands", "Ace Handyman"],
    scale: "200–300+ tenants",
    growth: "Sell licensed territories (zip codes) to independent owners. Royalty model.",
    governance: "Franchisor can suggest, not mandate, unless it's in the contract. Each ownership layer has different authority.",
    keyTrait: "Multiple ownership layers coexist simultaneously: PE owner → franchisor → PE sub-networks → franchise owners → locations. Each layer has different governance rights and ST access needs.",
    findings: [
      {
        label: "No push-down model",
        pain: "The franchisor can suggest settings and configs but has no mechanism to enforce or propagate them — unless explicitly written into the franchise contract.",
        quote: { text: "I get to say, you have to do it this way. Victor gets to say, I really strongly suggest — unless we get this written in the contract.", attr: "Margie · Authority Brands · 00:39:01" },
      },
      {
        label: "Access model too coarse",
        pain: "The franchisor cannot access PE sub-network Enterprise Hubs. Franchise VPs (brand-specialist, cross-location) and corporate VPs (location-generalist) need entirely different access models ST cannot express.",
        quote: { text: "I cannot log into their Enterprise Hub network.", attr: "Victor · Authority Brands · 00:14:57" },
      },
      {
        label: "Territory has no ST representation",
        pain: "Territory (licensed zip codes) has no native ST representation. Boundaries are enforced manually — or not at all.",
        quote: { text: "They can finagle it. They put the customer's zip code as their own zip code rather than the right one.", attr: "Amy · Ace Handyman · 00:20:54" },
      },
    ],
    orgLevels: [
      { label: "PE / Franchisor corporate", sublabel: "Authority Brands · PE above AB", role: "Network owner, defines roles, sets permission ceilings franchisees cannot exceed", top: true },
      { label: "PE sub-networks", sublabel: "3–4 firms · 4–12 tenants each · own EH", role: "Sub-admin, scoped to their tenants only. Franchisor cannot log into their EH today." },
      { label: "Franchise owner", sublabel: "1+ territories", role: "Local owner, P&L responsibility. Can be suggested to, not mandated. Local admin rights." },
      { label: "Location / Tenant", sublabel: "Physical location = tenant · can be tri-branded", role: "Local admin · office staff · dispatchers · service managers" },
      { label: "Brand (trade)", sublabel: "One Hour (HVAC) · Ben Franklin (Plumbing) · Sparky (Electrical)", role: "Trade VP, brand-specialist, cross-location for their trade only" },
      { label: "BU", sublabel: "Sales · Install · Service · Maintenance", role: "Technicians · CSRs, single location, single trade" },
    ],
    territory: {
      show: true,
      types: [
        { name: "Owned zipcodes", desc: "The franchise license itself · defines owner scope · enforced contractually · no ST representation", color: "#0B7A6C" },
        { name: "Open zipcodes", desc: "Proximity-based · shared · no BU · no walls", color: "#888780" },
        { name: "Regions (FBC)", desc: "Franchise biz coach grouping · invisible in ST · Excel today", color: "#B4B2A9" },
      ]
    },
  }
];


const patterns = [
  {
    id: "two-skeleton",
    icon: "⊞",
    name: "The Two-Skeleton Problem",
    short: "Every enterprise org has two parallel structures that require opposite logic",
    desc: "When asked to draw their ideal org, every customer independently drew two separate structures, not one. A field/operational skeleton (geographic, hierarchical, access flows downward) and a corporate/functional skeleton (flat, cross-cutting, config needs to push downward simultaneously). ST currently models neither correctly.",
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
    desc: "Customers use the word 'brand' to mean three structurally different things, and each requires a different platform response. The reason brand creates so much BU bloat is that customers are forced to use BUs to simulate separation that should be native to a brand layer.",
    detail: "Top: enterprise umbrella, the single name covering everything externally. Purely presentational, no structural implications for ST. Local: which identity a tech or location operates under in a specific market. Needs to drive profiles and logos, not data walls. Entity: a distinct business with its own operations, data, and sometimes legal identity. Needs structural separation, data walls, access control, and in franchise cases, compliance rules.",
    appearsIn: ["All customers", "Most explicitly: Wrench, A1 Garage, Michael & Son, Authority Brands"],
    quote: { text: "You've got tenants, but then you've got brands within tenants. Not all the brands within the tenants are structured the same way either. If you lock it down at any one of those levels, we can't use it.", attr: "Tony · Wrench · 00:22:40" },
    color: "#0B7A6C"
  },
  {
    id: "tenant-workaround",
    icon: "⬡",
    name: "Tenants and BUs Are Both Workarounds for the Same Problem",
    short: "ST has no data walls within a tenant and no brand layer between tenant and BU",
    desc: "Customers use two different workarounds for the same root cause: the absence of native data walls and brand hierarchy in ST. Some create new tenants to get data separation between brands. Others pile everything into BUs to simulate structure. Both are coping strategies for the same missing capability.",
    detail: "The missing capability: a configurable layer between tenant and BU that can carry data walls, brand identity, access control, and config rules. Without it, customers are stuck choosing between tenant proliferation (expensive, hard to manage) or BU bloat (no walls, no hierarchy, no separation).",
    appearsIn: ["All customers"],
    quote: { text: "We were forcing customers to deploy into multi-tenant world. And I think Horizon has been multi-tenant for over 5 or 6 years. That's more like shortcuts here and there that we had to make.", attr: "David · ST · Horizon session" },
    color: "#6050A8"
  },
  {
    id: "home-temp",
    icon: "⇄",
    name: "Home vs Temporary Identity",
    short: "The system treats home and temporary assignments as the same thing",
    desc: "Technicians and staff regularly work outside their primary location. The system treats home and temporary assignments identically, creating multiple logins, broken inventory, and wrong payroll attribution. Every customer tracks this distinction outside ST in BI tools and spreadsheets.",
    detail: "Primary assignment drives payroll, inventory (truck), performance tracking, and primary profile. Temporary assignment should drive access scope and profile context for that assignment. Today ST has no concept of this distinction, creating duplicate accounts, manual access management, and inventory reconciliation problems.",
    appearsIn: ["Service Experts", "A1 Garage", "Wrench", "Horizon"],
    quote: { text: "We're sharing a plumber working in 3 centers every week. He's not changing trucks.", attr: "Maria · Service Experts" },
    color: "#A07808"
  },
  {
    id: "consolidation",
    icon: "△",
    name: "Three Consolidation Postures",
    short: "Org Studio must serve three fundamentally different relationships to consolidation simultaneously",
    desc: "Customers are not uniformly moving toward consolidation. Three distinct postures exist and the platform must serve all three without assuming any one direction.",
    detail: "Consolidators (Sila, Service Experts, Turnpoint): want a migration path and a readiness checklist before they merge. Permanent multi-tenant (Wrench): need separation as a first-class option. Parker & Sons and Collins are competitors and will never consolidate. Undecided (Ace): need a portable structure that works whether they consolidate later or not.",
    appearsIn: ["All customers"],
    quote: { text: "I see us moving to one tenant across and consolidating all 60 to one. If all of these tenants are on one tenant, then we just have to slice — merge this into the other existing business unit and it's done.", attr: "Nathan · Turnpoint · 00:13:30" },
    color: "#534AB7"
  }
];

const glossary = [
  { term: "Tenant", customer: "companies, centers, locations, brands", def: "A ServiceTitan instance. A technical container, not how customers describe their business. No customer in Phase 1 said 'tenant' first when describing their org structure. For single-tenant enterprise customers, multi-tenancy was imposed by ST, not chosen." },
  { term: "Brand", customer: "brand, company, trade, name", def: "Means three different things: (1) enterprise umbrella, one name covering everything externally, purely presentational; (2) local identity, which trade company operates in a specific market, drives profiles not structure; (3) entity, a structurally distinct business needing data walls and access control." },
  { term: "Location", customer: "centers, offices, markets, branches, shops", def: "A physical office or service area. The primary organizing unit for most customers. Can contain multiple brands (Wrench) or represent just one brand in one market (A1 Garage)." },
  { term: "Region", customer: "regions, districts, divisions, areas", def: "A management grouping, but means different things per customer. Geographic cluster (Service Experts), pricebook zone only (Horizon), franchise biz coach portfolio (Ace), invisible Excel grouping (Wrench/Sila). Wrench explicitly doesn't want regions enforced: 'having the option is nice, being locked into it is terrible.'" },
  { term: "Territory", customer: "zip codes, zones, areas", def: "A legally-bounded geographic concept specific to franchise businesses. Three types: owned zipcodes (licensed, enforced), open zipcodes (shared, proximity-based), regions (management only). Completely different from a Location, not modeled in ST today." },
  { term: "Business Unit (BU)", customer: "departments, brands, territories, job types, divisions", def: "Currently doing 6+ different jobs across customers: financial departments, territory zones, brand separation, brand × trade combos, geographic markets, job type groupings. A flat list with no hierarchy and no data walls. The universal workaround for everything ST can't model natively." },
  { term: "Corporate layer", customer: "corporate, HQ, back office, the office", def: "Centralized functions (IT, finance, call center, HR, marketing) that serve all locations. Needs cross-org visibility but is NOT part of the field hierarchy. Drawn separately in every FigJam session. Config from here needs to push down to all tenants simultaneously." },
  { term: "Home market", customer: "home market, home center, home branch", def: "A technician's primary location, where payroll is attributed, truck inventory registered, and performance tracked. Customers track variance from home market outside ST in BI tools. ST treats home and temporary assignments as identical." },
  { term: "Push-down config", customer: "centralized settings, propagate, apply to all", def: "The ability to define a configuration at the corporate level and have it automatically apply to all tenants, not tenant-by-tenant. Currently doesn't exist in ST. Maria (Service Experts): 'every integration has to be done tenant by tenant by tenant by tenant.'" },
  { term: "Non-human account", customer: "service account, display user, reporting user", def: "Accounts that should never be logged into, used for scheduled reports, dispatch board displays, or vendor tech profiles. Currently hacked as employee accounts. Piper (Wrench): 'there are accounts that really should never be logged into. They just exist.'" },
];

type Archetype = typeof archetypes[0];

const fjBg: React.CSSProperties = {
  background: "#F8F7F5",
  backgroundImage: "radial-gradient(circle, #D4D0C8 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

const VLine = ({ color = "#C8C3B5", h = 20 }: { color?: string; h?: number }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div style={{ width: 2, height: h, background: color }} />
  </div>
);

const OrgNode = ({
  label, sublabel, accent, bg, border, solid, small,
}: {
  label: string; sublabel?: string; accent: string; bg?: string;
  border?: string; solid?: boolean; small?: boolean;
}) => (
  <div style={{
    background: solid ? accent : (bg || "white"),
    color: solid ? "white" : accent,
    border: `2px solid ${solid ? accent : (border || accent)}`,
    borderRadius: 10,
    padding: small ? "7px 12px" : "10px 14px",
    textAlign: "center",
  }}>
    <div style={{ fontSize: small ? 12 : 13, fontWeight: 700, lineHeight: 1.3 }}>{label}</div>
    {sublabel && (
      <div style={{ fontSize: 10, fontWeight: 400, opacity: 0.8, marginTop: 3, lineHeight: 1.4 }}>{sublabel}</div>
    )}
  </div>
);

type NodeType = "location" | "brand" | "trade" | "bu" | "region" | "territory";
const nodeTypes: Record<NodeType, { color: string; Icon: React.FC<{ size?: number; color?: string }> }> = {
  location:  { color: "#5A7A8A", Icon: MapPin },
  brand:     { color: "#8A6A5A", Icon: Tag },
  trade:     { color: "#6A5A8A", Icon: Wrench },
  bu:        { color: "#5A7A6A", Icon: LayoutGrid },
  region:    { color: "#2563EB", Icon: Globe },
  territory: { color: "#B45309", Icon: Flag },
};

const LevelNode = ({ label, sublabel, type }: { label: string; sublabel?: string; type?: NodeType }) => {
  const nt = type ? nodeTypes[type] : null;
  return (
    <div style={{ background: "white", border: `1.5px solid ${nt ? nt.color + "40" : "#DDD9D0"}`, borderRadius: 8, padding: "7px 12px", display: "flex", alignItems: "center", gap: 8 }}>
      {nt && <nt.Icon size={13} color={nt.color} />}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: nt ? nt.color : "#2a2a2a" }}>{label}</div>
        {sublabel && <div style={{ fontSize: 10, color: "#999", marginTop: 1, lineHeight: 1.4 }}>{sublabel}</div>}
      </div>
    </div>
  );
};

function FranchiseDiagram({ a }: { a: Archetype }) {
  const branches = [
    {
      label: "PE sub-networks",
      sublabel: "3–4 PE firms · 4–12 tenants each · act as mini-franchisors within their portfolio",
      note: "Own EH, franchisor cannot log in or see their tenants",
      dashed: true,
    },
    {
      label: "Direct franchisees",
      sublabel: "240+ tenants · independent owners · 4 regions",
      note: "Suggest only, unless written into contract",
      dashed: false,
    },
    {
      label: "Corporate OpCos",
      sublabel: "9 company-owned locations · franchisor is the operator",
      note: "Franchisor can mandate, they own these",
      dashed: false,
    },
  ];
  const levels: { type: NodeType; label: string; sublabel: string }[] = [
    { type: "territory", label: "Territory", sublabel: "Licensed zip codes · the franchise unit being sold" },
    { type: "region",    label: "Region", sublabel: "Northeast · Southeast · Mid-Atlantic" },
    { type: "location",  label: "Location", sublabel: "Manassas VA · Raleigh NC · Tampa FL" },
    { type: "brand",     label: "Brand (trade)", sublabel: "One Hour (HVAC) · Ben Franklin (Plumbing) · Sparky (Electrical)" },
    { type: "bu",        label: "BU", sublabel: "Install · Service · Maintenance" },
  ];
  return (
    <div style={{ ...fjBg, padding: 28, fontFamily: "sans-serif" }}>
      <NodeLegend />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 380, width: "100%" }}>
          <OrgNode label="PE / Franchisor Corporate" sublabel="Authority Brands · mandate authority differs by branch type" accent={a.color} solid />
        </div>
      </div>
      <div style={{ position: "relative", height: 36 }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 2, height: 18, background: a.color + "60" }} />
        <div style={{ position: "absolute", top: 18, left: "16.67%", right: "16.67%", height: 2, background: a.color + "60" }} />
        {[16.67, 50, 83.33].map(pos => (
          <div key={pos} style={{ position: "absolute", top: 18, left: `${pos}%`, width: 2, height: 18, background: a.color + "60", transform: "translateX(-50%)" }} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {branches.map((b, bi) => (
          <div key={bi}>
            <div style={{
              background: b.dashed ? "white" : a.bg,
              border: `2px ${b.dashed ? "dashed" : "solid"} ${a.border}`,
              borderRadius: 10, padding: "9px 12px", textAlign: "center"
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: a.color }}>{b.label}</div>
              <div style={{ fontSize: 10, color: a.color, opacity: 0.72, marginTop: 2, lineHeight: 1.4 }}>{b.sublabel}</div>
              <div style={{ fontSize: 9, color: bi === 2 ? "#0F6E56" : bi === 0 ? "#D85A30" : "#888", marginTop: 5, borderTop: `1px solid ${a.border}`, paddingTop: 5, fontStyle: "italic", lineHeight: 1.4 }}>{b.note}</div>
            </div>
            {bi > 0 && levels.filter(l => bi === 2 ? l.type !== "territory" : true).map((l) => (
              <div key={l.label}>
                <VLine color="#C8C3B5" h={12} />
                <LevelNode label={l.label} sublabel={l.sublabel} type={l.type} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Key structural insight */}
      <div style={{ marginTop: 14, padding: "10px 14px", background: "white", border: `1px solid ${a.border}`, borderRadius: 8, fontSize: 11, color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: a.color, display: "block", marginBottom: 3 }}>Key structural difference: Brand sits below Location</strong>
        A franchisee owns a Location (or multiple), and that location carries one or more trade brands underneath it: One Hour (HVAC), Ben Franklin (Plumbing), Sparky (Electric). Brand here is a trade identity within a location, not a structural container above it. This is the opposite of Multi-Brand Enterprise, where brand is above location.
      </div>
      {a.territory?.show && (
        <div style={{ marginTop: 14, border: "1.5px dashed #C8C3B5", borderRadius: 10, padding: "12px 14px", background: "white" }}>
          <div style={{ fontSize: 9, color: "#B0AA9E", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>Also not in ST today</div>
          <div style={{ display: "flex", gap: 16 }}>
            {a.territory.types?.filter((_: unknown, i: number) => i > 0).map((t: { name: string; desc: string; color: string }, i: number) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.color, flexShrink: 0, marginTop: 3 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: t.color, fontFamily: "sans-serif" }}>{t.name}</div>
                  <div style={{ fontSize: 10.5, color: "#888", lineHeight: 1.4, fontFamily: "sans-serif" }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CentralizedDiagram({ a }: { a: Archetype }) {
  const corp = { color: "#534AB7", bg: "#EEEDFE", border: "#AFA9EC" };
  const fieldLevels: { type: NodeType; label: string; sublabel: string; role: string }[] = [
    { type: "region",   label: "Regions / Districts", sublabel: "Mid-South · Southeast · Mid-Atlantic · Mountain West", role: "Regional manager" },
    { type: "location", label: "Locations / Branches", sublabel: "Cookeville TN · Nashville · Denver · Richmond VA", role: "GM / Location mgr" },
    { type: "trade",    label: "Trades / Divisions", sublabel: "HVAC · Plumbing · Electrical · Rooter & Drains", role: "Trade manager" },
    { type: "bu",       label: "BU", sublabel: "Install · Service · Maintenance · Sales", role: "Technicians" },
  ];
  return (
    <div style={{ ...fjBg, padding: 28, fontFamily: "sans-serif" }}>
      <NodeLegend />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 380, width: "100%" }}>
          <OrgNode label="Corporate HQ" sublabel="All settings · no local admin anywhere" accent={a.color} solid />
        </div>
      </div>
      <div style={{ position: "relative", height: 36 }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 2, height: 18, background: "#88888840" }} />
        <div style={{ position: "absolute", top: 18, left: "25%", right: "25%", height: 2, background: "#88888840" }} />
        <div style={{ position: "absolute", top: 18, left: "25%", width: 2, height: 18, background: corp.color + "60", transform: "translateX(-50%)" }} />
        <div style={{ position: "absolute", top: 18, right: "25%", width: 2, height: 18, background: a.color + "60", transform: "translateX(50%)" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Corporate / functional skeleton */}
        <div>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: corp.color, fontFamily: "'DM Mono', monospace", textAlign: "center", marginBottom: 8 }}>Corporate skeleton</div>
          <OrgNode label="Centralized functions" sublabel="IT · Finance · Call center · HR · Marketing · Training" accent={corp.color} bg={corp.bg} border={corp.border} />
          <VLine color={corp.color + "50"} h={14} />
          <div style={{ border: `1.5px dashed ${corp.border}`, borderRadius: 8, padding: "10px 14px", textAlign: "center", background: corp.bg + "88" }}>
            <div style={{ fontSize: 11, color: corp.color, fontWeight: 600 }}>Serves ALL locations</div>
            <div style={{ fontSize: 10, color: corp.color, opacity: 0.8, marginTop: 2 }}>Config pushes down · flat, cross-cutting</div>
          </div>
        </div>
        {/* Field skeleton — proper hierarchy */}
        <div>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: a.color, fontFamily: "'DM Mono', monospace", textAlign: "center", marginBottom: 8 }}>Field skeleton, access flows downward</div>
          <OrgNode label="Field operations" sublabel="Geographic · access flows downward" accent={a.color} bg={a.bg} border={a.border} />
          {fieldLevels.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", paddingLeft: i * 10 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 18, flexShrink: 0 }}>
                <div style={{ width: 2, height: 14, background: a.color + "40" }} />
                <div style={{ width: 10, height: 2, background: a.color + "40" }} />
              </div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
                <LevelNode label={l.label} sublabel={l.sublabel} type={l.type} />
                <div style={{ fontSize: 10, color: "#bbb", whiteSpace: "nowrap", fontFamily: "'DM Mono', monospace" }}>{l.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const NodeLegend = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
    {(Object.entries(nodeTypes) as [NodeType, typeof nodeTypes[NodeType]][]).map(([key, nt]) => (
      <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <nt.Icon size={11} color={nt.color} />
        <span style={{ fontSize: 10, color: nt.color, fontWeight: 600, textTransform: "capitalize", fontFamily: "'DM Mono', monospace" }}>{key}</span>
      </div>
    ))}
  </div>
);

function DecentralizedDiagram({ a }: { a: Archetype }) {
  const brands = [
    { name: "Collins", trade: "HVAC · Phoenix" },
    { name: "Parker & Sons", trade: "HVAC · Phoenix" },
    { name: "Jarboe's", trade: "Plumbing · Louisville" },
  ];
  const levels: { type: NodeType; label: string; sublabel: string }[] = [
    { type: "region",   label: "Region", sublabel: "Region 1 Central · Region 2 West · Northeast" },
    { type: "location", label: "Location / Center", sublabel: "Phoenix AZ · Louisville KY · Columbus OH" },
    { type: "trade",    label: "Trades / Divisions", sublabel: "HVAC · Plumbing · Electrical · Duct Cleaning" },
    { type: "bu",       label: "BU", sublabel: "Install · Service · Maintenance · Sales" },
  ];
  return (
    <div style={{ ...fjBg, padding: 28, fontFamily: "sans-serif" }}>
      <NodeLegend />
      {/* Governance spectrum */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 400, width: "100%" }}>
          <OrgNode label="Wrench Group" sublabel="Holding company example · same structure applies to Sila, Service Experts" accent={a.color} solid />
        </div>
      </div>
      {/* Corporate layer — dashed, cross-cutting */}
      <VLine color={a.color + "50"} h={14} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 420, width: "100%", border: `2px dashed ${a.border}`, borderRadius: 10, padding: "8px 14px", background: "white", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: a.color }}>Corporate layer</div>
          <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>IT · Finance · HR · serves all brands · cross-brand visibility · config must be pushed tenant-by-tenant today</div>
          <div style={{ fontSize: 9.5, color: a.color, marginTop: 4, fontStyle: "italic" }}>Wrench: thin, advisory only · Service Experts: central ops mandates all settings across every tenant</div>
        </div>
      </div>
      {/* Connectors to brand columns */}
      <div style={{ position: "relative", height: 36 }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 2, height: 18, background: a.color + "50" }} />
        <div style={{ position: "absolute", top: 18, left: "16.67%", right: "16.67%", height: 2, background: a.color + "50" }} />
        {[16.67, 50, 83.33].map(pos => (
          <div key={pos} style={{ position: "absolute", top: 18, left: `${pos}%`, width: 2, height: 18, background: a.color + "50", transform: "translateX(-50%)" }} />
        ))}
      </div>
      {/* Brand columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {brands.map((b, bi) => (
          <div key={bi}>
            <div style={{ background: a.bg, border: `2px solid ${a.border}`, borderRadius: 10, padding: "9px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: a.color, lineHeight: 1.3 }}>{b.name}</div>
              <div style={{ fontSize: 10, color: a.color, opacity: 0.7, marginTop: 2 }}>{b.trade}</div>
              <div style={{ fontSize: 9, color: "#bbb", marginTop: 3 }}>Own data · own settings</div>
            </div>
            {levels.map((l, li) => (
              <div key={li}>
                <VLine color={a.color + "40"} h={12} />
                <LevelNode label={l.label} sublabel={l.sublabel} type={l.type} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Callouts */}
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ padding: "9px 13px", background: "white", border: `1px solid ${a.border}`, borderRadius: 8, fontSize: 11, color: "#555", lineHeight: 1.5, display: "flex", gap: 8 }}>
          <span style={{ color: a.color, flexShrink: 0 }}>⚠</span>
          <span><strong style={{ color: a.color }}>Collins and Parker & Sons both serve Phoenix HVAC</strong>, permanently separated by design, not a transitional workaround. Multi-tenancy here is a first-class permanent requirement.</span>
        </div>
        <div style={{ padding: "9px 13px", background: "#F5F4F0", border: "1px solid #E0DDD6", borderRadius: 8, fontSize: 11, color: "#555", lineHeight: 1.5 }}>
          <strong style={{ color: "#1a1a1a", display: "block", marginBottom: 3 }}>Why not Single-Brand Enterprise?</strong>
          These brands are distinct businesses with different names, different identities, and sometimes competing in the same market. Single-brand customers (Hiller, A1 Garage, Turnpoint) operate as one brand everywhere. Wrench's Collins and Parker & Sons are separate brands even though Wrench owns both. The separation is structural, not a governance preference.
        </div>
      </div>
      {/* Governance spectrum — at bottom */}
      <div style={{ marginTop: 14, padding: "12px 14px", background: "white", border: `1px solid ${a.border}`, borderRadius: 8 }}>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "#B0AA9E", marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>Governance spectrum within this archetype</div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ fontSize: 9.5, color: "#999", fontFamily: "'DM Mono', monospace", lineHeight: 1.4, textAlign: "right", minWidth: 72, paddingTop: 2 }}>More<br/>centralized</div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 5, background: `linear-gradient(to right, ${a.color}, ${a.border})`, borderRadius: 3, marginBottom: 12 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
              {[
                { name: "Service Experts", desc: "Central ops mandates all settings. No local admin, uniform across all tenants." },
                { name: "Sila", desc: "Consolidating toward centralized. Brands have own data but corporate pushes standards." },
                { name: "Wrench Group", desc: "Semi-autonomous. Brands run independently, about 30% standardized across the portfolio." },
              ].map((c, i) => (
                <div key={i}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, margin: "0 auto 5px", opacity: 1 - i * 0.25 }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: a.color }}>{c.name}</div>
                  <div style={{ fontSize: 9.5, color: "#999", marginTop: 2, lineHeight: 1.4 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 9.5, color: "#999", fontFamily: "'DM Mono', monospace", lineHeight: 1.4, minWidth: 72, paddingTop: 2 }}>Less<br/>centralized</div>
        </div>
      </div>
    </div>
  );
}

function ArchetypeView({ a, onBack }: { a: Archetype; onBack: () => void }) {
  return (
      <div style={{ minHeight: "100vh", background: "#FAFAF9", fontFamily: "Georgia, serif" }}>
        <div style={{ background: a.color, padding: "40px 48px 36px" }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", marginBottom: 20, fontFamily: "sans-serif" }}>← All archetypes</button>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>{a.label}</div>
          <h1 style={{ fontSize: 38, fontWeight: 400, margin: "0 0 8px", color: "white" }}>{a.name}</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", margin: 0, fontStyle: "italic" }}>{a.tagline}</p>
        </div>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 32 }}>
            {[
              { label: "Sessions completed", value: a.customers.join(" · ") },
              { label: "Scale", value: a.scale },
            ].map((item, i) => (
              <div key={i} style={{ background: a.bg, border: `1px solid ${a.border}`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: a.color, marginBottom: 5, fontFamily: "'DM Mono', monospace" }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "#404040", lineHeight: 1.5, fontFamily: "sans-serif" }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 400, marginBottom: 12, color: "#1a1a1a" }}>Org structure</h2>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${a.border}` }}>
              {a.id === "franchise" && <FranchiseDiagram a={a} />}
              {a.id === "multibrand" && <DecentralizedDiagram a={a} />}
              {a.id === "singlebrand" && <CentralizedDiagram a={a} />}
            </div>
            <div style={{ marginTop: 12, background: a.bg, border: `1px solid ${a.border}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: a.color, marginBottom: 5, fontFamily: "'DM Mono', monospace" }}>Key trait</div>
              <p style={{ fontSize: 13, color: "#404040", margin: "0 0 8px", lineHeight: 1.6, fontFamily: "sans-serif" }}>{a.keyTrait}</p>
              <p style={{ fontSize: 12, color: "#666", margin: 0, lineHeight: 1.5, fontFamily: "sans-serif" }}>Governance: {a.governance}</p>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 400, marginBottom: 16, color: "#1a1a1a" }}>What breaks in ST</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, borderLeft: `2px solid ${a.border}` }}>
              {a.findings.map((f, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start", padding: "14px 0 14px 16px", borderBottom: i < a.findings.length - 1 ? "1px solid #F0EDE8" : "none" }}>
                  <div>
                    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: a.color, marginBottom: 5, fontFamily: "'DM Mono', monospace" }}>{f.label}</div>
                    <p style={{ fontSize: 13, color: "#404040", margin: 0, lineHeight: 1.6, fontFamily: "sans-serif" }}>{f.pain}</p>
                  </div>
                  <div style={{ display: "flex", background: "white", borderRadius: 8, overflow: "hidden", border: "1px solid #E8E6E1" }}>
                    <div style={{ width: 3, background: a.color, flexShrink: 0 }} />
                    <div style={{ padding: "10px 12px" }}>
                      <p style={{ fontStyle: "italic", fontSize: 12, color: "#404040", margin: "0 0 4px", lineHeight: 1.6 }}>"{f.quote.text}"</p>
                      <p style={{ fontSize: 10, color: a.color, margin: 0, fontFamily: "'DM Mono', monospace" }}>— {f.quote.attr}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState<Archetype | null>(null);
  const go = (v: string, data: Archetype | null = null) => {
    setView(v);
    setSelected(data);
    window.scrollTo && window.scrollTo(0, 0);
  };

  if (view === "archetype" && selected) return <ArchetypeView a={selected} onBack={() => go("home")} />;

  if (view === "patterns") {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF9", fontFamily: "Georgia, serif" }}>
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
              <strong>Note:</strong> No customer in Phase 1 said "tenant" first when describing their business. Tenant is ServiceTitan's word. The vocabulary customers use (region, brand, center, market, territory) should drive Org Studio's naming and UX.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (view === "synthesis") {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#1a1a1a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <button onClick={() => go("home")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontFamily: "sans-serif" }}>← Back</button>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace" }}>Synthesis diagram · FigJam</span>
          <a href="https://www.figma.com/board/rmK4GcvTNLNthbhyFr7uIm/CAB-Round-1?node-id=6308-141" target="_blank" rel="noreferrer" style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace", textDecoration: "none" }}>open in Figma ↗</a>
        </div>
        <iframe
          src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/board/rmK4GcvTNLNthbhyFr7uIm/CAB-Round-1?node-id=6308-141"
          style={{ flex: 1, border: "none", width: "100%" }}
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF9", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "#0C1710", padding: "68px 48px 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 15% 60%, rgba(15,110,86,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(200,75,31,0.12) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 820 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 18, fontFamily: "'DM Mono', monospace" }}>Org Studio Design Partner Program · Phase 1 · 2026</div>
          <h1 style={{ fontSize: 52, fontWeight: 400, margin: "0 0 18px", color: "white", lineHeight: 1.08 }}>Enterprise org<br /><em style={{ color: "rgba(255,255,255,0.7)" }}>archetypes</em></h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", margin: "0 0 28px", lineHeight: 1.75, maxWidth: 560, fontFamily: "sans-serif" }}>How home services enterprise customers actually organize their businesses, and where ServiceTitan gets in the way. Based on 10 customer sessions and FigJam whiteboarding.</p>
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
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}>
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
                  <p style={{ fontSize: 12, color: "#555", margin: 0, lineHeight: 1.5, fontFamily: "sans-serif" }}>{a.findings[0].pain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 48 }}>
          {[
            { label: "Cross-cutting patterns", desc: "5 patterns across all archetypes", icon: "⊞", action: () => go("patterns"), bg: "#1a1a1a" },
            { label: "Glossary", desc: "What customers call things vs ST", icon: "⌨", action: () => go("glossary"), bg: "#1E2B1E" },
            { label: "Synthesis diagram", desc: "FigJam board, interactive", icon: "◻", action: () => go("synthesis"), bg: "#1B1F2E" },
          ].map((item, i) => (
            <div key={i} onClick={item.action} style={{ background: item.bg, borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = "1"}>
              <div style={{ fontSize: 20, marginBottom: 10, color: "white" }}>{item.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 400, margin: "0 0 6px", color: "white" }}>{item.label}</h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5, fontFamily: "sans-serif" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E8E6E1", padding: "20px 48px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>Org Studio Design Partner Program · Phase 1 · Meera Ramachandran, UXR</span>
        <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>DRAFT. Do not distribute</span>
      </div>
    </div>
  );
}
