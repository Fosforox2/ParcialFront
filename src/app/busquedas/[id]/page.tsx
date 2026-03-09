'use client';

import { getDrinkById } from "@/lib/api/drink";
import { Drink } from "@/types";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EstaRecibeId = () => {

    const { id } = useParams();
    const router = useRouter();

    const [bebida, setBebida] = useState<Drink | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        getDrinkById(Number(id))
            .then((res) => {
                setBebida(res);
            })
            .catch((e: AxiosError) => {
                setError(e.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;
    if (!bebida) return <h2>Cocktail no encontrado</h2>;

    const ingredientes = [];

    for (let i = 1; i <= 15; i++) {
        const nombre = bebida[`strIngredient${i}` as keyof Drink];
        const medida = bebida[`strMeasure${i}` as keyof Drink];

        if (nombre) {
            ingredientes.push(`${nombre} ${medida ?? ""}`);
        }
    }

    return (
        
        <div className="container">

           

            <img
                src={bebida.strDrinkThumb}
                alt={bebida.strDrink}
                style={{ width: "300px", borderRadius: "16px", marginTop: "20px" }}
            />

            <h1>{bebida.strDrink}</h1>

            <p><strong>Categoría:</strong> {bebida.strCategory}</p>
            <p><strong>Alcohol:</strong> {bebida.strAlcoholic}</p>
            <p><strong>Vaso:</strong> {bebida.strGlass}</p>

            <h3 style={{ marginTop: "20px" }}>Ingredientes</h3>

            <ul>
                {ingredientes.map((ing, index) => (
                    <li key={index}>{ing}</li>
                ))}
            </ul>

            <h3 style={{ marginTop: "20px" }}>Instrucciones</h3>

            <p>{bebida.strInstructions}</p>

            <button onClick={() => router.push("/")}>
                ---Volver
            </button>
        </div>
        
    );
};

export default EstaRecibeId;