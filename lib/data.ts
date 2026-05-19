// lib/data.ts

// ─── TWO-SIDED INVENTORY STORE ───────────────────────────────────────────────
type InventoryEntry = { driverId: string; campaignId: string; acceptedAt: string };
type Subscriber = () => void;

function createInventoryStore() {
  let state: Record<string, InventoryEntry[]> = {
    camp_001: [
      { driverId: 'd001', campaignId: 'camp_001', acceptedAt: '2026-05-01' },
      { driverId: 'd002', campaignId: 'camp_001', acceptedAt: '2026-05-02' },
    ],
  };
  const subscribers = new Set<Subscriber>();
  return {
    acceptCampaign(driverId: string, campaignId: string) {
      const existing = state[campaignId] || [];
      if (existing.some(e => e.driverId === driverId)) return;
      state = { ...state, [campaignId]: [...existing, { driverId, campaignId, acceptedAt: new Date().toISOString() }] };
      subscribers.forEach(fn => fn());
    },
    getActiveFleetCount(campaignId: string): number {
      return (state[campaignId] || []).length;
    },
    subscribe(fn: Subscriber): () => void {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
  };
}

export const inventoryStore = createInventoryStore();

import { useState, useEffect, useCallback } from 'react';
export function useInventoryStore<T>(selector: (store: typeof inventoryStore) => T): T {
  const get = useCallback(() => selector(inventoryStore), [selector]);
  const [value, setValue] = useState<T>(get);
  useEffect(() => inventoryStore.subscribe(() => setValue(get())), [get]);
  return value;
}

// ─── IMPRESSION PROJECTION LOGIC ─────────────────────────────────────────────
// Formula: base impressions per vehicle/day × fleet size × campaign days
// Adjusted by tier multiplier and vehicle type efficiency.
// Used in Step3Review and campaign cards.

export type ImpressionProjection = {
  dailyImpressions: number;       // per vehicle avg
  totalImpressions: number;       // over campaign duration
  monthlyImpressions: number;     // normalised to 30 days
  estimatedCPM: number;           // ₹ per 1000 impressions
  totalCost: number;              // fleet allocation cost
  productionCost: number;         // vinyl wrap / ops
  platformFee: number;            // 2% of total
  grandTotal: number;
};

// Base impressions a single vehicle generates per day by type and zone tier
const BASE_IMP_PER_VEHICLE_DAY: Record<string, number> = {
  'Auto Rickshaw': 380,   // high manoeuvrability, inner city
  'Sedan Cabs':    520,   // wider routes, more daily kms
  'SUV Cab':       480,
  'Mini truck / Tata Ace': 290,
  '6-wheeler truck': 210,
  'Large Truck (10/12-wheeler)': 160,
};

const TIER_MULTIPLIER: Record<string, number> = {
  premium: 1.45,   // premium zones have higher footfall density
  standard: 1.0,
};

// Cost per vehicle per day by type (₹)
const COST_PER_VEHICLE_DAY: Record<string, number> = {
  'Auto Rickshaw': 185,
  'Sedan Cabs':    240,
  'SUV Cab':       310,
  'Mini truck / Tata Ace': 420,
  '6-wheeler truck': 580,
  'Large Truck (10/12-wheeler)': 780,
};

// Production / vinyl wrap cost per vehicle (one-time for campaign)
const PRODUCTION_PER_VEHICLE: Record<string, number> = {
  'Auto Rickshaw': 2800,
  'Sedan Cabs':    3800,
  'SUV Cab':       5200,
  'Mini truck / Tata Ace': 6500,
  '6-wheeler truck': 9800,
  'Large Truck (10/12-wheeler)': 14500,
};

export function projectImpressions(zones: {
  vehicleType: string;
  count: number;
  tier: string;
}[], startDate: string, endDate: string): ImpressionProjection {
  const days = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 30;

  let totalImp = 0;
  let fleetCost = 0;
  let prodCost = 0;

  for (const zone of zones) {
    const basePerDay = BASE_IMP_PER_VEHICLE_DAY[zone.vehicleType] ?? 380;
    const tierMult   = TIER_MULTIPLIER[zone.tier] ?? 1.0;
    const vehicles   = zone.count || 0;

    totalImp  += Math.round(basePerDay * tierMult * vehicles * days);
    fleetCost += (COST_PER_VEHICLE_DAY[zone.vehicleType] ?? 185) * vehicles * days;
    prodCost  += (PRODUCTION_PER_VEHICLE[zone.vehicleType] ?? 2800) * vehicles;
  }

  const platformFee  = Math.round((fleetCost + prodCost) * 0.02);
  const grandTotal   = fleetCost + prodCost + platformFee;
  const monthlyImp   = Math.round((totalImp / days) * 30);
  const cpm          = grandTotal > 0 && totalImp > 0
    ? parseFloat(((grandTotal / totalImp) * 1000).toFixed(1))
    : 0;

  return {
    dailyImpressions:  Math.round(totalImp / days),
    totalImpressions:  totalImp,
    monthlyImpressions: monthlyImp,
    estimatedCPM:      cpm,
    totalCost:         fleetCost,
    productionCost:    prodCost,
    platformFee,
    grandTotal,
  };
}

// ─── BRAND PROFILES ──────────────────────────────────────────────────────────
export const BRAND_PROFILES: Record<string, {
  name: string; logo: string; gstNumber: string;
  city: string; category: string; validZones: string[];
}> = {
  'Coca-Cola India': {
    name: 'Coca-Cola India Pvt. Ltd.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png',
    gstNumber: '29AABCC1234F1Z5', city: 'Bengaluru, KA', category: 'FMCG & Beverages',
    validZones: ['blr-h3-001', 'blr-h3-002', 'blr-h3-003', 'blr-h3-006'],
  },
  'Sprite': {
    name: 'Sprite (Coca-Cola India)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png',
    gstNumber: '29AABCC1234F1Z5', city: 'Bengaluru, KA', category: 'FMCG & Beverages',
    validZones: ['blr-h3-002', 'blr-h3-003', 'blr-h3-005', 'blr-h3-007'],
  },
  'Thums Up': {
    name: 'Thums Up (Coca-Cola India)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png',
    gstNumber: '29AABCC1234F1Z5', city: 'Bengaluru, KA', category: 'FMCG & Beverages',
    validZones: ['blr-h3-001', 'blr-h3-003', 'blr-h3-006'],
  },
  'Minute Maid': {
    name: 'Minute Maid (Coca-Cola India)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png',
    gstNumber: '29AABCC1234F1Z5', city: 'Bengaluru, KA', category: 'FMCG & Beverages',
    validZones: ['blr-h3-002', 'blr-h3-004', 'blr-h3-005', 'blr-h3-008'],
  },
  'Smartwater': {
    name: 'Smartwater India Pvt. Ltd.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png',
    gstNumber: '27AABCS4567G1Z3', city: 'Mumbai, MH', category: 'FMCG & Beverages',
    validZones: ['mum-h3-001', 'mum-h3-002', 'mum-h3-003'],
  },
};

// ─── CAMPAIGNS ───────────────────────────────────────────────────────────────
export const campaignDatabase = [
  {
    id: "camp_001",
    title: "Summer Refresh '26",
    status: "Live",
    duration: "May 1 - Jun 15, 2026",
    brand: "Coca-Cola India",
    category: "FMCG & Beverages",
    costModel: "Cost Per Ad-KM",
    fleetSize: "500 Autos",
    zones: ["Koramangala", "Indiranagar", "MG Road / Brigade"],
    city: "Bengaluru, KA",
    adKms: "48,200",
    views: "1.38M",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
    metrics: {
      totalVerifiedImpressions: 1380000,
      adKmsRaw: 48200,
      effectiveCPM: 42.8,        // ₹42.8 per 1000 impressions — below industry ₹95-120
      fleetUtilization: 89,
      hardwareIntegrity: 97.6,
      uniqueZoneReach: 3,
      peakHour: "6–9 PM",
      totalSpend: 2418000,       // ₹24.18L — 500 autos × 45 days × ₹185/day + production
      renewalIntent: true,
    },
    weeklyChart: {
      labels: ["Week 1", "Week 2", "Week 3"],
      adKms: [14800, 17200, 16200],
      impressions: [398000, 512000, 468000],
    },
    zoneBreakdown: [
      { zone: "Koramangala",      impressions: 558000, fleet: 210, tier: "premium" },
      { zone: "Indiranagar",      impressions: 448000, fleet: 175, tier: "premium" },
      { zone: "MG Road / Brigade",impressions: 374000, fleet: 115, tier: "premium" },
    ],
  },
  {
    id: "camp_005",
    title: "Thums Up: Thunder Zone",
    status: "Ops Queue",
    duration: "May 22 - Jun 30, 2026",
    brand: "Thums Up",
    category: "FMCG & Beverages",
    costModel: "Fixed Fleet Rate",
    fleetSize: "350 Autos",
    zones: ["Whitefield", "Electronic City"],
    city: "Bengaluru, KA",
    adKms: "0",
    views: "0",
    imageUrl: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80&w=600",
    opsStages: [
      { label: "Campaign Approved", done: true },
      { label: "Artwork Verified", done: true },
      { label: "Fleet Assigned (350 vehicles)", done: true },
      { label: "Vinyl Wrap Installation", done: false, current: true, eta: "May 21, 2026" },
      { label: "QR Verification & Go-Live", done: false },
    ],
    metrics: null,
    weeklyChart: null,
    zoneBreakdown: null,
  },
  {
    id: "camp_002",
    title: "Sprite: Stay Cool",
    status: "Completed",
    duration: "Mar 1 - Apr 15, 2026",
    brand: "Sprite",
    category: "FMCG & Beverages",
    costModel: "Fixed Fleet Rate",
    fleetSize: "420 Autos",
    zones: ["Indiranagar", "Electronic City", "Whitefield"],
    city: "Bengaluru, KA",
    adKms: "82,100",
    views: "2.84M",
    imageUrl: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80&w=600",
    metrics: {
      totalVerifiedImpressions: 2840000,
      adKmsRaw: 82100,
      effectiveCPM: 38.6,
      fleetUtilization: 91,
      hardwareIntegrity: 98.1,
      uniqueZoneReach: 3,
      peakHour: "12–3 PM",
      totalSpend: 3892200,       // 420 autos × 46 days × ₹185 + ₹2800 production each
      renewalIntent: true,
    },
    weeklyChart: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      adKms: [11800, 13400, 14200, 13900, 15100, 13700],
      impressions: [428000, 492000, 518000, 508000, 562000, 332000],
    },
    zoneBreakdown: [
      { zone: "Indiranagar",   impressions: 1148000, fleet: 185, tier: "premium" },
      { zone: "Electronic City",impressions: 862000,  fleet: 135, tier: "standard" },
      { zone: "Whitefield",    impressions: 830000,  fleet: 100, tier: "premium" },
    ],
  },
  {
    id: "camp_003",
    title: "Coke Studio Takeover",
    status: "Completed",
    duration: "Jan 10 - Feb 10, 2026",
    brand: "Coke Studio",
    category: "Entertainment & OTT",
    costModel: "Fixed Fleet Rate",
    fleetSize: "280 Cabs",
    zones: ["Bandra West", "Lower Parel"],
    city: "Mumbai, MH",
    adKms: "61,400",
    views: "1.82M",
    imageUrl: "https://images.unsplash.com/photo-1605548230624-8d2d0419c517?auto=format&fit=crop&q=80&w=600",
    metrics: {
      totalVerifiedImpressions: 1820000,
      adKmsRaw: 61400,
      effectiveCPM: 47.2,
      fleetUtilization: 92,
      hardwareIntegrity: 98.8,
      uniqueZoneReach: 2,
      peakHour: "7–10 PM",
      totalSpend: 3619400,       // 280 cabs × 32 days × ₹310 + production
      renewalIntent: false,
    },
    weeklyChart: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      adKms: [14200, 16100, 16800, 14300],
      impressions: [412000, 498000, 528000, 382000],
    },
    zoneBreakdown: [
      { zone: "Bandra West", impressions: 1092000, fleet: 168, tier: "premium" },
      { zone: "Lower Parel", impressions: 728000,  fleet: 112, tier: "premium" },
    ],
  },
  {
    id: "camp_004",
    title: "Smartwater: Festive Drop",
    status: "Draft",
    duration: "Pending Approval",
    brand: "Smartwater",
    category: "FMCG & Beverages",
    costModel: "",
    fleetSize: "200 Cabs",
    zones: [],
    city: "",
    adKms: "0",
    views: "0",
    imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600",
    metrics: null,
    weeklyChart: null,
    zoneBreakdown: null,
  },
];

