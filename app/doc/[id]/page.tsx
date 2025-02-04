import React from "react";
import Document from "@/components/Document";

function page({ params }: { params: { id: string } }) {
  return (
    <div className="bg-slate-950 text-neutral-300">
      <Document id={params.id} />
    </div>
  );
}

export default page;
