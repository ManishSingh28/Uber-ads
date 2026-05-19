// lib/data.ts

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
    adKms: "42,500",
    views: "1.2M",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
    metrics: {
      totalVerifiedImpressions: 1200000,
      adKmsRaw: 42500,
      effectiveCPM: 38.4,
      fleetUtilization: 91,
      hardwareIntegrity: 98.2,
      uniqueZoneReach: 3,
      peakHour: "6–9 PM",
      totalSpend: 1632000,
      renewalIntent: true,
    },
    weeklyChart: {
      labels: ["Week 1", "Week 2", "Week 3"],
      adKms: [12400, 15800, 14300],
      impressions: [340000, 480000, 380000],
    },
    zoneBreakdown: [
      { zone: "Koramangala", impressions: 480000, fleet: 210, tier: "premium" },
      { zone: "Indiranagar", impressions: 390000, fleet: 160, tier: "premium" },
      { zone: "MG Road / Brigade", impressions: 330000, fleet: 130, tier: "premium" },
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
    zones: ["Koramangala", "Whitefield"],
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
    fleetSize: "1,200 Autos",
    zones: ["HSR Layout", "Electronic City", "Whitefield"],
    city: "Bengaluru, KA",
    adKms: "145,200",
    views: "4.8M",
    imageUrl: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80&w=600",
    metrics: {
      totalVerifiedImpressions: 4800000,
      adKmsRaw: 145200,
      effectiveCPM: 42.5,
      fleetUtilization: 87,
      hardwareIntegrity: 97.6,
      uniqueZoneReach: 3,
      peakHour: "12–3 PM",
      totalSpend: 6120000,
      renewalIntent: true,
    },
    weeklyChart: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      adKms: [21000, 24800, 26400, 25200, 27600, 20200],
      impressions: [680000, 810000, 890000, 840000, 940000, 640000],
    },
    zoneBreakdown: [
      { zone: "HSR Layout", impressions: 1820000, fleet: 480, tier: "standard" },
      { zone: "Electronic City", impressions: 1540000, fleet: 420, tier: "standard" },
      { zone: "Whitefield", impressions: 1440000, fleet: 300, tier: "premium" },
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
    fleetSize: "300 Cabs",
    zones: ["Bandra West", "Lower Parel"],
    city: "Mumbai, MH",
    adKms: "84,000",
    views: "2.1M",
    imageUrl: "https://images.unsplash.com/photo-1605548230624-8d2d0419c517?auto=format&fit=crop&q=80&w=600",
    metrics: {
      totalVerifiedImpressions: 2100000,
      adKmsRaw: 84000,
      effectiveCPM: 51.2,
      fleetUtilization: 94,
      hardwareIntegrity: 99.1,
      uniqueZoneReach: 2,
      peakHour: "7–10 PM",
      totalSpend: 4301000,
      renewalIntent: false,
    },
    weeklyChart: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      adKms: [19200, 22400, 23100, 19300],
      impressions: [470000, 560000, 590000, 480000],
    },
    zoneBreakdown: [
      { zone: "Bandra West", impressions: 1260000, fleet: 178, tier: "premium" },
      { zone: "Lower Parel", impressions: 840000, fleet: 122, tier: "premium" },
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
    fleetSize: "800 Cabs",
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

// Dashboard summary metrics (brand-level, not campaign-level)
export const brandDashboardMetrics = {
  totalImpressions: { value: "8.1M", label: "Total GPS-Verified Impressions", delta: "+18.4%", deltaPositive: true, sub: "Across all active campaigns" },
  activeCampaigns: { value: "2", label: "Active Campaigns", delta: "+1 vs last month", deltaPositive: true, sub: "1 live · 1 in ops queue" },
  effectiveCPM: { value: "₹40.5", label: "Blended Effective CPM", delta: "−12% vs industry avg", deltaPositive: true, sub: "Industry benchmark ₹95–120" },
  renewalRate: { value: "67%", label: "Campaign Renewal Rate", delta: "+27pts vs 40% target", deltaPositive: true, sub: "2 of 3 completed campaigns renewed" },
  totalSpend: { value: "₹1.63Cr", label: "Total Spend (Active)", delta: "On budget", deltaPositive: true, sub: "Summer Refresh '26" },
  fleetUtilization: { value: "91%", label: "Fleet Utilisation", delta: "+4pts vs last campaign", deltaPositive: true, sub: "500 vehicles · Bengaluru" },
};

// NEW DATA CONSTANTS FOR THE WIZARD
export const BRANDS = ["Coca-Cola India", "Sprite", "Thums Up", "Minute Maid", "Smartwater"];
export const CATEGORIES = ["FMCG & Beverages", "Quick-Commerce", "Electronics", "Apparel & Fashion", "Entertainment & OTT"];
export const COST_MODELS = [
    { id: "fixed", label: "Fixed Fleet Rate (Per Vehicle/Day)" },
    { id: "performance", label: "Cost Per Ad-KM (Performance Based)" }
];
export const OOH_CITIES = [
    "Bengaluru, KA", 
    "Mumbai, MH", 
    "Delhi NCR", 
    "Hyderabad, TS", 
    "Chennai, TN", 
    "Pune, MH"
];

export const performanceDataStore: Record<string, any> = {
  'today': {
    metrics: { active: 942, adKms: '112.4k', impressions: '5.8M', fraud: '98.2%' },
    chart: {
      labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
      views: [12000, 45000, 38000, 41000, 58000, 32000, 8000],
      fleet: [150, 480, 420, 440, 500, 380, 120]
    }
  },
  'this-week': {
    metrics: { active: 1024, adKms: '845.2k', impressions: '42.1M', fraud: '97.9%' },
    chart: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      views: [5.2e6, 5.8e6, 6.1e6, 6.0e6, 7.2e6, 8.4e6, 3.4e6],
      fleet: [980, 1010, 1040, 1020, 1100, 1150, 820]
    }
  },
  'last-week': {
    metrics: { active: 988, adKms: '810.5k', impressions: '39.8M', fraud: '98.5%' },
    chart: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      views: [4.8e6, 5.1e6, 5.5e6, 5.4e6, 6.8e6, 8.1e6, 4.1e6],
      fleet: [920, 950, 980, 990, 1050, 1120, 850]
    }
  },
  'this-month': {
    metrics: { active: 1080, adKms: '3.4M', impressions: '168.2M', fraud: '98.1%' },
    chart: {
      labels: Array.from({length: 31}, (_, i) => `May ${i + 1}`),
      views: [5.1e6, 5.3e6, 5.0e6, 5.8e6, 6.2e6, 7.5e6, 4.2e6, 5.2e6, 5.4e6, 5.1e6, 5.9e6, 6.3e6, 7.8e6, 4.5e6, 5.5e6, 5.6e6, 5.2e6, 6.0e6, 6.5e6, 8.0e6, 4.8e6, 5.3e6, 5.7e6, 5.4e6, 6.1e6, 6.4e6, 7.9e6, 4.6e6, 5.8e6, 6.0e6, 5.5e6],
      fleet: [1010, 1015, 1005, 1040, 1060, 1100, 950, 1020, 1025, 1010, 1050, 1070, 1120, 960, 1030, 1040, 1020, 1060, 1080, 1130, 980, 1045, 1055, 1035, 1075, 1090, 1140, 990, 1065, 1070, 1050]
    }
  },
  'last-month': {
    metrics: { active: 1115, adKms: '3.6M', impressions: '184.5M', fraud: '98.8%' },
    chart: {
      labels: Array.from({length: 30}, (_, i) => `Apr ${i + 1}`),
      views: [5.8e6, 6.0e6, 5.9e6, 6.5e6, 6.8e6, 8.2e6, 5.0e6, 5.9e6, 6.1e6, 6.0e6, 6.6e6, 7.0e6, 8.5e6, 5.2e6, 6.1e6, 6.3e6, 6.1e6, 6.8e6, 7.2e6, 8.8e6, 5.5e6, 6.2e6, 6.4e6, 6.3e6, 6.9e6, 7.4e6, 9.0e6, 5.8e6, 6.5e6, 6.7e6],
      fleet: [1050, 1060, 1055, 1090, 1110, 1160, 1000, 1065, 1075, 1060, 1100, 1120, 1180, 1020, 1080, 1090, 1070, 1115, 1135, 1195, 1040, 1095, 1105, 1085, 1125, 1145, 1205, 1060, 1110, 1120]
    }
  },
  'custom': {
    metrics: { active: 965, adKms: '542.1k', impressions: '28.4M', fraud: '97.4%' },
    chart: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      views: [3.2e6, 3.8e6, 4.1e6, 3.9e6, 4.5e6, 5.1e6, 3.8e6],
      fleet: [900, 920, 940, 910, 980, 1020, 890]
    }
  }
};

