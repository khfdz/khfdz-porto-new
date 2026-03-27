import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Download, FolderOpen } from "lucide-react";

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

  // GSAP entrance & parallax shapes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5,
      });
      
      // Gentle parallax for abstract shapes
      gsap.to(".abstract-shape-1", {
        y: -30,
        x: 20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(".abstract-shape-2", {
        y: 40,
        x: -20,
        rotation: -5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Light modern background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Abstract Soft Shapes (Artistic modern web feel) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="abstract-shape-1 absolute top-[10%] left-[15%] w-96 h-96 bg-primary/10 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="abstract-shape-2 absolute bottom-[10%] right-[15%] w-[30rem] h-[30rem] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-100/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" />
      </div>

      <div className="hero-content relative z-10 container mx-auto px-4 text-center">
        <p className="text-primary font-mono text-sm md:text-base mb-6 tracking-widest uppercase">
          Hello, I'm
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter text-foreground">
          <span className="gradient-text">Dhika</span>{" "}
          <span className="text-gray-800">Hafidz</span>
        </h1>
        <div className="h-10 md:h-12 flex items-center justify-center mb-8">
          <span className="text-xl md:text-2xl font-mono text-gray-500">
            {displayText}
            <span className="animate-pulse-glow text-primary ml-1">|</span>
          </span>
        </div>
        <p className="text-gray-500 max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
          Building scalable systems, interactive web apps, and real-world solutions with elegant design.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 hoverable"
            style={{ background: "var(--gradient-primary)" }}
          >
            <FolderOpen size={18} />
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium border border-gray-200 text-gray-700 bg-white/50 hover:bg-white hover:shadow-sm transition-all duration-300 hover:-translate-y-1 hoverable backdrop-blur-sm"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <ArrowDown size={20} className="text-gray-400" />
      </div>
    </section>
  );
};

export default HeroSection;