// ─── BRAND DASHBOARD METRICS ─────────────────────────────────────────────────
export const brandDashboardMetrics = {
  totalImpressions: { value: "5.2M",     label: "Total GPS-Verified Impressions", delta: "+14.2%",               deltaPositive: true,  sub: "Across all active campaigns" },
  activeCampaigns:  { value: "2",        label: "Active Campaigns",               delta: "+1 vs last month",      deltaPositive: true,  sub: "1 live · 1 in ops queue" },
  effectiveCPM:     { value: "₹42.8",   label: "Blended Effective CPM",          delta: "−55% vs industry avg",  deltaPositive: true,  sub: "Industry benchmark ₹95–120" },
  renewalRate:      { value: "67%",      label: "Campaign Renewal Rate",          delta: "+27pts vs 40% target",  deltaPositive: true,  sub: "2 of 3 completed campaigns renewed" },
  totalSpend:       { value: "₹24.2L",  label: "Total Spend (Active)",           delta: "On budget",             deltaPositive: true,  sub: "Summer Refresh '26" },
  fleetUtilization: { value: "89%",      label: "Fleet Utilisation",              delta: "+3pts vs last campaign", deltaPositive: true, sub: "500 vehicles · Bengaluru" },
};

// ─── WIZARD CONSTANTS ────────────────────────────────────────────────────────
export const BRANDS     = ["Coca-Cola India", "Sprite", "Thums Up", "Minute Maid", "Smartwater"];
export const CATEGORIES = ["FMCG & Beverages", "Quick-Commerce", "Electronics", "Apparel & Fashion", "Entertainment & OTT"];
export const COST_MODELS = [
  { id: "fixed",       label: "Fixed Fleet Rate (Per Vehicle/Day)" },
  { id: "performance", label: "Cost Per Ad-KM (Performance Based)" },
];
export const OOH_CITIES = ["Bengaluru, KA", "Mumbai, MH", "Delhi NCR", "Hyderabad, TS", "Chennai, TN", "Pune, MH"];

