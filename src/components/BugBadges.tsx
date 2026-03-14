import { Severity, BugStatus } from "@/data/types";

export const SeverityBadge = ({ severity }: { severity: Severity }) => {
  const styles: Record<Severity, string> = {
    critical: "bg-destructive/15 text-destructive",
    high: "bg-warning/15 text-warning",
    medium: "bg-info/15 text-info",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${styles[severity]}`}>
      {severity}
    </span>
  );
};

export const StatusBadge = ({ status }: { status: BugStatus }) => {
  const styles: Record<BugStatus, string> = {
    open: "bg-destructive/10 text-destructive",
    fixed: "bg-success/10 text-success",
    ignored: "bg-muted text-muted-foreground",
  };

  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
};
