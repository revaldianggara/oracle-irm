import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { PageHeader, Panel } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { meetings } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — IRMA" },
      { name: "description", content: "Client meetings, calls and compliance deadlines for the month ahead." },
      { property: "og:title", content: "Calendar — IRMA" },
      { property: "og:description", content: "Client meetings, calls and compliance deadlines." },
    ],
  }),
  component: CalendarPage,
});

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function CalendarPage() {
  const [events, setEvents] = useState(meetings);
  const [selected, setSelected] = useState<number>(31);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", customer: "", time: "10:00", day: "31" });

  // Aug 31 2026 is a Monday; render a 5-week grid spanning Aug 31 – Oct 4.
  const days = Array.from({ length: 35 }, (_, i) => {
    const dayNumber = i === 0 ? 31 : i; // simplified prototype grid
    return { key: i, day: dayNumber, month: i === 0 ? "Aug" : i <= 30 ? "Sep" : "Oct" };
  });

  const dayEvents = events.filter((e) => e.day === selected);

  return (
    <>
      <PageHeader
        title="Calendar"
        description="September 2026 · client meetings, calls and compliance deadlines in one view."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarPlus className="size-4" /> New event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule an event</DialogTitle>
                <DialogDescription>Added to your IRMA calendar and synced to Outlook.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="t">Title</Label>
                  <Input id="t" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Portfolio review" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c">Client</Label>
                  <Input id="c" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} placeholder="Amelia Hartwell" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="d">Day of month</Label>
                    <Input id="d" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tm">Time</Label>
                    <Input id="tm" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={!form.title.trim()}
                  onClick={() => {
                    const day = Number(form.day) || 1;
                    setEvents([
                      ...events,
                      { id: `EV-${Date.now()}`, day, time: form.time, title: form.title, customer: form.customer || "—", type: "Meeting" },
                    ]);
                    setSelected(day);
                    setOpen(false);
                    setForm({ title: "", customer: "", time: "10:00", day: "31" });
                    toast.success("Event scheduled");
                  }}
                >
                  Save event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Panel className="p-5">
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
            {weekdays.map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => {
              const count = events.filter((e) => e.day === d.day).length;
              const active = selected === d.day;
              return (
                <button
                  key={d.key}
                  onClick={() => setSelected(d.day)}
                  className={cn(
                    "flex h-[74px] flex-col items-start rounded-lg border p-2 text-left transition-colors",
                    active ? "border-primary bg-primary/5" : "border-transparent hover:bg-accent/60",
                  )}
                >
                  <span className={cn("num text-xs", active ? "font-semibold text-primary" : "text-muted-foreground")}>
                    {d.day}
                  </span>
                  {count > 0 && (
                    <span className="mt-auto rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      {count} event{count > 1 ? "s" : ""}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel className="divide-y">
          <div className="px-5 py-4 text-sm font-medium">Day {selected}</div>
          {dayEvents.length === 0 && (
            <div className="px-5 py-6 text-sm text-muted-foreground">No events scheduled. Select another day or add one.</div>
          )}
          {dayEvents.map((e) => (
            <div key={e.id} className="px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="num text-sm font-medium text-muted-foreground">{e.time}</span>
                <span className="text-sm font-medium">{e.title}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{e.customer} · {e.type}</div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => toast.success("Meeting confirmed", { description: e.title })}>
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEvents(events.filter((x) => x.id !== e.id));
                    toast("Event cancelled", { description: e.title });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </>
  );
}
