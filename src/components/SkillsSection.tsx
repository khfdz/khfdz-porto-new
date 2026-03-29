import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, skillMetadata } from "@/constants/projects";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract unique skills from projects
  const uniqueStacks = Array.from(new Set(projects.flatMap((p) => p.stack)));
  const uniqueTools = Array.from(new Set(projects.flatMap((p) => p.tools)));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".skill-card-artistic");
      
      // Entrance animation
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        rotateX: -15,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });

      // Subtle floating animation
      cards.forEach((card: any, i) => {
        gsap.to(card, {
          y: "random(-10, 10)",
          x: "random(-5, 5)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(card, {
      x: x * 0.15,
      y: y * 0.15,
      rotateX: -y * 0.1,
      rotateY: x * 0.1,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-background relative z-10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16">
          <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">The Toolkit</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Technologies & <span className="gradient-text">Craft</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Core Tech Stack */}
          <div>
            <h3 className="text-xl font-mono text-gray-400 mb-8 flex items-center gap-4">
              <span className="h-px flex-grow bg-gray-100"></span>
              CORE STACK
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {uniqueStacks.map((name) => {
                const meta = skillMetadata[name];
                if (!meta) return null;
                const Icon = meta.icon;
                return (
                  <div
                    key={name}
                    className="skill-card-artistic group relative glass-card p-6 bg-white border border-gray-100/50 flex flex-col items-center justify-center transition-shadow hover:shadow-xl hover:shadow-primary/5 cursor-default"
                    onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <div className="mb-4 p-3 rounded-2xl bg-gray-50 text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-300">
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-foreground transition-colors">
                      {meta.name}
                    </span>
                    {/* Level Dot Indicator */}
                    <div className="absolute top-3 right-3 flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1 h-1 rounded-full ${i < Math.round(meta.level / 33) ? "bg-primary/40" : "bg-gray-100"}`} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tools & Environment */}
          <div>
            <h3 className="text-xl font-mono text-gray-400 mb-8 flex items-center gap-4">
              <span className="h-px flex-grow bg-gray-100"></span>
              TOOLS & ENV
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {uniqueTools.map((name) => {
                const meta = skillMetadata[name];
                if (!meta) return null;
                const Icon = meta.icon;
                return (
                  <div
                    key={name}
                    className="skill-card-artistic group relative glass-card p-6 bg-white border border-gray-100/50 flex flex-col items-center justify-center transition-shadow hover:shadow-xl hover:shadow-emerald-400/5 cursor-default"
                    onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <div className="mb-4 p-3 rounded-2xl bg-gray-50 text-gray-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all duration-300">
                      <Icon size={24} />
                    </div>
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-foreground transition-colors">
                      {meta.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
