import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CalendarPlus, Mail, Phone } from "lucide-react";
import { Meta, PageHeader, Panel, StatusPill } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { currency, customers, recommendations, alerts } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/customers/$id")({
  head: () => ({
    meta: [
      { title: "Client profile — IRMA" },
      { name: "description", content: "Full client profile: holdings, activity history, AI insights and relationship notes." },
      { property: "og:title", content: "Client profile — IRMA" },
      { property: "og:description", content: "Holdings, activity history and AI insights for a single client." },
    ],
  }),
  component: CustomerDetail,
});

function CustomerDetail() {
  const { id } = useParams({ from: "/customers/$id" });
  const customer = customers.find((c) => c.id === id) ?? customers[0]!;
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(customer.notes);

  const customerRecs = recommendations.filter((r) => r.customerId === customer.id);
  const customerAlerts = alerts.filter((a) => a.customerId === customer.id);

  return (
    <>
      <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
        <Link to="/customers">
          <ArrowLeft className="size-4" /> All clients
        </Link>
      </Button>

      <PageHeader
        title={customer.name}
        description={`${customer.segment} client since ${customer.since} · Relationship Manager ${customer.manager}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast("Email drafted", { description: customer.email })}>
              <Mail className="size-4" /> Email
            </Button>
            <Button onClick={() => toast.success("Meeting request sent", { description: `${customer.name} — 30 minutes` })}>
              <CalendarPlus className="size-4" /> Schedule meeting
            </Button>
          </div>
        }
      />

      <Panel className="mb-8 grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-5">
        <Meta label="Assets under management" value={<span className="num">{currency(customer.aum)}</span>} />
        <Meta label="Revenue YTD" value={<span className="num">{currency(customer.revenueYtd)}</span>} />
        <Meta label="Risk profile" value={customer.risk} />
        <Meta
          label="Relationship health"
          value={
            <StatusPill status={customer.health}>
              {customer.health === "success" ? "Healthy" : customer.health === "warning" ? "Watch" : "At risk"}
            </StatusPill>
          }
        />
        <Meta label="Last contact" value={customer.lastContact} />
      </Panel>

      <Tabs defaultValue="holdings">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="insights">AI insights</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="mt-5">
          <Panel className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 text-right font-medium">Balance</th>
                  <th className="px-5 py-3 font-medium">Rate</th>
                  <th className="px-5 py-3 font-medium">Matures</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customer.products.map((p) => (
                  <tr key={p.name}>
                    <td className="px-5 py-4 font-medium">{p.name}</td>
                    <td className="num px-5 py-4 text-right">{currency(p.balance)}</td>
                    <td className="px-5 py-4 text-muted-foreground">{p.rate}</td>
                    <td className="px-5 py-4 text-muted-foreground">{p.matures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </TabsContent>

        <TabsContent value="insights" className="mt-5 space-y-4">
          {customerAlerts.map((a) => (
            <Panel key={a.id} className="p-5">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-medium">{a.title}</span>
                <StatusPill status={a.severity}>{a.category}</StatusPill>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{a.summary}</p>
            </Panel>
          ))}
          {customerRecs.map((r) => (
            <Panel key={r.id} className="flex flex-wrap items-center gap-4 p-5">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{r.product}</div>
                <div className="mt-1 text-sm text-muted-foreground">{r.rationale}</div>
              </div>
              <div className="num text-sm text-muted-foreground">{r.fit}% fit</div>
              <Button size="sm" variant="outline" onClick={() => toast.success("Proposal added to pipeline", { description: r.product })}>
                Propose
              </Button>
            </Panel>
          ))}
          {customerAlerts.length === 0 && customerRecs.length === 0 && (
            <Panel className="p-5 text-sm text-muted-foreground">
              No open signals. The next scheduled portfolio scan runs tonight.
            </Panel>
          )}
        </TabsContent>

        <TabsContent value="notes" className="mt-5">
          <Panel className="p-5">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a relationship note…"
              rows={3}
            />
            <div className="mt-3 flex justify-end">
              <Button
                size="sm"
                disabled={!note.trim()}
                onClick={() => {
                  setNotes([{ date: "2026-08-31", text: note.trim() }, ...notes]);
                  setNote("");
                  toast.success("Note saved");
                }}
              >
                Save note
              </Button>
            </div>
          </Panel>
          <div className="mt-4 space-y-3">
            {notes.map((n, i) => (
              <Panel key={i} className="p-4">
                <div className="num text-xs text-muted-foreground">{n.date}</div>
                <div className="mt-1 text-sm">{n.text}</div>
              </Panel>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-5">
          <Panel className="grid gap-6 p-6 sm:grid-cols-2">
            <Meta
              label="Email"
              value={
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" /> {customer.email}
                </span>
              }
            />
            <Meta
              label="Phone"
              value={
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4 text-muted-foreground" /> {customer.phone}
                </span>
              }
            />
            <Meta label="Client ID" value={<span className="num">{customer.id}</span>} />
            <Meta label="Next action" value={customer.nextAction} />
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}
