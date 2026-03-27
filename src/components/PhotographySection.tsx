import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { id: 1, color: "from-neon-purple/20 to-neon-blue/20", label: "Landscapes" },
  { id: 2, color: "from-neon-blue/20 to-neon-cyan/20", label: "Architecture" },
  { id: 3, color: "from-neon-cyan/20 to-neon-purple/20", label: "Street" },
  { id: 4, color: "from-neon-pink/20 to-neon-purple/20", label: "Portraits" },
  { id: 5, color: "from-neon-purple/20 to-neon-pink/20", label: "Nature" },
  { id: 6, color: "from-neon-blue/20 to-neon-pink/20", label: "Abstract" },
];

const PhotographySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".photo-item", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
              className={`photo-item aspect-square rounded-xl bg-gradient-to-br ${photo.color} glass-card flex items-center justify-center cursor-pointer hover:scale-[1.03] transition-all duration-500 hoverable`}
              onClick={() => setSelected(photo.id)}
            >
              <span className="text-muted-foreground text-sm font-mono">{photo.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-6 right-6 text-foreground hoverable" onClick={() => setSelected(null)}>
            <X size={28} />
          </button>
          <div className={`w-full max-w-2xl aspect-video rounded-2xl bg-gradient-to-br ${photos[selected - 1]?.color} glass-card flex items-center justify-center`}>
            <span className="text-muted-foreground font-mono">{photos[selected - 1]?.label} — Full View</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotographySection;
