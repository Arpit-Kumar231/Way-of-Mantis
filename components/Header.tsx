"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";

function Header() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-6">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          {`'s`} World
        </h1>
      )}
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
