import type {
  MenuResponse,
  SpotlightedPlateResponse,
  CategoriesResponse,
  PlateByIdResponse,
  AddPlateRequest,
  AddPlateResponse,
} from "@/types/plates";

const API_BASE_URL = 'https://api.foodvery.com.do';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const platesAPI = {
  getMenu: async (): Promise<MenuResponse> => {
    return fetchAPI<MenuResponse>('/api/plates/menu');
  },

  getSpotlighted: async (): Promise<SpotlightedPlateResponse> => {
    return fetchAPI<SpotlightedPlateResponse>('/api/plates/spotlighted');
  },

  getCategories: async (): Promise<CategoriesResponse> => {
    return fetchAPI<CategoriesResponse>('/api/plates/categories');
  },

  getPlateById: async (plateId: string): Promise<PlateByIdResponse> => {
    return fetchAPI<PlateByIdResponse>(`/api/plates/${plateId}`);
  },

  addPlate: async (data: AddPlateRequest): Promise<AddPlateResponse> => {
    return fetchAPI<AddPlateResponse>('/api/plates/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
