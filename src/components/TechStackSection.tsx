import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techs = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express",
  "MongoDB", "MySQL", "Tailwind CSS", "Docker", "Git", "Linux",
  "HTML5", "CSS3", "REST API", "Socket.IO", "Figma", "VS Code",
];

const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.6,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="tech-title text-center text-muted-foreground font-mono text-sm tracking-widest uppercase">
          Tech Stack
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techs, ...techs].map((tech, i) => (
            <span
              key={i}
              className="mx-6 text-xl md:text-2xl font-bold text-muted-foreground/30 hover:text-primary transition-colors duration-300 hoverable cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
