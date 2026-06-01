# Aetheria - Next-Gen Student Learning Dashboard

A futuristic, highly animated, and fully responsive student performance and adaptive learning dashboard built using **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Supabase**.

---

## 🛠️ Architectural Choices & Tech Stack

Our stack is strictly selected to satisfy constraints and deliver a premium, hardware-accelerated user experience:
1. **Framework: Next.js (App Router)** — Leveraging Server Components for optimal server-side data loading, combined with React Suspense for smooth, modern streaming load layouts.
2. **Database: Supabase (PostgreSQL)** — Direct, robust integration using `@supabase/ssr` to connect securely from the server.
3. **Styling: Tailwind CSS (v4)** — Embracing the cutting-edge Tailwind CSS v4 pipeline. Theme definitions, keyframes, and animations are managed directly inside `src/app/globals.css` via custom `@theme` variables.
4. **Animations: Framer Motion (Strict Constraint)** — Used for staggered page entries, spring-physics hover interactions, and smooth tab slide micro-interactions.
5. **Icons: Lucide React** — Standard visual icons mapped dynamically based on database course titles.

---

## ⚡ Server/Client Component Split Rationale

To secure credentials and prevent browser performance issues, the application strictly isolates server and client logic:

### Server Components (RSC)
* **`src/app/page.tsx` & `src/lib/supabase.ts`**: The database queries to Supabase are executed entirely server-side inside `getCourses()`. This allows us to connect securely using server-only variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) which never expose database keys or configuration parameters to the client-side JavaScript bundle.
* **React Suspense Boundary**: The root page uses an async component wrapped in `<Suspense fallback={<SkeletonLoader />}>`. This enables Next.js to stream the page frame and load the pulsing skeleton immediately before the server completes the database query.

### Client Components
* **`Sidebar.tsx`**: Manages interactive states (manually collapsing on desktop, auto-collapsing on tablet, and sliding highlights using Framer Motion `layoutId`).
* **`DashboardShell.tsx`**: Orchestrates client-side state for tab switching, profile preference inputs, and simulation triggers.
* **`CourseTile.tsx`, `HeroTile.tsx`, `ActivityTile.tsx`**: Coordinate rich browser animations, local clock timers, dynamic progress bars animating from 0% on mount, and spring-physics boundary hover scaling.

---

## 💎 Zero Layout Shift (CLS) & Performance

We enforce strict GPU hardware-accelerated animations using `transform` (scale, translate) and `opacity` exclusively:
* **Staggered Entries**: Staggered cards fade and slide up sequentially on mount without causing adjacent grid element reflows.
* **Spring Hover Physics**: Scale increases smoothly by `~1.8%` on hover using spring physics (`stiffness: 300`, `damping: 20`) which ensures a natural, non-linear animation curve.
* **Framer Motion spring border glows**: Glow shadows are calculated and injected via Framer Motion's `whileHover` prop directly into the canvas boundary border, eliminating raw CSS paint repaints.

---

## 🚧 Challenges Faced & Resolutions

1. **Upper-Case Directory Naming Constraints**: 
   * *Problem*: The root workspace folder (`FRONTENED`) contains capital letters. Initializing Next.js in `./` failed because npm package names restrict upper-case characters.
   * *Resolution*: Created the initial template inside a lowercase subdirectory (`learning-dashboard`) first, then safely migrated all hidden and standard configuration files to the root level.
2. **Framer Motion TS Type Declarations**:
   * *Problem*: When using standard variants, TypeScript threw errors because the variant string literal `"spring"` was inferred as a generic `string` type, causing type mismatch inside Next.js production builds.
   * *Resolution*: Imported and typed layout variables explicitly using `Variants` from `framer-motion` to satisfy compiler safety.
3. **Responsive Tablet Collapse Breaks**:
   * *Problem*: The tablet view layout required the sidebar to auto-collapse to icon-only view between `768px` and `1024px` breakpoint. Manually toggling or writing custom CSS media selectors interfered with isCollapsed states.
   * *Resolution*: Implemented a clean, modern react `useEffect` listener inside the sidebar using `window.matchMedia` that automatically toggles the collapse state dynamically when scaling the browser.
4. **Keyless AnimatePresence Transition Fails**:
   * *Problem*: Unkeyed container divs inside `<AnimatePresence>` prevented children tab elements from executing exit animations when switching views.
   * *Resolution*: Upgraded the main container to an animated, keyed `<motion.div key={activeTab}>` to ensure exit callbacks are fired correctly.

---

## 🚀 Connection Setup & Sandbox Testing

1. Rename `.env.example` to `.env.local` and add your secure keys:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```
2. Set up the `courses` PostgreSQL schema in your Supabase project:
   ```sql
   create table courses (
     id uuid default gen_random_uuid() primary key,
     title text not null,
     progress integer not null default 0,
     icon_name text not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```
3. To test the **ErrorState** recovery and retry mechanism, head to the **Settings** tab inside the dashboard, and click the **Simulate Database Connection Failure** button. It will immediately trigger our custom offline recovery screen where you can click **Reconnect Database** to restore normal operation.
