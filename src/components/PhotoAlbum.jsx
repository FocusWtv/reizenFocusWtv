import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import egypte from "../assets/egypte/egypte.jpg";
import egypte5 from "../assets/egypte/egypte-15_2024-12-03-153712_qdof.jpg";
import Egypte3 from "../assets/egypte/Egypte-3.jpg";
import egypte13 from "../assets/egypte/egypte-13.jpg";
import egypte14 from "../assets/egypte/Egypte-14.jpg";
import egypte15 from "../assets/egypte/egypte-15.jpg";
import egypte16 from "../assets/egypte/egypte-16.png";
import egypte17 from "../assets/egypte/egypte-17.jpg";
import egypte18 from "../assets/egypte/egypte-18.jpg";
import egypte19 from "../assets/egypte/egypte-19.jpg";
import egypte20 from "../assets/egypte/egypte-20.jpg";
import egypte21 from "../assets/egypte/egypte-21.jpg";
import egypte22 from "../assets/egypte/egypte-22.jpg";
import egypte23 from "../assets/egypte/egypte-24.jpg";
import egypte24 from "../assets/egypte/egypte-26.jpg";
import egypte25 from "../assets/egypte/egypte-26_2024-12-03-154851_gcfo.jpg";
import egypte26 from "../assets/egypte/egypte-27.jpg";
import egypte27 from "../assets/egypte/egypte-28.jpg";
import egypte28 from "../assets/egypte/egypte-29.jpg";
import egypte29 from "../assets/egypte/egypte-30.jpg";
import egypte30 from "../assets/egypte/egypte-31.jpg";
import egypte31 from "../assets/egypte/egypte-32.jpg";



const egyptePhotos = [
  { width: 800, height: 600, src: egypte },
  { width: 1600, height: 900, src: Egypte3 },
  { width: 1600, height: 1200, src: egypte13 },
  { width: 1600, height: 800, src: egypte14 },
  { width: 1600, height: 1000, src: egypte5 },
  { width: 800, height: 600, src: egypte16 },
  { width: 1600, height: 900, src: egypte17 },
  { width: 1600, height: 1200, src: egypte18 },
  { width: 1600, height: 800, src: egypte19 },
  { width: 1600, height: 1000, src: egypte15 },
  { width: 800, height: 600, src: egypte20 },
  { width: 1600, height: 900, src: egypte21 },
  { width: 1600, height: 1200, src: egypte22 },
  { width: 1600, height: 800, src: egypte23 },
  { width: 1600, height: 1000, src: egypte24 },
  { width: 800, height: 600, src: egypte25 },
  { width: 1600, height: 900, src: egypte26 },
  { width: 1600, height: 1200, src: egypte27 },
  { width: 1600, height: 800, src: egypte28 },
  { width: 1600, height: 1000, src: egypte29 },
  { width: 800, height: 600, src: egypte30 },
  { width: 1600, height: 900, src: egypte31 },
];

export default function PhotoAlbum({ photos = egyptePhotos, padding = 20 }) {
  return (
    <div style={{ padding }}>
      <ColumnsPhotoAlbum
        photos={photos}
        columns={(containerWidth) => {
          if (containerWidth < 400) return 1;
          if (containerWidth < 800) return 2;
          if (containerWidth < 1200) return 3;
          return 4;
        }}
        spacing={8}
        sizes={{
          size: "calc(100vw - 40px)",
          sizes: [
            { viewport: "(max-width: 400px)", size: "calc(100vw - 40px)" },
            { viewport: "(max-width: 800px)", size: "calc(50vw - 30px)" },
            { viewport: "(max-width: 1200px)", size: "calc(33vw - 27px)" },
            { viewport: "(min-width: 1201px)", size: "calc(25vw - 25px)" },
          ],
        }}
      />
    </div>
  );
}