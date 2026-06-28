import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import "../css/ScrollingBackground.css";

const FALLBACK_POSTERS = [
  "/1JlfUuvvX5xLP2LIDah4JhWUtTx.jpg",
  "/oIQmtByV1LtEQSwM4EpdLTyoSlM.jpg",
  "/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg",
  "/zm0KAbOjlt9eR5y7vDiL2dEOwMl.jpg",
  "/pxG26JdyuiDvJbSoucknaFiLeZD.jpg",
  "/niSvU02l2BONH9ivubV6K1a5QiK.jpg",
  "/iKy5460GdsoknM8ppmGlJbKxAKa.jpg",
  "/hwRdDFIhaEmpRgoki805YvyyjZf.jpg",
  "/kjcuS7xaRyqRjVaVcH4t0qHshuX.jpg",
  "/ArIS4vwUxdhm3j7tsTHmffdfU8W.jpg",
  "/3o5YPjDGDTcTDL5ftDA9NwN9dLd.jpg",
  "/gV0J0Fqw2mYMtQbzb0ruxv9MAeZ.jpg",
  "/7wIBfBl2gejt6xHxNSK0reVIm7E.jpg",
  "/alf3JOPP7EYP0iO24gwe5YfRnqo.jpg",
  "/rMgG7cWuq9O6zhhLs2CbqIKVA8V.jpg",
  "/ho824aZtnBzE6FuJRn2znQCq4qQ.jpg",
  "/canZTWSxACSnAluir3dCtMxKpA1.jpg",
  "/5Vi8dSauVwH1HOsiZceDMbRr1Ca.jpg",
  "/eJGWx219ZcEMVQJhAgMiqo8tYY.jpg",
  "/nLxu237EJAisFCYKK48hN9Plobx.jpg"
];

function ScrollingBackground() {
  const [posters, setPosters] = useState(FALLBACK_POSTERS);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const movies = await getPopularMovies();
        const paths = movies
          .map((m) => m.poster_path)
          .filter((path) => path !== null);
        
        if (paths.length > 0) {
          setPosters(paths);
        }
      } catch (err) {
        console.error("Failed to load live background posters:", err);
      }
    };
    fetchPosters();
  }, []);

  const rowCount = 3;
  const rows = Array.from({ length: rowCount }, () => []);
  
  posters.forEach((poster, index) => {
    rows[index % rowCount].push(poster);
  });

  return (
    <div className="global-scrolling-bg">
      <div className="bg-scrolling-wrapper">
        <div className="bg-scrolling-grid">
          {rows.map((row, rowIndex) => {
            const tripledRow = [...row, ...row, ...row];
            const directionClass = rowIndex % 2 === 0 ? "scroll-left" : "scroll-right";
            
            return (
              <div key={rowIndex} className={`bg-poster-row ${directionClass}`}>
                {tripledRow.map((posterPath, idx) => (
                  <div key={idx} className="bg-poster-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w340${posterPath}`}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-overlay-mask" />
    </div>
  );
}

export default ScrollingBackground;
