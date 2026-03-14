import DashboardLayout from "@/components/DashboardLayout";
import { mockProjects } from "@/data/mockData";
import { ExternalLink, Globe } from "lucide-react";

const statusColors = {
  healthy: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  critical: "bg-destructive/15 text-destructive",
};

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="mb-5">
        <h1 className="text-lg font-bold text-foreground">Projects</h1>
        <p className="text-sm text-muted-foreground">Monitored applications</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {mockProjects.map((p) => (
          <div key={p.id} className="rounded-lg border border-border bg-card p-4 animate-fade-in">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-card-foreground">{p.name}</h3>
              </div>
              <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold capitalize ${statusColors[p.status]}`}>
                {p.status}
              </span>
            </div>
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline mb-3 break-all">
              {p.url} <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{p.bugCount} bug{p.bugCount !== 1 && "s"} detected</span>
              <span>Last scan: {new Date(p.lastScan).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Projects;
