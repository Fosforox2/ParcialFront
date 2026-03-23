'use client';

import { useLista } from "@/context/ListaContext";
import { useRouter } from "next/navigation";

const Compras = () => {
    const { lista, deleteFromLista } = useLista();
    const router = useRouter();

    return (
        <div className="container">

            <h1>Mis compras</h1>

            {lista.length === 0 && <p>No has comprado nada</p>}

            {lista.map((drink) => (
                <div key={drink.idDrink} style={{ marginBottom: "10px" }}>

                    <img
                        src={drink.strDrinkThumb}
                        width={80}
                    />

                    <p>{drink.strDrink}</p>

                    <button onClick={() => deleteFromLista(drink.idDrink)}>
                        Eliminar
                    </button>

                </div>
            ))}

            <button onClick={() => router.push("/")}>
                ← Volver
            </button>

        </div>
    );
};

export default Compras;