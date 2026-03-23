export type Album = {
  collectionId: number;
  artistId: number;

  collectionName: string;
  artistName: string;

  collectionCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;

  artworkUrl60: string;
  artworkUrl100: string;

  collectionPrice: number | null;
  currency: string;

  releaseDate: string;
  trackCount: number;

  country: string;
  primaryGenreName: string;

  copyright: string | null;

  wrapperType: string;
  collectionType: string;
};