export const VEHICLE_TYPES = [
    "Auto Rickshaw", 
    "Sedan Cabs",
    "SUV Cab",
    "Mini truck / Tata Ace",
    "6-wheeler truck", 
    "Large Truck (10/12-wheeler)"
];

// H3 Zone definitions per city with verified impression data
export const H3_ZONES: Record<string, { id: string; label: string; tier: 'premium' | 'standard'; verifiedImpressions: number; activeFleet: number; activeBrand: string | null }[]> = {
  "Bengaluru, KA": [
    { id: "blr-h3-001", label: "Koramangala", tier: "premium", verifiedImpressions: 284000, activeFleet: 142, activeBrand: "Coca-Cola India" },
    { id: "blr-h3-002", label: "Indiranagar", tier: "premium", verifiedImpressions: 211000, activeFleet: 98, activeBrand: null },
    { id: "blr-h3-003", label: "Whitefield", tier: "premium", verifiedImpressions: 196000, activeFleet: 113, activeBrand: null },
    { id: "blr-h3-004", label: "HSR Layout", tier: "standard", verifiedImpressions: 143000, activeFleet: 78, activeBrand: "Sprite" },
    { id: "blr-h3-005", label: "Electronic City", tier: "standard", verifiedImpressions: 128000, activeFleet: 65, activeBrand: null },
    { id: "blr-h3-006", label: "MG Road / Brigade", tier: "premium", verifiedImpressions: 312000, activeFleet: 164, activeBrand: null },
  ],
  "Mumbai, MH": [
    { id: "mum-h3-001", label: "Bandra West", tier: "premium", verifiedImpressions: 341000, activeFleet: 178, activeBrand: null },
    { id: "mum-h3-002", label: "Lower Parel", tier: "premium", verifiedImpressions: 289000, activeFleet: 145, activeBrand: null },
    { id: "mum-h3-003", label: "Andheri East", tier: "standard", verifiedImpressions: 198000, activeFleet: 102, activeBrand: null },
    { id: "mum-h3-004", label: "Powai", tier: "standard", verifiedImpressions: 167000, activeFleet: 88, activeBrand: null },
  ],
  "Delhi NCR": [
    { id: "del-h3-001", label: "Connaught Place", tier: "premium", verifiedImpressions: 398000, activeFleet: 201, activeBrand: null },
    { id: "del-h3-002", label: "Gurugram Cyber City", tier: "premium", verifiedImpressions: 276000, activeFleet: 139, activeBrand: null },
    { id: "del-h3-003", label: "Noida Sector 62", tier: "standard", verifiedImpressions: 154000, activeFleet: 81, activeBrand: null },
  ],
  "Hyderabad, TS": [
    { id: "hyd-h3-001", label: "HITEC City", tier: "premium", verifiedImpressions: 243000, activeFleet: 124, activeBrand: null },
    { id: "hyd-h3-002", label: "Banjara Hills", tier: "premium", verifiedImpressions: 187000, activeFleet: 96, activeBrand: null },
    { id: "hyd-h3-003", label: "Gachibowli", tier: "standard", verifiedImpressions: 142000, activeFleet: 73, activeBrand: null },
  ],
  "Chennai, TN": [
    { id: "che-h3-001", label: "Anna Nagar", tier: "premium", verifiedImpressions: 198000, activeFleet: 102, activeBrand: null },
    { id: "che-h3-002", label: "OMR Tech Corridor", tier: "standard", verifiedImpressions: 156000, activeFleet: 82, activeBrand: null },
  ],
  "Pune, MH": [
    { id: "pun-h3-001", label: "Hinjewadi IT Park", tier: "premium", verifiedImpressions: 178000, activeFleet: 91, activeBrand: null },
    { id: "pun-h3-002", label: "Koregaon Park", tier: "standard", verifiedImpressions: 134000, activeFleet: 69, activeBrand: null },
  ],
};

