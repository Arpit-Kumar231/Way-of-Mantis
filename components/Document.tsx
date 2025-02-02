"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Document({ id }: { id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTranstion] = useTransition();
  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTranstion(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };
  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  return (
    <div>
      <div>
        <form onSubmit={updateTitle}>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Document;
