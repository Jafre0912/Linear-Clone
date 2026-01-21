import { Sidebar } from "@/components/Sidebar";
import { IssueList } from "@/components/IssueList";
import { supabase } from "@/lib/supabase";

// Force dynamic rendering so we always see new data
export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Fetch data directly in the server component
  const { data: issues } = await supabase
    .from('issues')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex h-screen overflow-hidden bg-[#141414]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-white">My Issues</h1>
          </div>
          
          {/* 2. Pass data to the Client Component */}
          <IssueList issues={issues || []} />
          
        </div>
      </main>
    </div>
  );
}