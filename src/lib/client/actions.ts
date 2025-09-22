"use server";

import { createServerClientInstance } from "@/utils/supabase/server";

import { DocBlock, DocSection, type DocTopic } from "./types";

export async function getAllCases(page: number = 1, limit: number = 3) {
  const supabase = await createServerClientInstance();
  const offset = (page - 1) * limit;

  try {
    const { data, count, error } = await supabase
      .from("cases")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Failed to fetch cases: ${error.message}`);
    }

    return { cases: data, total: count || 0 };
  } catch (err) {
    console.error("Unexpected error during fetching cases:", err);
    throw err;
  }
}

export async function fetchSectionsBySlugs(
  topicSlug: string,
  slugs: string[]
): Promise<Record<string, DocSection>> {
  const supabase = await createServerClientInstance();

  console.log("🔍 Søger efter topic med slug:", topicSlug);
  console.log("🔍 Søger efter sections med slugs:", slugs);

  // Find topic
  const { data: topic, error: topicError } = await supabase
    .from("doc_topics")
    .select("id")
    .eq("slug", topicSlug)
    .maybeSingle();

  console.log("📊 Topic result:", topic);
  if (topicError) console.error("❌ Topic error:", topicError);

  if (!topic) {
    console.log("❌ Ingen topic fundet med slug:", topicSlug);
    return {};
  }

  // Find sektioner
  const { data: sections, error: sectionsError } = await supabase
    .from("doc_sections")
    .select("id, title, slug, description, order_index")
    .eq("topic_id", topic.id)
    .then((response) => {
      // Hvis slugs array er tomt, hent alle sections for topic
      if (slugs.length === 0) {
        return response;
      }
      // Ellers filtrer efter slugs
      return {
        ...response,
        data:
          response.data?.filter((section) => slugs.includes(section.slug!)) ||
          null,
      };
    });

  console.log("📊 Sections result:", sections);
  if (sectionsError) console.error("❌ Sections error:", sectionsError);

  if (!sections) {
    console.log("❌ Ingen sections fundet");
    return {};
  }

  // Find items (indholdet i hver section) - hent alle felter
  const { data: items, error: itemsError } = await supabase
    .from("doc_items")
    .select(
      "id, section_id, type, title, content_json, content_md, excerpt, external_url, order_index, status"
    )
    .eq("status", "published")
    .in(
      "section_id",
      sections.map((s) => s.id)
    )
    .order("order_index", { ascending: true });

  console.log("📊 Items result:", items);
  if (itemsError) console.error("❌ Items error:", itemsError);

  // Map items ind i sektioner som "blocks"
  const bySection: Record<string, DocBlock[]> = {};
  (items ?? []).forEach((item) => {
    if (!bySection[item.section_id]) bySection[item.section_id] = [];

    // Byg props object fra forskellige felter
    const props: any = {};

    // Hvis der er content_json, brug det som base
    if (item.content_json && typeof item.content_json === "object") {
      Object.assign(props, item.content_json);
    }

    // Tilføj andre felter til props (disse kan overskrive content_json)
    if (item.content_md) props.content = item.content_md;
    if (item.excerpt) props.excerpt = item.excerpt;
    if (item.external_url) props.external_url = item.external_url;

    bySection[item.section_id].push({
      id: item.id,
      kind: item.type as any, // 'article', 'link', etc.
      title: item.title,
      props: props,
      order_index: item.order_index,
    });
  });

  const result: Record<string, DocSection> = {};
  sections.forEach((s) => {
    result[s.slug!] = {
      ...s,
      blocks: bySection[s.id] ?? [],
    };
  });

  console.log("✅ Final result:", result);
  return result;
}
