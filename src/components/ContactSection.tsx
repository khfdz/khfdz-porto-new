import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Linkedin, Globe, Send } from "lucide-react";

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
    <section ref={sectionRef} id="contact" className="section-padding bg-white relative z-10 border-t border-gray-100">
      <div className="container mx-auto max-w-5xl">
        <p className="contact-reveal text-primary font-mono text-sm mb-4 tracking-widest uppercase font-medium">Contact</p>
        <h2 className="contact-reveal text-4xl md:text-6xl font-bold mb-16 tracking-tight text-foreground">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <p className="contact-reveal text-gray-500 leading-relaxed text-lg">
              I'm always open to new opportunities, collaborations, or just a friendly conversation about tech and creativity.
            </p>
            <div className="space-y-6">
              {[
                { icon: Mail, text: "dhikahafidz.jobs@gmail.com", href: "mailto:dhikahafidz.jobs@gmail.com" },
                { icon: Phone, text: "+62 822 6042 3997", href: "tel:+6282260423997" },
                { icon: Linkedin, text: "LinkedIn", href: "#" },
                { icon: Globe, text: "Portfolio", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="contact-reveal flex items-center gap-4 text-gray-600 hover:text-primary transition-colors hoverable group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-primary transition-colors text-primary group-hover:text-white">
                    <item.icon size={18} />
                  </div>
                  <span className="font-medium text-base">{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-reveal space-y-5 glass-card p-8 bg-white/80 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-500" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-sans"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-sans"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none font-sans"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 hoverable"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
