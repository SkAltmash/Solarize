// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE CONTENT — every number, name, review, address and certification in this
// file is placeholder data for the demo. Replace with real details before launch.
// Photos are from Unsplash (free licence) and are not Solarize installations.
// ─────────────────────────────────────────────────────────────────────────────
import type { StaticImageData } from "next/image";
import homeRooftop from "@/public/images/home-rooftop.jpg";
import installerRoof from "@/public/images/installer-roof.jpg";
import hospitalRooftop from "@/public/images/hospital-rooftop.jpg";
import campusPlant from "@/public/images/campus-plant.jpg";
import industrialGround from "@/public/images/industrial-ground.jpg";
import farmArray from "@/public/images/farm-array.jpg";
import coldStorage from "@/public/images/cold-storage.jpg";
import societyArray from "@/public/images/society-array.jpg";
import utilityPlant from "@/public/images/utility-plant.jpg";
import dairyFarm from "@/public/images/dairy-farm.jpg";
import panelCloseup from "@/public/images/panel-closeup.jpg";
import installerHands from "@/public/images/installer-hands.jpg";
import fieldPanels from "@/public/images/field-panels.jpg";
import adani from "@/public/partners/adani.png";
import polycab from "@/public/partners/polycab.png";
import tata from "@/public/partners/tata.png";
import utl from "@/public/partners/utl.png";
import vguard from "@/public/partners/vguard.png";
import waaree from "@/public/partners/waaree.png";
// Stock portraits (Unsplash licence) — models, not real customers or staff.
import rajeshPhoto from "@/public/people/rajesh.jpg";
import anjaliPhoto from "@/public/people/anjali.jpg";
import sunilPhoto from "@/public/people/sunil.jpg";
import priyaPhoto from "@/public/people/priya.jpg";
import vikasPhoto from "@/public/people/vikas.jpg";
import meenaPhoto from "@/public/people/meena.jpg";
import adityaPhoto from "@/public/people/aditya.jpg";
import snehaPhoto from "@/public/people/sneha.jpg";
import rohitPhoto from "@/public/people/rohit.jpg";
import kavitaPhoto from "@/public/people/kavita.jpg";

export const images = { panelCloseup, installerHands, fieldPanels, installerRoof, campusPlant };

export const company = {
  founded: 2016,
  address: "2nd Floor, Shree Complex, West High Court Road, Dharampeth, Nagpur 440010",
  mapQuery: "Dharampeth, Nagpur, Maharashtra",
  phoneDisplay: "+91 90000 00000",
  email: "hello@solarizeenergy.in",
  hours: "Mon – Sat, 9:30 AM – 7:00 PM",
  googleRating: 4.9,
  googleReviews: 312,
};

export const companyStats = [
  { to: 1250, suffix: "+", label: "Rooftops installed" },
  { to: 8.5, decimals: 1, suffix: " MW", label: "Solar capacity commissioned" },
  { to: 10, suffix: " yrs", label: "Serving Vidarbha since 2016" },
  { to: 4.9, decimals: 1, suffix: "★", label: "Google rating, 300+ reviews" },
];

