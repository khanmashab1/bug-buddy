import { Bug } from "@/data/types";
import { SeverityBadge, StatusBadge } from "./BugBadges";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileSpreadsheet, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Props {
  bug: Bug | null;
  onClose: () => void;
}

const BugDetailPanel = ({ bug, onClose }: Props) => {
  if (!bug) return null;

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(bug, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bug.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${bug.id} as JSON`);
  };

  const exportCSV = () => {
    const headers = "ID,Title,Category,Severity,Status,URL,Load Time,AI Classification\n";
    const row = `${bug.id},"${bug.title}",${bug.category},${bug.severity},${bug.status},"${bug.url}",${bug.loadTime},${bug.aiClassification}\n`;
    const blob = new Blob([headers + row], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bug.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${bug.id} as CSV`);
  };

  const exportPDF = () => {
    toast.info("PDF export requires server-side generation (Playwright trace).");
  };

  return (
    <Sheet open={!!bug} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-card border-l border-border">
        <SheetHeader className="pb-4 border-b border-border">
          <p className="font-mono text-xs text-muted-foreground">{bug.id}</p>
          <SheetTitle className="text-sm font-semibold text-card-foreground leading-tight">
            {bug.title}
          </SheetTitle>
          <div className="flex items-center gap-2 pt-1">
            <SeverityBadge severity={bug.severity} />
            <StatusBadge status={bug.status} />
          </div>
        </SheetHeader>

        <div className="space-y-4 py-4">
          <Field label="Description">
            <p className="text-sm text-card-foreground leading-relaxed">{bug.description}</p>
          </Field>

          <Field label="AI Classification">
            <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {bug.aiClassification}
            </span>
          </Field>

          <Field label="URL">
            <a href={bug.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline break-all">
              {bug.url} <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          </Field>

          <Field label="Load Time">
            <span className="font-mono text-sm text-card-foreground">{bug.loadTime}s</span>
          </Field>

          {bug.consoleErrors.length > 0 && (
            <Field label="Console Errors">
              <pre className="rounded-md bg-foreground/5 p-3 text-[11px] font-mono text-destructive overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {bug.consoleErrors.join("\n")}
              </pre>
            </Field>
          )}

          {bug.duplicateOf && (
            <Field label="Duplicate Of">
              <span className="font-mono text-sm text-muted-foreground">{bug.duplicateOf}</span>
            </Field>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={exportJSON} className="gap-1.5 text-xs">
              <FileJson className="h-3.5 w-3.5" /> JSON
            </Button>
            <Button size="sm" variant="outline" onClick={exportCSV} className="gap-1.5 text-xs">
              <FileSpreadsheet className="h-3.5 w-3.5" /> CSV
            </Button>
            <Button size="sm" variant="outline" onClick={exportPDF} className="gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" /> PDF
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
    {children}
  </div>
);

export default BugDetailPanel;
