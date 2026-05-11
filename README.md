# Uber-Ads — Mobility-Native OOH Advertising Platform

A product concept and working prototype for a first-party Out-of-Home advertising platform built on Uber's vehicle fleet and trip data. Includes a full PM strategy workbook: competitive teardown, growth experiments, onboarding audit, PRD, and market sizing.

---

## The Problem

India's ₹5,800 Cr OOH advertising market is broken in a specific way:

- Brands pay for billboards but cannot measure who saw them
- Premium urban audiences are mobile — not anchored to a static location
- Existing "rideshare wrap" players (Movia, Wrapify) are parasite platforms — they sit on top of Uber/Lyft with no platform data access, no route optimization, and no closed-loop measurement

Meanwhile, Uber driver-partners generate zero incremental revenue when their vehicle isn't on a trip.

## The Product

Uber-Ads turns enrolled driver vehicles into a GPS-verified, data-informed, dynamic OOH media channel.

- **Brands** buy city zones + time slots with verified impression reporting
- **Drivers** earn ₹3,000–4,000/month in passive incremental income
- **Uber** earns a media revenue layer on top of its existing mobility business — the same platform-leverage logic as Uber Eats

## Why Uber Wins

| Capability | Static OOH (Lamar) | DOOH (Clear Channel) | Rideshare Wraps (Movia) | Uber-Ads |
|---|---|---|---|---|
| First-party audience data | ✗ | ✗ (third-party, shrinking post-ATT) | ✗ | ✓ Trip data, zones, time-of-day |
| Mobile inventory | ✗ | ✗ | ✓ | ✓ |
| Closed-loop measurement | ✗ | Partial | ✗ | ✓ |
| Platform-owned fleet | — | — | ✗ (dependent on Uber/Lyft goodwill) | ✓ |

---

## Prototype

Built with **Next.js + TypeScript**. Covers two primary views:

**Brand Dashboard (Demand Side)**
- Campaign creation flow — zone selection, time slot, budget, creative upload
- Impression reporting dashboard with city-level heatmap

**Rider-Facing View (Supply Side)**
- Driver enrollment flow
- Real-time earnings dashboard showing ad revenue per trip

> The prototype is currently UI-focused. One complete end-to-end flow per persona is in progress.

### Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## PM Strategy Workbook

Five deliverables covering the full product strategy for Uber-Ads v1 (Bangalore launch):

### 1. Competitive Feature Teardown
Analysis of Lamar Advertising, Clear Channel Outdoor (RADAR), and Movia Media — dissecting what problem each solves, what business metrics they target, structural weaknesses, and what Uber-Ads does differently. Key finding: the OOH market has a measurement gap, a targeting gap, and a data ownership gap that no existing player can close without owning the mobility platform.

### 2. Growth Experiment Design
Three prioritized growth experiments using RICE scoring to solve the two-sided cold-start problem (driver supply + brand demand must grow in parallel):

| Experiment | Hypothesis | RICE Rank |
|---|---|---|
| In-app earnings nudge for driver enrollment | Personalized earning projection converts 2x vs generic banner | #1 |
| "First campaign free" pilot for brand acquisition | Measurement report post-pilot drives ≥30% paid conversion | #2 |
| Zonal surge pricing for premium inventory | Location+time targeting commands 2x CPM premium | #3 |

Each experiment includes a hypothesis, A/B structure, success criteria, and explicit failure conditions.

### 3. Onboarding Audit
Journey map for both driver enrollment and brand advertiser onboarding. Identified three high-friction drop-off points (peak: ~55% exit on vehicle eligibility form). Recommendations projected to lift driver activation rate from ~12% to 28–35%.

### 4. PRD — v1 Bangalore Launch
Full product requirements document including user signals, problem statement, personas (brand marketing manager + driver partner), success metrics, scope definition (in/out/later), edge cases, and open questions. Regulatory risks (DPDP Act 2023, BBMP advertising license) are flagged explicitly.

**North Star Metric:** Brand campaign renewal rate (% of advertisers who run a second campaign) — chosen because it ties supply and demand health together.

**Target (6 months):** 2,000 enrolled vehicles · 25 active brand accounts · ₹2.5 Cr/month gross ad revenue

### 5. Market Sizing & Opportunity Brief
Bottom-up market sizing with unit economics validation:

| Layer | Size |
|---|---|
| TAM — India OOH market | ₹5,800 Cr/year |
| SAM — Urban metro mobile/transit OOH | ₹520 Cr/year |
| SOM — Uber-Ads, Bangalore v1 | ₹12–17 Cr Year 1 · ₹40–60 Cr Year 2 |

Unit economics check: 2,000 vehicles × ₹8,000/month campaign revenue × 12 months = ₹19.2 Cr/year at 100% utilisation. Conservative SOM (₹12–17 Cr) assumes 60–70% fleet utilisation.

---

## What I'd Validate First

These are the assumptions that need real data before any pilot decision:

1. **Driver enrollment willingness** — the ₹3,000–4,000/month earning projection is modeled, not validated. The actual number depends on fleet density per zone and advertiser fill rate, neither of which exists yet.
2. **Brand advertiser price sensitivity** — the ₹120 CPM standard / ₹240 CPM premium zone pricing is directional. Whether D2C brands will pay a 2x premium for location targeting needs a real sales conversation, not a model.
3. **Regulatory path** — whether BBMP classifies vehicle-wrapped ads as requiring a separate advertising license is a binary risk. This needs a legal opinion before any driver enrollment begins.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

---

## About This Project

This is an independent product concept developed as a PM portfolio project. All market data is sourced from publicly available industry reports (OAAA 2024, Madison Mediacom 2025, BCG India Gig Economy Report 2024). Uber-Ads is not an official Uber product.

*Constructed scenarios are clearly flagged in the strategy workbook where real user research data does not exist.*
