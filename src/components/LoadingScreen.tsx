import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete,
        });
      }
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-6 tracking-widest">DH</h2>
        <div className="w-48 h-[2px] bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "var(--gradient-primary)",
            }}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-3 font-mono">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
