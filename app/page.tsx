import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse justify-end">
      <h1 className="font-bold">Get started by creating a new document</h1>
      <ArrowRightCircle className="w-12 h-12" />
    </main>
  );
}
