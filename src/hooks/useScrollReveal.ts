import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (
  selector: string,
  from: gsap.TweenVars = { y: 50, opacity: 0 },
  options: { stagger?: number; duration?: number; start?: string } = {}
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const { stagger = 0.15, duration = 0.8, start = "top 85%" } = options;

    gsap.set(elements, from);

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      onEnter: () => {
        gsap.to(elements, {
          ...Object.fromEntries(Object.keys(from).map((k) => [k, k === "opacity" ? 1 : k === "scale" ? 1 : k === "scaleX" ? 1 : 0])),
          duration,
          stagger,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return ref;
};
