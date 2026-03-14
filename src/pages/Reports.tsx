import DashboardLayout from "@/components/DashboardLayout";
import { mockBugs } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

const severityData = [
  { name: "Critical", count: mockBugs.filter(b => b.severity === "critical").length },
  { name: "High", count: mockBugs.filter(b => b.severity === "high").length },
  { name: "Medium", count: mockBugs.filter(b => b.severity === "medium").length },
  { name: "Low", count: mockBugs.filter(b => b.severity === "low").length },
];

const categoryData = mockBugs.reduce((acc, bug) => {
  const existing = acc.find(c => c.name === bug.category);
  if (existing) existing.count++;
  else acc.push({ name: bug.category, count: 1 });
  return acc;
}, [] as { name: string; count: number }[]);

const PIE_COLORS = ["hsl(0, 72%, 51%)", "hsl(38, 92%, 50%)", "hsl(201, 94%, 46%)", "hsl(152, 69%, 39%)"];

const Reports = () => {
  const exportAllJSON = () => {
    const blob = new Blob([JSON.stringify(mockBugs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bugbuddy-report.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported all bugs as JSON");
  };

  const exportAllCSV = () => {
    const headers = "ID,Title,Category,Severity,Status,URL,Load Time,AI Classification\n";
    const rows = mockBugs.map(b =>
      `${b.id},"${b.title}",${b.category},${b.severity},${b.status},"${b.url}",${b.loadTime},${b.aiClassification}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bugbuddy-report.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported all bugs as CSV");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="text-lg font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Bug analytics and exports</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={exportAllJSON} className="gap-1.5 text-xs">
            <FileJson className="h-3.5 w-3.5" /> Export JSON
          </Button>
          <Button size="sm" variant="outline" onClick={exportAllCSV} className="gap-1.5 text-xs">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast.info("PDF export requires server-side generation.")} className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" /> PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Severity Chart */}
        <div className="rounded-lg border border-border bg-card p-4 animate-fade-in">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Bugs by Severity</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={severityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(220, 13%, 90%)" }} />
              <Bar dataKey="count" fill="hsl(235, 72%, 58%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Chart */}
        <div className="rounded-lg border border-border bg-card p-4 animate-fade-in">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Bugs by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid hsl(220, 13%, 90%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {categoryData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
