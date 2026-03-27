import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Download, FolderOpen } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const titles = [
  "Fullstack Web Developer",
  "IT Specialist",
  "Problem Solver",
  "Creative Thinker",
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
          if (displayText.length === currentTitle.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTitleIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[150px] animate-float animation-delay-400" />

      <div className="hero-content relative z-10 container mx-auto px-4 text-center">
        <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-widest uppercase">
          Hello, I'm
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
          <span className="gradient-text">Dhika</span>{" "}
          <span className="text-foreground">Hafidz</span>
        </h1>
        <div className="h-10 md:h-12 flex items-center justify-center mb-6">
          <span className="text-xl md:text-2xl font-mono text-muted-foreground">
            {displayText}
            <span className="animate-pulse-glow text-primary">|</span>
          </span>
        </div>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          Building scalable systems, interactive web apps, and real-world solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-primary-foreground transition-all duration-300 hover-glow hoverable"
            style={{ background: "var(--gradient-primary)" }}
          >
            <FolderOpen size={18} />
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium border border-glass-border text-foreground hover:bg-muted/50 transition-all duration-300 hoverable"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <ArrowDown size={20} className="text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
