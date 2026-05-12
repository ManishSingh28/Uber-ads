// lib/data.ts

export const campaignDatabase = [
  { id: "camp_001", title: "Summer Refresh '26", status: "Live", duration: "May 1 - Jun 15, 2026", fleetSize: "500 Autos", adKms: "42,500", views: "1.2M", brand: "Coca-Cola", imageUrl: "https://unsplash.com/photos/wQFmDhrvVSs/download?w=600" },
  { id: "camp_002", title: "Sprite: Stay Cool", status: "Completed", duration: "Mar 1 - Apr 15, 2026", fleetSize: "1,200 Autos", adKms: "145,200", views: "4.8M", brand: "Sprite", imageUrl: "https://unsplash.com/photos/RH2ZA73kHiA/download?w=600" },
  { id: "camp_003", title: "Coke Studio Takeover", status: "Completed", duration: "Jan 10 - Feb 10, 2026", fleetSize: "300 Cabs", adKms: "84,000", views: "2.1M", brand: "Coke Studio", imageUrl: "https://images.unsplash.com/photo-1605548230624-8d2d0419c517?auto=format&fit=crop&q=80&w=600" },
  { id: "camp_004", title: "Smartwater: Festive Drop", status: "Draft", duration: "Pending Approval", fleetSize: "800 Cabs", adKms: "0", views: "0", brand: "Smartwater", imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600" }
];

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
      // 31 days for May
      labels: Array.from({length: 31}, (_, i) => `May ${i + 1}`),
      views: [5.1e6, 5.3e6, 5.0e6, 5.8e6, 6.2e6, 7.5e6, 4.2e6, 5.2e6, 5.4e6, 5.1e6, 5.9e6, 6.3e6, 7.8e6, 4.5e6, 5.5e6, 5.6e6, 5.2e6, 6.0e6, 6.5e6, 8.0e6, 4.8e6, 5.3e6, 5.7e6, 5.4e6, 6.1e6, 6.4e6, 7.9e6, 4.6e6, 5.8e6, 6.0e6, 5.5e6],
      fleet: [1010, 1015, 1005, 1040, 1060, 1100, 950, 1020, 1025, 1010, 1050, 1070, 1120, 960, 1030, 1040, 1020, 1060, 1080, 1130, 980, 1045, 1055, 1035, 1075, 1090, 1140, 990, 1065, 1070, 1050]
    }
  },
  'last-month': {
    metrics: { active: 1115, adKms: '3.6M', impressions: '184.5M', fraud: '98.8%' },
    chart: {
      // 30 days for April
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