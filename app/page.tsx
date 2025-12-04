"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  Instagram,
  Linkedin,
  Mail,
  Play,
  Layers,
  PenTool,
  MousePointer2,
} from "lucide-react";
import Link from "next/link";

// --- UTILITY COMPONENTS (Mocking Shadcn UI) ---
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
  }
>(({ className, variant = "default", size = "md", ...props }, ref) => {
  const variants = {
    default:
      "bg-[#d95d39] text-white hover:bg-[#c24b2b] shadow-lg shadow-[#d95d39]/20",
    outline:
      "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#fdfcf6]",
    ghost: "hover:bg-[#1a1a1a]/5 text-[#1a1a1a]",
  };
  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-[#1a1a1a]/10 bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] backdrop-blur-sm",
      className
    )}
  >
    {children}
  </span>
);

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-2xl border border-[#1a1a1a]/5 bg-white/40 p-6 backdrop-blur-sm transition-all hover:bg-white/60 hover:shadow-xl hover:shadow-[#d95d39]/5",
      className
    )}
  >
    {children}
  </div>
);

// --- ANIMATION HELPER COMPONENTS ---

// Replacement for ScrollTrigger
const RevealOnScroll = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Portfolio() {
  // Removed GSAP registerPlugin
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Trigger Hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroLoaded(true);
    }, 10);

    return () => clearTimeout(timer); // Cleanup function
  }, []);
  // Custom Cursor Logic (Native JS)
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${
          e.clientY
        }px) translate(-50%, -50%) ${isHovering ? "scale(2.5)" : "scale(1)"}`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isHovering]);

  return (
    <div className="min-h-screen bg-[#fdfcf6] text-[#1a1a1a] font-sans selection:bg-[#d95d39] selection:text-white cursor-none overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#d95d39] pointer-events-none z-50 mix-blend-difference transition-transform duration-200 ease-out hidden md:block",
          isHovering ? "bg-[#d95d39]" : "bg-transparent"
        )}
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-multiply bg-[#fdfcf6]/80 backdrop-blur-sm">
        <div className="text-xl font-bold tracking-tighter">CHEVHIN.</div>
        <div className="hidden md:flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Works
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            About
          </Button>
          <Link
            href={
              "https://www.behance.net/gallery/225930295/Portfolio-Chevhin-Walidain-25#"
            }
            target="_blank"
          >
            <Button
              size="sm"
              className="bg-[#1a1a1a] text-white"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Contact Me
            </Button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20">
        {/* Background Abstract Shapes */}
        <div
          className={cn(
            "absolute right-0 top-1/4 w-[30vw] h-[30vw] rounded-full bg-[#d95d39]/10 blur-[100px] transition-all duration-2000 ease-out transform",
            heroLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute left-10 bottom-10 w-[20vw] h-[20vw] rounded-full bg-[#f4a261]/10 blur-[80px] transition-all duration-2000 delay-300 ease-out transform",
            heroLoaded ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />

        <div className="max-w-4xl z-10">
          <div
            className={cn(
              "overflow-hidden mb-4 transition-all duration-1000 delay-100 transform",
              heroLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            )}
          >
            <Badge className="border-[#d95d39] text-[#d95d39] bg-[#d95d39]/5">
              Available for Hire
            </Badge>
          </div>

          <div
            className={cn(
              "overflow-hidden transition-all duration-1000 delay-200 transform",
              heroLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            )}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-2">
              CREATIVE
            </h1>
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-1000 delay-300 transform",
              heroLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            )}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-[#d95d39]">
              DESIGNER
            </h1>
          </div>

          <div
            className={cn(
              "overflow-hidden mt-6 transition-all duration-1000 delay-500 transform",
              heroLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            )}
          >
            <p className="text-lg md:text-2xl text-[#1a1a1a]/60 max-w-2xl font-medium leading-relaxed">
              &{" "}
              <span className="text-[#1a1a1a] italic font-serif">
                Visual Storyteller
              </span>{" "}
              based in Indonesia. Specializing in Branding, Social Media
              Management, and Motion Graphics.
            </p>
          </div>

          <div
            className={cn(
              "overflow-hidden mt-10 flex gap-4 transition-all duration-1000 delay-700 transform",
              heroLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            )}
          >
            <div className="flex gap-4">
              <Button
                size="lg"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group"
              >
                Let&apos;s Collaborate
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/Chevhin-porto.pdf" download={"Chevhin Porto.pdf"}>
                <Button
                  variant="outline"
                  size="lg"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Download CV <Download className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#1a1a1a]/30 hidden md:block">
          <MousePointer2 className="w-6 h-6" />
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-24 px-6 md:px-20 relative">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="md:w-1/3">
            <div className="sticky top-32">
              <RevealOnScroll>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Professional <br />
                  <span className="text-[#d95d39] italic font-serif">
                    Experience
                  </span>
                </h2>
                <p className="text-[#1a1a1a]/60 mt-4 mb-8">
                  A timeline of my journey in the creative industry, working
                  with brands to tell their stories.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="md:w-2/3 space-y-12">
            {/* Job 1 */}
            <RevealOnScroll delay={200}>
              <div className="relative pl-8 border-l border-[#1a1a1a]/10">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#d95d39]" />
                <span className="text-sm font-mono text-[#1a1a1a]/50 mb-2 block">
                  Oct 2023 - Present
                </span>
                <h3 className="text-2xl font-bold">Golden The Tiger</h3>
                <p className="text-[#d95d39] font-medium mb-4">
                  Creative Content Specialist & Social Media Handler
                </p>
                <ul className="space-y-3 text-[#1a1a1a]/70">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 mt-2 shrink-0" />
                    <span>
                      <strong>Creative Vision:</strong> Led development of
                      brand&apos;s creative vision and identity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 mt-2 shrink-0" />
                    <span>
                      <strong>Content Creation:</strong> Managed end-to-end
                      creation including photoshoots and post-production.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 mt-2 shrink-0" />
                    <span>
                      <strong>Strategy:</strong> Implemented strategies to
                      enhance brand presence and community growth.
                    </span>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>

            {/* Job 2 */}
            <RevealOnScroll delay={400}>
              <div className="relative pl-8 border-l border-[#1a1a1a]/10">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#1a1a1a]/20" />
                <span className="text-sm font-mono text-[#1a1a1a]/50 mb-2 block">
                  Sept 2023 - Nov 2023
                </span>
                <h3 className="text-2xl font-bold">Nataroe Active</h3>
                <p className="text-[#d95d39] font-medium mb-4">
                  Graphic & Motion Designer (Intern)
                </p>
                <ul className="space-y-3 text-[#1a1a1a]/70">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 mt-2 shrink-0" />
                    <span>
                      <strong>Asset Assembly:</strong> Sourced and assembled
                      assets into cohesive designs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 mt-2 shrink-0" />
                    <span>
                      <strong>Visual Consistency:</strong> Ensured brand
                      alignment across all digital platforms.
                    </span>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* --- EDUCATION BANNER --- */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-20">
          <RevealOnScroll>
            <div className="bg-[#1a1a1a] text-[#fdfcf6] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d95d39] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />

              <div className="relative z-10">
                <Badge className="bg-[#fdfcf6]/10 text-[#fdfcf6] border-none mb-4">
                  Education
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold">
                  Telkom University
                </h3>
                <p className="text-[#fdfcf6]/60 text-lg mt-2">
                  Bachelor of Design, 2025
                </p>
              </div>

              <div className="text-center md:text-right relative z-10 border-t md:border-t-0 md:border-l border-[#fdfcf6]/20 pt-6 md:pt-0 md:pl-12 w-full md:w-auto">
                <div className="text-5xl md:text-6xl font-bold text-[#d95d39]">
                  3.52
                </div>
                <div className="text-sm tracking-widest uppercase opacity-60 mt-1">
                  GPA Score
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- SKILLS & SERVICES --- */}
      <section id="skills" className="py-24 px-6 md:px-20 bg-white/30">
        <RevealOnScroll>
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              My{" "}
              <span className="text-[#d95d39] italic font-serif">
                Creative Arsenal
              </span>
            </h2>
            <p className="text-[#1a1a1a]/60">
              Tools and methodologies I use to bring ideas to life.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skill Group 1 */}
          <RevealOnScroll delay={100} className="h-full">
            <Card className="h-full hover:border-[#d95d39]/30 group">
              <div className="w-12 h-12 bg-[#d95d39]/10 rounded-full flex items-center justify-center text-[#d95d39] mb-6 group-hover:bg-[#d95d39] group-hover:text-white transition-colors">
                <PenTool size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Design & Branding</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Graphic Design",
                  "Visual Storytelling",
                  "Layouting",
                  "Brand Identity",
                ].map((skill) => (
                  <Badge key={skill} className="bg-white">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </RevealOnScroll>

          {/* Skill Group 2 */}
          <RevealOnScroll delay={200} className="h-full">
            <Card className="h-full hover:border-[#d95d39]/30 group">
              <div className="w-12 h-12 bg-[#d95d39]/10 rounded-full flex items-center justify-center text-[#d95d39] mb-6 group-hover:bg-[#d95d39] group-hover:text-white transition-colors">
                <Play size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Motion & Content</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Motion Design",
                  "Content Creation",
                  "Digital Imaging",
                  "Video Editing",
                ].map((skill) => (
                  <Badge key={skill} className="bg-white">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </RevealOnScroll>

          {/* Skill Group 3 */}
          <RevealOnScroll delay={300} className="h-full">
            <Card className="h-full hover:border-[#d95d39]/30 group">
              <div className="w-12 h-12 bg-[#d95d39]/10 rounded-full flex items-center justify-center text-[#d95d39] mb-6 group-hover:bg-[#d95d39] group-hover:text-white transition-colors">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Software Stack</h3>
              <p className="text-sm text-[#1a1a1a]/60 mb-4">
                Mastery in industry standard tools.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Adobe Creative Cloud</span>
                  <span className="text-[#d95d39]">90%</span>
                </div>
                <div className="w-full bg-[#1a1a1a]/5 rounded-full h-1.5">
                  <div className="bg-[#d95d39] h-1.5 rounded-full w-[90%]" />
                </div>

                <div className="flex items-center justify-between text-sm font-medium mt-3">
                  <span>Affinity Suite</span>
                  <span className="text-[#d95d39]">85%</span>
                </div>
                <div className="w-full bg-[#1a1a1a]/5 rounded-full h-1.5">
                  <div className="bg-[#d95d39] h-1.5 rounded-full w-[85%]" />
                </div>
              </div>
            </Card>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 md:px-20 border-t border-[#1a1a1a]/10 bg-white/40 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-end">
          <RevealOnScroll>
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                LET&apos;S CREATE <br />
                SOMETHING{" "}
                <span className="text-[#d95d39] italic font-serif">WILD.</span>
              </h2>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-[#1a1a1a] text-white hover:bg-[#d95d39]"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Mail className="mr-2 w-4 h-4" /> hello@chevhin.design
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          <div className="flex gap-4 mt-10 md:mt-0">
            <a
              href="#"
              className="p-3 bg-white border border-[#1a1a1a]/10 rounded-full hover:bg-[#d95d39] hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-3 bg-white border border-[#1a1a1a]/10 rounded-full hover:bg-[#d95d39] hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1a]/5 flex justify-between text-sm text-[#1a1a1a]/40">
          <p>© 2025 Chevhin Portfolio.</p>
          <p>Developed with Next.js</p>
        </div>
      </footer>
    </div>
  );
}
