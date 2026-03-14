import { useState } from "react";
import { Bug, Severity, BugStatus } from "@/data/types";
import { mockBugs } from "@/data/mockData";
import { SeverityBadge, StatusBadge } from "./BugBadges";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import BugDetailPanel from "./BugDetailPanel";

const BugTable = () => {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);

  const filtered = mockBugs.filter((bug) => {
    const matchSearch =
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.id.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === "all" || bug.severity === severityFilter;
    const matchStatus = statusFilter === "all" || bug.status === statusFilter;
    return matchSearch && matchSeverity && matchStatus;
  });

  return (
    <>
      <div className="rounded-md border border-border bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
          <Input
            placeholder="Search bugs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-64 text-sm"
          />
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="h-8 w-36 text-sm">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-36 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="duplicate">Duplicate</SelectItem>
            </SelectContent>
          </Select>
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} bug{filtered.length !== 1 && "s"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2.5">ID</th>
                <th className="px-4 py-2.5">Bug</th>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">Severity</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Detected</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((bug) => (
                <tr
                  key={bug.id}
                  onClick={() => setSelectedBug(bug)}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-accent/50 transition-colors duration-100"
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{bug.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground max-w-xs truncate">{bug.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{bug.category}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={bug.severity} /></td>
                  <td className="px-4 py-3"><StatusBadge status={bug.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {formatDistanceToNow(new Date(bug.detectedAt), { addSuffix: true })}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No bugs match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BugDetailPanel bug={selectedBug} onClose={() => setSelectedBug(null)} />
    </>
  );
};

export default BugTable;
