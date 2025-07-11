"use server";

import { createClient } from "@/utils/supabase/client";

export async function getAllCases(page: number = 1, limit: number = 3) {
  const supabase = createClient();
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

// ─────────────────────────────────────────────────────────────────────────────
// JOBS
// ─────────────────────────────────────────────────────────────────────────────
