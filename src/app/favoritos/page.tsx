'use client';

import Link from "next/link";
import { useMusic } from "@/context/MusicContext";
import "./favoritos.css";

const FavoritosPage = () => {

    const { favoritos, removeFavorito } = useMusic();

    return (
        <div className="container">

            <h1 className="title">Mis Favoritos</h1>

            <Link href="/" className="backButton">
                Volver al menú
            </Link>

            {favoritos.length === 0 && (
                <h3>No tienes álbumes en favoritos</h3>
            )}

            <div className="cocktailGrid">
                {favoritos.map((album) => (
                    <div key={album.collectionId} className="cocktailCard">

                        <Link
                            href={`/albums/${album.collectionId}`}
                            className="cocktailLink"
                        >
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
                        </Link>

                        <button
                            className="btn"
                            onClick={() => removeFavorito(album.collectionId)}
                        >
                            Eliminar
                        </button>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default FavoritosPage;