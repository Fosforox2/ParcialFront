'use client'

import { createContext, ReactNode, useContext, useState } from "react";

export type Drink = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
};

type ListContextType = {
    lista: Drink[],
    addLista: (item: Drink) => void;
    deleteFromLista: (id: string) => void;
}

const ListaContext = createContext<ListContextType | null>(null);

export const ListaProvider = ({ children }: { children: ReactNode }) => {
    const [lista, setLista] = useState<Drink[]>([]);

    const addLista = (item: Drink) => {
        setLista(prev => [...prev, item]);
    };

    const deleteFromLista = (id: string) => {
        setLista(prev => prev.filter(x => x.idDrink !== id));
    };

    return (
        <ListaContext.Provider value={{ lista, addLista, deleteFromLista }}>
            {children}
        </ListaContext.Provider>
    );
};

export const useLista = () => {
    const context = useContext(ListaContext);
    if (!context) throw new Error("out of context");
    return context;
};