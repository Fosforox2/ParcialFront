'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import "./page.css";

import { getAlbumsByName } from "@/lib/api/album";
import { useMusic } from "@/context/MusicContext";
import { Album } from "@/types";

const AlbumsPage = () => {

    const { addFavorito } = useMusic();

    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [finalName, setFinalName] = useState("");

    const getAlbums = async (name: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getAlbumsByName(name);
            setAlbums(data);
        } catch (e) {
            setError("Error al obtener álbumes");
            setAlbums([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!finalName) return;
        getAlbums(finalName);
    }, [finalName]);

    return (
        <div className="container">

            <h1 className="title">Buscar Álbumes</h1>
            <div className="searchBar">
                <input
                    className="searchInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Buscar artista..."
                />

                <button 
                    className="tusmuertosBotonaco" 
                    onClick={() => {
                        if (!name.trim()) return;
                        setFinalName(name);
                    }}
                >
                    Buscar
                </button>
                <Link href="/" className="backButton">
                    Volver al menu 
                </Link>
            </div>

            

            {loading && <h2>Loading...</h2>}
            {error && <h3>{error}</h3>}

            {!loading && albums.length === 0 && finalName && (
                <h3>No se encontraron resultados</h3>
            )}

            <div className="cocktailGrid">
                {albums.map((album) => (
                    <Link
                        key={album.collectionId}
                        href={`/albums/${album.collectionId}`}
                        className="cocktailLink"
                    >
                        <div className="cocktailCard">

                            <img
                                src={album.artworkUrl100}
                                alt={album.collectionName}
                            />

                            <h3 className="cocktailName">
                                {album.collectionName}
                            </h3>

                            <p className="cocktailAlcohol">
                                {album.artistName}
                            </p>

                            <button
                                className="btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addFavorito(album);
                                }}
                            >
                                Añadir a favoritos
                            </button>

                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default AlbumsPage;