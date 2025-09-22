import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import adriatischecruise1 from "../assets/adriatischecruise/foto1.jpg";
import adriatischecruise2 from "../assets/adriatischecruise/foto2.jpg";
import adriatischecruise3 from "../assets/adriatischecruise/foto3.jpg";
import adriatischecruise4 from "../assets/adriatischecruise/foto4.jpg";
import adriatischecruise5 from "../assets/adriatischecruise/foto5.jpeg";
import adriatischecruise6 from "../assets/adriatischecruise/foto6.jpg";
import adriatischecruise7 from "../assets/adriatischecruise/foto7.jpg";
import adriatischecruise8 from "../assets/adriatischecruise/foto8.jpeg";
import adriatischecruise9 from "../assets/adriatischecruise/foto9.jpeg";
import adriatischecruise10 from "../assets/adriatischecruise/foto10.jpeg";
import adriatischecruise11 from "../assets/adriatischecruise/foto11.jpeg";
import adriatischecruise12 from "../assets/adriatischecruise/foto12.jpeg";
import adriatischecruise13 from "../assets/adriatischecruise/foto13.jpeg";
import adriatischecruise14 from "../assets/adriatischecruise/foto14.jpeg";
import adriatischecruise15 from "../assets/adriatischecruise/foto15.jpeg";
import adriatischecruise16 from "../assets/adriatischecruise/foto16.jpeg";
import adriatischecruise17 from "../assets/adriatischecruise/foto17.jpeg";
import adriatischecruise18 from "../assets/adriatischecruise/foto18.jpeg";
import adriatischecruise19 from "../assets/adriatischecruise/foto19.jpeg";
import adriatischecruise20 from "../assets/adriatischecruise/foto20.jpeg";
import adriatischecruise21 from "../assets/adriatischecruise/foto21.jpeg";
import adriatischecruise22 from "../assets/adriatischecruise/foto22.jpeg";
import adriatischecruise23 from "../assets/adriatischecruise/foto23.jpeg";



const aPhotos = [
  { width: 800, height: 600, src: adriatischecruise1 },
  { width: 1600, height: 900, src: adriatischecruise2 },
  { width: 1600, height: 1200, src: adriatischecruise3 },
  { width: 1600, height: 800, src: adriatischecruise4 },
  { width: 1600, height: 1000, src: adriatischecruise5 },
  { width: 800, height: 600, src: adriatischecruise6 },
  { width: 1600, height: 900, src: adriatischecruise7 },
  { width: 1600, height: 1200, src: adriatischecruise8 },
  { width: 1600, height: 800, src: adriatischecruise9 },
  { width: 1600, height: 1000, src: adriatischecruise10 },
  { width: 800, height: 600, src: adriatischecruise11 },
  { width: 1600, height: 900, src: adriatischecruise12 },
  { width: 1600, height: 1200, src: adriatischecruise13 },
  { width: 1600, height: 800, src: adriatischecruise14 },
  { width: 1600, height: 1000, src: adriatischecruise15 },
  { width: 800, height: 600, src: adriatischecruise16 },
  { width: 1600, height: 900, src: adriatischecruise17 },
  { width: 1600, height: 1200, src: adriatischecruise18 },
  { width: 1600, height: 800, src: adriatischecruise19 },
  { width: 1600, height: 1000, src: adriatischecruise20 },
  { width: 800, height: 600, src: adriatischecruise21 },
  { width: 1600, height: 900, src: adriatischecruise22 },
  { width: 1600, height: 1200, src: adriatischecruise23 },
];

export default function PhotoAlbum({ photos = aPhotos, padding = 20 }) {
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