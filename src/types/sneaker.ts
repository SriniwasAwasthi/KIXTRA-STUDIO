export interface SneakerProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  angleImages: string[];
  silhouette: 'Vortex Runner' | 'Air Glider' | 'Court High' | 'Urban Trek' | 'Cyber Punk' | 'Volt Strider';
  colorway: string;
  tags: ('New' | 'Hot' | 'Limited' | 'Platform' | 'Unisex' | 'Customizable')[];
  movementProfile: string;
  description: string;
  rating: number;
  reviewsCount: number;
  sizes: number[];
  specs: string[];
  inStock: boolean;
}

export interface CustomColorPalette {
  name: string;
  hex: string;
  textColor: string;
}

export interface CustomSneakerConfig {
  baseSilhouetteId: string;
  upperColor: CustomColorPalette;
  soleColor: CustomColorPalette;
  lacesColor: CustomColorPalette;
  heelStrapColor: CustomColorPalette;
  accentColor: CustomColorPalette;
  customText: string;
  patchEmoji: string;
  laceAddon: boolean;
  size: number;
  totalPrice: number;
  baseColor?: CustomColorPalette;
  embroiderySize?: 'Small' | 'Medium' | 'Large';
  bagType?: 'Basic Dust Bag' | 'Creator Premium Sling' | 'Waterproof Duffle (+$25)' | 'Collector Aluminum Briefcase (+$40)';
}

export interface CartItem {
  id: string;
  type: 'catalog' | 'custom';
  product?: SneakerProduct;
  customConfig?: CustomSneakerConfig;
  size: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
  subtitle: string;
  addedAt: number;
}

export interface PolaroidPost {
  id: string;
  author: string;
  title: string;
  subtitle: string;
  image: string;
  likes: number;
  liked?: boolean;
  caption: string;
  timestamp: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  sneakerModel: string;
}