export type ProjectCategory = "Residential" | "Commercial" | "Industrial" | "Agriculture";

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  size: string;
  savings: string;
  year: number;
  image: StaticImageData;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "dharampeth-bungalow",
    title: "Independent bungalow",
    location: "Dharampeth, Nagpur",
    category: "Residential",
    size: "5 kW",
    savings: "₹4,800 / month",
    year: 2025,
    image: homeRooftop,
    summary: "On-grid system with PM Surya Ghar subsidy. Bill dropped from ₹5,200 to under ₹400 a month.",
  },
  {
    slug: "kp-hospital",
    title: "Multi-speciality hospital",
    location: "Sitabuldi, Nagpur",
    category: "Commercial",
    size: "80 kW",
    savings: "₹78,000 / month",
    year: 2024,
    image: hospitalRooftop,
    summary: "Rooftop plant designed around HVAC units and lift rooms, commissioned without any downtime.",
  },
  {
    slug: "hingna-campus",
    title: "Engineering college campus",
    location: "Hingna, Nagpur",
    category: "Commercial",
    size: "150 kW",
    savings: "₹1.4 lakh / month",
    year: 2024,
    image: campusPlant,
    summary: "Four-building campus array with a live generation dashboard used in student labs.",
  },
  {
    slug: "butibori-agro",
    title: "Agro processing unit",
    location: "MIDC Butibori",
    category: "Industrial",
    size: "250 kW",
    savings: "₹2.3 lakh / month",
    year: 2023,
    image: industrialGround,
    summary: "Ground-mount plant on unused land, offsetting 70% of daytime process load.",
  },
  {
    slug: "katol-farm",
    title: "Orange orchard pumps",
    location: "Katol, Nagpur district",
    category: "Agriculture",
    size: "7.5 HP pump",
    savings: "₹9,000 / month diesel",
    year: 2025,
    image: farmArray,
    summary: "Solar submersible pump under PM-KUSUM, irrigating 12 acres with zero diesel.",
  },
  {
    slug: "kalmeshwar-cold-storage",
    title: "Cold storage facility",
    location: "Kalmeshwar",
    category: "Industrial",
    size: "60 kW",
    savings: "₹55,000 / month",
    year: 2023,
    image: coldStorage,
    summary: "Shed-mounted array sized to the compressor load profile for maximum self-consumption.",
  },
  {
    slug: "wardha-road-society",
    title: "Housing society common areas",
    location: "Wardha Road, Nagpur",
    category: "Residential",
    size: "40 kW",
    savings: "₹36,000 / month",
    year: 2025,
    image: societyArray,
    summary: "Lifts, pumps and corridor lighting for 96 flats now run on rooftop solar.",
  },
  {
    slug: "umred-plant",
    title: "Captive ground-mount plant",
    location: "Umred",
    category: "Industrial",
    size: "500 kW",
    savings: "₹4.6 lakh / month",
    year: 2026,
    image: utilityPlant,
    summary: "Our largest single-site plant: seasonal-tilt structures with remote SCADA monitoring.",
  },
  {
    slug: "saoner-dairy",
    title: "Dairy farm hybrid system",
    location: "Saoner",
    category: "Agriculture",
    size: "10 kW hybrid",
    savings: "₹8,200 / month",
    year: 2024,
    image: dairyFarm,
    summary: "Hybrid inverter with battery backup keeps milk chillers running through outages.",
  },
  {
    slug: "manish-nagar-home",
    title: "Row house rooftop",
    location: "Manish Nagar, Nagpur",
    category: "Residential",
    size: "3 kW",
    savings: "₹2,700 / month",
    year: 2026,
    image: installerRoof,
    summary: "Installed in a single day, net meter live in three weeks, full ₹78,000 subsidy received.",
  },
];

export const testimonials = [
  {
    name: "Rajesh Deshmukh",
    photo: rajeshPhoto,
    place: "Dharampeth",
    system: "5 kW home",
    quote:
      "From the survey to the net meter, Solarize handled everything. Our bill went from ₹5,000 to almost nothing and the subsidy came straight to our account.",
  },
  {
    name: "Dr. Anjali Khare",
    photo: anjaliPhoto,
    place: "Sitabuldi",
    system: "80 kW hospital",
    quote:
      "A hospital cannot afford downtime. Their team planned the installation around our operations and the plant has run flawlessly for two years.",
  },
  {
    name: "Sunil Bawankule",
    photo: sunilPhoto,
    place: "Katol",
    system: "7.5 HP solar pump",
    quote: "No more diesel bills or waiting for power at night. The pump runs all day on sunlight and my orchard has never looked better.",
  },
  {
    name: "Priya & Amit Joshi",
    photo: priyaPhoto,
    place: "Manish Nagar",
    system: "3 kW home",
    quote: "Very transparent pricing. They showed us exactly how much we would save and the numbers have matched month after month.",
  },
  {
    name: "Vikas Agrawal",
    photo: vikasPhoto,
    place: "MIDC Butibori",
    system: "250 kW plant",
    quote: "Professional engineering and clean execution. Payback is tracking ahead of what they promised in the proposal.",
  },
  {
    name: "Meena Thakre",
    photo: meenaPhoto,
    place: "Wardha Road",
    system: "40 kW society",
    quote: "Our society maintenance charges dropped noticeably. The committee loved the clear monthly generation reports.",
  },
];

