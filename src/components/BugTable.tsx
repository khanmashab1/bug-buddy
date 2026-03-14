import { useState } from "react";
import { Bug } from "@/data/types";
import { mockBugs } from "@/data/mockData";
import { SeverityBadge, StatusBadge } from "./BugBadges";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import BugDetailPanel from "./BugDetailPanel";

const BugTable = () => {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);

  const filtered = mockBugs.filter((bug) => {
    const matchSearch =
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.id.toLowerCase().includes(search.toLowerCase()) ||
      bug.category.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === "all" || bug.severity === severityFilter;
    const matchStatus = statusFilter === "all" || bug.status === statusFilter;
    return matchSearch && matchSeverity && matchStatus;
  });

  return (
    <>
      <div className="rounded-lg border border-border bg-card animate-fade-in">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
          <Input
            placeholder="Search bugs…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full sm:w-56 text-sm"
          />
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="h-8 w-full sm:w-32 text-xs">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-full sm:w-32 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="fixed">Fixed</SelectItem>
              <SelectItem value="ignored">Ignored</SelectItem>
            </SelectContent>
          </Select>
          <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">
            {filtered.length} result{filtered.length !== 1 && "s"}
          </span>
        </div>

        {/* Table - Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
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
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/50 transition-colors duration-100"
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{bug.id}</td>
                  <td className="px-4 py-3 font-medium text-card-foreground max-w-[280px] truncate">{bug.title}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{bug.category}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={bug.severity} /></td>
                  <td className="px-4 py-3"><StatusBadge status={bug.status} /></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(bug.detectedAt), { addSuffix: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card list - Mobile */}
        <div className="sm:hidden divide-y divide-border">
          {filtered.map((bug) => (
            <div
              key={bug.id}
              onClick={() => setSelectedBug(bug)}
              className="cursor-pointer px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-medium text-card-foreground leading-tight">{bug.title}</p>
                <SeverityBadge severity={bug.severity} />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{bug.id}</span>
                <span>·</span>
                <span>{bug.category}</span>
                <span className="ml-auto"><StatusBadge status={bug.status} /></span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            No bugs match your filters.
          </div>
        )}
      </div>

      <BugDetailPanel bug={selectedBug} onClose={() => setSelectedBug(null)} />
    </>
  );
};

export default BugTable;
