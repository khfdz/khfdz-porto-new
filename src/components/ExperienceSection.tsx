import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "IT Staff",
    company: "RS Permata Keluarga Karawang",
    period: "2024 – Present",
    desc: "Managing hospital information systems, network infrastructure, troubleshooting, and maintaining server uptime for critical healthcare operations. Also developing internal applications including pharmacy queue systems, polyclinic queue management, front office systems, and HR training (diklat) management systems.",
    tags: ["Networking", "Server Admin", "Troubleshooting", "Fullstack Development"],
  },
  {
    role: "Fullstack Developer",
    company: "CV Himavera",
    period: "2025 - Present",
    desc: "Developing internal web applications for government agencies, including management systems and operational tools. Built using the MERN stack adapted with MySQL, and deployed on VPS servers with full backend and infrastructure handling.",
    tags: ["React", "Node.js", "Express", "MySQL", "VPS"],
  },

  {
    role: "Internship (CCTV Technician)",
    company: "Prisma Komputer",
    period: "2021",
    desc: "Worked as a CCTV technician intern, handling installation, maintenance, and troubleshooting of surveillance systems. Also assisted in daily computer store operations including hardware setup and customer support.",
    tags: ["CCTV Installation", "Hardware", "Troubleshooting"],
  },
  {
    role: "Freelance Photographer",
    company: "Self-Employed",
    period: "2018 – 2025",
    desc: "Provided photography services for events such as engagements, graduations, and general documentation. Responsible for shooting, editing, and delivering final results to clients.",
    tags: ["Photography", "Lightroom", "Photoshop", "Event Documentation"],
  }

];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".timeline-item");
    if (!els) return;
    gsap.set(els, { x: -40, opacity: 0 });
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(els, { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" });
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-padding bg-white relative z-10">
      <div className="container mx-auto max-w-4xl">
        <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">Experience</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-foreground">
          My <span className="gradient-text">Journey</span>
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-blue-200 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item relative pl-12 md:pl-16">
                {/* Dot */}
                <div className="absolute left-2.5 md:left-4.5 top-2 w-3 h-3 rounded-full shadow-sm" style={{ background: "var(--gradient-primary)" }} />

                <div
                  className="glass-card p-8 cursor-pointer hover-glow transition-all duration-500 hoverable bg-white border border-gray-100 hover:-translate-y-1 hover:shadow-md"
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                    <ChevronDown
                      size={20}
                      className={`text-gray-400 transition-transform duration-300 ${expandedIndex === i ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                  <p className="text-primary text-md font-mono font-medium mb-1">{exp.company}</p>

                  <div>
                    {exp.period}
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${expandedIndex === i ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs rounded-full bg-blue-50 text-primary font-mono font-medium">
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
