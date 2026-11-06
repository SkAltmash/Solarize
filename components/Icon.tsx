const icons = {
  home: "M3 11.5 12 4l9 7.5M5 10v10h14V10M9 20v-6h6v6",
  factory: "M3 21V10l6 4V10l6 4V6l6 3v12H3Zm4-4h2m4 0h2",
  drop: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Zm-2.5 11a2.5 2.5 0 0 0 2.5 2.5",
  battery: "M7 6h10v15H7zM10 3h4v3M10 13l2-3v3h2l-2 3v-3",
  file: "M14 3H6v18h12V7l-4-4Zm0 0v4h4M9 12h6M9 16h6",
  wrench: "M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8M6.3 14.7l-3 3 3 3 3-3",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2-1.4-1.4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  check: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4",
  insta: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  leaf: "M5 19c0-8 5-14 15-15-1 10-7 15-15 15Zm0 0 7-7",
};

export type IconName = keyof typeof icons;

export default function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={icons[name]} />
    </svg>
  );
}
