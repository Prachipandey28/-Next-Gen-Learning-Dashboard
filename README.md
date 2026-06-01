# Aetheria — Next-Gen Student Learning Dashboard

A futuristic, highly animated, and fully responsive student performance and adaptive learning dashboard built using **Next.js (App Router)**, **Tailwind CSS (v4)**, **Framer Motion**, and **Supabase (PostgreSQL)**.

---

## 🛠️ Architectural Choices & Tech Stack

Our stack is strictly selected to satisfy advanced frontend engineering constraints and deliver a premium, hardware-accelerated user experience:
1. **Framework: Next.js (App Router)** — Leveraging Server Components for secure server-side data loading, combined with React Suspense for modern streamed skeleton loader.
2. **Database: Supabase (PostgreSQL)** — Robust direct query interface utilizing `@supabase/ssr` to securely connect server-side.
3. **Styling: Tailwind CSS (v4)** — Embracing the cutting-edge Tailwind CSS v4 pipeline. Theme definitions, gradients, and custom utility variables are declared directly inside `src/app/globals.css` via clean `@theme` CSS tokens.
4. **Animations: Framer Motion** — Used for staggered page entrances, spring-physics scale hover states, active tab highlights (`layoutId`), and custom SVG path animations.
5. **Icons: Lucide React** — Rich icon pack dynamically mapped and rendered from raw database string strings.

---

## ⚡ Server/Client Component Split Rationale

To secure credentials and prevent browser runtime blocks, the application strictly isolates server and client-side execution contexts:

### React Server Components (RSC)
* **`src/app/page.tsx` & `src/lib/supabase.ts`**: All query bindings to Supabase are executed entirely server-side inside `getCourses()`. This allows us to securely read secret environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) which never expose database keys or configuration parameters to the client-side JavaScript bundle.
* **React Suspense Boundary**: The root page uses an async database fetching model wrapped in `<Suspense fallback={<SkeletonLoader />}>`. This enables Next.js to stream the page frame and load the pulsing skeleton instantly.

### Client Components
* **`Sidebar.tsx`**: Manages interactive states (manually collapsing on desktop, auto-collapsing on tablet using dynamic `window.matchMedia` viewport queries, and sliding active highlights).
* **`DashboardShell.tsx`**: Coordinates client-side state for tab switching, real-time nickname settings updates, and connection testing triggers.
* **`CourseTile.tsx`**: Renders dynamic course items, looking up any valid Lucide icon name stored in the database, with custom hardware-accelerated progress bars.
* **`HeroTile.tsx`**: Displays live greetings (with real-time state link to profile settings) and interactive streak/trophy flame indicators.
* **`ActivityTile.tsx`**: Renders contribution matrix maps, SVG area metrics, and weekly-monthly charts.

---

## 💎 Zero Layout Shift (CLS) & Performance

We enforce strict GPU hardware-accelerated animations using `transform` (scale, translate) and `opacity` exclusively:
* **True Zero-CLS Skeletons**: `SkeletonLoader.tsx` mimics the exact desktop sidebar and mobile bottom navigation layout. During loading states, only the inner bento grid items pulse, guaranteeing zero Cumulative Layout Shift (CLS) when server data streams in.
* **Spring Hover Physics**: Hover interactions scale cards smoothly by `~1.2%` using spring physics (`stiffness: 300`, `damping: 20`) to achieve a natural, tactile animation curve.
* **Framer Motion Progress Bars**: Replaced legated CSS transitions with dynamic `motion.div` attributes on mount. Bars slide to their exact database progress percentage with micro-staggers based on card grid indices.

---

## 🚀 Connection Setup & Database Schema

1. Copy `.env.example` to `.env.local` at the project root and fill in your keys:
   ```env
   # Supabase PostgreSQL Configuration
   # Copy this file to .env.local and fill in your project values
   # Never commit .env.local to version control

   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```
   *Note: If environment keys are missing, the project will automatically start in high-fidelity **Aetheria Sandbox Demo Mode** with comprehensive mockup rows and a notification banner.*

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

3. Populate with initial course data (supports all Lucide icon names):
   ```sql
   insert into courses (title, progress, icon_name) values
   ('Advanced React Patterns & Architecture', 78, 'Atom'),
   ('Data Structures, Algorithms & Systems', 45, 'Cpu'),
   ('Futuristic Tailwind, Meshes & SVG Canvas', 92, 'Palette'),
   ('Modern Backend & Realtime Supabase', 60, 'Database'),
   ('Astronomy & Physics of Design Systems', 35, 'Compass'),
   ('System Complexity & Structural Optimization', 82, 'Layers');
   ```

---

## 🚧 Error Handling & Sandbox Testing

* **Offline Reconnect States**: If the Supabase instance goes offline or network blocks occur, a connection failure screen (`ErrorState.tsx`) handles the query crash gracefully. Users can retry or click **Load Local Sandbox** to run locally.
* **Simulate DB Failure**: To test and appreciate the error boundaries:
  1. Head to the **Settings** tab on the sidebar.
  2. Click the **Simulate Database Connection Failure** button under *Error Recovery Testing*.
  3. The app will immediately trigger the connection failure screen. Click **Reconnect Database** to restore normal operation.
