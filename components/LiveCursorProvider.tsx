// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useOthers } from "@liveblocks/react";
import { useMyPresence } from "@liveblocks/react/suspense";
import React from "react";
import Pointer from "./Pointer";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();
  const handlePointerMove = (e: React.PointerEvent) => {
    updateMyPresence({
      cursor: {
        x: Math.floor(e.pageX),
        y: Math.floor(e.pageY),
      },
    });
  };
  const handlePointerLeave = () => {
    updateMyPresence({
      cursor: null,
    });
  };
  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others.filter((other) => other.presence.cursor != null).map(({connectionId , presence , info}) => (
       <Pointer key={connectionId} presence={myPresence} info={info} />
      ))}
      {children}
    </div>
  );
}

export default LiveCursorProvider;
