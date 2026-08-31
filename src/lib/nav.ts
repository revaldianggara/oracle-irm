import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock3,
  Sparkles,
  Megaphone,
  FileCheck2,
  Bell,
  Bot,
  BarChart3,
  Gauge,
  ShieldCheck,
  Settings2,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; to: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

export const primaryNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "RM Dashboard", to: "/", icon: LayoutDashboard },
      { label: "Customer 360", to: "/customers", icon: Users },
      { label: "Calendar", to: "/calendar", icon: CalendarDays },
    ],
  },
  {
    label: "Engagement",
    items: [
      { label: "Maturity Reminder", to: "/maturity", icon: Clock3 },
      { label: "Product Recommendation", to: "/recommendations", icon: Sparkles },
      { label: "Campaign Management", to: "/campaigns", icon: Megaphone },
    ],
  },
  {
    label: "Pipeline",
    items: [
      { label: "Product Approval", to: "/approvals", icon: FileCheck2 },
      { label: "Portfolio Alerts", to: "/alerts", icon: Bell },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "AI Digital Assistant", to: "/assistant", icon: Bot },
      { label: "Executive Dashboard", to: "/executive", icon: BarChart3 },
    ],
  },
];

export const secondaryNav: NavItem[] = [
  { label: "Performance Monitor", to: "/performance", icon: Gauge },
  { label: "Compliance", to: "/compliance", icon: ShieldCheck },
  { label: "Admin Console", to: "/admin", icon: Settings2 },
];

export const allNavItems: NavItem[] = [
  ...primaryNav.flatMap((g) => g.items),
  ...secondaryNav,
];
