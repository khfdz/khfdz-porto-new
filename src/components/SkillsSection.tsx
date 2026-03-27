import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Frontend",
    color: "from-neon-purple to-neon-blue",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    color: "from-neon-blue to-neon-cyan",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 78 },
      { name: "REST API", level: 90 },
    ],
  },
  {
    title: "DevOps",
    color: "from-neon-cyan to-neon-purple",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Linux", level: 78 },
      { name: "CI/CD", level: 65 },
      { name: "AWS", level: 55 },
    ],
  },
  {
    title: "IT Support",
    color: "from-neon-pink to-neon-purple",
    skills: [
      { name: "Networking", level: 85 },
      { name: "Troubleshooting", level: 92 },
      { name: "Server Admin", level: 78 },
      { name: "Security", level: 72 },
      { name: "Hardware", level: 80 },
    ],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".skill-bar-fill", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
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
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground font-mono">{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${cat.color}`}
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
