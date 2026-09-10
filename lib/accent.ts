import { Accent } from "@/data/gifts";

export const accentClasses: Record<Accent, { ring: string; text: string; bg: string }> = {
  amber: { ring: "group-hover:border-amber/50", text: "text-amber", bg: "bg-amber/10" },
  moss: { ring: "group-hover:border-moss/50", text: "text-moss", bg: "bg-moss/10" },
  blush: { ring: "group-hover:border-blush/50", text: "text-blush", bg: "bg-blush/10" },
  mist: { ring: "group-hover:border-mist/50", text: "text-mist", bg: "bg-mist/10" },
};
