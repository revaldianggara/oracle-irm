import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { PageHeader, Panel, StatusPill } from "@/components/page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { currency, customers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/customers/")({
  head: () => ({
    meta: [
      { title: "Customer 360 — IRMA" },
      { name: "description", content: "A single view of every client relationship: holdings, health, and next actions." },
      { property: "og:title", content: "Customer 360 — IRMA" },
      { property: "og:description", content: "A single view of every client relationship." },
    ],
  }),
  component: CustomerList,
});

const segments = ["All", "Private", "Priority", "Business", "Corporate"] as const;

function CustomerList() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [seg, setSeg] = useState<(typeof segments)[number]>("All");

  const rows = useMemo(
    () =>
      customers.filter(
        (c) =>
          (seg === "All" || c.segment === seg) &&
          (c.name.toLowerCase().includes(q.toLowerCase()) || c.id.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, seg],
  );

  return (
    <>
      <PageHeader
        title="Customer 360"
        description="Every relationship in your book with portfolio health, holdings and the next recommended step."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or ID" className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-lg border p-1">
          {segments.map((s) => (
            <button
              key={s}
              onClick={() => setSeg(s)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                seg === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="ml-auto text-sm text-muted-foreground">{rows.length} clients</div>
      </div>

      <Panel className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-5 py-3 font-medium">Segment</th>
              <th className="px-5 py-3 text-right font-medium">AUM</th>
              <th className="px-5 py-3 text-right font-medium">Revenue YTD</th>
              <th className="px-5 py-3 font-medium">Health</th>
              <th className="px-5 py-3 font-medium">Next action</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((c) => (
              <tr
                key={c.id}
                onClick={() => navigate({ to: "/customers/$id", params: { id: c.id } })}
                className="cursor-pointer transition-colors hover:bg-accent/60"
              >
                <td className="px-5 py-4">
                  <div className="font-medium">{c.name}</div>
                  <div className="num text-xs text-muted-foreground">{c.id}</div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{c.segment}</td>
                <td className="num px-5 py-4 text-right font-medium">{currency(c.aum, true)}</td>
                <td className="num px-5 py-4 text-right text-muted-foreground">{currency(c.revenueYtd, true)}</td>
                <td className="px-5 py-4">
                  <StatusPill status={c.health}>
                    {c.health === "success" ? "Healthy" : c.health === "warning" ? "Watch" : "At risk"}
                  </StatusPill>
                </td>
                <td className="max-w-[220px] truncate px-5 py-4 text-muted-foreground">{c.nextAction}</td>
                <td className="px-5 py-4 text-right">
                  <Button variant="ghost" size="icon" aria-label="Open client">
                    <ChevronRight className="size-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