// ─── PERFORMANCE DATA STORE ──────────────────────────────────────────────────
export const performanceDataStore: Record<string, any> = {
  today: {
    metrics: { active: 486, adKms: "8,240", impressions: "284K", fraud: "98.4%" },
    chart: { labels: ["6 AM","9 AM","12 PM","3 PM","6 PM","9 PM","12 AM"], views: [4200,18400,14800,16200,24600,12800,2800], fleet: [68,198,174,182,210,156,48] },
  },
  "this-week": {
    metrics: { active: 500, adKms: "57,100", impressions: "1.96M", fraud: "97.8%" },
    chart: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], views: [248000,284000,298000,276000,342000,380000,128000], fleet: [462,486,498,480,510,520,340] },
  },
  "last-week": {
    metrics: { active: 488, adKms: "54,800", impressions: "1.88M", fraud: "98.1%" },
    chart: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], views: [236000,268000,282000,258000,326000,364000,146000], fleet: [448,472,482,464,494,508,358] },
  },
  "this-month": {
    metrics: { active: 500, adKms: "1,94,200", impressions: "6.64M", fraud: "98.2%" },
    chart: {
      labels: Array.from({ length: 20 }, (_, i) => `May ${i + 1}`),
      views:  [218000,242000,228000,264000,288000,342000,184000,238000,252000,244000,272000,298000,358000,192000,258000,274000,248000,284000,308000,374000],
      fleet:  [468,480,474,494,508,528,428,476,484,478,498,514,536,436,488,496,482,504,518,542],
    },
  },
  "last-month": {
    metrics: { active: 512, adKms: "2,12,400", impressions: "7.28M", fraud: "98.6%" },
    chart: {
      labels: Array.from({ length: 30 }, (_, i) => `Apr ${i + 1}`),
      views:  [224000,248000,238000,272000,296000,352000,192000,244000,258000,248000,278000,304000,364000,198000,262000,282000,254000,288000,316000,382000,208000,268000,288000,262000,294000,322000,388000,212000,278000,298000],
      fleet:  [472,484,478,498,512,532,432,480,488,482,502,518,540,440,492,500,486,508,522,546,444,496,504,490,514,526,552,448,506,516],
    },
  },
  custom: {
    metrics: { active: 474, adKms: "38,600", impressions: "1.32M", fraud: "97.6%" },
    chart: { labels: ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"], views: [168000,194000,208000,188000,218000,248000,108000], fleet: [436,454,462,444,468,484,386] },
  },
};

