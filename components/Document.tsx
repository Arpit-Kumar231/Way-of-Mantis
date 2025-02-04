"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDoc } from "firebase/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDoc";
import InviteUser from "./InviteUser";
import Breadcrumbs from "./Breadcrumbs";
import { Loader } from "lucide-react";
import AllUsersEditing from "./AllUsersEditing";

function Document({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();
  const isOwner = useOwner();

  const { data, error , isLoading } = useQuery({
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

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim() && input !== data?.title) {
        mutation.mutate(input);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [input]);

  if (error) return <div>Error: {error.message}</div>;
  if(isLoading) return <div className="h-screen flex items-center justify-center"><Loader className="animate-spin text-white w-12 h-12"/></div>;

  return (
    <div>
      <div className="flex max-w-6xl mx-auto flex-col gap-4 pt-16">
        <div className="flex items-center gap-3 pb-10">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ all: "unset", flex: 1, fontSize: "4rem", fontWeight: 700 }}
          />
        </div>
        <div className="flex justify-between items-center">
          <Breadcrumbs />
          <AllUsersEditing />
          <div className="pb-2 flex gap-2">
            {isOwner && <InviteUser />}

            {isOwner && <DeleteDocument />}
          </div>
        </div>
      </div>
      <Editor />
    </div>
  );
}

export default Document;
