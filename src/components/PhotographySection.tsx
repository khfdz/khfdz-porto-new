import { useState, useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { photos } from "@/constants/photos";

const PhotographySection = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const nextPhoto = useCallback(() => {
    if (selectedIdx !== null) {
      setSelectedIdx((prev) => (prev! + 1) % photos.length);
    }
  }, [selectedIdx]);

  const prevPhoto = useCallback(() => {
    if (selectedIdx !== null) {
      setSelectedIdx((prev) => (prev! - 1 + photos.length) % photos.length);
    }
  }, [selectedIdx]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIdx, nextPhoto, prevPhoto]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  // Marquee Logic
  const isHovered = useRef(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const playMarquee = () => {
      if (!slider) return;
      // Pause marquee if user is hovering or actively dragging
      if (!isHovered.current && !isDown) {
        slider.scrollLeft += 0.8; // Speed of auto-scroll

        // Endless loop logic: since we duplicated the array, when we scroll past 
        // the first half, we instantly jump back to exactly the same visual position near the start.
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft -= slider.scrollWidth / 2;
        }
      }
      animationRef.current = requestAnimationFrame(playMarquee);
    };

    animationRef.current = requestAnimationFrame(playMarquee);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setDragged(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    setDragged(true);
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="photography" className="section-padding bg-white relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10 pl-4 md:pl-8">
        <div className="mb-8 pr-4 md:pr-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="about-reveal text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">Visual Gallery</p>
            <h2 className="about-reveal text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Creative <span className="gradient-text">Lens</span>
            </h2>
          </div>

          {/* Navigation Buttons for Desktop */}

        </div>

        <p className="md:hidden text-muted-foreground text-sm font-mono mb-6 flex items-center gap-2 pr-4">
          <ChevronLeft size={16} /> Swipe to explore <ChevronRight size={16} />
        </p>

        {/* NATIVE HORIZONTAL SLIDER with Drag-to-Scroll & Infinite Marquee */}
        <div
          ref={sliderRef}
          className={`flex overflow-x-auto gap-6 pb-12 touch-pan-x cursor-grab active:cursor-grabbing select-none`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => {
            isHovered.current = false;
            setIsDown(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {[...photos, ...photos].map((photo, i) => (
            <div
              key={`${photo.id}-${i}`}
              className="shrink-0 w-[280px] md:w-[350px] aspect-[4/5] group relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
              onClick={() => !dragged && setSelectedIdx(i % photos.length)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                <Maximize2 className="text-white w-8 h-8 mx-auto mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500" strokeWidth={1.5} />
                <h3 className="text-white font-mono text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {photo.src.split('/').pop()}
                </h3>
              </div>
            </div>
          ))}
          {/* spacer at end for scrolling padding */}
          <div className="shrink-0 w-4 md:w-8"></div>
        </div>
      </div>

      {/* Premium Fullscreen Lightbox (z-index 99999 so Navbar won't cover it) */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
            <div className="flex flex-col">
              <h4 className="text-foreground font-bold text-xl">{photos[selectedIdx].src.split('/').pop()}</h4>
              <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">
                {selectedIdx + 1} / {photos.length}
              </p>
            </div>
            <button
              className="p-3 rounded-full bg-foreground/5 text-foreground hover:bg-foreground hover:text-background transition-all"
              onClick={() => setSelectedIdx(null)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Controls */}
          {photos.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-12 pointer-events-none" onClick={(e) => e.stopPropagation()}>
              <button
                className="p-4 rounded-full bg-background/20 backdrop-blur-md text-foreground border border-white/10 pointer-events-auto hover:bg-white hover:text-black transition-all"
                onClick={() => prevPhoto()}
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className="p-4 rounded-full bg-background/20 backdrop-blur-md text-foreground border border-white/10 pointer-events-auto hover:bg-white hover:text-black transition-all"
                onClick={() => nextPhoto()}
              >
                <ChevronRight size={32} />
              </button>
            </div>
          )}

          {/* Main Image Container */}
          <div
            className="w-full h-full max-w-5xl flex items-center justify-center pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={selectedIdx}
              src={photos[selectedIdx].src}
              alt={photos[selectedIdx].title}
              className="max-w-full max-h-[75vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500 pointer-events-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotographySection;
