import Link from "next/link";
import PageBanner from "../components/PageBanner";
import Footer from "../components/Footer";
// import Footer from "@/components/Footer";
// import PageBanner from "@/components/ui/PageBanner";

const values = [
  {
    n: "01",
    title: "Dignity First",
    text: "Every person we serve is treated with unconditional honour. Our programmes restore and affirm human dignity.",
    accent: "var(--mid)",
  },
  {
    n: "02",
    title: "Community Ownership",
    text: "Sustainable change comes from within. We build local capacity and hand ownership to the community.",
    accent: "var(--glow)",
  },
  {
    n: "03",
    title: "Generational Thinking",
    text: "We measure success in generations. Every decision asks: what does this mean for the child 20 years from now?",
    accent: "var(--gold)",
  },
  {
    n: "04",
    title: "Radical Transparency",
    text: "We publish full financial reports and programme evaluations. Our donors and beneficiaries deserve complete honesty.",
    accent: "var(--deep)",
  },
];

const team = [
  {
    initials: "AO",
    name: "Amara Okonkwo",
    role: "Executive Director",
    bg: "linear-gradient(135deg,#064E38,#10B981)",
  },
  {
    initials: "CE",
    name: "Chidi Ezenwachi",
    role: "Head of Programmes",
    bg: "linear-gradient(135deg,#0D6E4F,#34D399)",
  },
  {
    initials: "NU",
    name: "Ngozi Umezurike",
    role: "Finance & Operations",
    bg: "linear-gradient(135deg,#C9A84C,#8B6914)",
  },
  {
    initials: "IA",
    name: "Ifeanyi Agu",
    role: "Community Engagement",
    bg: "linear-gradient(135deg,#148a80,#064E38)",
  },
];

