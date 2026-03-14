import { LayoutDashboard, FolderOpen, FileText, Settings, Bug } from "lucide-react";
import SidebarNavLink from "./SidebarNavLink";

const AppSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-56 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
        <Bug className="h-6 w-6 text-primary" />
        <span className="text-base font-bold tracking-tight text-foreground">AutoBugTester</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        <SidebarNavLink to="/" icon={LayoutDashboard} label="Dashboard" />
        <SidebarNavLink to="/projects" icon={FolderOpen} label="Projects" />
        <SidebarNavLink to="/reports" icon={FileText} label="Reports" />
        <SidebarNavLink to="/settings" icon={Settings} label="Settings" />
      </nav>

      <div className="border-t border-border px-4 py-3">
        <p className="text-xs text-muted-foreground">v1.0.0 · MIT License</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