// ─── VEHICLE TYPES & MODELS ──────────────────────────────────────────────────
export const VEHICLE_TYPES = [
  "Auto Rickshaw", "Sedan Cabs", "SUV Cab",
  "Mini truck / Tata Ace", "6-wheeler truck", "Large Truck (10/12-wheeler)",
];

export const VEHICLE_MODELS: Record<string, string[]> = {
  "Auto Rickshaw":               ["Bajaj RE", "TVS King", "Piaggio Ape", "Mahindra Alfa"],
  "Sedan Cabs":                  ["Maruti Swift Dzire", "Honda Amaze", "Tata Tigor", "Hyundai Aura", "Toyota Etios"],
  "SUV Cab":                     ["Toyota Innova", "Mahindra Xylo", "Maruti Ertiga", "Kia Carens"],
  "Mini truck / Tata Ace":       ["Tata Ace Gold", "Mahindra Jeeto", "Ashok Leyland Dost"],
  "6-wheeler truck":             ["Tata 407", "Mahindra Bolero Pickup", "Eicher Pro 2049"],
  "Large Truck (10/12-wheeler)": ["Tata Prima", "Ashok Leyland 2518", "BharatBenz 1617R"],
};

export const ELIGIBLE_VEHICLE_TYPES = ["Auto Rickshaw", "Sedan Cabs", "SUV Cab"];
export const ELIGIBLE_ZONES         = ["Strictly Within City Limits"];

