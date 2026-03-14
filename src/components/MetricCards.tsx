import { Bug as BugIcon, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { mockBugs } from "@/data/mockData";

const MetricCards = () => {
  const totalBugs = mockBugs.length;
  const criticalCount = mockBugs.filter(b => b.severity === "critical").length;
  const avgLoadTime = parseFloat((mockBugs.reduce((s, b) => s + b.loadTime, 0) / mockBugs.length).toFixed(1));
  const openCount = mockBugs.filter(b => b.status === "open").length;
  const successRate = Math.round(((totalBugs - openCount) / totalBugs) * 100);

  const metrics = [
    { label: "Total Bugs", value: totalBugs, icon: BugIcon, color: "text-destructive bg-destructive/10" },
    { label: "Critical", value: criticalCount, icon: AlertTriangle, color: "text-warning bg-warning/10" },
    { label: "Avg Load Time", value: `${avgLoadTime}s`, icon: Clock, color: "text-info bg-info/10" },
    { label: "Fix Rate", value: `${successRate}%`, icon: CheckCircle2, color: "text-success bg-success/10" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${m.color}`}>
            <m.icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground truncate">{m.label}</p>
            <p className="text-xl font-bold text-card-foreground">{m.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;
