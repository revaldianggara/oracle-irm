import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Panel, Stat, StatusPill } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Clock3, Wallet, BellRing } from "lucide-react";
import { currency, maturities } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/maturity")({
  head: () => ({
    meta: [
      { title: "Maturity Reminder — IRMA" },
      { name: "description", content: "Upcoming deposit and facility maturities with rollover instructions and outreach status." },
      { property: "og:title", content: "Maturity Reminder — IRMA" },
      { property: "og:description", content: "Upcoming maturities with rollover instructions and outreach status." },
    ],
  }),
  component: MaturityPage,
});

const windows = [
  { label: "Next 30 days", max: 30 },
  { label: "Next 90 days", max: 90 },
  { label: "All", max: 9999 },
];

function MaturityPage() {
  const [win, setWin] = useState(windows[1]!);
  const [contacted, setContacted] = useState<string[]>([]);

  const rows = maturities.filter((m) => m.days <= win.max);
  const total = rows.reduce((s, m) => s + m.amount, 0);
  const noInstruction = rows.filter((m) => m.instruction === "None").length;

  return (
    <>
      <PageHeader
        title="Maturity Reminder"
        description="Deposits and facilities approaching maturity. Contact clients before instructions lapse."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Maturing value" value={currency(total, true)} delta={`${rows.length} instruments`} icon={Wallet} />
        <Stat label="Missing instructions" value={String(noInstruction)} delta="Require outreach" icon={BellRing} />
        <Stat label="Soonest maturity" value="6 days" delta="Hiroshi Tanaka · 06 Sep" icon={Clock3} />
      </div>

      <div className="mb-4 flex gap-1 rounded-lg border p-1 w-fit">
        {windows.map((w) => (
          <button
            key={w.label}
            onClick={() => setWin(w)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              win.label === w.label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {w.label}
          </button>
        ))}
      </div>

      <Panel className="divide-y">
        {rows.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <Link
                to="/customers/$id"
                params={{ id: m.customerId }}
                className="text-sm font-medium hover:text-primary hover:underline"
              >
                {m.customer}
              </Link>
              <div className="mt-1 text-xs text-muted-foreground">{m.product} · matures {m.date}</div>
            </div>
            <div className="num w-32 text-right text-sm font-medium">{currency(m.amount, true)}</div>
            <StatusPill status={m.days <= 14 ? "critical" : m.days <= 45 ? "warning" : "neutral"}>
              {m.days} days
            </StatusPill>
            <div className="w-32 text-xs text-muted-foreground">{m.instruction}</div>
            <Button
              size="sm"
              variant={contacted.includes(m.id) ? "ghost" : "outline"}
              disabled={contacted.includes(m.id)}
              onClick={() => {
                setContacted((c) => [...c, m.id]);
                toast.success("Rollover notice sent", { description: `${m.customer} — ${m.product}` });
              }}
            >
              {contacted.includes(m.id) ? "Notice sent" : "Send notice"}
            </Button>
          </div>
        ))}
      </Panel>
    </>
  );
}
