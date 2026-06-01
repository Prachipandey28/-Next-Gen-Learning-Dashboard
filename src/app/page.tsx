import React, { Suspense } from "react";
import { getCourses } from "@/lib/supabase";
import DashboardShell from "@/components/DashboardShell";
import SkeletonLoader from "@/components/SkeletonLoader";

// Tell Next.js to dynamically render this page (RSC streaming)
export const dynamic = "force-dynamic";

async function AsyncDashboard() {
  // Fetch courses from Supabase or the high-fidelity demo fallback server-side
  const { data: courses, isDemo, error } = await getCourses();

  return (
    <DashboardShell 
      courses={courses} 
      isDemo={isDemo} 
      error={error} 
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <AsyncDashboard />
    </Suspense>
  );
}
