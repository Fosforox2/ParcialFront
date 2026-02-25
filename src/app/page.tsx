'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Drink = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strCategory: string;
    strAlcoholic: string;
    strGlass: string;
};

const Home = () => {
    const router = useRouter();
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [finalName, setFinalName] = useState("");

    const fetchDrinks = async (name: string) => {
    setLoading(true);
    setError(null);

    try {
        const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
        );

        const data = await res.json();

        if (Array.isArray(data.drinks)) {
            setDrinks(data.drinks);
        } else {
            setDrinks([]);
        }

    } catch (e) {
        setError("Error al obtener cocktails");
        setDrinks([]);
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
        fetchDrinks(finalName);
    }, [finalName]);

    return (
        <div>
            <h1>Buscador de Cocktails</h1>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="..."
            />

            <button onClick={() => setFinalName(name)}>
                Search
            </button>

            {loading && <h2>Loading...</h2>}
            {error && <h3>{error}</h3>}

            {!loading && drinks.length === 0 && finalName && (
                <h3>No se encontraron resultados</h3>
            )}

                
                <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 120px)",
                gap: "12px",
                marginTop: "20px"
                }}
                >
            {drinks.map((drink) => (
                <Link
                    key={drink.idDrink}
                    href={`/busquedas/${drink.idDrink}`}
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                        fontSize: "12px"
                    }}
                >
                    <div
                        style={{
                            width: "120px",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={drink.strDrinkThumb}
                            alt={drink.strDrink}
                            style={{
                                width: "120px",
                                height: "120px",   // 👈 CUADRADA
                                objectFit: "cover",
                                borderRadius: "10px"
                            }}
                        />

                        <h3 style={{ fontSize: "12px", marginTop: "4px" }}>
                            {drink.strDrink}
                        </h3>

                        <p style={{ opacity: 0.6 }}>{drink.strAlcoholic}</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    );
};

export default Home;