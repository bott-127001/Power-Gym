import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { BarbellLoader } from "../components/GymLoaders";
import { Dumbbell } from "lucide-react";
import { Atmosphere } from "../components/Atmosphere";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-carbon-deep px-4 py-24 overflow-hidden">
      {/* Cinematic Background Lights */}
      <Atmosphere variant="d" />

      {/* Blueprint Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] rounded-full bg-volt/5 blur-[120px] animate-pulse-glow" />

      {/* Content Card with Glassmorphism */}
      <div className="relative z-10 w-full max-w-xl rounded-[2.5rem] glass-strong border border-volt/30 bg-carbon-deep/80 p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.95)] animate-scale-up">
        {/* Glowing Dumbbell Emblem */}
        <div className="inline-flex h-16 w-16 place-items-center justify-center rounded-2xl bg-volt/15 text-volt border border-volt/35 mb-6 shadow-sm">
          <Dumbbell className="h-8 w-8 -rotate-45 animate-pulse" />
        </div>

        <h1 className="font-display font-black text-6xl sm:text-7xl leading-none tracking-tight uppercase text-foreground">
          404
        </h1>
        <h2 className="mt-4 font-display text-xl sm:text-2xl font-black uppercase text-volt tracking-wider">
          Session Interrupted
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          You've wandered off the training floor. The page you are looking for has been repped to failure or doesn't exist.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-volt px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-carbon transition-all duration-300 hover:shadow-[0_10px_25px_rgba(255,222,71,0.35)] hover:scale-105 active:scale-95"
          >
            Re-rack & Go Home
          </Link>
          <Link
            to="/branches"
            className="inline-flex items-center justify-center rounded-full border border-border/80 bg-carbon/60 hover:bg-volt/10 hover:border-volt/40 hover:text-volt px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Our Branches
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error("Root error boundary caught:", error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-volt px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-carbon transition-all hover:scale-105 cursor-pointer"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-carbon px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:bg-neutral-800"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  pendingComponent: BarbellLoader,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
