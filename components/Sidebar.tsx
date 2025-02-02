"use client";

import React, { useEffect } from "react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import SidebarOption from "./SidebarOption";

export default function Sidebar() {
  const { user, isLoaded } = useUser();
  const [groupedData, setGroupedData] = React.useState<any>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    // Only create query when user is loaded and exists
    isLoaded && user?.emailAddresses[0]?.emailAddress
      ? query(
          collectionGroup(db, "rooms"),
          where("userId", "==", user.emailAddresses[0].emailAddress.toString())
        )
      : null
  );
  useEffect(() => {
    console.log(data + "data");
    if (!data) return;
    const grouped = data.docs.reduce(
      (acc, doc) => {
        const roomData = doc.data();
        if (roomData.role === "owner") {
          acc?.owner.push({
            id: doc.id,
            ...roomData,
          });
        } else {
          acc?.editor.push({
            id: doc.id,
            ...roomData,
          });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
    setGroupedData(grouped);
  }, [data]);
  console.log(groupedData);
  const menuOptions = (
    <>
      <NewDocumentButton />
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
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData?.editor?.length === 0 ? (
          <div>
            <h2 className="text-gray-500 font-semibold text-sm">
              Shared with me
            </h2>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-semibold text-gray-500">
              Shared with me
            </h2>
            {groupedData?.editor?.map((doc: any) => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
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
