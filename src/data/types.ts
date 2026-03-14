export type Severity = "critical" | "high" | "medium" | "low";
export type BugStatus = "open" | "fixed" | "ignored";
export type BugCategory =
  | "Console Error"
  | "Broken Link"
  | "Slow Page"
  | "UI Glitch"
  | "Network Error"
  | "Missing Page";

export interface Bug {
  id: string;
  title: string;
  category: BugCategory;
  severity: Severity;
  status: BugStatus;
  url: string;
  detectedAt: string;
  consoleErrors: string[];
  loadTime: number;
  description: string;
  aiClassification: string;
  duplicateOf: string | null;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  lastScan: string;
  bugCount: number;
  status: "healthy" | "warning" | "critical";
}
