import Link from "next/link";
// import Footer from "@/components/Footer";
// import MarqueeStrip from "@/components/home/MarqueeStrip";
// import CtaBand from "@/components/home/CtaBand";
import MarqueeStrip from "./components/home/MarqueeStrip";
import CtaBand from "./components/home/CtaBand";
import Footer from "./components/Footer";
import ElojeLogo from "./components/ui/ElojeLogo";

/* ─── Sub-components (server) ─────────────────────────── */

function HeroSection() {
  return (
    <section
      className="min-h-[calc(100vh-68px)] grid grid-cols-1 lg:grid-cols-[55%_45%] relative overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Diagonal shape */}
            {/* Diagonal shape — holds the hero video */}
      <div
        className="absolute right-0 top-0 hidden lg:block overflow-hidden"
        style={{
          width: "50%",
          height: "100%",
          /* shows while the video loads */
          background: "linear-gradient(158deg, var(--deep) 0%, #0b6347 55%, #0e7f5a 100%)",
          clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 4% 54%)",
        }}
      >
        <video
          src="/video/market_shots.mov"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.8) contrast(1.05)" }}
        />

        {/* Brand tint: pulls the footage into the emerald palette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(158deg, rgba(6,78,56,0.78) 0%, rgba(11,99,71,0.50) 55%, rgba(12,24,16,0.60) 100%)",
          }}
        />
        {/* Soft fade into the ink background along the cut edge */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(12,24,16,0.60) 0%, transparent 30%)" }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(0deg, rgba(12,24,16,0.55) 0%, transparent 35%)" }}
        />
      </div>
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          left: "28%",
          top: "28%",
          width: 360,
          height: 360,
          background: "radial-gradient(circle, rgba(16,184,129,0.10) 0%, transparent 70%)",
        }}
      />

      {/* LEFT */}
      <div className="relative z-10 flex flex-col justify-center px-5 py-20 sm:px-[52px]">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-[9px] rounded-[40px] px-[15px] py-[6px] mb-[30px] anim-fade-up self-start"
          style={{
            background: "rgba(52,211,153,0.07)",
            border: "1px solid rgba(52,211,153,0.18)",
          }}
        >
          <div
            className="w-[6px] h-[6px] rounded-full relative flex-shrink-0 badge-dot-pulse"
            style={{ background: "var(--glow)" }}
          />
          <span
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--glow)",
            }}
          >
            501(c)(3) Nonprofit · Serving Nigeria
          </span>
        </div>

        {/* Headline */}
        <h1
          className="anim-fade-up anim-fade-up-1 mb-[22px]"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3rem, 5.4vw, 5rem)",
            fontWeight: 600,
            lineHeight: 1.07,
            color: "var(--cream)",
          }}
        >
          Empowering<br />
          <em style={{ fontStyle: "italic", color: "var(--glow)" }}>Women.</em>
          <br />Strengthening<br />Families.<br />Building Futures.
        </h1>

        <p
          className="anim-fade-up anim-fade-up-2 mb-[38px] max-w-[430px]"
          style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "0.97rem",
            lineHeight: 1.88,
            color: "rgba(250,246,239,0.54)",
          }}
        >
          Elejelegacy Inc. empowers women, strengthens families, and creates opportunities for children in underserved communities in Nigeria — building pathways to economic independence and educational opportunity.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-[13px] anim-fade-up anim-fade-up-3">
          <Link
            href="/donation"
            className="inline-flex items-center gap-[9px] px-[30px] py-[14px] rounded-[4px] text-[0.7rem] font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-[2px] hover:brightness-110"
            style={{ background: "var(--gold)", color: "var(--ink)" }}
          >
            Support Our Work →
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-[9px] px-[30px] py-[14px] rounded-[4px] text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              border: "1px solid rgba(168,230,216,0.28)",
              color: "var(--pale)",
              background: "transparent",
            }}
          >
            Our Story
          </Link>
        </div>

        {/* Mobile/tablet video — shown below text, hidden once the desktop diagonal panel kicks in */}
        <div
          className="lg:hidden mt-8 rounded-[14px] overflow-hidden relative anim-fade-up"
          style={{
            aspectRatio: "16/10",
            background: "linear-gradient(158deg, var(--deep) 0%, #0b6347 55%, #0e7f5a 100%)",
          }}
        >
          <video
            src="/video/market_shots.mov"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "saturate(0.8) contrast(1.05)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(158deg, rgba(6,78,56,0.55) 0%, rgba(11,99,71,0.30) 55%, rgba(12,24,16,0.40) 100%)",
            }}
          />
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-8 sm:gap-10 mt-14 pt-7 anim-fade-up anim-fade-up-4"
          style={{ borderTop: "1px solid rgba(168,230,216,0.09)" }}
        >

        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-8 sm:gap-10 mt-14 pt-7 anim-fade-up anim-fade-up-4"
          style={{ borderTop: "1px solid rgba(168,230,216,0.09)" }}
        >
          {[
            { n: "~1,500", l: "Women Assisted Yearly" },
            { n: "60",     l: "Women Funded Annually" },
            { n: "1",      l: "Modern Library Built" },
          ].map((s) => (
            <div key={s.l}>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--pale)",
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div
                className="mt-[5px]"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--mgrey)",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Visual */}
      <div className="hidden lg:flex relative z-10 items-center justify-center p-20 anim-fade-in">
        <div className="relative">
          
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const cards = [
    { icon: "🧺", n: "~1,500", l: "Women receive food and clothing assistance each year" },
    { icon: "💼", n: "60",     l: "Women empowered annually with cash support to start or expand a trade or small business" },
    { icon: "📚", n: "1",      l: "Ultra-modern, technology-equipped library built in a rural primary school" },
    { icon: "💻", n: "10",     l: "Computers, with books, solar power and borehole water supporting the library" },
  ];

  return (
    <div className="py-[80px]" style={{ background: "var(--warm)" }}>
      <div className="section-wrap">
        <div className="eyebrow">
          <div className="ey-dash" />
          <span className="ey-txt">Our Impact</span>
        </div>
        <h2
          className="mb-[48px]"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 3.8vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "var(--deep)",
          }}
        >
          Every number is a{" "}
          <em style={{ fontStyle: "italic", color: "var(--emerald)" }}>life transformed</em>
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[16px] overflow-hidden"
          style={{ gap: 2, background: "var(--border)" }}
        >
          {cards.map((c) => (
            <div
              key={c.n}
              className="ic-card relative overflow-hidden transition-colors duration-300 p-[26px] sm:p-[38px]"
              style={{ background: "#fff" }}
            >
              <div className="text-[1.7rem] mb-[14px]">{c.icon}</div>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "2.7rem",
                  fontWeight: 700,
                  color: "var(--deep)",
                  lineHeight: 1,
                }}
              >
                {c.n}
              </div>
              <div
                className="mt-2"
                style={{ fontSize: "0.76rem", lineHeight: 1.55, color: "var(--grey)" }}
              >
                {c.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgrammesPreview() {
    const cards = [
      {
        chip: "Relief",
        bg: "linear-gradient(160deg,#064E38,#0D6E4F)",
        title: "Food & Clothing Assistance",
        desc: "Each year, approximately 1,500 women receive food and clothing assistance that meets immediate needs and gives families room to build.",
        chipColor: "white",
      },
      {
        chip: "Empowerment",
        bg: "linear-gradient(160deg,#0D6E4F,#10B981)",
        title: "Women's Economic Empowerment",
        desc: "60 women each year receive financial support to start or expand small businesses and trades, building sustainable sources of income.",
        chipColor: "white",
      },
      {
        chip: "Education",
        bg: "linear-gradient(160deg,#10B981,#34D399)",
        title: "Children's Education",
        desc: "An ultra-modern library with books, 10 computers, solar power and borehole water gives children in a rural community access to quality learning.",
        chipColor: "var(--deep)",
      },
    ];

  return (
    <section className="py-[92px]">
      <div className="section-wrap">
        <div className="eyebrow">
          <div className="ey-dash" />
          <span className="ey-txt">What We Do</span>
        </div>
        <h2
          className="mb-[52px]"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 3.8vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "var(--deep)",
          }}
        >
          Programmes that plant{" "}
          <em style={{ fontStyle: "italic", color: "var(--emerald)" }}>seeds for tomorrow</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-[16px] overflow-hidden transition-all duration-300 hover:-translate-y-[6px] hover:shadow-xl"
              style={{ background: "#fff", border: "1px solid var(--border)" }}
            >
              <div
                className="h-[168px] flex items-end p-5"
                style={{ background: c.bg }}
              >
                <span
                  className="text-[0.56rem] tracking-[0.28em] uppercase px-3 py-[5px] rounded-[2px] backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    color: c.chipColor,
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {c.chip}
                </span>
              </div>
              <div className="p-5 pb-7">
                <h3
                  className="mb-[9px]"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--deep)",
                    lineHeight: 1.2,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="mb-4"
                  style={{ fontSize: "0.82rem", lineHeight: 1.8, color: "var(--grey)" }}
                >
                  {c.desc}
                </p>
                <Link href="/programmes" className="pcard-link">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const pillars = [
    { ico: "🌱", ttl: "Growth",    txt: "Long-term development, not short-term relief." },
    { ico: "🤝", ttl: "Community", txt: "Co-designed with the people we serve." },
    { ico: "📖", ttl: "Legacy",    txt: "Thinking in generations, not quarters." },
    { ico: "⚖️", ttl: "Dignity",  txt: "Every person served with honour." },
  ];

  return (
    <div
      className="py-[108px] overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      <div className="section-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[76px] items-center">
          {/* Vis */}
          <div className="relative max-w-[380px] mx-auto lg:mx-0">
            <div
              className="w-full rounded-[22px] flex items-center justify-center relative overflow-hidden"
              style={{
                aspectRatio: "1/1.08",
                background: "linear-gradient(140deg, var(--deep), var(--emerald))",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 35% 35%, rgba(52,211,153,0.13) 0%, transparent 65%)",
                }}
              />
              <ElojeLogo width={100} height={85} />
              {/* Year badge */}
              <div
                className="absolute -bottom-4 -right-4 w-[108px] h-[108px] rounded-full flex flex-col items-center justify-center shadow-2xl"
                style={{ background: "var(--gold)" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.85rem",
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1,
                  }}
                >
                  2019
                </div>
                <div style={{ fontSize: "0.48rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", textAlign: "center", marginTop: 2 }}>
                  Est.<br />Nigeria
                </div>
              </div>
            </div>

            {/* Pillars grid */}
            <div className="grid grid-cols-2 gap-3 mt-7">
              {pillars.map((p) => (
                <div
                  key={p.ttl}
                  className="rounded-[11px] p-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(168,230,216,0.09)",
                  }}
                >
                  <div className="text-xl mb-[7px]">{p.ico}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: "var(--pale)",
                      marginBottom: 3,
                    }}
                  >
                    {p.ttl}
                  </div>
                  <div style={{ fontSize: "0.74rem", lineHeight: 1.6, color: "rgba(250,246,239,0.40)" }}>
                    {p.txt}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="eyebrow">
              <div className="ey-dash" style={{ background: "var(--glow)" }} />
              <span className="ey-txt" style={{ color: "var(--glow)" }}>Our Story</span>
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "var(--cream)",
              }}
            >
              Rooted in purpose,<br />
              <em style={{ fontStyle: "italic", color: "var(--glow)" }}>built for generations</em>
            </h2>
            <p
              className="mb-7"
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "0.92rem",
                lineHeight: 1.95,
                color: "rgba(250,246,239,0.55)",
              }}
            >
              Elejelegacy Inc. was established in honor of the memory and legacy of our beloved father, Chief Inya Eleje, whose life inspires a commitment to service, compassion, and community. Founded by Dr. Beatrice Onyeador, we invest in women today so that families and children have greater hope tomorrow.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-[9px] px-[30px] py-[14px] rounded-[4px] text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-[2px]"
              style={{
                border: "1px solid rgba(168,230,216,0.28)",
                color: "var(--pale)",
                background: "transparent",
              }}
            >
              Read Our Full Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      text: "Eleje Legacy gave me more than support — they gave me back my confidence as a mother. My children are healthy and I now have skills to provide for them.",
      name: "Chioma Okafor",
      loc: "Onitsha South, Anambra",
      initial: "C",
      bg: "linear-gradient(135deg,#0D6E4F,#34D399)",
    },
    {
      text: "Before the programme, I didn't know how to handle my baby's nutrition. Now I teach other mothers in my community what I've learnt here.",
      name: "Adaeze Eze",
      loc: "Awka, Anambra",
      initial: "A",
      bg: "linear-gradient(135deg,#C9A84C,#8B6914)",
    },
    {
      text: "My daughter is now in secondary school on a Legacy scholarship. Two years ago that felt impossible. This organisation changed our family's trajectory.",
      name: "Ngozi Umeh",
      loc: "Nnewi, Anambra",
      initial: "N",
      bg: "linear-gradient(135deg,#148a80,#064E38)",
    },
  ];

  return (
    <section className="py-[92px]" style={{ background: "var(--warm)" }}>
      <div className="section-wrap">
        <div className="eyebrow">
          <div className="ey-dash" />
          <span className="ey-txt">Community Voices</span>
        </div>
        <h2
          className="mb-[52px]"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 3.8vw, 3rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "var(--deep)",
          }}
        >
          What our{" "}
          <em style={{ fontStyle: "italic", color: "var(--emerald)" }}>community</em> says
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-[15px] p-6 sm:p-[30px]"
              style={{ background: "#fff", border: "1px solid var(--border)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "3.2rem",
                  lineHeight: 0.8,
                  color: "var(--glow)",
                  opacity: 0.33,
                  marginBottom: 10,
                }}
              >
              </div>
              <p
                className="mb-5"
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "0.98rem",
                  lineHeight: 1.72,
                  color: "var(--deep)",
                }}
              >
                {t.text}
              </p>
              <div className="flex items-center gap-[10px]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: t.bg,
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.83rem", color: "var(--deep)" }}>
                    {t.name}
                  </div>
                  <div className="mt-[2px]" style={{ fontSize: "0.68rem", color: "var(--mgrey)" }}>
                    {t.loc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ImpactSection />
      <ProgrammesPreview />
      <StorySection />
      <TestimonialsSection />
      <CtaBand />
      {/* <Footer /> */}
    </>
  );
}