'use client'

import { createContext, useContext, useState, ReactNode } from "react";

type Album = {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
};

type MusicContextType = {
  favoritos: Album[];
  addFavorito: (album: Album) => void;
  removeFavorito: (id: number) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<Album[]>([]);

  const addFavorito = (album: Album) => {
    setFavoritos((prev) => {
      if (prev.find(a => a.collectionId === album.collectionId)) return prev;
      return [...prev, album];
    });
  };

  const removeFavorito = (id: number) => {
    setFavoritos(prev => prev.filter(a => a.collectionId !== id));
  };

  return (
    <MusicContext.Provider value={{ favoritos, addFavorito, removeFavorito }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error("out of context");
  return context;
};