import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Code2, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Briefcase,
    title: "IT Staff",
    desc: "Hospital system management & infrastructure support",
  },
  {
    icon: Code2,
    title: "Fullstack Dev",
    desc: "MERN stack specialist building end-to-end solutions",
  },
  {
    icon: Server,
    title: "System Builder",
    desc: "Scalable architectures & real-world applications",
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".about-reveal");
      if (!els) return;
      gsap.set(els, { y: 50, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(els, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <p className="about-reveal text-primary font-mono text-sm mb-2 tracking-widest uppercase">
          About Me
        </p>
        <h2 className="about-reveal text-3xl md:text-5xl font-bold mb-8">
          Crafting <span className="gradient-text">Digital Experiences</span>
        </h2>
        <p className="about-reveal text-muted-foreground text-base md:text-lg leading-relaxed mb-12 max-w-2xl">
          I'm a passionate Fullstack Web Developer & IT Specialist with experience in building
          hospital information systems, web applications, and scalable tech solutions. I combine
          engineering precision with creative thinking to deliver impactful digital products.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="about-reveal glass-card p-6 hover-glow transition-all duration-500 hover:-translate-y-1 hoverable"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                <item.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
