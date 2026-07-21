export const SPIRITUAL_IMAGE_BASE = `${
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api"
}/uploads/spiritual/`;

export const SPIRITUAL_TYPE_META = {
  mantra: {
    label: "Mantra",
    emoji: "🕉",
    color: "from-amber-500 to-orange-600",
    accent: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  aarti: {
    label: "Aarti",
    emoji: "🙏",
    color: "from-rose-500 to-red-600",
    accent: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  chalisa: {
    label: "Chalisa",
    emoji: "📖",
    color: "from-violet-500 to-purple-600",
    accent: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  sunRise: {
    label: "Sun Rise",
    emoji: "🌞",
    color: "from-yellow-400 to-orange-500",
    accent: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  moonRise: {
    label: "Moon Rise",
    emoji: "🌙",
    color: "from-indigo-400 to-blue-600",
    accent: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
};

export const slugifyCategory = (text) =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0900-\u097f]+/gi, "-")
    .replace(/^-+|-+$/g, "") || "general";

export const getCategoryLink = (typeId, category) => {
  if (category.items?.length === 1) {
    return `/spiritual/${typeId}/${category.items[0].id}`;
  }
  return `/spiritual/${typeId}/category/${slugifyCategory(category.name)}`;
};
