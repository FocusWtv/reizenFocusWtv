import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ship2 from "../assets/egypte/ship/Egypte-7.jpeg";
import ship3 from "../assets/egypte/ship/Egypte-14.png";
import ship4 from "../assets/egypte/ship/egypte-10.jpg";
import ship5 from "../assets/egypte/ship/egypte-11.jpeg";
import ship6 from "../assets/egypte/ship/egypte-12.jpeg";


const DEFAULT_ITEMS = [
  {
    id: 2,
    icon: <FiImage className="h-[16px] w-[16px] text-white" />,
    src: ship2,
  },
  {
    id: 3,
    icon: <FiImage className="h-[16px] w-[16px] text-white" />,
    src: ship3,
  },
  {
    id: 4,
    icon: <FiImage className="h-[16px] w-[16px] text-white" />,
    src: ship4,
  },
  {
    id: 5,
    icon: <FiImage className="h-[16px] w-[16px] text-white" />,
    src: ship5,
  },
  {
    id: 6,
    icon: <FiImage className="h-[16px] w-[16px] text-white" />,
    src: ship6,
  },
];

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const SPRING_OPTIONS = { 
  type: "spring", 
  stiffness: 400, 
  damping: 40,
  mass: 0.8
};

export default function GalleryCarousel({
  items = DEFAULT_ITEMS,
  autoplay = true,
  autoplayDelay = 4000,
  pauseOnHover = true,
  loop = true,
  showArrows = true,
  showDots = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Calculate responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isHovered) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, autoplayDelay);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, autoplayDelay, isHovered, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (loop) {
        return (prev + 1) % items.length;
      }
      return Math.min(prev + 1, items.length - 1);
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (loop) {
        return prev === 0 ? items.length - 1 : prev - 1;
      }
      return Math.max(prev - 1, 0);
    });
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
      if (velocity < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    } else if (Math.abs(offset) > DRAG_BUFFER) {
      if (offset < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full mb-10 bg-white">
      {/* Title */}
      <h2 className="text-xl italic mt-10 mb-10 font-bold text-[#162b58]">
        Fotogallerij
      </h2>

      {/* Gallery Container */}
      <div 
        ref={containerRef}
        className="relative w-full mb-10"
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      >
        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-900">
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={{ x: -currentIndex * containerWidth }}
            transition={SPRING_OPTIONS}
            style={{ x }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative flex-shrink-0 w-full"
                style={{ width: containerWidth }}
              >
                <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1] w-full">
                  <img
                    src={item.src}
                    alt={`Gallery image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          {showArrows && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Next image"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Dots Indicator */}
        {showDots && (
          <div className="flex justify-center mt-6 gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? "w-8 h-2 bg-gray-800"
                    : "w-2 h-2 bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Thumbnail Strip */}
        <div className="mt-6 mb-16 overflow-hidden lg:scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleDotClick(index)}
                className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                  currentIndex === index
                    ? "ring-2 ring-blue-500 scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={item.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-14 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}