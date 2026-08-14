export type Severity = "critical" | "moderate" | "resolved";

export type Report = {
  id: number;
  title: string;
  area: string;
  lat: number;
  lng: number;
  severity: Severity;
  type: string;
};

export const BHIMAVARAM: [number, number] = [16.5449, 81.5212];

export const reports: Report[] = [
  { id: 1, title: "Overflowing bin at bus stand", area: "Prakasam Chowk", lat: 16.5452, lng: 81.5216, severity: "critical", type: "Overflowing Bin" },
  { id: 2, title: "Plastic dumped near canal", area: "Canal Road", lat: 16.5497, lng: 81.5158, severity: "critical", type: "Illegal Dump Site" },
  { id: 3, title: "Uncollected garbage pile", area: "Juvvalapalem Road", lat: 16.5388, lng: 81.5271, severity: "moderate", type: "Uncollected Garbage" },
  { id: 4, title: "Construction debris on footpath", area: "Vundrajavaram Road", lat: 16.5531, lng: 81.5304, severity: "moderate", type: "Illegal Dump Site" },
  { id: 5, title: "Medical waste bags", area: "Hospital Street", lat: 16.5416, lng: 81.5139, severity: "critical", type: "Hazardous Waste" },
  { id: 6, title: "Market waste cleared", area: "Gandhi Market", lat: 16.5471, lng: 81.5243, severity: "resolved", type: "Uncollected Garbage" },
  { id: 7, title: "Bin restored after cleanup", area: "College Road", lat: 16.5362, lng: 81.5187, severity: "resolved", type: "Overflowing Bin" },
  { id: 8, title: "Roadside dumping spot", area: "Pedatadepalli", lat: 16.5559, lng: 81.5211, severity: "moderate", type: "Illegal Dump Site" },
  { id: 9, title: "Drain blocked with plastic", area: "Kovvada Road", lat: 16.5405, lng: 81.5325, severity: "moderate", type: "Uncollected Garbage" },
  { id: 10, title: "Street corner cleaned", area: "Rice Mill Area", lat: 16.5512, lng: 81.5099, severity: "resolved", type: "Overflowing Bin" },
];

export const stats = [
  { value: "2,340", label: "Reports" },
  { value: "87", label: "Resolved" },
  { value: "142", label: "Events" },
  { value: "5,200+", label: "Citizens" },
];

export const problems = [
  { icon: "🗑️", title: "Public Waste", body: "Identify uncollected garbage in public spaces before it becomes a health hazard." },
  { icon: "🚯", title: "Illegal Dumping", body: "Pinpoint exact coordinates of illegal disposal sites for municipal action." },
  { icon: "❌", title: "Reporting Gaps", body: "No more long waits on phone lines. Report issues in under 60 seconds." },
  { icon: "📊", title: "Smart Data", body: "Help authorities optimize pickup routes based on real community needs." },
];

export const recyclables = [
  { icon: "📄", title: "Paper", body: "Clean cardboard, office paper, and newsprint." },
  { icon: "🧴", title: "Plastic", body: "HDPE bottles and PET containers (rinsed)." },
  { icon: "🍎", title: "Organic", body: "Food scraps and garden waste for composting." },
];

export const events = [
  { date: "March 28, 2025", title: "Prakasam Chowk Sweep", body: "Community cleaning drive at the main junction.", joined: 24, capacity: 30 },
  { date: "April 05, 2025", title: "Canal Road Clean", body: "Removing plastic from the canal periphery.", joined: 12, capacity: 30 },
];

export const impact = [
  { value: 2340, label: "Reports" },
  { value: 1870, label: "Resolved" },
  { value: 64, label: "Tons Collected" },
  { value: 5200, label: "Volunteers" },
];