import { Drink } from "@/types";
import { api } from "./axios"
import axios from "axios";



export const getDrinkById = async (id: number) => {
    const res = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return res.data.drinks?.[0] ?? null;
};

export const getDrinkByName = async ( name : string) => {
    const response = await api.get<Drink>(`search.php?s=${name}`);
    return response.data;
}