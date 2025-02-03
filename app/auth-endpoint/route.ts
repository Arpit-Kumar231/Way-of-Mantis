import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  auth.protect();
  const { sessionClaims } = await auth();
  const { room } = await request.json();
  const session = liveblocks.prepareSession(sessionClaims?.email!, {
    userInfo: {
      email: sessionClaims?.email!,
      name: sessionClaims?.fullName,
      avatar: sessionClaims?.image,
    },
  });
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email!)
    .get();
  const userInRoom = usersInRoom.docs.find(
    (doc) => doc.data().userId === sessionClaims?.email!
  );
  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status: status });
  } else {
    return new Response("You are not allowed in this room", { status: 401 });
  }
}
