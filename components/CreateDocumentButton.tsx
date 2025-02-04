"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewDocument } from "@/actions/actions";
import { PlusCircleIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

function CreateDocumentButton() {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNewDocument,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["userDocuments", user?.emailAddresses[0]?.emailAddress],
      });
      if (data == "") {
        return;
      }

      router.push(`/doc/${data?.docId}`);
    },
  });

  return (
    <Button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className="bg-slate-800 text-white"
    >
      {mutation.isPending ? "Creating Document..." : "New Document"}
      <PlusCircleIcon />
    </Button>
  );
}

export default CreateDocumentButton;
