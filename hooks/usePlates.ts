"use client";

import { useState, useEffect } from "react";
import { platesAPI } from "@/lib/api/client";
import type { Plate, MenuResponse, SpotlightedPlateResponse, CategoriesResponse, PlateByIdResponse } from "@/types/plates";

interface UseMenuResult {
  plates: Plate[];
  loading: boolean;
  error: Error | null;
}

export function useMenu(): UseMenuResult {
  const [plates, setPlates] = useState<Plate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: MenuResponse = await platesAPI.getMenu();
        setPlates(response.plates || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch menu"));
        setPlates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { plates, loading, error };
}

interface UseSpotlightedPlateResult {
  plate: Plate | null;
  loading: boolean;
  error: Error | null;
}

export function useSpotlightedPlate(): UseSpotlightedPlateResult {
  const [plate, setPlate] = useState<Plate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpotlighted = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: SpotlightedPlateResponse = await platesAPI.getSpotlighted();
        setPlate(response.plate);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch spotlighted plate"));
        setPlate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotlighted();
  }, []);

  return { plate, loading, error };
}

interface UseCategoriesResult {
  categories: string[];
  loading: boolean;
  error: Error | null;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: CategoriesResponse = await platesAPI.getCategories();
        setCategories(response.categories || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch categories"));
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

interface UsePlateByIdResult {
  plate: Plate | null;
  loading: boolean;
  error: Error | null;
}

export function usePlateById(plateId: number | null): UsePlateByIdResult {
  const [plate, setPlate] = useState<Plate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!plateId) {
      setPlate(null);
      setLoading(false);
      return;
    }

    const fetchPlate = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: PlateByIdResponse = await platesAPI.getPlateById(String(plateId));
        setPlate(response.plate);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch plate"));
        setPlate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlate();
  }, [plateId]);

  return { plate, loading, error };
}
