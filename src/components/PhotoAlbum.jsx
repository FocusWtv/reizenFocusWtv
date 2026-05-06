import { useEffect, useMemo, useState } from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

export default function PhotoAlbum({
  photos = [],
  padding = 20,
  centered = false,
}) {
  const [resolvedPhotos, setResolvedPhotos] = useState([]);

  const normalized = useMemo(() => {
    return photos.map((p) => {
      if (typeof p === "string") return { src: p };
      return p || {};
    });
  }, [photos]);

  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      const results = await Promise.all(
        normalized.map(async (p) => {
          if (p.width && p.height) return p;
          if (!p.src) return p;
          try {
            const img = new Image();
            const url = p.src;
            const dims = await new Promise((resolve, reject) => {
              img.onload = () =>
                resolve({
                  w: img.naturalWidth || img.width,
                  h: img.naturalHeight || img.height,
                });
              img.onerror = reject;
              img.src = url;
            });
            return { ...p, width: dims.w || 1600, height: dims.h || 900 };
          } catch (_) {
            return { ...p, width: 1600, height: 900 };
          }
        })
      );
      if (!isCancelled) setResolvedPhotos(results);
    };
    load();
    return () => {
      isCancelled = true;
    };
  }, [normalized]);

  const album = (
    <ColumnsPhotoAlbum
      photos={resolvedPhotos}
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
      {...(centered
        ? {
            componentsProps: {
              container: { className: "mx-auto w-full max-w-6xl" },
              track: { style: { justifyContent: "center" } },
            },
          }
        : {})}
    />
  );

  if (centered) {
    return (
      <div className="flex w-full justify-center" style={{ padding }}>
        <div className="w-full max-w-6xl">{album}</div>
      </div>
    );
  }

  return <div style={{ padding }}>{album}</div>;
}
