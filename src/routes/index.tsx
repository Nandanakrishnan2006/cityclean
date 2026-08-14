import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useRef, useState, type FormEvent } from "react";
import heroCity from "@/assets/hero-city.png";
import { events, impact, problems, recyclables, stats } from "@/data/city";

const MapPanel = lazy(() => import("@/components/site/MapPanel"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CityCleanMap — Map It. Report It. Clean It." },
      {
        name: "description",
        content:
          "Real-time waste reporting for Bhimavaram. Pin hotspots on a live map, join clean-up drives and track community impact.",
      },
      { property: "og:title", content: "CityCleanMap — Map It. Report It. Clean It." },
      {
        property: "og:description",
        content:
          "Real-time waste reporting for Bhimavaram. Pin hotspots on a live map, join clean-up drives and track community impact.",
      },
    ],
  }),
  component: Index,
});

const nav = [
  { label: "Home", href: "#top" },
  { label: "Map", href: "#map" },
  { label: "Report", href: "#report" },
  { label: "Recycle", href: "#recycle" },
  { label: "Events", href: "#events" },
];

function useParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return offset;
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

function Index() {
  const scroll = useParallax();
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState<"Moderate" | "Critical">("Moderate");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav className="glass-panel flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5">
          <span className="font-display text-sm font-bold tracking-[0.2em] uppercase">
            City<span className="text-primary">Clean</span>
          </span>
          <div className="hidden gap-7 text-xs tracking-widest text-muted-foreground uppercase md:flex">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="transition-colors hover:text-primary">
                {n.label}
              </a>
            ))}
          </div>
          <a
            href="#report"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold tracking-wide text-primary-foreground uppercase transition-transform hover:scale-105"
          >
            Report
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="scene relative flex min-h-screen flex-col justify-start overflow-hidden pt-32 pb-16 sm:pt-36">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/3 h-[70vh] grid-floor"
          style={{ transform: `perspective(700px) rotateX(68deg) translateY(${scroll * 0.15}px)` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{ background: "var(--gradient-glow)" }}
          aria-hidden
        />

        <h1
          className="text-hero relative z-10 px-4 text-center whitespace-nowrap"
          style={{ transform: `translateY(${scroll * -0.12}px)` }}
        >
          CityClean
        </h1>

        <div
          className="relative z-20 -mt-[8vw] flex justify-center px-4"
          style={{ transform: `translateY(${scroll * -0.28}px) scale(${1 + scroll * 0.0002})` }}
        >
          <img
            src={heroCity}
            alt="3D isometric model of a clean city block with waste report pins"
            width={1408}
            height={1104}
            className="float-soft w-[min(92vw,900px)] drop-shadow-[0_60px_80px_rgba(0,0,0,0.65)]"
          />
        </div>

        <div className="relative z-30 mx-auto -mt-[6vw] grid w-full max-w-6xl gap-8 px-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Map It. Report It. Clean It. Empowering the citizens of Bhimavaram to build a
              cleaner, greener community through real-time waste reporting.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#report"
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
              >
                Report a Waste Issue
              </a>
              <a
                href="#map"
                className="rounded-full border border-border px-7 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                View Live Map
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="depth-card rounded-2xl px-5 py-4 text-center">
                <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <Section id="why" eyebrow="Why CityClean?" title="Solving the waste crisis through community data.">
        <div className="scene grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <article key={p.title} className="depth-card rounded-3xl p-6">
              <span className="text-3xl">{p.icon}</span>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* MAP */}
      <Section
        id="map"
        eyebrow="Live Waste Hotspot Map"
        title="Real-time community reports from across Bhimavaram."
      >
        <ClientOnly
          fallback={
            <div className="glass-panel h-[520px] animate-pulse rounded-3xl" aria-hidden />
          }
        >
          <Suspense
            fallback={<div className="glass-panel h-[520px] animate-pulse rounded-3xl" aria-hidden />}
          >
            <MapPanel />
          </Suspense>
        </ClientOnly>
      </Section>

      {/* REPORT */}
      <Section id="report" eyebrow="Report a Waste Issue" title="Found a hotspot? Fill the form to pin it on the map.">
        <form onSubmit={onSubmit} className="glass-panel grid gap-5 rounded-3xl p-6 sm:p-9 md:grid-cols-2">
          <Field label="Your Name">
            <input required className={inputCls} placeholder="Ravi Kumar" />
          </Field>
          <Field label="Contact Info">
            <input required className={inputCls} placeholder="Phone or email" />
          </Field>
          <Field label="Specific Location">
            <input required className={inputCls} placeholder="Prakasam Chowk, Bhimavaram" />
          </Field>
          <Field label="Type of Waste">
            <select className={inputCls} defaultValue="Overflowing Bin">
              <option>Overflowing Bin</option>
              <option>Illegal Dump Site</option>
              <option>Hazardous Waste</option>
              <option>Uncollected Garbage</option>
            </select>
          </Field>
          <Field label="Severity Level">
            <div className="flex gap-2">
              {(["Moderate", "Critical"] as const).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSeverity(s)}
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                    severity === s
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Short Description" className="md:col-span-2">
            <textarea rows={3} className={inputCls} placeholder="Describe what you saw..." />
          </Field>
          <div className="md:col-span-2 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Submit &amp; Map Report
            </button>
            {submitted && (
              <p className="rise text-sm text-primary">✅ Report added to the live map!</p>
            )}
          </div>
        </form>
      </Section>

      {/* RECYCLE */}
      <Section id="recycle" eyebrow="Recycle Right" title="Know your bins. Save the planet.">
        <div className="scene grid gap-5 md:grid-cols-3">
          {recyclables.map((r) => (
            <article key={r.title} className="depth-card rounded-3xl p-6">
              <span className="text-3xl">{r.icon}</span>
              <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            </article>
          ))}
        </div>
        <div className="glass-panel mt-5 rounded-3xl p-6">
          <h4 className="text-sm font-semibold tracking-widest uppercase">Color Coding Standard</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            🟢 Green: Wet/Organic &nbsp;|&nbsp; 🔵 Blue: Dry/Recyclable &nbsp;|&nbsp; 🔴 Red:
            Hazardous
          </p>
        </div>
      </Section>

      {/* EVENTS */}
      <Section id="events" eyebrow="Clean-Up Drives" title="Join local volunteers in Bhimavaram.">
        <div className="scene grid gap-5 md:grid-cols-2">
          {events.map((e) => (
            <article key={e.title} className="depth-card flex flex-col gap-3 rounded-3xl p-7">
              <p className="text-xs tracking-widest text-primary uppercase">{e.date}</p>
              <h3 className="text-xl font-semibold">{e.title}</h3>
              <p className="text-sm text-muted-foreground">{e.body}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(e.joined / e.capacity) * 100}%` }}
                />
              </div>
              <button className="mt-2 self-start rounded-full border border-border px-6 py-2 text-sm transition-colors hover:border-primary hover:text-primary">
                Join ({e.joined}/{e.capacity})
              </button>
            </article>
          ))}
        </div>
      </Section>

      {/* IMPACT */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="glass-panel grid gap-8 rounded-[2rem] px-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((i) => (
            <div key={i.label} className="text-center">
              <p className="font-display text-4xl font-bold text-primary">
                <Counter target={i.value} />
              </p>
              <p className="mt-2 text-xs tracking-widest text-muted-foreground uppercase">
                {i.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 text-center text-xs tracking-widest text-muted-foreground uppercase">
        CityCleanMap · Bhimavaram · Map It. Report It. Clean It.
      </footer>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <header className="mb-10 max-w-2xl">
        <h2 className="font-display text-3xl font-bold sm:text-5xl">{eyebrow}</h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">{title}</p>
      </header>
      {children}
    </section>
  );
}
