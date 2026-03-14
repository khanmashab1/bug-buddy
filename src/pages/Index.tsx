import DashboardLayout from "@/components/DashboardLayout";
import MetricCards from "@/components/MetricCards";
import BugTable from "@/components/BugTable";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="mb-5">
        <h1 className="text-lg font-bold text-foreground">Health Overview</h1>
        <p className="text-sm text-muted-foreground">Latest automated scan results</p>
      </div>
      <div className="space-y-5">
        <MetricCards />
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Bug Feed</h2>
          <BugTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
