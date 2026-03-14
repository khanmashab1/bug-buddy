import { Bug } from "@/data/types";
import { SeverityBadge, StatusBadge } from "./BugBadges";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Download, FileJson, ExternalLink } from "lucide-react";
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
    toast.success("Exported as JSON");
  };

  const exportPDF = () => {
    toast.info("PDF export would be generated server-side via Playwright trace.");
  };

  return (
    <Sheet open={!!bug} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-card">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            {bug.id}
          </div>
          <SheetTitle className="text-base font-semibold text-foreground leading-tight">
            {bug.title}
          </SheetTitle>
          <div className="flex items-center gap-2 pt-1">
            <SeverityBadge severity={bug.severity} />
            <StatusBadge status={bug.status} />
          </div>
        </SheetHeader>

        <div className="space-y-5 py-5">
          <Section label="Description">
            <p className="text-sm text-foreground leading-relaxed">{bug.description}</p>
          </Section>

          <Section label="AI Classification">
            <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {bug.aiClassification}
            </span>
          </Section>

          <Section label="URL">
            <a
              href={bug.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              {bug.url} <ExternalLink className="h-3 w-3" />
            </a>
          </Section>

          <Section label="Load Time">
            <span className="font-mono text-sm text-foreground">{bug.loadTime}s</span>
          </Section>

          {bug.consoleErrors.length > 0 && (
            <Section label="Console Errors">
              <pre className="rounded bg-foreground/5 p-3 text-xs font-mono text-destructive overflow-x-auto leading-relaxed">
                {bug.consoleErrors.join("\n")}
              </pre>
            </Section>
          )}

          {bug.duplicateOf && (
            <Section label="Duplicate Of">
              <span className="font-mono text-sm text-muted-foreground">{bug.duplicateOf}</span>
            </Section>
          )}

          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={exportJSON} className="gap-1.5 text-xs">
              <FileJson className="h-3.5 w-3.5" /> Export JSON
            </Button>
            <Button size="sm" variant="outline" onClick={exportPDF} className="gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" /> Export PDF
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
    {children}
  </div>
);

export default BugDetailPanel;
