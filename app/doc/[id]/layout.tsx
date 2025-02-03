import RoomProviderComp from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import React from "react";

function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  auth.protect();
  return <RoomProviderComp roomId={params.id}>{children}</RoomProviderComp>;
}

export default layout;
