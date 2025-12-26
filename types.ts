
export interface Product {
  id: string;
  name: string;
  category: 'pantry' | 'snack' | 'bakery';
  price: number;
  image: string;
  description: string;
  weight?: string;
  badge?: string;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  price: number;
  image: string;
  ingredients: string[];
  tags: string[];
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  difficulty: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'meal';
  image: string;
  weight?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  method: 'card' | 'cod';
  timestamp: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
}

export type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};
