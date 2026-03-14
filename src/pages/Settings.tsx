import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="mb-5">
        <h1 className="text-lg font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure BugBuddy</p>
      </div>

      <div className="max-w-lg space-y-6">
        {/* Notifications */}
        <section className="rounded-lg border border-border bg-card p-4 space-y-4">
          <h2 className="text-sm font-semibold text-card-foreground">Notifications</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts" className="text-sm">Email alerts for new bugs</Label>
              <Switch id="email-alerts" defaultChecked />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs text-muted-foreground">Notification email</Label>
              <Input id="email" type="email" placeholder="dev@acme.io" className="mt-1 h-8 text-sm" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="critical-only" className="text-sm">Critical bugs only</Label>
              <Switch id="critical-only" />
            </div>
          </div>
        </section>

        {/* CI/CD */}
        <section className="rounded-lg border border-border bg-card p-4 space-y-3">
          <h2 className="text-sm font-semibold text-card-foreground">CI/CD Integration</h2>
          <div>
            <Label htmlFor="api-key" className="text-xs text-muted-foreground">API Key</Label>
            <Input id="api-key" readOnly value="bb_live_a1b2c3d4e5f6g7h8i9j0" className="mt-1 h-8 text-sm font-mono" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">CLI Command</Label>
            <pre className="mt-1 rounded-md bg-foreground/5 p-3 text-[11px] font-mono text-muted-foreground overflow-x-auto">
              npx bugbuddy scan --url https://your-app.com --api-key YOUR_KEY
            </pre>
          </div>
        </section>

        {/* Scan Config */}
        <section className="rounded-lg border border-border bg-card p-4 space-y-3">
          <h2 className="text-sm font-semibold text-card-foreground">Scan Configuration</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="timeout" className="text-xs text-muted-foreground">Page timeout (ms)</Label>
              <Input id="timeout" type="number" defaultValue={30000} className="mt-1 h-8 text-sm" />
            </div>
            <div>
              <Label htmlFor="max-pages" className="text-xs text-muted-foreground">Max pages per scan</Label>
              <Input id="max-pages" type="number" defaultValue={50} className="mt-1 h-8 text-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="screenshots" className="text-sm">Auto-capture screenshots</Label>
            <Switch id="screenshots" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-classify" className="text-sm">AI bug classification</Label>
            <Switch id="ai-classify" defaultChecked />
          </div>
        </section>

        <Button onClick={() => toast.success("Settings saved")} className="w-full text-sm">
          Save Settings
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
