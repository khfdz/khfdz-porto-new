import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Fullstack Developer",
    company: "CV Himavera",
    period: "2025 - Present",
    desc: "Developing internal web applications for government agencies, including management systems and operational tools. Built using the MERN stack adapted with MySQL, and deployed on VPS servers with full backend and infrastructure handling.",
    tags: ["React", "Node.js", "Express", "MySQL", "VPS"],
  },
  {
    role: "IT Staff",
    company: "RS Permata Keluarga Karawang",
    period: "2024 – Present",
    desc: "Managing hospital information systems, network infrastructure, troubleshooting, and maintaining server uptime for critical healthcare operations. Also developing internal applications including pharmacy queue systems, polyclinic queue management, front office systems, and HR training (diklat) management systems.",
    tags: ["Networking", "Server Admin", "Troubleshooting", "Fullstack Development"],
  },
  {
    role: "Internship (CCTV Technician)",
    company: "Prisma Komputer",
    period: "2021 - 2021",
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
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".timeline-item");

      gsap.from(items, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      x: x * 0.05,
      y: y * 0.05,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section ref={sectionRef} id="experience" className="section-padding bg-white relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-16">
          <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">Professional Journey</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            My <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Decorative Line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-primary/20" />

          <div className="space-y-12 relative z-10">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item relative pl-12 md:pl-20">
                {/* Visual Connector Dot */}
                <div className="absolute left-2.5 md:left-4.5 top-8 w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>

                <div
                  className="group rounded-2xl p-8 bg-white border border-gray-100 cursor-pointer transition-all duration-500 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 relative z-10"
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={16} className="text-primary" />
                        <span className="text-primary font-mono text-sm font-semibold">{exp.company}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">{exp.role}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 font-mono text-sm whitespace-nowrap">{exp.period}</span>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-500 ${expandedIndex === i ? "rotate-180 text-primary" : ""}`}
                      />
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${expandedIndex === i ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="h-px w-full bg-gray-100 mb-6" />
                    <p className="text-gray-500 text-base leading-relaxed mb-8">{exp.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 text-xs rounded-xl bg-gray-50 text-gray-600 font-medium hover:bg-primary/5 hover:text-primary transition-colors cursor-default"
                        >
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
