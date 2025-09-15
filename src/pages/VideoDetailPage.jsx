import { useParams, Link } from "react-router-dom";
import { videos } from "../data/videos";
import GlobalNavbar from "../components/GlobalNavbar";

const VideoDetailPage = () => {
  const { id } = useParams();
  const video = videos.find((v) => v.id === parseInt(id));

  if (!video) {
    return (
      <section>
        <GlobalNavbar />
        <div className="text-center p-10">
          <h1 className="text-3xl font-bold text-[#162b58]">
            Video niet gevonden
          </h1>
          <p className="mt-4">
            Sorry, we konden de video die je zoekt niet vinden.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-[#4ab0e1] text-white font-semibold py-2 px-4 rounded-lg"
          >
            Terug naar de homepage
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <GlobalNavbar />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#162b58] mb-4 text-center">
          {video.title}
        </h1>
        <p className="text-lg text-[#162b58] mt-2 text-center">{video.date}</p>
        <div
          className="relative w-full max-w-6xl mx-auto"
          style={{ paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src={video.src}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            title={video.title}
          ></iframe>
        </div>
        <p className="text-lg text-[#162b58] mt-6 max-w-4xl mx-auto">
          {video.description}
        </p>
        <div className="text-center mt-8">
          <Link
            to="/"
            className="mt-6 inline-block bg-[#4ab0e1] hover:bg-[#162b58] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
          >
            Terug naar alle reizen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoDetailPage;