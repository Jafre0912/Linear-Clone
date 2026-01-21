import { Sidebar } from "@/components/Sidebar";
import { IssueList } from "@/components/IssueList";
import { supabase } from "@/lib/supabase";
import { Inbox, BarChart } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home(props: { searchParams: Promise<{ view?: string }> }) {
  // 1. Fetch search params (for Next.js 15 support)
  const searchParams = await props.searchParams;
  const currentView = searchParams.view || "my_issues";

  // 2. Fetch issues from DB
  const { data: issues } = await supabase
    .from('issues')
    .select('*')
    .order('created_at', { ascending: false });

  // 3. Decide what content to show based on "view"
  let content;

  if (currentView === "inbox") {
    content = (
      <div className="flex flex-col items-center justify-center h-[400px] text-zinc-500">
        <div className="w-12 h-12 bg-[#2e2e2e] rounded-full flex items-center justify-center mb-4">
          <Inbox className="w-6 h-6 text-zinc-400" />
        </div>
        <h3 className="text-zinc-200 font-medium">Inbox Zero</h3>
        <p className="text-sm">You have no new notifications.</p>
      </div>
    );
  } else if (currentView === "views") {
    content = (
      <div className="flex flex-col items-center justify-center h-[400px] text-zinc-500">
         <div className="w-12 h-12 bg-[#2e2e2e] rounded-full flex items-center justify-center mb-4">
          <BarChart className="w-6 h-6 text-zinc-400" />
        </div>
        <h3 className="text-zinc-200 font-medium">Analytics</h3>
        <p className="text-sm">Project insights will appear here.</p>
      </div>
    );
  } else {
    // Default: "My Issues"
    content = <IssueList issues={issues || []} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#141414]">
      {/* Pass issues to Sidebar so Search works */}
      <Sidebar issues={issues || []} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-white capitalize">
              {currentView.replace('_', ' ')}
            </h1>
          </div>
          
          {content}
          
        </div>
      </main>
    </div>
  );
}