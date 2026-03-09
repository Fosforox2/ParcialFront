import { Drink } from "@/types";
import axios from "axios";

type DrinkResponse = {
  drinks: Drink[] | null;
};

export const getDrinkById = async (id: number) => {
  const res = await axios.get<DrinkResponse>(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return res.data.drinks?.[0] ?? null;
};

export const getDrinkByName = async (name: string): Promise<Drink[]> => {
  const res = await axios.get<DrinkResponse>(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  return Array.isArray(res.data.drinks) ? res.data.drinks : [];
};

export const getRandomDrink = async () => {
  const res = await axios.get<DrinkResponse>(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  return res.data.drinks?.[0] ?? null;
};