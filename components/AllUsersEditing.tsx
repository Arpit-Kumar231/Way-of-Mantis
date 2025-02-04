import { useOthers, useSelf } from "@liveblocks/react/suspense";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function AllUsersEditing() {
  const user = useSelf();
  const otherUsers = useOthers();
  const everyone = [user, ...otherUsers];
  console.log(everyone);
  return (
    <div className="flex items-center">
      <div className="text-slate-400 font-medium mr-2">Users editing:</div>
      {everyone.map((user) => (
        <div key={user.id}>
          <Avatar>
            <AvatarImage src={`${user.info.avatar}`} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
}

export default AllUsersEditing;
