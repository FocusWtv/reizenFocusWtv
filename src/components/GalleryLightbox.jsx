import { useCallback, useEffect, useRef } from "react";

/**
 * Fullscreen lightbox: vergrote foto, vorige/volgende, sluiten, thumbnail-strip.
 */
export default function GalleryLightbox({
  photos = [],
  index,
  onClose,
  onIndexChange,
}) {
  const stripRef = useRef(null);
  const activeThumbRef = useRef(null);

  const count = photos.length;
  const current = index ?? 0;
  const photo = photos[current];
  const src = typeof photo === "string" ? photo : photo?.src;

  const goPrev = useCallback(() => {
    if (count <= 1) return;
    onIndexChange(current === 0 ? count - 1 : current - 1);
  }, [count, current, onIndexChange]);

  const goNext = useCallback(() => {
    if (count <= 1) return;
    onIndexChange(current === count - 1 ? 0 : current + 1);
  }, [count, current, onIndexChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [current]);

  if (index == null || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#162b58]"
      role="dialog"
      aria-modal="true"
      aria-label="Foto vergroten"
    >
      <div className="flex shrink-0 items-center justify-end p-3 sm:p-4">
        <button
          type="button"
          onClick={onClose}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition hover:bg-white/25"
          aria-label="Sluiten"
        >
          X
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
        {count > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1 rounded-lg bg-white/10 px-2 py-3 text-sm font-medium text-white transition hover:bg-white/25 sm:left-4 sm:px-4"
            aria-label="Vorige foto"
          >
            <span aria-hidden="true">‹</span>
            <span className="hidden sm:inline">Vorige</span>
          </button>
        )}

        <img
          src={src}
          alt={
            typeof photo === "object" && photo?.alt
              ? photo.alt
              : `Foto ${current + 1} van ${count}`
          }
          className="max-h-[min(70vh,720px)] max-w-full object-contain select-none"
          draggable={false}
        />

        {count > 1 && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1 rounded-lg bg-white/10 px-2 py-3 text-sm font-medium text-white transition hover:bg-white/25 sm:right-4 sm:px-4"
            aria-label="Volgende foto"
          >
            <span className="hidden sm:inline">Volgende</span>
            <span aria-hidden="true">›</span>
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="shrink-0 border-t border-white/15 bg-[#162b58] px-3 py-3 sm:px-6">
          <p className="mb-2 text-center text-xs text-white/70">
            Foto {current + 1} van {count}
          </p>
          <div
            ref={stripRef}
            className="flex gap-2 overflow-x-auto pb-1 scroll-smooth [-webkit-overflow-scrolling:touch]"
          >
            {photos.map((p, i) => {
              const thumbSrc = typeof p === "string" ? p : p?.src;
              if (!thumbSrc) return null;
              const isActive = i === current;
              return (
                <button
                  key={`thumb-${i}-${thumbSrc}`}
                  type="button"
                  ref={isActive ? activeThumbRef : undefined}
                  onClick={() => onIndexChange(i)}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded border-2 transition ${
                    isActive
                      ? "border-[#4ab0e1] opacity-100 ring-2 ring-[#4ab0e1]/50"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                  aria-label={`Ga naar foto ${i + 1}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <img
                    src={thumbSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
