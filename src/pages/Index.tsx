import AppSidebar from "@/components/AppSidebar";
import MetricCards from "@/components/MetricCards";
import BugTable from "@/components/BugTable";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-56 flex-1 px-8 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Health Overview</h1>
          <p className="text-sm text-muted-foreground">Latest automated scan results for Example App</p>
        </div>
        <div className="space-y-6">
          <MetricCards />
          <BugTable />
        </div>
      </main>
    </div>
  );
};

export default Index;
