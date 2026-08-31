import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
  CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryNav, secondaryNav, allNavItems } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const notifications = [
  { id: "n1", title: "Large outflow detected", body: "Amelia Hartwell — SGD 1.8M", to: "/alerts" },
  { id: "n2", title: "Suitability expired", body: "Clara Bennett — action required", to: "/compliance" },
  { id: "n3", title: "Deposit maturing", body: "Hiroshi Tanaka — 6 days", to: "/maturity" },
];

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, setDark };
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [read, setRead] = useState<string[]>([]);
  const { dark, setDark } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const current =
    allNavItems.find((i) => i.to !== "/" && pathname.startsWith(i.to)) ??
    allNavItems[0];
  const unread = notifications.filter((n) => !read.includes(n.id));

  const navLink = (item: (typeof allNavItems)[number]) => {
    const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
    return (
      <Link
        key={item.to}
        to={item.to}
        title={item.label}
        className={cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          active
            ? "bg-sidebar-accent font-medium text-primary"
            : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
          collapsed && "justify-center px-0",
        )}
      >
        <item.icon className="size-[18px] shrink-0" strokeWidth={1.75} />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:flex",
          collapsed ? "w-[68px]" : "w-[248px]",
        )}
      >
        <div className={cn("flex h-16 items-center gap-2.5 px-4", collapsed && "justify-center px-0")}>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CircleDot className="size-4" strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">IRMA</div>
              <div className="text-[11px] text-muted-foreground">Relationship Intelligence</div>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {primaryNav.map((group) => (
            <div key={group.label} className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                  {group.label}
                </div>
              )}
              {group.items.map(navLink)}
            </div>
          ))}
        </nav>

        <div className="space-y-1 border-t border-sidebar-border px-3 py-4">
          {!collapsed && (
            <div className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Settings
            </div>
          )}
          {secondaryNav.map(navLink)}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/85 px-5 backdrop-blur">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:inline-flex"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </Button>

          <div className="min-w-0">
            <div className="text-[11px] text-muted-foreground">IRMA</div>
            <div className="truncate text-sm font-medium">{current.label}</div>
          </div>

          <div className="relative ml-auto hidden w-72 lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers, alerts…"
              className="h-9 pl-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") toast("Search", { description: `No index in prototype — showing all results for "${(e.target as HTMLInputElement).value}"` });
              }}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative ml-auto lg:ml-0" aria-label="Notifications">
                <Bell className="size-4" />
                {unread.length > 0 && (
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <button
                  className="text-xs font-normal text-primary hover:underline"
                  onClick={() => setRead(notifications.map((n) => n.id))}
                >
                  Mark all read
                </button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((n) => (
                <DropdownMenuItem key={n.id} asChild>
                  <Link to={n.to} onClick={() => setRead((r) => [...new Set([...r, n.id])])} className="flex-col items-start gap-0.5 py-2">
                    <div className="flex w-full items-center gap-2">
                      <span className="text-sm font-medium">{n.title}</span>
                      {read.includes(n.id) ? (
                        <Check className="ml-auto size-3.5 text-muted-foreground" />
                      ) : (
                        <span className="ml-auto size-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{n.body}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md px-1 py-1 hover:bg-accent">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">DO</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="text-sm">Daniel Okoro</div>
                <div className="text-xs font-normal text-muted-foreground">Relationship Manager · Private</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin">Admin Console</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast("Signed out (prototype)")}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="mx-auto w-full max-w-[1240px] flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
