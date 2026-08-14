import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { BHIMAVARAM, reports, type Severity } from "@/data/city";

const filters: { key: Severity | "all"; label: string }[] = [
  { key: "all", label: "All Reports" },
  { key: "critical", label: "Critical" },
  { key: "moderate", label: "Moderate" },
  { key: "resolved", label: "Resolved" },
];

const dotColor: Record<Severity, string> = {
  critical: "oklch(0.64 0.21 25)",
  moderate: "oklch(0.82 0.17 85)",
  resolved: "oklch(0.86 0.196 140)",
};

export default function MapPanel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const [leaflet, setLeaflet] = useState<any>(null);
  const [active, setActive] = useState<Severity | "all">("all");

  const visible = reports.filter((r) => active === "all" || r.severity === active);

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((mod) => {
      if (cancelled) return;
      const L = mod.default ?? mod;
      if (!containerRef.current || mapRef.current) {
        setLeaflet(L);
        return;
      }
      const map = L.map(containerRef.current, {
        center: BHIMAVARAM,
        zoom: 14,
        scrollWheelZoom: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setLeaflet(L);
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const L = leaflet;
    if (!L || !layerRef.current) return;
    layerRef.current.clearLayers();
    visible.forEach((r) => {
      L.circleMarker([r.lat, r.lng], {
        radius: 9,
        color: dotColor[r.severity],
        weight: 2,
        fillColor: dotColor[r.severity],
        fillOpacity: 0.45,
      })
        .bindPopup(
          `<strong>${r.title}</strong><br/>${r.area} &middot; ${r.type}<br/><em>${r.severity}</em>`,
        )
        .addTo(layerRef.current);
    });
  }, [leaflet, active]);

  return (
    <div className="glass-panel overflow-hidden rounded-3xl p-3 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors ${
                active === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Showing: {visible.length} Reports in Bhimavaram
        </p>
      </div>

      <div
        ref={containerRef}
        className="h-[420px] w-full overflow-hidden rounded-2xl border border-border sm:h-[520px]"
      />

      <div className="mt-4 flex flex-wrap gap-5 text-xs text-muted-foreground">
        {(["critical", "moderate", "resolved"] as Severity[]).map((s) => (
          <span key={s} className="flex items-center gap-2 capitalize">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: dotColor[s] }}
            />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}