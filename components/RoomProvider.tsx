"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";
import LiveCursorProvider from "./LiveCursorProvider";
import { Loader } from "lucide-react";

function RoomProviderComp({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<div><Loader className="animate-spin"/></div>}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default RoomProviderComp;
