import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

// Local mock data fallback with design tokens
export const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Advanced React Patterns & Architecture",
    progress: 78,
    icon_name: "Atom",
    created_at: new Date().toISOString(),
  },
  {
    id: "course-2",
    title: "Data Structures, Algorithms & Systems",
    progress: 45,
    icon_name: "Cpu",
    created_at: new Date().toISOString(),
  },
  {
    id: "course-3",
    title: "Futuristic Tailwind, Meshes & SVG Canvas",
    progress: 92,
    icon_name: "Palette",
    created_at: new Date().toISOString(),
  },
  {
    id: "course-4",
    title: "Modern Backend & Realtime Supabase",
    progress: 60,
    icon_name: "Database",
    created_at: new Date().toISOString(),
  },
];

// Read server-only environment variables (prevents exposure to browser bundle)
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export async function getCourses(): Promise<{ data: Course[]; isDemo: boolean; error: string | null }> {
  // Simulate network delay to appreciate skeleton loading animations only in development mode
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  if (!isSupabaseConfigured) {
    console.log("\x1b[33m%s\x1b[0m", "⚠️  Supabase environment keys are missing. Running in DEMO MODE with mock data.");
    return {
      data: MOCK_COURSES,
      isDemo: true,
      error: null,
    };
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Can be ignored if handled by middleware session refreshes
          }
        },
      },
    });

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("❌ Supabase DB fetch error:", error);
      return {
        data: MOCK_COURSES,
        isDemo: true,
        error: `Supabase query failed: ${error.message}. Loaded sandbox fallback instead.`,
      };
    }

    if (!data || data.length === 0) {
      console.log("⚠️ Supabase 'courses' table is empty. Returning mock fallback.");
      return {
        data: MOCK_COURSES,
        isDemo: true,
        error: "Supabase table is empty. Displaying demo rows.",
      };
    }

    return {
      data: data as Course[],
      isDemo: false,
      error: null,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("❌ Exception during Supabase fetch:", err);
    return {
      data: MOCK_COURSES,
      isDemo: true,
      error: `Connection exception: ${errMsg}. Loaded sandbox fallback instead.`,
    };
  }
}
