import { ChevronUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 bg-white border-t border-gray-100 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-sm font-medium">
          © {new Date().getFullYear()} <span className="text-gray-900 font-bold tracking-tight">khfdz</span>. All rights reserved.
        </p>
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm group hoverable"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
