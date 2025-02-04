import React from "react";
import Document from "@/components/Document";

function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Document id={params.id} />
    </div>
  );
}

export default page;