// Brands currently active in zones — used for exclusivity conflict detection
export const ACTIVE_BRAND_ZONES: Record<string, string[]> = {
  "Coca-Cola India": ["blr-h3-001"],
  "Sprite": ["blr-h3-004"],
};

// Driver eligibility rules
export const ELIGIBLE_VEHICLE_TYPES = ["Auto Rickshaw", "Sedan Cabs", "SUV Cab"];
export const ELIGIBLE_ZONES = ["Strictly Within City Limits"];

// Driver earnings data
export const driverEarningsData = {
  currentMonth: {
    total: 3420,
    paid: 2400,
    pending: 1020,
    campaigns: [
      { name: "Coca-Cola Summer Refresh '26", brand: "Coca-Cola India", earned: 2180, adKms: 820, period: "May 1–19, 2026", status: "Active" },
      { name: "Sprite Stay Cool", brand: "Sprite", earned: 1240, adKms: 480, period: "May 1–15, 2026", status: "Completed" },
    ],
  },
  payoutHistory: [
    { month: "April 2026", amount: 3850, status: "Paid", date: "May 5, 2026" },
    { month: "March 2026", amount: 3120, status: "Paid", date: "Apr 5, 2026" },
    { month: "February 2026", amount: 2740, status: "Paid", date: "Mar 5, 2026" },
  ],
};