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
    <section ref={sectionRef} id="contact" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <p className="contact-reveal text-primary font-mono text-sm mb-2 tracking-widest uppercase">Contact</p>
        <h2 className="contact-reveal text-3xl md:text-5xl font-bold mb-12">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <p className="contact-reveal text-muted-foreground leading-relaxed">
              I'm always open to new opportunities, collaborations, or just a friendly conversation about tech and creativity.
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, text: "dhikahafidz.jobs@gmail.com", href: "mailto:dhikahafidz.jobs@gmail.com" },
                { icon: Phone, text: "+62 822 6042 3997", href: "tel:+6282260423997" },
                { icon: Linkedin, text: "LinkedIn", href: "#" },
                { icon: Globe, text: "Portfolio", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="contact-reveal flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors hoverable"
                >
                  <item.icon size={18} className="text-primary" />
                  <span className="text-sm">{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-reveal space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-primary-foreground transition-all duration-300 hover-glow hoverable"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Send size={16} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
