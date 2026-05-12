# Uber-Ads — Mobility-Native OOH Advertising Platform

Uber-Ads is a first-party Out-of-Home (OOH) advertising platform that leverages Uber’s vehicle fleet and deterministic trip data to create a measurable, high-performance media channel.

## 📊 The Opportunity (Executive Summary)
India's ₹5,800 Cr OOH market suffers from a "measurement gap"—brands pay for visibility they cannot verify. Uber-Ads closes this gap by turning driver vehicles into GPS-verified, data-informed media assets, creating passive income for drivers and a performance-adjacent product for brands.

| Metric | Target / Logic |
| :--- | :--- |
| **Year 2 Revenue Potential** | **₹40–60 Cr** (SOM) across 3 tier-1 cities (BLR, DEL, BOM) |
| **First-Party Data Moat** | Trip origins, destinations, and real-time zone density |
| **Closed-Loop Measurement** | Pairs vehicle GPS with in-app "Companion Ads" for 100% SOV |
| **Supply Chain Advantage** | Onboards already-credentialed and insured driver partners |

## 🛠️ The Product & Why Uber Wins
Uber-Ads allows brands to buy specific city zones and time slots with verified impression reporting calculated by real-time H3 Hexagonal Heirarchical Spatial Index. Drivers earn an incremental **₹3,000–₹8,000/month** (approx)in passive income without adding extra driving hours.

| Capability | Static OOH (Lamar) | DOOH (Clear Channel) | Uber-Ads |
| :--- | :--- | :--- | :--- |
| **Audience Data** | None | 3rd-party (Probabilistic) | **1st-party (Deterministic)** |
| **Measurement** | Estimated | Partial | **Verified GPS Attribution** |
| **Contextual Triggers** | ✗ | ✗ | **✓ Real-time Route Sync** |

---

## 📈 Strategy Highlights

### 1. Market Sizing & Unit Economics
The pilot targets high-margin urban corridors in Bangalore, focusing on a beachhead of 200–300 (Phase-1, first 6 months) D2C and Fintech brands that require rigorous attribution.

| Market Layer | Size Estimate | Calculation Inputs |
| :--- | :--- | :--- |
| **TAM** | **₹3,480 Crore** | Urban Metro OOH spend across Top 8 Indian cities |
| **SAM** | **₹520 Crore** | Mobile/Transit OOH subset (18% of metro OOH - cabs, autos, buses) |
| **SOM** | **₹12–17 Crore** | Year 1 Bangalore pilot capturing 30-40% of mobile subset |

> **Unit Economics Check:** A fleet of 3,000 vehicles at a ₹5,000 blended ARPV (Auto/Cab mix) validates the Year 1 SOM at 70% fleet utilization.

### 2. Growth Experiments (RICE Prioritization)
To solve the two-sided cold-start problem, experiments are prioritized to balance supply-side velocity with demand-side trust.

| Experiment | Hypothesis | RICE Score | Rank |
| :--- | :--- | :--- | :--- |
| **In-App Earnings Nudge** | Personalized income projections convert 2x vs. generic banners | **16,800** | **#1** |
| **Free Pilot for Brands** | Full attribution reports reduce ROI skepticism for D2C brands | **7,500** | **#2** |
| **Zonal Surge Pricing** | Validates if location+time targeting commands a price premium | **1,500** | **#3** |

---

## 📖 Deep-Dive Documentation
For the complete product strategy, including technical specifications and detailed audits, refer to the full workbook sections below:

* **[Competitive Feature Teardown](https://docs.google.com/document/d/1JrgJGLaX1Cxp2AgfJ7UU03OtwqJ3umzX9WNm8Me6g3k/edit?tab=t.0#heading=h.vjqzuksb50qh)**: In-depth analysis of Lamar, Clear Channel (RADAR), and Movia Media's structural weaknesses.
* **[Growth Experiment Design](https://docs.google.com/document/d/1JrgJGLaX1Cxp2AgfJ7UU03OtwqJ3umzX9WNm8Me6g3k/edit?tab=t.0#heading=h.pcuig4noskuu)**: GTM goals for both demand & supply side, 3 growth experiment hypothesis with RICE prioritization
* **[Onboarding Flow Audit](https://docs.google.com/document/d/1JrgJGLaX1Cxp2AgfJ7UU03OtwqJ3umzX9WNm8Me6g3k/edit?tab=t.0#heading=h.rfxvb3mi514d)**: Identification of friction points in driver enrollment (55% drop-off at eligibility) and recommended UX fixes.
* **[Full Product Requirements Document (PRD)](https://docs.google.com/document/d/1JrgJGLaX1Cxp2AgfJ7UU03OtwqJ3umzX9WNm8Me6g3k/edit?tab=t.0#heading=h.swmmb35wgf7x)**: Detailed user stories, success metrics (North Star: Renewal Rate >40%), and v1 scope definition.
* **[Market Sizing Opportunity Brief](https://docs.google.com/document/d/1JrgJGLaX1Cxp2AgfJ7UU03OtwqJ3umzX9WNm8Me6g3k/edit?tab=t.0#heading=h.aimw7envvd1k)**: Full bottom-up calculation and beachhead segment analysis.

---

## 🔍 Critical Assumptions & Validations
The following "binary risks" require validation before a full pilot:
1.  **Regulatory Path:** Confirmation on whether municipal authorities (BBMP/MCGM) require separate advertising licenses for wrapped vehicles.
2.  **Price Sensitivity:** Validating if D2C brands will pay the 2x CPM premium for high-intent zonal targeting.
3.  **Driver Willingness:** Testing if the ₹3,000–₹4,000/month incentive is sufficient to overcome the friction of physical vehicle wrapping.

## 💻 Tech Stack
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS

---
*This is an independent PM portfolio project based on analogous OOH industry data and first-principles reasoning.*