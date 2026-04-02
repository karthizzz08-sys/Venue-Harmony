export interface HallDuration {
  id: string;
  label: string;
  timing: string;
  price: number;
}

export interface AdditionalCharge {
  id: string;
  label: string;
  rate: string;
  unit: string;
  icon: string;
}

export interface Extra {
  id: string;
  label: string;
  price: number;
  icon: string;
}

export interface PhotoPackage {
  id: string;
  name: string;
  tier: 'silver' | 'gold' | 'platinum' | 'diamond';
  pricePerEvent: number;
  priceFor2Events: number;
  features: string[];
  badge?: string;
}

export interface DecorationItem {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export interface EventPackage {
  id: string;
  name: string;
  pricePerHead: number;
  guestCount: number;
  sections: { title: string; items: string[] }[];
}

export const hallDurations: HallDuration[] = [
  { id: '4hrs', label: '4 Hours', timing: 'Flexible timing', price: 25000 },
  { id: 'half', label: 'Half Day', timing: '6:00 AM – 4:00 PM', price: 35000 },
  { id: 'full', label: 'Full Day', timing: '4:00 PM – 4:00 PM', price: 55000 },
];

export const additionalCharges: AdditionalCharge[] = [
  { id: 'electricity', label: 'Electricity (EB)', rate: '₹30', unit: 'per unit', icon: '⚡' },
  { id: 'cleaning', label: 'Cleaning Charges', rate: '₹5,000', unit: 'fixed', icon: '🧹' },
  { id: 'gas', label: 'Gas Charges', rate: '₹220/kg', unit: 'if used', icon: '🔥' },
  { id: 'generator', label: 'Generator', rate: '₹2,500/hr', unit: 'if used', icon: '🔌' },
];

export const extras: Extra[] = [
  { id: 'mandapam-light', label: 'Mandapam Lighting', price: 8000, icon: '💡' },
  { id: 'lawn-light', label: 'Lawn Area Lighting', price: 5000, icon: '🌿' },
  { id: 'bubble', label: 'Bubble Burst', price: 1500, icon: '🫧' },
  { id: 'pyro', label: 'Pyro Burst', price: 1500, icon: '🎆' },
  { id: 'paper', label: 'Paper Burst', price: 1500, icon: '🎊' },
  { id: 'selfie', label: '360° Selfie Booth', price: 7500, icon: '📸' },
];

export const photoPackages: PhotoPackage[] = [
  {
    id: 'silver',
    name: 'Silver',
    tier: 'silver',
    pricePerEvent: 8000,
    priceFor2Events: 12000,
    features: [
      'Traditional Photographer (1)',
      'Fully digital photos in pendrive',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    tier: 'gold',
    pricePerEvent: 25000,
    priceFor2Events: 40000,
    features: [
      'Traditional Photographer (1)',
      'Traditional Videographer (1)',
      'Full-length 4K video + photos in pendrive',
      'Premium Canva Album (1)',
    ],
    badge: 'Popular',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tier: 'platinum',
    pricePerEvent: 50000,
    priceFor2Events: 80000,
    features: [
      'Traditional Photographer (1)',
      'Traditional Videographer (1)',
      'Candid Photographer (1)',
      'Drone + TV (2 nos)',
      'Full-length 4K video + photos',
      'Premium Canva Album',
    ],
    badge: 'Best Value',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    tier: 'diamond',
    pricePerEvent: 80000,
    priceFor2Events: 120000,
    features: [
      'Traditional Photographer (1)',
      'Traditional Videographer (1)',
      'Candid Photographer (1)',
      'Drone + TV (2 nos)',
      'Pre/Post wedding shoot (1 day)',
      'Full-length 4K video + photos',
      'Premium Canva Album (enhanced)',
      'Cinematic story invitation',
      'Special proposal event',
      'Digital invitation',
    ],
    badge: 'Premium',
  },
];

export const decorationItems: DecorationItem[] = [
  { id: 'stage-basic', name: 'Basic Stage Decoration', price: 15000, description: 'Simple floral & fabric stage setup', icon: '🌸' },
  { id: 'stage-premium', name: 'Premium Stage Decoration', price: 35000, description: 'Elegant violet & white floral mandapam', icon: '💐' },
  { id: 'stage-grand', name: 'Grand Stage Decoration', price: 60000, description: 'Luxury full-stage décor with lighting', icon: '👑' },
  { id: 'entrance', name: 'Entrance Decoration', price: 10000, description: 'Welcome arch with flowers & drapes', icon: '🚪' },
  { id: 'table-decor', name: 'Table Centerpieces', price: 8000, description: 'Elegant table arrangements (all tables)', icon: '🕯️' },
  { id: 'car-decor', name: 'Wedding Car Decoration', price: 5000, description: 'Beautiful car décor with flowers & ribbons', icon: '🚗' },
];

export const eventPackage: EventPackage = {
  id: 'premium',
  name: 'Premium Engagement / Wedding Package',
  pricePerHead: 750,
  guestCount: 500,
  sections: [
    {
      title: '🎉 Grand Welcome',
      items: ['Valai Maram', 'Santhanam, Kumkumam', 'Paneer, Kalkandu, Rose', 'Welcome Girl'],
    },
    {
      title: '🍵 Welcome Drinks (250 Nos)',
      items: ['Tea', 'Coffee', 'Valai Thandu Soup', 'Vazhaipoo Vada', 'Kara Paniyaram'],
    },
    {
      title: '🎂 Cake Cutting',
      items: ['Special Cake Cutting Arrangement'],
    },
    {
      title: '🌸 Decoration',
      items: ['Fully Artificial Decoration', 'Welcome Board (customized)'],
    },
    {
      title: '📸 Photography & Videography',
      items: ['Traditional Photographer (1)', 'Traditional Videographer (1)', 'Bubble Burst during ring exchange', 'Premium Canva Album (40 pages)', 'Pendrive with all photos & 4K video'],
    },
    {
      title: '🍽️ Grand Lunch (500 Nos)',
      items: ['Bread Halwa', 'Fried Egg', 'Seeraga Samba Chicken Biryani', 'Elumbu Thalicha', 'Puli Kathrika', 'Chicken 65 / Chicken Gravy', 'Onion Raitha', 'Curd Rice with Fruits', 'Urugai & Vathal', 'Water Bottle + Elai + Paper Roll', 'Hot Badham Paal', 'Ice Cream', 'Vethalai + Pakku + Gulkand / Sweet Beeda'],
    },
    {
      title: '🏛️ Hall Inclusions',
      items: ['A/C Mandapam', 'Cleaning charges', 'EB charges', 'Gas', 'Generator'],
    },
  ],
};

export function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
