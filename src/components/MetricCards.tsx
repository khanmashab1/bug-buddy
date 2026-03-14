import { Bug as BugIcon, Clock, CheckCircle2 } from "lucide-react";
import { mockReport } from "@/data/mockData";

const metrics = [
  {
    label: "Total Bugs",
    value: mockReport.totalBugs,
    icon: BugIcon,
    accent: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    label: "Avg. Load Time",
    value: `${mockReport.avgLoadTime}s`,
    icon: Clock,
    accent: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Success Rate",
    value: `${mockReport.successRate}%`,
    icon: CheckCircle2,
    accent: "text-success",
    bg: "bg-success/10",
  },
];

const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex items-center gap-4 rounded-md border border-border bg-card p-5"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-md ${m.bg}`}>
            <m.icon className={`h-5 w-5 ${m.accent}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{m.label}</p>
            <p className="text-2xl font-bold text-foreground">{m.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;
