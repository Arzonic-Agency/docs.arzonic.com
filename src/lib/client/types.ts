// lib/docs/types.ts
export type DocBlockKind =
  | "article"
  | "link"
  | "rich_text"
  | "callout"
  | "image"
  | "code"
  | "faq"
  | "steps"
  | "embed"
  | "card"
  | "list";

export type DocBlock = {
  id: string;
  kind: DocBlockKind;
  title?: string | null;
  props: any; // content_json fra DB
  order_index: number;
};

export type DocSection = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  order_index: number;
  blocks: DocBlock[];
};

export type DocTopic = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  sections: DocSection[];
};
