export interface Plate {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image?: string;
  category?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
  matches_user_allergies?: boolean | null;
  matches_user_diet_preferences?: boolean | null;
}

export interface MenuResponse {
  plates: Plate[];
  total_count?: number;
  categories?: string[];
}

export interface SpotlightedPlateResponse {
  /** Backend actual */
  spotlighted_plate?: Plate | null;
  /** Compatibilidad con respuestas que usan `plate` */
  plate?: Plate | null;
}

export interface FeaturedPlateResponse {
  plate: Plate | null;
}

export interface CategoriesResponse {
  categories: string[];
}

export interface PlateByIdResponse {
  plate: Plate;
}

export interface AddPlateRequest {
  name: string;
  description: string;
  price: number | string;
  image?: string;
  category?: string;
  is_featured?: boolean;
}

export interface AddPlateResponse {
  plate: Plate;
}
