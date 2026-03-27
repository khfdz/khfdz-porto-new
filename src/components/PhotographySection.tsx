import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import photoLandscape from "@/assets/photo-landscape.jpg";
import photoArchitecture from "@/assets/photo-architecture.jpg";
import photoStreet from "@/assets/photo-street.jpg";
import photoPortrait from "@/assets/photo-portrait.jpg";
import photoNature from "@/assets/photo-nature.jpg";
import photoAbstract from "@/assets/photo-abstract.jpg";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { id: 1, src: photoLandscape, label: "Landscapes" },
  { id: 2, src: photoArchitecture, label: "Architecture" },
  { id: 3, src: photoStreet, label: "Street" },
  { id: 4, src: photoPortrait, label: "Portraits" },
  { id: 5, src: photoNature, label: "Nature" },
  { id: 6, src: photoAbstract, label: "Abstract" },
];

const PhotographySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".photo-item");
    if (!els) return;
    gsap.set(els, { scale: 0.9, opacity: 0 });
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(els, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" });
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const selectedPhoto = photos.find((p) => p.id === selected);

  return (
    <section ref={sectionRef} id="photography" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Photography</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Creative <span className="gradient-text">Eye</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-item group relative aspect-square rounded-xl overflow-hidden cursor-pointer hoverable"
              onClick={() => setSelected(photo.id)}
            >
              <img
                src={photo.src}
                alt={photo.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all duration-500 flex items-center justify-center">
                <span className="text-foreground font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-6 right-6 text-foreground hoverable" onClick={() => setSelected(null)}>
            <X size={28} />
          </button>
          <div className="w-full max-w-3xl">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.label}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <p className="text-center text-muted-foreground mt-4 font-mono text-sm">{selectedPhoto.label}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotographySection;
