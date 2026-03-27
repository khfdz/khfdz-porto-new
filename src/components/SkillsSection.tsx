import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Database, Globe, Server, Terminal, Cpu,
  Layout, Palette, Box, GitBranch, Cloud, Shield,
  Wifi, Wrench, HardDrive, Monitor, Settings, Layers,
  FileCode, Smartphone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90, icon: Code2 },
      { name: "Next.js", level: 80, icon: Globe },
      { name: "TypeScript", level: 85, icon: FileCode },
      { name: "Tailwind CSS", level: 95, icon: Palette },
      { name: "Responsive Design", level: 95, icon: Smartphone },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88, icon: Server },
      { name: "Express", level: 85, icon: Layers },
      { name: "MongoDB", level: 82, icon: Database },
      { name: "MySQL", level: 78, icon: Database },
      { name: "REST API", level: 90, icon: Globe },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "Git", level: 90, icon: GitBranch },
      { name: "Docker", level: 70, icon: Box },
      { name: "Linux", level: 78, icon: Terminal },
      { name: "CI/CD", level: 65, icon: Settings },
      { name: "AWS", level: 55, icon: Cloud },
    ],
  },
  {
    title: "IT Support",
    skills: [
      { name: "Networking", level: 85, icon: Wifi },
      { name: "Troubleshooting", level: 92, icon: Wrench },
      { name: "Server Admin", level: 78, icon: Cpu },
      { name: "Security", level: 72, icon: Shield },
      { name: "Hardware", level: 80, icon: HardDrive },
    ],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll(".skill-card");
    const bars = section.querySelectorAll(".skill-bar-fill");
    gsap.set(cards, { y: 40, opacity: 0 });
    gsap.set(bars, { scaleX: 0, transformOrigin: "left" });
    ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(cards, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" });
        gsap.to(bars, { scaleX: 1, duration: 1, stagger: 0.05, ease: "power3.out", delay: 0.3 });
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-[#f8fafc] relative z-10 border-t border-gray-100">
      <div className="container mx-auto max-w-6xl">
        <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">Skills</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-foreground">
          My <span className="gradient-text">Toolkit</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div key={cat.title} className="skill-card glass-card p-8 hoverable hover-glow transition-all duration-500 bg-white border border-gray-100 hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-xl font-bold mb-6 text-gray-800">
                {cat.title}
              </h3>
              <div className="space-y-5">
                {cat.skills.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.name}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center gap-3">
                          <Icon size={16} className="text-primary" />
                          <span className="text-gray-700 font-medium">{s.name}</span>
                        </div>
                        <span className="text-gray-400 font-mono text-xs font-semibold">{s.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="skill-bar-fill h-full rounded-full"
                          style={{ width: `${s.level}%`, background: "var(--gradient-primary)" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
