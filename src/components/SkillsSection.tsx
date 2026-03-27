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
    color: "from-neon-purple to-neon-blue",
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
    color: "from-neon-blue to-neon-cyan",
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
    color: "from-neon-cyan to-neon-purple",
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
    color: "from-neon-pink to-neon-purple",
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
    <section ref={sectionRef} id="skills" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <p className="text-primary font-mono text-sm mb-2 tracking-widest uppercase">Skills</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          My <span className="gradient-text">Toolkit</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="skill-card glass-card p-6 hoverable hover-glow transition-all duration-500">
              <h3 className={`text-lg font-bold mb-5 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.name}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon size={14} className="text-muted-foreground" />
                          <span className="text-foreground">{s.name}</span>
                        </div>
                        <span className="text-muted-foreground font-mono text-xs">{s.level}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${cat.color}`}
                          style={{ width: `${s.level}%` }}
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
