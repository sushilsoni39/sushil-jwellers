import { MetalType, Purity, Product } from './types';

export const MAKING_CHARGES_PERCENT = 0.15;
export const GST_PERCENT = 0.03;

// Updated Indian market prices (as of March 2024 benchmarks)
export const INITIAL_PRICES = [
  { type: MetalType.GOLD, pricePerGram: 7925, change: 0.85 },
  { type: MetalType.SILVER, pricePerGram: 96.20, change: -0.4 },
  { type: MetalType.PLATINUM, pricePerGram: 2980, change: 0.25 },
];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Heritage Temple Necklace',
    category: 'Necklace',
    description: 'A majestic 22K gold masterpiece featuring intricate divine motifs, meticulously handcrafted by hereditary artisans for bridal elegance.',
    metal: MetalType.GOLD,
    purity: Purity.GOLD_22K,
    weight: 45.5,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Antique Gold Bridal Choker',
    category: 'Necklace',
    description: 'An ethereal bridal choker in antique-finished gold, designed to grace the modern bride with timeless royalty and sophisticated charm.',
    metal: MetalType.GOLD,
    purity: Purity.GOLD_22K,
    weight: 62.2,
    imageUrl: 'https://images.unsplash.com/photo-1629227354192-35919634d98f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Victorian 925 Silver Bangle',
    category: 'Bangles',
    description: 'Fine 925 silver bangles showcasing Victorian lace-work, blending vintage charm with sterling brilliance for everyday luxury.',
    metal: MetalType.SILVER,
    purity: Purity.SILVER_999,
    weight: 25.0,
    imageUrl: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Solitaire Platinum Engagement Band',
    category: 'Ring',
    description: 'A sleek, rare 950 platinum band celebrating an eternal union with a single, brilliant-cut solitaire of exceptional clarity.',
    metal: MetalType.PLATINUM,
    purity: Purity.PLAT_950,
    weight: 8.5,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Traditional Gold Jhumka Studs',
    category: 'Earrings',
    description: '18K gold jhumkas adorned with delicate filigree work and ruby drops, capturing the essence of Indian cultural festivity.',
    metal: MetalType.GOLD,
    purity: Purity.GOLD_18K,
    weight: 12.3,
    imageUrl: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Exquisite Silver Payal (Anklet)',
    category: 'Anklets',
    description: 'Artfully crafted pure silver anklets featuring rhythmic links and musical ghungroos that celebrate every graceful step.',
    metal: MetalType.SILVER,
    purity: Purity.SILVER_999,
    weight: 35.8,
    imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '7',
    name: 'Infinity Gold Diamond Bracelet',
    category: 'Bracelet',
    description: 'A contemporary 18K yellow gold bracelet featuring an infinity motif encrusted with pavé-set diamonds for a touch of sparkle.',
    metal: MetalType.GOLD,
    purity: Purity.GOLD_18K,
    weight: 18.4,
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    name: 'Celestial Moon Gold Earrings',
    category: 'Earrings',
    description: 'Hand-carved 22K gold earrings inspired by celestial bodies, featuring a crescent moon design with textured gold finish.',
    metal: MetalType.GOLD,
    purity: Purity.GOLD_22K,
    weight: 9.2,
    imageUrl: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '9',
    name: 'Sleek Platinum Men\'s Band',
    category: 'Ring',
    description: 'A minimalist yet bold 950 platinum band for men, featuring a dual-texture matte and polished finish for modern sophistication.',
    metal: MetalType.PLATINUM,
    purity: Purity.PLAT_950,
    weight: 14.5,
    imageUrl: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '10',
    name: 'Oxidized Silver Temple Set',
    category: 'Necklace',
    description: 'A stunning oxidized silver necklace set with traditional Lakshmi motifs, perfect for ethnic wear and spiritual occasions.',
    metal: MetalType.SILVER,
    purity: Purity.SILVER_999,
    weight: 55.0,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '11',
    name: 'Traditional Gold Kada Bangle',
    category: 'Bangles',
    description: 'A thick, solid 22K gold Kada with embossed floral patterns, representing strength and heritage in Indian craftsmanship.',
    metal: MetalType.GOLD,
    purity: Purity.GOLD_22K,
    weight: 32.8,
    imageUrl: 'https://images.unsplash.com/photo-1589674781757-3ea215ccdb51?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12',
    name: 'Sushil Special Gold Coin (10g)',
    category: 'Investment',
    description: '99.9% pure 24K gold investment coin with the SUSHIL Jewellers hallmark seal, perfect for gifting and savings.',
    metal: MetalType.GOLD,
    purity: Purity.GOLD_24K,
    weight: 10.0,
    imageUrl: 'https://images.unsplash.com/photo-1589118944245-7d399fb45526?auto=format&fit=crop&w=800&q=80'
  }
];