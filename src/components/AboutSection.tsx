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
    <section ref={sectionRef} id="about" className="section-padding bg-white relative z-10">
      <div className="container mx-auto max-w-5xl">
        <p className="about-reveal text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">
          About Me
        </p>
        <h2 className="about-reveal text-4xl md:text-6xl font-bold mb-8 tracking-tight text-foreground">
          Crafting <span className="gradient-text">Digital Experiences</span>
        </h2>
        <p className="about-reveal text-gray-500 text-base md:text-lg leading-relaxed mb-16 max-w-3xl">
          I'm a passionate Fullstack Web Developer & IT Specialist with experience in building
          hospital information systems, web applications, and scalable tech solutions. I combine
          engineering precision with creative thinking to deliver impactful digital products.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="about-reveal glass-card p-8 hover-glow transition-all duration-500 hover:-translate-y-2 hoverable border border-gray-100 bg-white/70"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm" style={{ background: "var(--gradient-primary)" }}>
                <item.icon size={26} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
