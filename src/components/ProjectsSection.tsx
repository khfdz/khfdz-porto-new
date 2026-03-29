import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/constants/projects";

gsap.registerPlugin(ScrollTrigger);

interface LightboxState {
  images: string[];
  index: number;
  title: string;
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Setup responsive GSAP behavior
      const mm = gsap.matchMedia();

      // Desktop: Scroll Hijacking (Pin & Horizontal Sweep)
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;

        // Calculate horizontal scroll distance
        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          return -(trackWidth - window.innerWidth);
        };

        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1, // Smooth catch-up delay
          invalidateOnRefresh: true,
        });
      });

      // Mobile/Tablet: Standard Horizontal Swiper (no GSAP translation)
      mm.add("(max-width: 1023px)", () => {
        if (trackRef.current) {
          gsap.set(trackRef.current, { x: 0 }); // Reset track just in case
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const openLightbox = (images: string[], index = 0, title = "") => {
    setLightbox({ images, index, title });
  };

  const goNext = useCallback(() => {
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) =>
      prev
        ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }
        : null
    );
  }, []);

  const toggleExpand = (idx: number) => {
    setExpandedCards((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="bg-[#f8fafc] relative z-10 overflow-hidden"
      >
        {/* Full Viewport Container for Pinning */}
        <div ref={containerRef} className="lg:h-screen w-full flex flex-col justify-center py-24 lg:py-0 relative border-t border-gray-100">

          {/* Aesthetic Blur Layer Background ("belakangnya ngeblur") */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
            <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] bg-blue-100/50 rounded-full blur-[100px]" />
            <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] bg-purple-50/50 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 md:px-8 mb-8 lg:mb-10 shrink-0 relative z-10 pointer-events-none">
            <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">
              Projects
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Featured <span className="gradient-text">Work</span>
            </h2>
          </div>

          <p className="lg:hidden text-muted-foreground text-sm font-mono mb-8 flex items-center gap-2 px-4 md:px-8">
            <ChevronLeft size={16} /> Swipe to explore <ChevronRight size={16} />
          </p>

          <div className="lg:relative lg:w-full lg:overflow-hidden relative z-10 h-full lg:h-[80vh]">
            {/* The Track */}
            <div
              ref={trackRef}
              className="flex gap-8 px-4 md:px-8 lg:px-[10vw] lg:pb-[0.5vw] flex-nowrap lg:w-max overflow-x-auto lg:overflow-x-visible items-stretch snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 h-full cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[85vw] md:w-[600px] lg:w-[65vw] xl:w-[750px] group overflow-hidden transition-all duration-700 bg-white/70 backdrop-blur-2xl border border-white hover:border-blue-200 hover:shadow-2xl shadow-xl hover:-translate-y-4 flex flex-col rounded-[2rem] snap-center h-full"
                >
                  {/* Project image */}
                  <div
                    className="relative h-[250px] lg:h-[55%] shrink-0 overflow-hidden bg-gray-100 cursor-zoom-in group-hover:m-2 group-hover:rounded-xl transition-all duration-500 ease-out"
                    onClick={() => openLightbox(proj.images, 0, proj.title)}
                  >
                    <img
                      src={proj.images[0]}
                      alt={proj.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-center justify-center pointer-events-none">
                      <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm drop-shadow-md">
                        View Gallery
                      </span>
                    </div>
                    {proj.images.length > 1 && (
                      <span className="absolute top-4 right-4 bg-black/60 text-white text-xs font-mono px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none shadow-lg">
                        1 / {proj.images.length}
                      </span>
                    )}
                  </div>

                  <div className="p-6 md:p-8 lg:p-10 relative z-10 flex flex-col flex-grow bg-gradient-to-b from-transparent to-white/50 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                    <p className={`text-gray-500 text-sm lg:text-base mb-6 leading-relaxed ${expandedCards.includes(i) ? "" : "line-clamp-3 lg:line-clamp-none"}`}>
                      {proj.desc}
                    </p>
                    <button
                      onClick={() => toggleExpand(i)}
                      className="lg:hidden text-primary hover:text-blue-700 text-xs font-bold mb-6 flex items-center gap-1 transition-colors w-fit"
                    >
                      {expandedCards.includes(i) ? "Read Less" : "Read More"}
                    </button>

                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {proj.stack.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 md:px-4 md:py-2 text-xs rounded-full bg-blue-50/80 text-primary font-mono font-medium shadow-sm border border-blue-100/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 md:gap-6 mt-auto pt-6 border-t border-gray-200/50">
                      {proj.demo && proj.demo !== "#" ? (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-blue-700 transition-colors hoverable"
                        >
                          <ExternalLink size={18} /> Live Demo
                        </a>
                      ) : (
                        <Link
                          to="/privacy"
                          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors hoverable"
                        >
                          <Lock size={18} /> Live Demo
                        </Link>
                      )}

                      {proj.github && proj.github !== "#" ? (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors hoverable"
                        >
                          <Github size={18} /> Source Code
                        </a>
                      ) : (
                        <Link
                          to="/privacy"
                          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors hoverable"
                        >
                          <Lock size={18} /> Source Code
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Visual spacer so last card doesn't hit edge immediately on large screens */}
              <div className="shrink-0 w-[15vw] hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hoverable"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>

          {lightbox.images.length > 1 && (
            <button
              className="absolute left-6 text-foreground hoverable"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.index]}
              alt={`Project image ${lightbox.index + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-center text-white/80 mt-6 font-mono text-sm tracking-wide">
              {lightbox.title}{lightbox.images.length > 1 ? ` — ${lightbox.index + 1} / ${lightbox.images.length}` : ""}
            </p>

            {lightbox.images.length > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                {lightbox.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev ? { ...prev, index: idx } : null); }}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${idx === lightbox.index
                      ? "border-primary scale-110 shadow-lg shadow-primary/20"
                      : "border-white/20 opacity-50 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt={`thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {lightbox.images.length > 1 && (
            <button
              className="absolute right-6 text-foreground hoverable"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
