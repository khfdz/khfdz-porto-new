import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageCircle, Linkedin, Instagram, Github, Palette, FileText, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".contact-reveal");
    if (!els) return;
    gsap.set(els, { y: 40, opacity: 0 });
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(els, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" });
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-[#f8fafc] relative z-10 border-t border-gray-100 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-purple-50/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <p className="contact-reveal text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">Contact</p>
        <h2 className="contact-reveal text-4xl md:text-6xl font-bold mb-16 tracking-tight text-foreground">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Info */}
          <div className="space-y-10">
            <p className="contact-reveal text-gray-500 leading-relaxed text-lg lg:text-xl font-light max-w-md">
              I'm always open to new opportunities, collaborations, or just a friendly conversation about tech and creativity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Mail, text: "Email Me", href: "mailto:dhikahafidz.jobs@gmail.com" },
                { icon: MessageCircle, text: "WhatsApp", href: "https://api.whatsapp.com/send/?phone=6282260423997&text&type=phone_number&app_absent=0" },
                { icon: Linkedin, text: "LinkedIn", href: "https://www.linkedin.com/in/khfdz/" },
                { icon: Github, text: "GitHub", href: "https://github.com/khfdz" },
                { icon: Instagram, text: "Instagram", href: "https://instagram.com/khfdz" },
                { icon: Palette, text: "Behance", href: "https://behance.net/khfdz" },
                { icon: FileText, text: "Download CV", href: "https://docs.google.com/document/d/1QEFp3KyqVry7-946-JBIpTPiBHaV5tG9mohWAY3wKD0/edit?tab=t.0" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-reveal flex items-center gap-4 text-gray-600 hover:text-primary transition-colors hoverable group w-fit"
                >
                  <div className="w-12 h-12 shrink-0 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:bg-primary transition-all duration-300 text-primary group-hover:text-white group-hover:shadow-md group-hover:-translate-y-1">
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium text-base tracking-tight">{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-reveal space-y-6 glass-card p-8 md:p-10 bg-white/70 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-500 rounded-3xl" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-5 py-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/60 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-sans"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-5 py-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/60 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-sans"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/60 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-sans"
            />
            <textarea
              placeholder="Your Message..."
              rows={4}
              className="w-full px-5 py-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/60 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all resize-none font-sans"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 hoverable"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send size={18} className="translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
