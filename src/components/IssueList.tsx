import { Issue } from "@/lib/types";
import { Circle, CheckCircle2, AlertCircle, ArrowUpCircle, Minus } from "lucide-react";

export function IssueList({ issues }: { issues: Issue[] }) {
  if (issues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] border border-dashed border-[#2e2e2e] rounded-lg text-zinc-500">
        <p>No issues found</p>
        <p className="text-sm">Create your first issue to get started.</p>
      </div>
    );
  }

  return (
    <div className="border border-[#2e2e2e] rounded-lg bg-[#1c1c1c] overflow-hidden">
      {issues.map((issue) => (
        <div
          key={issue.id}
          className="flex items-center gap-4 p-4 border-b border-[#2e2e2e] hover:bg-[#252525] transition-colors group cursor-default"
        >
            {/* Status Icon */}
          <div className="text-zinc-500">
            {issue.status === "done" ? <CheckCircle2 className="w-4 h-4 text-indigo-400" /> : <Circle className="w-4 h-4" />}
          </div>

          {/* Identifier (Fake ID for visuals) */}
          <div className="text-xs font-mono text-zinc-500 min-w-[50px]">
            LIN-{issue.id.substring(0, 3).toUpperCase()}
          </div>

          {/* Title */}
          <div className="flex-1 font-medium text-sm text-zinc-200">
            {issue.title}
          </div>

           {/* Priority Icon */}
          <div className="text-zinc-500 pr-4">
             {issue.priority === "high" && <ArrowUpCircle className="w-4 h-4 text-orange-500" />}
             {issue.priority === "medium" && <ArrowUpCircle className="w-4 h-4 text-yellow-500" />}
             {issue.priority === "low" && <Minus className="w-4 h-4" />}
          </div>
        </div>
      ))}
    </div>
  );
}