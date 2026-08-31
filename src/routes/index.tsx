import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader, Panel, Section, Stat, StatusPill } from "@/components/page";
import { Button } from "@/components/ui/button";
import { alerts, currency, customers, meetings, revenueTrend } from "@/lib/mock-data";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RM Dashboard — IRMA" },
      { name: "description", content: "Daily portfolio priorities, revenue trend and next best actions for your book." },
      { property: "og:title", content: "RM Dashboard — IRMA" },
      { property: "og:description", content: "Daily portfolio priorities and next best actions for your book." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [done, setDone] = useState<string[]>([]);
  const aum = customers.reduce((s, c) => s + c.aum, 0);
  const revenue = customers.reduce((s, c) => s + c.revenueYtd, 0);
  const priority = alerts.filter((a) => a.severity !== "success").slice(0, 4);

  return (
    <>
      <PageHeader
        title="Good morning, Daniel"
        description="Six clients need attention today. Start with the retention alert on Amelia Hartwell."
        action={
          <Button asChild>
            <Link to="/alerts">
              Review priority alerts
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <Section className="mb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Portfolio AUM" value={currency(aum, true)} delta="+4.2% vs last month" icon={Briefcase} />
          <Stat label="Revenue YTD" value={currency(revenue, true)} delta="104% of target" icon={TrendingUp} />
          <Stat label="Active clients" value={String(customers.length)} delta="2 onboarding" icon={Users} />
          <Stat label="Open actions" value={String(priority.length + 3)} delta="3 due today" icon={Clock3} />
        </div>
      </Section>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Section title="Revenue vs target (SGD thousands)">
          <Panel className="p-5">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ left: -18, right: 6, top: 6 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#rev)" />
                  <Area type="monotone" dataKey="target" stroke="var(--color-chart-4)" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </Section>

        <Section title="Today's schedule">
          <Panel className="divide-y">
            {meetings.slice(0, 4).map((m) => (
              <div key={m.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="num w-12 text-sm font-medium text-muted-foreground">{m.time}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{m.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.customer}</div>
                </div>
              </div>
            ))}
            <div className="px-5 py-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/calendar">Open calendar</Link>
              </Button>
            </div>
          </Panel>
        </Section>
      </div>

      <Section title="Next best actions">
        <Panel className="divide-y">
          {priority.map((a) => {
            const complete = done.includes(a.id);
            return (
              <div key={a.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-medium">{a.title}</span>
                    <StatusPill status={a.severity}>{a.category}</StatusPill>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {a.customer} · {a.recommended}
                  </div>
                </div>
                <Button
                  variant={complete ? "ghost" : "outline"}
                  size="sm"
                  disabled={complete}
                  onClick={() => {
                    setDone((d) => [...d, a.id]);
                    toast.success("Action marked complete", { description: a.title });
                  }}
                >
                  {complete ? <><CheckCircle2 className="size-4" /> Done</> : "Mark done"}
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/alerts">Open</Link>
                </Button>
              </div>
            );
          })}
        </Panel>
      </Section>
    </>
  );
}
