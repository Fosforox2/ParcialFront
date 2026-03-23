'use client';

import { getAlbumById } from "@/lib/api/album";
import { Album } from "@/types";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AlbumDetail = () => {

    const { id } = useParams();
    const router = useRouter();

    const [album, setAlbum] = useState<Album | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        getAlbumById(Number(id))
            .then((res) => {
                setAlbum(res);
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
    if (!album) return <h2>Álbum no encontrado</h2>;

    return (
        <div className="container">

            <img
                src={album.artworkUrl100}
                alt={album.collectionName}
                style={{ width: "300px", borderRadius: "16px", marginTop: "20px" }}
            />

            <h1>{album.collectionName}</h1>

            <p><strong>Artista:</strong> {album.artistName}</p>



            <button 
                style={{ marginTop: "20px" }} 
                onClick={() => router.push("/albums")}
            >
                Volver
            </button>

        </div>
    );
};

export default AlbumDetail;