export interface Cake {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  badge?: 'Bestseller' | 'Seasonal' | 'New' | 'Chef\'s Special';
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatarColor: string;
  initials: string;
}

export interface OrderRequest {
  fullName: string;
  phone: string;
  cakeType: string;
  deliveryDate: string;
  instructions: string;
  weight: string; // "0.5kg" | "1kg" | "2kg"
  eggless: boolean;
  customText: string;
}

export interface CustomCake {
  sponge: string;
  frosting: string;
  toppings: string[];
  tiers: number;
  eggless: boolean;
  message: string;
  weight: string;
}
