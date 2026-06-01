import React, { Suspense } from "react";
import { getCourses } from "@/lib/supabase";
import DashboardShell from "@/components/DashboardShell";
import SkeletonLoader from "@/components/SkeletonLoader";

/**
 * Force-dynamic ensures Next.js does not pre-render the page statically.
 * This is crucial for retrieving live PostgreSQL rows from Supabase server-side on every request
 * and allowing the React Server Component (RSC) streaming model to work dynamically.
 */
export const dynamic = "force-dynamic";

/**
 * Server Component that securely retrieves courses from the Supabase database.
 * The connection keys are read strictly server-side and are never exposed to the client-side bundle,
 * satisfying strict client/server isolation constraints.
 */
async function AsyncDashboard() {
  // Fetch courses from Supabase with high-fidelity local sandbox fallback
  const { data: courses, isDemo, error } = await getCourses();

  return (
    <DashboardShell 
      courses={courses} 
      isDemo={isDemo} 
      error={error} 
    />
  );
}

/**
 * Page Root Component.
 * Implements a React Suspense boundary to support modern Next.js streaming.
 * The SkeletonLoader mirrors the visual structural shell of the Sidebar and BentoGrid,
 * preventing Cumulative Layout Shift (CLS) when the database query completes.
 */
export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <AsyncDashboard />
    </Suspense>
  );
}
