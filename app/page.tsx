import CreateDocumentButton from "@/components/CreateDocumentButton";
import { Pen } from "lucide-react";


export default function Home() {
  return (
    <main className="flex  justify-end h-screen">
      <div className="flex mx-auto flex-col items-center justify-center gap-8">
        <div className="flex items-center gap-4">
          <span className="text-6xl font-bold text-primary">Note-Flow</span>
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
