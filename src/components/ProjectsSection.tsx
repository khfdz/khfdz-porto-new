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
    gradient: "from-neon-purple to-neon-blue",
    image: projectQueue,
  },
  {
    title: "SIM-KOPUKM",
    desc: "Cooperative management information system for member data, savings, loans, and reporting.",
    tags: ["React", "Express", "MySQL"],
    gradient: "from-neon-blue to-neon-cyan",
    image: projectSimkop,
  },
  {
    title: "Restaurant Website",
    desc: "Modern restaurant website with menu showcase, online ordering interface, and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "MongoDB"],
    gradient: "from-neon-cyan to-neon-purple",
    image: projectRestaurant,
  },
  {
    title: "Furniture Website",
    desc: "E-commerce style furniture showcase with product catalog, filtering, and contact integration.",
    tags: ["React", "Tailwind CSS", "Node.js"],
    gradient: "from-neon-pink to-neon-purple",
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
    <section ref={sectionRef} id="projects" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Projects</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Featured <span className="gradient-text">Work</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group glass-card overflow-hidden hover-glow transition-all duration-500 hoverable hover:-translate-y-1"
            >
              {/* Project image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              <div className="p-6 -mt-6 relative z-10">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{proj.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-foreground transition-colors hoverable">
                    <ExternalLink size={14} /> Demo
                  </button>
                  <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors hoverable">
                    <Github size={14} /> Code
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