// ─── BANGALORE OPERATING ZONES ───────────────────────────────────────────────
export const BANGALORE_ZONES = [
  "Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "Electronic City",
  "MG Road / Brigade", "Jayanagar", "JP Nagar", "Bannerghatta Road",
  "Sarjapur Road", "Old Airport Road", "Hebbal", "Yeshwanthpur",
  "Rajajinagar", "BTM Layout", "Marathahalli", "Bellandur", "Yelahanka",
];

// ─── H3 ZONES — no activeBrand / blocked zones ───────────────────────────────
// activeFleet = realistic vehicles available in that zone for v1
export const H3_ZONES: Record<string, {
  id: string; label: string; tier: "premium" | "standard";
  verifiedImpressions: number;   // monthly, based on avg fleet × trips × density
  activeFleet: number;           // available vehicles in zone
  lat: number; lng: number;
  tripDensity: number;           // 0–100 for heatmap
  recommendedFor: string[];
}[]> = {
  "Bengaluru, KA": [
    { id: "blr-h3-001", label: "Koramangala",      tier: "premium",  verifiedImpressions: 268000, activeFleet: 138, lat: 12.9352, lng: 77.6245, tripDensity: 94, recommendedFor: ["FMCG & Beverages", "Quick-Commerce", "Entertainment & OTT"] },
    { id: "blr-h3-002", label: "Indiranagar",       tier: "premium",  verifiedImpressions: 214000, activeFleet: 104, lat: 12.9784, lng: 77.6408, tripDensity: 88, recommendedFor: ["FMCG & Beverages", "Apparel & Fashion"] },
    { id: "blr-h3-003", label: "Whitefield",        tier: "premium",  verifiedImpressions: 192000, activeFleet: 118, lat: 12.9698, lng: 77.7500, tripDensity: 79, recommendedFor: ["Electronics", "Quick-Commerce"] },
    { id: "blr-h3-004", label: "HSR Layout",        tier: "standard", verifiedImpressions: 148000, activeFleet: 82,  lat: 12.9116, lng: 77.6474, tripDensity: 67, recommendedFor: ["FMCG & Beverages", "Quick-Commerce"] },
    { id: "blr-h3-005", label: "Electronic City",   tier: "standard", verifiedImpressions: 124000, activeFleet: 68,  lat: 12.8458, lng: 77.6603, tripDensity: 62, recommendedFor: ["Electronics", "Quick-Commerce"] },
    { id: "blr-h3-006", label: "MG Road / Brigade", tier: "premium",  verifiedImpressions: 318000, activeFleet: 162, lat: 12.9757, lng: 77.6097, tripDensity: 97, recommendedFor: ["FMCG & Beverages", "Apparel & Fashion", "Entertainment & OTT"] },
    { id: "blr-h3-007", label: "Marathahalli",      tier: "standard", verifiedImpressions: 114000, activeFleet: 56,  lat: 12.9565, lng: 77.7011, tripDensity: 58, recommendedFor: ["Electronics"] },
    { id: "blr-h3-008", label: "Hebbal",            tier: "standard", verifiedImpressions: 98000,  activeFleet: 48,  lat: 13.0358, lng: 77.5970, tripDensity: 54, recommendedFor: ["Quick-Commerce"] },
  ],
  "Mumbai, MH": [
    { id: "mum-h3-001", label: "Bandra West",  tier: "premium",  verifiedImpressions: 348000, activeFleet: 182, lat: 19.0596, lng: 72.8295, tripDensity: 96, recommendedFor: ["Apparel & Fashion", "FMCG & Beverages", "Entertainment & OTT"] },
    { id: "mum-h3-002", label: "Lower Parel",  tier: "premium",  verifiedImpressions: 284000, activeFleet: 148, lat: 18.9985, lng: 72.8308, tripDensity: 91, recommendedFor: ["FMCG & Beverages", "Apparel & Fashion"] },
    { id: "mum-h3-003", label: "Andheri East", tier: "standard", verifiedImpressions: 196000, activeFleet: 106, lat: 19.1136, lng: 72.8697, tripDensity: 73, recommendedFor: ["Quick-Commerce"] },
    { id: "mum-h3-004", label: "Powai",        tier: "standard", verifiedImpressions: 162000, activeFleet: 86,  lat: 19.1176, lng: 72.9060, tripDensity: 65, recommendedFor: ["Electronics"] },
  ],
  "Delhi NCR": [
    { id: "del-h3-001", label: "Connaught Place",     tier: "premium",  verifiedImpressions: 402000, activeFleet: 204, lat: 28.6315, lng: 77.2167, tripDensity: 98, recommendedFor: ["FMCG & Beverages", "Apparel & Fashion", "Entertainment & OTT"] },
    { id: "del-h3-002", label: "Gurugram Cyber City", tier: "premium",  verifiedImpressions: 272000, activeFleet: 136, lat: 28.4595, lng: 77.0266, tripDensity: 84, recommendedFor: ["Electronics", "Quick-Commerce"] },
    { id: "del-h3-003", label: "Noida Sector 62",     tier: "standard", verifiedImpressions: 158000, activeFleet: 82,  lat: 28.6250, lng: 77.3714, tripDensity: 60, recommendedFor: ["Electronics"] },
  ],
  "Hyderabad, TS": [
    { id: "hyd-h3-001", label: "HITEC City",    tier: "premium",  verifiedImpressions: 246000, activeFleet: 122, lat: 17.4474, lng: 78.3762, tripDensity: 85, recommendedFor: ["Electronics", "Quick-Commerce"] },
    { id: "hyd-h3-002", label: "Banjara Hills", tier: "premium",  verifiedImpressions: 188000, activeFleet: 94,  lat: 17.4126, lng: 78.4341, tripDensity: 77, recommendedFor: ["FMCG & Beverages", "Apparel & Fashion"] },
    { id: "hyd-h3-003", label: "Gachibowli",    tier: "standard", verifiedImpressions: 144000, activeFleet: 72,  lat: 17.4401, lng: 78.3489, tripDensity: 59, recommendedFor: ["Electronics"] },
  ],
  "Chennai, TN": [
    { id: "che-h3-001", label: "Anna Nagar",        tier: "premium",  verifiedImpressions: 196000, activeFleet: 98,  lat: 13.0837, lng: 80.2101, tripDensity: 72, recommendedFor: ["FMCG & Beverages"] },
    { id: "che-h3-002", label: "OMR Tech Corridor", tier: "standard", verifiedImpressions: 152000, activeFleet: 78,  lat: 12.9010, lng: 80.2279, tripDensity: 61, recommendedFor: ["Electronics"] },
  ],
  "Pune, MH": [
    { id: "pun-h3-001", label: "Hinjewadi IT Park", tier: "premium",  verifiedImpressions: 174000, activeFleet: 88, lat: 18.5912, lng: 73.7389, tripDensity: 76, recommendedFor: ["Electronics", "Quick-Commerce"] },
    { id: "pun-h3-002", label: "Koregaon Park",     tier: "standard", verifiedImpressions: 132000, activeFleet: 66, lat: 18.5362, lng: 73.8943, tripDensity: 64, recommendedFor: ["FMCG & Beverages", "Apparel & Fashion"] },
  ],
};

