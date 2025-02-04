"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createNewDocument } from "@/actions/actions";
import { PlusCircleIcon } from "lucide-react";
import { query } from "firebase/firestore";
const queryClient = new QueryClient();

function CreateDocumentButton() {
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
      <PlusCircleIcon />
    </Button>
  );
}

export default CreateDocumentButton;
