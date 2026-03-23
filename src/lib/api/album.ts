import axios from "axios";
import { Album } from "@/types";

type AlbumSearchResponse = {
  results: Album[];
  resultCount: number;
};

type AlbumLookupResponse = {
  results: Album[];
};

export const getAlbumsByName = async (name: string): Promise<Album[]> => {
  const res = await axios.get<AlbumSearchResponse>(
    `https://itunes.apple.com/search?term=${name}&entity=album&limit=20`
  );

  return Array.isArray(res.data.results) ? res.data.results : [];
};

export const getAlbumById = async (id: number): Promise<Album | null> => {
  const res = await axios.get<AlbumLookupResponse>(
    `https://itunes.apple.com/lookup?id=${id}`
  );

  return res.data.results?.[0] ?? null;
};