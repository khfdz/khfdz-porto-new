import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldAlert, Home } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power3.out" 
        }
      );
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 md:px-0">
      <div 
        ref={containerRef}
        className="max-w-md w-full glass-card p-10 text-center border border-gray-200/50 shadow-xl"
      >
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-blue-50 rounded-full text-primary ring-8 ring-blue-50/50 animate-pulse">
            <ShieldAlert size={48} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">
          Information Unavailable
        </h1>
        
        <p className="text-muted-foreground mb-8 leading-relaxed font-medium">
          The <span className="text-primary font-bold">DEMO / CODE</span> for this project 
          is protected under corporate privacy agreements and cannot be shared publicly.
        </p>
        
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:scale-95"
        >
          <Home size={18} />
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Privacy;
