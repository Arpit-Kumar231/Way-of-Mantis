// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import {
  query,
  where,
  collectionGroup,
  getDocs,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarItem from "./SidebarItem";
import AuthComponent from "./AuthComponent";
import CreateDocumentButton from "./CreateDocumentButton";

async function fetchUserDocuments(email: string | undefined) {
  if (!email) return null;

  const q = query(collectionGroup(db, "rooms"), where("userId", "==", email));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default function Sidebar() {
  const { user, isLoaded } = useUser();
  const [groupedData, setGroupedData] = React.useState<{
    owner: any[];
    editor: any[];
  }>({
    owner: [],
    editor: [],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["userDocuments", user?.emailAddresses[0]?.emailAddress],
    queryFn: () => fetchUserDocuments(user?.emailAddresses[0]?.emailAddress),
    // refetchInterval: 3000,
  });

  React.useEffect(() => {
    if (!data) return;

    const grouped = data.reduce(
      (acc, doc) => {
        if (doc.role === "owner") {
          acc.owner.push(doc);
        } else {
          acc.editor.push(doc);
        }
        return acc;
      },
      { owner: [], editor: [] }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <AuthComponent />
      <CreateDocumentButton />
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData?.owner?.length === 0 ? (
          <div>
            <h2 className="text-gray-500 font-semibold text-sm">
              No documents Found
            </h2>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-semibold text-gray-500">
              My Documents
            </h2>
            {groupedData?.owner?.map((doc: any) => (
              <SidebarItem key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData?.editor?.length === 0 ? (
          <div>
            <h2 className="text-gray-500 font-semibold text-sm">
              Shared Documents
            </h2>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-semibold text-gray-500">
              Shared Documents
            </h2>
            {groupedData?.editor?.map((doc: any) => (
              <SidebarItem key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}
