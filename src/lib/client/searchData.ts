export const sections = [
  {
    id: "introduction",
    label: "Introduktion",
    items: [
      { id: "intro", label: "Kom godt i gang" },
      { id: "flow", label: "Sådan fungerer det" },
    ],
  },
  {
    id: "news",
    label: "Nyhedsopslag",
    items: [
      { id: "create", label: "Opret opslag" },
      { id: "upload", label: "Upload billeder/video" },
    ],
  },
  {
    id: "support",
    label: "Support og kontakt",
    items: [
      { id: "contact", label: "Kontakt os" },
      { id: "faq", label: "FAQ / Hjælp" },
    ],
  },
  {
    id: "users",
    label: "Brugerhåndtering",
    items: [
      { id: "manage", label: "Brugeradministration" },
      { id: "roles", label: "Roller og tilladelser" },
    ],
  },
];

export type Section = (typeof sections)[number];
export type SectionItem = Section["items"][number];
