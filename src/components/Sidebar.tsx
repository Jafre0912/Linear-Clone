"use client";

import { useState } from "react";
import { Inbox, ListTodo, BarChart3, Settings, Plus, Search, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createIssue } from "@/app/actions";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("My Issues"); // Tracks which button is active

  return (
    <div className="w-64 h-screen bg-[#1c1c1c] border-r border-[#2e2e2e] flex flex-col text-zinc-400">
      {/* Workspace Name */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium text-zinc-100 cursor-pointer hover:bg-[#2e2e2e] p-2 rounded-md transition-colors w-full">
          <div className="w-5 h-5 bg-indigo-500 rounded text-[10px] flex items-center justify-center text-white font-bold">
            J
          </div>
          <span>Jafre's Workspace</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-3 pb-2 space-y-1">
        
        {/* NEW ISSUE MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-[#2a2a2a] h-8 text-sm font-normal">
              <Plus className="mr-2 h-4 w-4" />
              New Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1c1c1c] border-[#2e2e2e] text-zinc-100">
            <DialogHeader>
              <DialogTitle>Create New Issue</DialogTitle>
            </DialogHeader>
            <form action={async (formData) => {
                await createIssue(formData);
                setOpen(false);
            }} className="space-y-4 mt-4">
              <Input name="title" placeholder="Issue Title" className="bg-[#141414] border-[#2e2e2e]" required />
              <div className="relative">
  <Input 
    id="desc-input"
    name="description" 
    placeholder="Description..." 
    className="bg-[#141414] border-[#2e2e2e] pr-10" 
  />
  <button
    type="button"
    onClick={async () => {
      const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement;
      const descInput = document.querySelector('#desc-input') as HTMLInputElement;
      if (!titleInput.value) return alert("Please enter a title first!");
      
      descInput.value = "✨ Generating AI subtasks...";
      
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ title: titleInput.value })
      });
      const data = await res.json();
      descInput.value = data.text;
    }}
    className="absolute right-2 top-2 text-indigo-400 hover:text-indigo-300"
    title="Generate with AI"
  >
    ✨
  </button>
</div>
              
              <div className="flex gap-4">
                <Select name="priority" defaultValue="none">
                  <SelectTrigger className="w-full bg-[#141414] border-[#2e2e2e]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1c1c1c] border-[#2e2e2e] text-white">
                    <SelectItem value="none">No Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select name="status" defaultValue="todo">
                  <SelectTrigger className="w-full bg-[#141414] border-[#2e2e2e]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1c1c1c] border-[#2e2e2e] text-white">
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">Create Issue</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-[#2a2a2a] h-8 text-sm font-normal">
          <Search className="mr-2 h-4 w-4" />
          Search
          <span className="ml-auto text-xs text-zinc-600">⌘K</span>
        </Button>
      </div>

      {/* Main Navigation - NOW INTERACTIVE */}
      <div className="px-3 py-2">
        <div className="space-y-0.5">
          <NavItem 
            icon={<Inbox className="h-4 w-4" />} 
            label="Inbox" 
            isActive={activeTab === "Inbox"} 
            onClick={() => setActiveTab("Inbox")}
          />
          <NavItem 
            icon={<ListTodo className="h-4 w-4" />} 
            label="My Issues" 
            isActive={activeTab === "My Issues"} 
            onClick={() => setActiveTab("My Issues")}
          />
          <NavItem 
            icon={<BarChart3 className="h-4 w-4" />} 
            label="Views" 
            isActive={activeTab === "Views"} 
            onClick={() => setActiveTab("Views")}
          />
        </div>
      </div>
      
      <div className="px-4 py-2"><Separator className="bg-[#2e2e2e]" /></div>
      
      {/* Teams */}
      <div className="px-3 py-2">
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Your Teams</h3>
        <NavItem icon={<Hash className="h-4 w-4" />} label="Engineering" />
        <NavItem icon={<Hash className="h-4 w-4" />} label="Design" />
        <NavItem icon={<Hash className="h-4 w-4" />} label="Marketing" />
      </div>

      <div className="mt-auto p-4">
         <div className="flex items-center gap-2 text-sm hover:text-zinc-100 cursor-pointer text-zinc-500">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
         </div>
      </div>
    </div>
  );
}

// Updated NavItem to handle clicks
function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive?: boolean; onClick?: () => void }) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`w-full justify-start h-8 text-sm font-normal ${
        isActive ? "bg-[#2a2a2a] text-zinc-100" : "text-zinc-400 hover:text-zinc-100 hover:bg-[#2a2a2a]"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Button>
  );
}