// ─── DRIVER EARNINGS ─────────────────────────────────────────────────────────
// Realistic: auto driver earns ₹185/day fleet fee × 26 active days = ₹4,810/mo
// After Uber's 15% deduction = ₹4,088. Shown net below.
export const driverEarningsData = {
  currentMonth: {
    total: 4088,
    paid: 2860,
    pending: 1228,
    campaigns: [
      { name: "Coca-Cola Summer Refresh '26", brand: "Coca-Cola India", earned: 2618, adKms: 984, period: "May 1–19, 2026", status: "Active" },
      { name: "Sprite Stay Cool",             brand: "Sprite",          earned: 1470, adKms: 542, period: "May 1–15, 2026", status: "Completed" },
    ],
  },
  payoutHistory: [
    { month: "April 2026",    amount: 4214, status: "Paid", date: "May 5, 2026" },
    { month: "March 2026",    amount: 3892, status: "Paid", date: "Apr 5, 2026" },
    { month: "February 2026", amount: 3648, status: "Paid", date: "Mar 5, 2026" },
  ],
};

// ─── BANNER CONDITION SCORE (mock) ───────────────────────────────────────────
export function getBannerConditionScore(uploadedAt?: string): {
  score: number; label: string; color: string; detail: string;
} {
  const day   = uploadedAt ? new Date(uploadedAt).getDate() : new Date().getDate();
  const base  = 7.2 + ((day * 137) % 28) / 10;
  const score = Math.min(9.9, parseFloat(base.toFixed(1)));
  if (score >= 9.0) return { score, label: "Excellent",   color: "text-green-600", detail: "No visible wear. Colours are vivid and print-quality verified." };
  if (score >= 7.5) return { score, label: "Good",        color: "text-lime-600",  detail: "Minor edge lift detected. No action needed yet." };
  if (score >= 6.0) return { score, label: "Fair",        color: "text-amber-600", detail: "Surface scuff visible. Inspection recommended within 7 days." };
  return               { score, label: "Needs Review", color: "text-red-600",   detail: "Significant damage detected. Please visit a service centre." };
}