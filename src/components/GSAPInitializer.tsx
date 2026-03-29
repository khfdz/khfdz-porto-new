import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GSAPInitializer = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation for Sections
      const headings = document.querySelectorAll("h2, .section-heading");
      headings.forEach((heading) => {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // 2. Magnetic Effect for Buttons & Hoverables
      const magneticElements = document.querySelectorAll(".hoverable, button, a.group");
      magneticElements.forEach((el) => {
        el.addEventListener("mousemove", (e: any) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });

      // (Card stagger removed: Specific sections now handle their own entrance animations to prevent conflicts)
    });

    return () => ctx.revert();
  }, []);

  return null;
};

export default GSAPInitializer;
