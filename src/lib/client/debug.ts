import { createServerClientInstance } from "@/utils/supabase/server";

export async function debugDatabase() {
  const supabase = await createServerClientInstance();

  console.log("=== DEBUG DATABASE ===");

  // Check alle topics
  const { data: topics } = await supabase
    .from("doc_topics")
    .select("id, title, slug")
    .limit(10);

  console.log("📚 Alle topics:", topics);

  // Find introduction topic
  const introTopic = topics?.find((t) => t.slug === "introduction");
  if (introTopic) {
    console.log("🎯 Found introduction topic:", introTopic);

    // Check sections under introduction topic
    const { data: introSections } = await supabase
      .from("doc_sections")
      .select("id, title, slug, topic_id")
      .eq("topic_id", introTopic.id);

    console.log("📑 Sections under introduction:", introSections);
  }

  // Check alle sections
  const { data: sections } = await supabase
    .from("doc_sections")
    .select("id, title, slug, topic_id")
    .limit(10);

  console.log("📑 Alle sections:", sections);

  // Check alle items
  const { data: items } = await supabase
    .from("doc_items")
    .select("id, title, type, section_id, status")
    .limit(10);

  console.log("📝 Alle items:", items);

  return { topics, sections, items };
}
