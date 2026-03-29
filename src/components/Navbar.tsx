import { useState, useEffect, useRef } from "react";
import { Menu, X, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
  { label: "Optimizer", href: "/converter", icon: Settings },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (linksRef.current[index]) {
      // #2563eb is the --primary soft blue
      gsap.to(linksRef.current[index], { color: "#2563eb", duration: 0.3 });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (linksRef.current[index]) {
      // #64748b is slate-500 (muted-foreground)
      gsap.to(linksRef.current[index], { color: "#64748b", duration: 0.3 });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        // Smooth scroll to the section. 
        // GSAP's pin spacer alters the document height natively, so this accurately lands on the target
        // even if it's below a pinned section like Featured Work.
        element.scrollIntoView({ behavior: "smooth" });
      } else if (targetId === "" || targetId === "home") {
        // If it's just "/#", go to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      
      setOpen(false); // Close mobile menu if it was open
    }
    // If it's not a hash link (e.g. /converter), standard Link routing will proceed
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav py-3" : "py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8 max-w-7xl">
        <a 
          href="/#" 
          onClick={(e) => handleNavClick(e as any, "/#")}
          className="text-2xl font-bold gradient-text tracking-wider hover:opacity-80 transition-opacity"
        >
          khfdz<span className="text-primary">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              ref={(el) => (linksRef.current[i] = el)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground relative group hoverable py-1 flex items-center gap-1.5"
            >
              {link.icon && <link.icon size={16} className="opacity-50" />}
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e as any, "/#contact")}
            className="px-6 py-2.5 text-sm font-bold rounded-full border border-primary/20 text-foreground hover:bg-primary hover:text-white transition-all duration-300 hoverable shadow-sm"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground hover:text-primary transition-colors hoverable p-2">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-nav mt-3 mx-4 rounded-2xl p-6 shadow-xl animate-fade-in border border-white/40 bg-white/90 backdrop-blur-3xl absolute left-0 right-0 top-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="flex items-center gap-4 py-4 px-2 text-foreground font-semibold border-b border-gray-100/50 last:border-0 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
            >
              {link.icon && <link.icon size={20} className="text-primary/70" />}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
