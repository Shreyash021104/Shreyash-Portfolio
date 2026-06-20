import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shreyash Patange — AI Engineer & Backend Developer" },
      { name: "description", content: "Portfolio of Shreyash Patange — ECE '26 at PICT Pune, Backend Intern at Intangles Lab. Builds autonomous AI agents, backend systems, and intelligent platforms." },
      { property: "og:title", content: "Shreyash Patange — AI Engineer & Backend Developer" },
      { property: "og:description", content: "Autonomous SRE agents, AI skilling platforms, and Springer-published ML research. Open to SDE / AI roles — June 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