const structure = [
  {
    date: "January 18, 2019",
    title: "Eleje Legacy Foundation",
    text: "Established in Nigeria. Functions as the operating organization executing projects on the ground.",
  },
  {
    date: "January 2, 2020",
    title: "Elejelegacy Inc.",
    text: "Incorporated in the United States as a 501(c)(3) nonprofit. Serves as the parent organization of Eleje Legacy Foundation.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        label="About Elejelegacy Inc."
        title={
          <>
            Empowering Women.<br />
            Strengthening Families.<br />
            <em style={{ fontStyle: "italic", color: "var(--glow)" }}>Building Futures.</em>
          </>
        }
      />

      {/* Main content */}
      <div className="section-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[68px] items-start py-[88px]">
          {/* Prose */}
          <div>
            <div className="eyebrow mb-4">
              <div className="ey-dash" />
              <span className="ey-txt">Who We Are</span>
            </div>

            {[
              <>
                Elejelegacy Inc. is a{" "}
                <strong style={{ color: "var(--deep)", fontWeight: 600 }}>U.S.-based 501(c)(3) nonprofit organization</strong>
                {" "}dedicated to empowering women, strengthening families, and creating opportunities for children in underserved communities in Nigeria.
              </>,
              <>
                Through <strong style={{ color: "var(--deep)", fontWeight: 600 }}>Eleje Legacy Foundation</strong>, our Nigerian operating organization, we provide practical support that addresses immediate needs while creating pathways toward long-term economic independence and educational opportunity.
              </>,
              <>
                Each year, we provide{" "}
                <strong style={{ color: "var(--deep)", fontWeight: 600 }}>food and clothing assistance to approximately 1,500 women</strong>
                {" "}and empower{" "}
                <strong style={{ color: "var(--deep)", fontWeight: 600 }}>60 women</strong>
                {" "}with financial support to start or expand small businesses and trades.
              </>,
              <>
                Our goal is to help women build sustainable sources of income, provide for their families with dignity, and{" "}
                <strong style={{ color: "var(--deep)", fontWeight: 600 }}>create more secure futures for their children</strong>.
              </>,
            ].map((para, i) => (
              <p
                key={i}
                className="mb-[17px]"
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontSize: "0.92rem",
                  lineHeight: 2,
                  color: "var(--grey)",
                }}
              >
                {para}
              </p>
            ))}

            <div className="mt-6">
              <Link
                href="/programmes"
                className="inline-flex items-center gap-[9px] px-[30px] py-[14px] rounded-[4px] text-[0.7rem] font-semibold tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-[2px]"
                style={{ background: "var(--deep)", color: "var(--cream)" }}
              >
                See Our Programmes →
              </Link>
            </div>
          </div>

          {/* Values */}
          <div>
            <div className="eyebrow mb-4">
              <div className="ey-dash" />
              <span className="ey-txt">Core Values</span>
            </div>
            <div className="flex flex-col gap-[14px]">
              {values.map((v) => (
                <div
                  key={v.n}
                  className="flex gap-4 p-5 rounded-[11px]"
                  style={{
                    background: "var(--warm)",
                    borderLeft: `3px solid ${v.accent}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.9rem",
                      fontWeight: 700,
                      color: "rgba(13,110,79,0.22)",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {v.n}
                  </div>
                  <div>
                    <h4
                      className="mb-1"
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "var(--deep)",
                      }}
                    >
                      {v.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        lineHeight: 1.7,
                        color: "var(--grey)",
                      }}
                    >
                      {v.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="pb-[88px]">
        <div className="section-wrap">
          <div className="eyebrow">
            <div className="ey-dash" />
            <span className="ey-txt">Mission &amp; Vision</span>
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
            Investing in mothers,{" "}
            <em style={{ fontStyle: "italic", color: "var(--emerald)" }}>and in their children</em>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Mission */}
            <div
              className="rounded-[16px] p-6 sm:p-[34px]"
              style={{ background: "#fff", border: "1px solid var(--border)", boxShadow: "0 4px 20px var(--shadow)" }}
            >
              <h3
                className="mb-[14px]"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "var(--deep)",
                }}
              >
                Our Mission
              </h3>
              <p
                className="mb-4"
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.9,
                  color: "var(--grey)",
                }}
              >
                To empower women and strengthen families by providing women in Nigeria with the resources, opportunities, and support they need to achieve economic independence, provide for their families, and create a brighter future for their children.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.9,
                  color: "var(--grey)",
                }}
              >
                We address both immediate and long-term needs through food and clothing assistance, women&apos;s economic empowerment, and support for children&apos;s education. We believe a woman&apos;s journey toward independence cannot be separated from the future of her children. Mothers who work hard to keep their children in school should have the assurance that those children can access the educational resources they need to learn, grow, and succeed.
              </p>
            </div>

            {/* Vision */}
            <div
              className="rounded-[16px] p-6 sm:p-[34px]"
              style={{ background: "var(--warm)", borderLeft: "3px solid var(--gold)" }}
            >
              <h3
                className="mb-[14px]"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "var(--deep)",
                }}
              >
                Our Vision
              </h3>
              <p
                className="mb-4"
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.9,
                  color: "var(--grey)",
                }}
              >
                Thriving communities where women are economically empowered, families are secure, and every child, regardless of where they are born, has access to the resources and opportunities needed to receive a quality education and build a promising future.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-lora), Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "0.97rem",
                  lineHeight: 1.75,
                  color: "var(--deep)",
                }}
              >
                Our ultimate vision is to empower today&apos;s mothers to build stronger families and equip tomorrow&apos;s generation with the knowledge, confidence, and opportunities to thrive.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p
              className="mb-4 max-w-[640px]"
              style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "0.88rem",
                lineHeight: 1.9,
                color: "var(--grey)",
              }}
            >
              We believe access to quality educational resources should not be determined by where a child is born. A book can open a child&apos;s imagination; a computer can open a world of knowledge; and a good learning environment can open the door to opportunity.
            </p>
            <Link href="/project" className="pcard-link">
              See the library we built →
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy & organizational structure */}
      <section className="py-[92px] overflow-hidden" style={{ background: "var(--ink)" }}>
        <div className="section-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[76px] items-start">
            <div>
              <div className="eyebrow">
                <div className="ey-dash" style={{ background: "var(--glow)" }} />
                <span className="ey-txt" style={{ color: "var(--glow)" }}>The Legacy Behind Our Work</span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "var(--cream)",
                }}
              >
                In honour of{" "}
                <em style={{ fontStyle: "italic", color: "var(--glow)" }}>Chief Inya Eleje</em>
              </h2>
              {[
                "Elejelegacy Inc. was established in honor of the memory and legacy of our beloved father, Chief Inya Eleje, whose life continues to inspire a commitment to service, compassion, and community.",
                "Founded by Dr. Beatrice Onyeador, Elejelegacy Inc. carries this legacy forward by investing in women today so that families can have greater hope and opportunity tomorrow. His legacy lives on through every woman given an opportunity, every family strengthened, and every child given greater hope for the future.",
              ].map((t, i) => (
                <p
                  key={i}
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "0.92rem",
                    lineHeight: 1.95,
                    color: "rgba(250,246,239,0.55)",
                  }}
                >
                  {t}
                </p>
              ))}
            </div>

            <div>
              <div className="eyebrow">
                <div className="ey-dash" style={{ background: "var(--glow)" }} />
                <span className="ey-txt" style={{ color: "var(--glow)" }}>Organizational Structure</span>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {structure.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-[11px] p-5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(168,230,216,0.09)",
                    }}
                  >
                    <div
                      className="mb-[6px]"
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "var(--glow)",
                      }}
                    >
                      {s.date}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "var(--pale)",
                        marginBottom: 4,
                      }}
                    >
                      {s.title}
                    </div>
                    <div style={{ fontSize: "0.78rem", lineHeight: 1.7, color: "rgba(250,246,239,0.40)" }}>
                      {s.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-[88px]" style={{ background: "var(--warm)" }}>
        <div className="section-wrap">
          <div className="eyebrow">
            <div className="ey-dash" />
            <span className="ey-txt">Leadership</span>
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
            The people behind{" "}
            <em style={{ fontStyle: "italic", color: "var(--emerald)" }}>
              the mission
            </em>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[18px]">
            {team.map((m) => (
              <div
                key={m.name}
                className="rounded-[13px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="h-[162px] flex items-center justify-center"
                  style={{
                    background: m.bg,
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "2.8rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {m.initials}
                </div>
                <div className="p-4">
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "1.02rem",
                      fontWeight: 700,
                      color: "var(--deep)",
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    className="mt-[3px]"
                    style={{
                      fontSize: "0.64rem",
                      letterSpacing: "0.17em",
                      textTransform: "uppercase",
                      color: "var(--mid)",
                    }}
                  >
                    {m.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer minimal /> */}
    </>
  );
}
