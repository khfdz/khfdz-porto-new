import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDown, Download, FolderOpen } from "lucide-react";

const titles = [
  "Fullstack Web Developer",
  "IT Specialist",
  "Problem Solver",
  "Creative Thinker",
  "Photographer"
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

  // GSAP entrance & interactive parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.5,
      });

      // Continuous floating animation
      gsap.to(".abstract-shape", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });

      // Mouse tracking parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 2;
        const yPos = (clientY / window.innerHeight - 0.5) * 2;

        gsap.to(".abstract-shape-1", {
          x: xPos * 50,
          y: yPos * 50,
          duration: 1,
          ease: "power2.out"
        });
        gsap.to(".abstract-shape-2", {
          x: xPos * -30,
          y: yPos * -30,
          duration: 1.2,
          ease: "power2.out"
        });
        gsap.to(".abstract-shape-3", {
          x: xPos * 20,
          y: yPos * -20,
          duration: 1.5,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Light modern background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Abstract Soft Shapes (Artistic modern web feel) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="abstract-shape abstract-shape-1 absolute top-[10%] left-[15%] w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="abstract-shape abstract-shape-2 absolute bottom-[10%] right-[15%] w-[35rem] h-[35rem] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="abstract-shape abstract-shape-3 absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-blue-100/30 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      <div className="hero-content relative z-10 container mx-auto px-4 text-center">
        <p className="text-primary font-mono text-sm md:text-base mb-6 tracking-widest uppercase font-semibold">
          Building Digital Excellence
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tighter text-foreground">
          <span className="gradient-text">Dhika</span>{" "}
          <span className="text-gray-800">Hafidz</span>
        </h1>
        <div className="h-10 md:h-12 flex items-center justify-center mb-10">
          <span className="text-xl md:text-3xl font-mono text-gray-500 font-medium">
            {displayText}
            <span className="animate-pulse-glow text-primary ml-1">|</span>
          </span>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl leading-relaxed font-medium">
          Transforming complex problems into elegant, high-performance digital solutions through code and creativity.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-white transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 hoverable"
            style={{ background: "var(--gradient-primary)" }}
          >
            <FolderOpen size={20} />
            Explore Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold border border-gray-200 text-gray-700 bg-white/50 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 hoverable backdrop-blur-md"
          >
            <Download size={20} />
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ArrowDown size={24} className="text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
