import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <main className="homeContainer">
      <h1 className="homeTitle">Albumixxx</h1>

      <div className="buttonGrid">
        <Link href="/albums" className="squareButton">
          Buscar álbumes
        </Link>

        <Link href="/favoritos" className="squareButton">
          Favoritos
        </Link>
      </div>
    </main>
  );
}