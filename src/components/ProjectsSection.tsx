import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import projectManulife from "@/assets/manulife.png";
import projectQueue from "@/assets/project-queue.jpg";
import projectSimkop from "@/assets/project-simkop.jpg";
import projectRestaurant from "@/assets/project-restaurant.jpg";
import projectFurniture from "@/assets/project-furniture.jpg";
import gadgetStore1 from "@/assets/gadget-store-1.png";
import gadgetStore2 from "@/assets/gadget-store-2.png";
import gadgetStore3 from "@/assets/gadget-store-3.png";
import gadgetStore4 from "@/assets/gadget-store-4.png";
import gadgetStore5 from "@/assets/gadget-store-5.png";
import gadgetStore6 from "@/assets/gadget-store-6.png";
import getaway1 from "@/assets/getaway-heaven-1.png";
import getaway2 from "@/assets/getaway-heaven-2.png";
import getaway3 from "@/assets/getaway-heaven-3.png";
import getaway4 from "@/assets/getaway-heaven-4.png";
import getaway5 from "@/assets/getaway-heaven-5.png";
import projectLarana from "@/assets/larana.png";
import pakOlin1 from "@/assets/pak-olin-1.png";
import pakOlin2 from "@/assets/pak-olin-2.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Manulife Report",
    desc: "Developed a frontend interface to display financial reports using static data from JSON, focusing on clean layout, data presentation, and responsive design.",
    tags: ["HTML", "CSS", "JavaScript", "JSON"],
    images: [projectManulife],
    demo: "https://tugas-pak-rizky.vercel.app/",
    github: "https://github.com/khfdz/Tugas-Pak-Rizky",
  },

  {
    title: "Gadget Store",
    desc: "A modern e-commerce interface showcasing various gadgets with clean UI, intuitive navigation, and structured product display to enhance user browsing experience.",
    tags: ["React", "Tailwind", "JSON"],
    images: [gadgetStore1, gadgetStore2, gadgetStore3, gadgetStore4, gadgetStore5, gadgetStore6],
    demo: "https://tugas14-fe-gadget-store2.vercel.app/",
    github: "https://github.com/khfdz/tugas14-FE-Gadget-Store",
  },

  {
    title: "Getaway Haven",
    desc: "A modern villa rental website featuring clean UI, intuitive navigation, and well-structured property listings to provide a seamless browsing experience for users exploring vacation stays.",
    tags: ["React", "Tailwind", "JSON"],
    images: [getaway1, getaway2, getaway3, getaway4, getaway5],
    demo: "https://getaway-haven.vercel.app/",
    github: "https://github.com/khfdz/GetawayHaven",
  },
  {
    title: "Furniture by Larana",
    desc: "A modern furniture browsing website that showcases various home decor and furniture collections with clean UI, intuitive navigation, and well-structured product displays to enhance user exploration experience.",
    tags: ["React", "Tailwind CSS"],
    images: [projectLarana],
    demo: "https://furniture-by-larana-2b58.vercel.app/#home",
    github: "https://github.com/khfdz/FurnitureByLarana",
  },

  {
    title: "Pak Olin",
    desc: "A web application that allows users to search, view, and reserve parking spaces online with a clean interface and intuitive booking flow for a seamless parking experience.",
    tags: ["React", "Tailwind CSS", "Leaflet"],
    images: [pakOlin1, pakOlin2],
    demo: "https://ilcs-test-seven.vercel.app/",
    github: "https://github.com/khfdz/ilcs-test",
  },
  {
    title: "SIM-KOPUKM",
    desc: "Cooperative management information system for member data, savings, loans, and reporting.",
    tags: ["React", "Express", "MySQL"],
    images: [projectSimkop, projectQueue],
    demo: "https://simkopukm.example.com",
    github: "https://github.com/dhikaaa/simkopukm",
  },
  {
    title: "Restaurant Website",
    desc: "Modern restaurant website with menu showcase, online ordering interface, and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "MongoDB"],
    images: [projectRestaurant],
    demo: "https://restaurant.example.com",
    github: "https://github.com/dhikaaa/restaurant-website",
  },
  {
    title: "Furniture Website",
    desc: "E-commerce style furniture showcase with product catalog, filtering, and contact integration.",
    tags: ["React", "Tailwind CSS", "Node.js"],
    images: [projectFurniture],
    demo: "https://furniture.example.com",
    github: "https://github.com/dhikaaa/furniture-website",
  },
];

interface LightboxState {
  images: string[];
  index: number;
  title: string;
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.set(cards, { y: 60, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="section-padding bg-[#f8fafc] relative z-10 border-t border-gray-100"
      >
        <div className="container mx-auto max-w-6xl">
          <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">
            Projects
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-foreground">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((proj, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group glass-card overflow-hidden transition-all duration-700 hoverable hover:-translate-y-2 hover:shadow-xl bg-white border border-gray-200/60"
              >
                {/* Project image with shadow separator */}
                <div
                  className="relative h-[50vh] mb-4 overflow-hidden bg-gray-100 cursor-zoom-in mx-4 mt-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] ring-1 ring-gray-200"
                  onClick={() => openLightbox(proj.images, 0, proj.title)}
                >
                  <img
                    src={proj.images[0]}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay — matches Photography section */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all duration-500 flex items-center justify-center">
                    <span className="text-foreground font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                      View
                    </span>
                  </div>
                  {/* Multiple images badge */}
                  {proj.images.length > 1 && (
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-mono px-2 py-1 rounded-full backdrop-blur-sm">
                      1 / {proj.images.length}
                    </span>
                  )}
                </div>

                <div className="p-8 relative z-10 bg-white">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs rounded-full bg-blue-50 text-primary font-mono font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-700 transition-colors hoverable"
                    >
                      <ExternalLink size={16} /> Demo
                    </a>
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors hoverable"
                    >
                      <Github size={16} /> Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox — same style as Photography section */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-foreground hoverable"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>

          {/* Prev button */}
          {lightbox.images.length > 1 && (
            <button
              className="absolute left-6 text-foreground hoverable"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Main content */}
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.index]}
              alt={`Project image ${lightbox.index + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center text-muted-foreground mt-4 font-mono text-sm">
              {lightbox.title}{lightbox.images.length > 1 ? ` — ${lightbox.index + 1} / ${lightbox.images.length}` : ""}
            </p>

            {/* Thumbnails for multi-image */}
            {lightbox.images.length > 1 && (
              <div className="flex justify-center gap-3 mt-4">
                {lightbox.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev ? { ...prev, index: idx } : null); }}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${idx === lightbox.index
                      ? "border-foreground scale-110"
                      : "border-foreground/20 opacity-50 hover:opacity-80"
                      }`}
                  >
                    <img src={img} alt={`thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Next button */}
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
