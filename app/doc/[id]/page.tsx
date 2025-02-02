import Document from "@/components/Document";
import React from "react";

function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Document id={params.id} />
    </div>
  );
}

export default page;
