'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./page.css";

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

    const randomCocktail = async () => {
        try {
            const res = await fetch(
                "https://www.thecocktaildb.com/api/json/v1/1/random.php"
            );

            const data = await res.json();
            const id = data.drinks?.[0]?.idDrink;

            if (id) {
                router.push(`/busquedas/${id}`);
            }
        } catch (e) {
            console.error("Error obteniendo cocktail aleatorio");
        }
    };

    useEffect(() => {
        fetchDrinks(finalName);
    }, [finalName]);

    return (
        <div className="container">

            <h1 className="title">Buscador de Cocktails</h1>

            <div className="searchBar">
                <input
                    className="searchInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Buscar cocktail..."
                />

                <button className="btn" onClick={() => setFinalName(name)}>
                    Search
                </button>

                <button className="btn" onClick={randomCocktail}>
                    Dime algo bonito
                </button>
            </div>

            {loading && <h2>Loading...</h2>}
            {error && <h3>{error}</h3>}

            {!loading && drinks.length === 0 && finalName && (
                <h3>No se encontraron resultados</h3>
            )}

            <div className="cocktailGrid">
                {drinks.map((drink) => (
                    <Link
                        key={drink.idDrink}
                        href={`/busquedas/${drink.idDrink}`}
                        className="cocktailLink"
                    >
                        <div className="cocktailCard">

                            <img
                                src={drink.strDrinkThumb}
                                alt={drink.strDrink}
                            />

                            <h3 className="cocktailName">
                                {drink.strDrink}
                            </h3>

                            <p className="cocktailAlcohol">
                                {drink.strAlcoholic}
                            </p>

                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default Home;