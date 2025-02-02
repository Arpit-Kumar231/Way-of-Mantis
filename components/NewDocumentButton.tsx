"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNewDocument,
    onSuccess: (data) => {
      router.push(`/doc/${data.docId}`);
    }
  });

  return (
    <Button 
      onClick={() => mutation.mutate()} 
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Creating Document..." : "New Document"}
    </Button>
  );
}

export default NewDocumentButton;
