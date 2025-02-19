"use client";
import AuthComponent from "@/components/AuthComponent";
import CreateDocumentButton from "@/components/CreateDocumentButton";
import { useUser } from "@clerk/nextjs";
import { Pen } from "lucide-react";

export default function Home() {
  const user = useUser();
  if (!user.isSignedIn)
    return (
      <main className="flex  justify-end h-screen bg-slate-950">
        <div className="flex mx-auto flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-bold text-muted-foreground">
              Note-Flow
            </span>
            <Pen className="h-12 w-12 text-primary" />
          </div>
          <p className="text-3xl text-muted-foreground">
            Your all-in-one workspace for ideas, docs & tasks
          </p>
          <AuthComponent />
        </div>
      </main>
    );
  return (
    <main className="flex  justify-end h-screen bg-slate-950">
      <div className="flex mx-auto flex-col items-center justify-center gap-8">
        <div className="flex items-center gap-4">
          <span className="text-6xl font-bold text-muted-foreground">
            Note-Flow
          </span>
          <Pen className="h-12 w-12 text-primary" />
        </div>
        <p className="text-3xl text-muted-foreground">
          Your all-in-one workspace for ideas, docs & tasks
        </p>
        <CreateDocumentButton />
      </div>
    </main>
  );
}
