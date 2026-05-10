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