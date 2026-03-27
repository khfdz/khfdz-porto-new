import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "IT Staff",
    company: "Hospital",
    period: "2023 – Present",
    desc: "Managing hospital information systems, network infrastructure, troubleshooting, and maintaining server uptime for critical healthcare operations.",
    tags: ["Networking", "Server Admin", "Troubleshooting"],
  },
  {
    role: "Fullstack Developer",
    company: "CV Himavera",
    period: "2022 – 2023",
    desc: "Built full-stack web applications including queue management systems, internal tools, and client-facing websites using the MERN stack.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    role: "Internship & Freelance",
    company: "Various",
    period: "2021 – 2022",
    desc: "Completed internship projects and freelance work building responsive websites, landing pages, and small business web solutions.",
    tags: ["HTML/CSS", "JavaScript", "WordPress"],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Experience</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          My <span className="gradient-text">Journey</span>
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item relative pl-12 md:pl-16">
                {/* Dot */}
                <div className="absolute left-2.5 md:left-4.5 top-2 w-3 h-3 rounded-full neon-glow" style={{ background: "var(--gradient-primary)" }} />

                <div
                  className="glass-card p-6 cursor-pointer hover-glow transition-all duration-500 hoverable"
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground transition-transform duration-300 ${
                        expandedIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p className="text-primary text-sm font-mono">{exp.company} · {exp.period}</p>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedIndex === i ? "max-h-40 mt-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm mb-3">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
