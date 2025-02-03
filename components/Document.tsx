"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDoc } from "firebase/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";

function Document({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();
  const isOwner = useOwner();

  const { data, isLoading, error } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const docRef = doc(db, "documents", id);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    },
  });

  const mutation = useMutation({
    mutationFn: async (newTitle: string) => {
      const docRef = doc(db, "documents", id);
      await updateDoc(docRef, {
        title: newTitle,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document", id] });
    },
  });

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      mutation.mutate(input);
    }
  };

  React.useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex max-w-6xl mx-auto">
        <form onSubmit={updateTitle} className="flex space-x-2 flex-1">
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending ? "Updating..." : "Update"}
          </Button>
          
        </form>
      </div>
      <hr className="py-10"></hr>
      <Editor />
    </div>
  );
}

export default Document;
