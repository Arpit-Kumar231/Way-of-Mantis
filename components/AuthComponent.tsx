"use client";
import React from "react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

function AuthComponent() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between pb-2 border-b-2">
      {user && <h1 className="text-lg font-semibold">{user?.firstName}</h1>}
      <div>
        <SignedOut>
          <Button asChild variant={"secondary"} className="flex justify-end">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default AuthComponent;
