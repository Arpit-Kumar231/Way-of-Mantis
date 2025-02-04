"use client";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import stringtoColor from "@/lib/stringtoColor";

function BlockNote({
  doc,
  provider,
  darkMode,
}: {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
}) {
  const userInfo = useSelf((me) => me.info);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringtoColor(userInfo?.email),
      },
    },
  });
  return (
    <div className="relative max-w-6xl mx-auto min-h-[800px] bg-white p-10 rounded-xl">
      <BlockNoteView editor={editor} theme={darkMode ? "dark" : "light"} />
    </div>
  );
}

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);
    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);
  if (!doc || !provider) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}

export default Editor;
