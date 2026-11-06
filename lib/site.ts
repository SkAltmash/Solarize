// Single place to edit business details. Fill in `phone` / `email` to enable
// the call, WhatsApp and email buttons across the site.
export const site = {
  name: "Solarize Energy",
  tagline: "Clean Energy. Brighter Future.",
  description:
    "Powering a sustainable future with clean, affordable solar energy. Rooftop solar, commercial plants and solar pumps in Nagpur.",
  city: "Nagpur, Maharashtra",
  instagram: "https://www.instagram.com/solarize_energy_/",
  instagramDm: "https://ig.me/m/solarize_energy_",
  threads: "https://www.threads.net/@solarize_energy_",
  phone: "+919000000000", // SAMPLE — replace with the real number
  email: "hello@solarizeenergy.in", // SAMPLE
};

export const whatsappLink = (text: string) =>
  site.phone
    ? `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`
    : null;
