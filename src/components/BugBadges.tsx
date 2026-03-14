import { Severity, BugStatus } from "@/data/types";
import { Badge } from "@/components/ui/badge";

export const SeverityBadge = ({ severity }: { severity: Severity }) => {
  const styles: Record<Severity, string> = {
    critical: "bg-destructive text-destructive-foreground",
    high: "bg-destructive/80 text-destructive-foreground",
    medium: "bg-warning text-warning-foreground",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <Badge className={`${styles[severity]} text-xs font-semibold uppercase tracking-wider border-0`}>
      {severity}
    </Badge>
  );
};

export const StatusBadge = ({ status }: { status: BugStatus }) => {
  const styles: Record<BugStatus, string> = {
    open: "bg-destructive/15 text-destructive border-destructive/30",
    investigating: "bg-warning/15 text-warning border-warning/30",
    resolved: "bg-success/15 text-success border-success/30",
    duplicate: "bg-muted text-muted-foreground border-border",
  };

  return (
    <Badge variant="outline" className={`${styles[status]} text-xs font-medium capitalize`}>
      {status}
    </Badge>
  );
};
