"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import { usePathname } from "next/navigation";
import { inviteUser } from "@/actions/actions";
import { Input } from "./ui/input";
import { toast } from "sonner";

function InviteUser() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const pathName = usePathname();
  const queryClient = useQueryClient();

  const inviteMutation = useMutation({
    mutationFn: async ({
      roomId,
      email,
    }: {
      roomId: string;
      email: string;
    }) => {
      const result = await inviteUser(roomId, email);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDocuments"] });
      setIsOpen(false);
      setEmail("");
      toast.success("User Invited");
    },
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const roomId = pathName.split("/").pop();
    if (!roomId) return;

    inviteMutation.mutate({ roomId, email });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="secondary">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a User to Collaborate!</DialogTitle>
          <DialogDescription>
            Enter email of the user you want to invite
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-2" onSubmit={handleInvite}>
          <Input
            type="email"
            placeholder="email"
            className="w-full"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button disabled={inviteMutation.isPending}>
            {inviteMutation.isPending ? "Inviting.." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUser;