export const partners = [
  { name: "Waaree", logo: waaree },
  { name: "Adani Solar", logo: adani },
  { name: "Tata Power Solar", logo: tata },
  { name: "Polycab Solar", logo: polycab },
  { name: "V-Guard", logo: vguard },
  { name: "UTL Solar", logo: utl },
];

export const certifications = [
  { title: "PM Surya Ghar registered vendor", text: "Authorised to install subsidy-eligible residential systems." },
  { title: "MSEDCL empanelled", text: "Net-metering applications filed and tracked by our team." },
  { title: "ISO 9001:2015", text: "Documented quality processes from survey to commissioning." },
  { title: "ALMM-listed modules only", text: "Every panel we install is on the government-approved list." },
];

export const guarantees = [
  { title: "25-year performance warranty", text: "On every panel, backed by the manufacturer." },
  { title: "5-year workmanship warranty", text: "Our own guarantee on structure, wiring and installation." },
  { title: "48-hour service response", text: "A technician at your site within two working days." },
  { title: "Free first-year maintenance", text: "Quarterly cleaning and health checks included." },
];

export const serviceAreas = {
  city: [
    "Dharampeth",
    "Civil Lines",
    "Manish Nagar",
    "Pratap Nagar",
    "Wardha Road",
    "Hingna",
    "Koradi Road",
    "Besa",
    "Trimurti Nagar",
    "Sadar",
  ],
  districts: ["Nagpur", "Wardha", "Chandrapur", "Bhandara", "Gondia", "Amravati", "Yavatmal"],
};

export const timeline = [
  { year: 2016, title: "Founded in Nagpur", text: "Started with a two-person team installing small home systems in Dharampeth." },
  { year: 2018, title: "100 homes powered", text: "Word of mouth carried us across the city. Opened our first office." },
  { year: 2020, title: "Commercial division", text: "First 100 kW plant for a city hospital. Team grows to 15." },
  { year: 2022, title: "Agriculture & pumps", text: "Started solar pump installations for farmers across Vidarbha." },
  { year: 2024, title: "PM Surya Ghar vendor", text: "Registered vendor for the national rooftop subsidy scheme." },
  { year: 2026, title: "8.5 MW and counting", text: "1,250+ installations, 35 people, one mission: clean power for every roof." },
];

export const team = [
  { name: "Aditya Wankhede", photo: adityaPhoto, role: "Founder & CEO", bio: "Electrical engineer, 12 years in renewable energy." },
  { name: "Sneha Patil", photo: snehaPhoto, role: "Head of Design", bio: "Designs every system for maximum yield and safety." },
  { name: "Rohit Meshram", photo: rohitPhoto, role: "Projects Lead", bio: "Has led over 600 installations across Vidarbha." },
  { name: "Kavita Ingle", photo: kavitaPhoto, role: "Customer Success", bio: "Makes sure subsidy and net metering go smoothly." },
];

export const values = [
  { title: "Honest numbers", text: "We quote what your roof can really produce. No inflated savings." },
  { title: "Quality first", text: "Tier-1 panels, branded inverters and hot-dip galvanised structures only." },
  { title: "Local and accountable", text: "Our engineers live here. When you call, we come." },
];
