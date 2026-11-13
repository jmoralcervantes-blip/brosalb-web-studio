import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BROSALB" },
      { name: "description", content: "Web oficial de BROSALB." },
      { property: "og:title", content: "BROSALB" },
      { property: "og:description", content: "Web oficial de BROSALB." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-5xl font-bold tracking-tight text-foreground">BROSALB</h1>
    </main>
  );
}
