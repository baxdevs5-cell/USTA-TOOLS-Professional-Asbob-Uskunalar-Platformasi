export type Language = 'uz' | 'ru' | 'en';
export type Theme = 'dark' | 'light';

export interface Product {
  id: string;
  name: string;
  brand: string;
  categorySlug: string;
  subCategory?: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  gallery: string[];
  
  // Technical Specifications
  power: string;          // e.g. "7.5 kW" or "2200 W"
  powerKw?: number;
  voltage: string;        // e.g. "220V", "380V", "20V Li-Ion"
  current?: string;       // e.g. "20–300A"
  maxCurrentA?: number;
  frequency?: string;     // e.g. "50/60 Hz"
  weight: number;         // in kg
  dimensions?: string;    // e.g. "410 x 165 x 285 mm"
  dutyCycle?: string;     // e.g. "60% @ 300A, 100% @ 230A"
  dutyCyclePercent?: number; // 60
  workingTemperature?: string; // e.g. "-10°C ~ +40°C"
  protectionClass?: string;    // e.g. "IP21S", "IP54"
  warrantyMonths: number;      // e.g. 12 or 24
  cableLength?: string;        // e.g. "3.0 m"
  batteryCapacity?: string;    // e.g. "4.0 Ah"
  chargingTime?: string;       // e.g. "1.5 hours"
  grade: 'professional' | 'home';
  powerSource: 'electric' | 'battery' | 'gas' | 'manual';

  // Tool Lifetime & Working Time (Labeled as manufacturer/workshop estimates)
  workingSpecs: {
    continuousTime: string;      // e.g. "45 minut"
    recommendedRest: string;     // e.g. "15 minut"
    dailyRecommended: string;    // e.g. "6-8 soat"
    estimatedServiceLife: string;// e.g. "5 yil"
    batteryRunTime?: string;     // e.g. "3.5 soat"
    chargingTime?: string;       // e.g. "1.5 soat"
  };

  description: {
    uz: string;
    ru: string;
    en: string;
  };
  advantages: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  disadvantages: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  recommendedAccessories?: string[]; // IDs or names
}

export interface Category {
  id: string;
  slug: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  icon: string;
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    comment?: string;
  };
  paymentMethod: 'cash' | 'payme' | 'click' | 'bank_transfer';
  status: 'processing' | 'packing' | 'in_transit' | 'delivered';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  workshopName: string;
  specialty: string;
  savedProjects: SavedProject[];
  calculatorHistory: CalculatorHistoryItem[];
}

export interface SavedProject {
  id: string;
  date: string;
  title: string;
  materialCost: number;
  electrodesCost: number;
  electricityCost: number;
  gasCost: number;
  toolWearCost: number;
  laborCost: number;
  transportCost: number;
  otherCost: number;
  totalCost: number;
  profitMarginPercent: number;
  suggestedPrice: number;
  estimatedHours: number;
}

export interface CalculatorHistoryItem {
  id: string;
  date: string;
  calcType: string;
  title: string;
  summary: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}
