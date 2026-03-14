export type Severity = "critical" | "high" | "medium" | "low";
export type BugStatus = "open" | "investigating" | "resolved" | "duplicate";
export type BugCategory = "UI Glitch" | "Missing Page" | "Broken Link" | "Network Error" | "Performance" | "Slow Page";

export interface Bug {
  id: string;
  title: string;
  category: string;
  severity: Severity;
  status: BugStatus;
  url: string;
  detectedAt: string;
  consoleErrors: string[];
  loadTime: number;
  screenshot: string;
  description: string;
  aiClassification: string;
  duplicateOf: string | null;
}

export interface BugReport {
  projectName: string;
  totalBugs: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  avgLoadTime: number;
  successRate: number;
  generatedAt: string;
}
