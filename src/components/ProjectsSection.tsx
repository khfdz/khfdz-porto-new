import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import projectQueue from "@/assets/project-queue.jpg";
import projectSimkop from "@/assets/project-simkop.jpg";
import projectRestaurant from "@/assets/project-restaurant.jpg";
import projectFurniture from "@/assets/project-furniture.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Queue System",
    desc: "Multi-department queue management system for Clinic, Pharmacy, and Front Office with real-time display & ticket printing.",
    tags: ["React", "Node.js", "MongoDB", "Socket.IO"],
    image: projectQueue,
  },
  {
    title: "SIM-KOPUKM",
    desc: "Cooperative management information system for member data, savings, loans, and reporting.",
    tags: ["React", "Express", "MySQL"],
    image: projectSimkop,
  },
  {
    title: "Restaurant Website",
    desc: "Modern restaurant website with menu showcase, online ordering interface, and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "MongoDB"],
    image: projectRestaurant,
  },
  {
    title: "Furniture Website",
    desc: "E-commerce style furniture showcase with product catalog, filtering, and contact integration.",
    tags: ["React", "Tailwind CSS", "Node.js"],
    image: projectFurniture,
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Set initial state
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

  return (
    <section ref={sectionRef} id="projects" className="section-padding bg-[#f8fafc] relative z-10 border-t border-gray-100">
      <div className="container mx-auto max-w-6xl">
        <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">Projects</p>
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
              {/* Project image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 relative z-10 bg-white">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">{proj.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 text-xs rounded-full bg-blue-50 text-primary font-mono font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-blue-700 transition-colors hoverable">
                    <ExternalLink size={16} /> Demo
                  </button>
                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors hoverable">
                    <Github size={16} /> Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
