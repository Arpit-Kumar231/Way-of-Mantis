"use client";

import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

async function getDocument(id: string) {
  const docRef = doc(db, "documents", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

function SidebarOption({ href, id }: { href: string; id: string }) {
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  const { data, isLoading } = useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocument(id),
  });

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`
        group flex items-center px-2 py-1 my-1 rounded-lg transition-all duration-200 ease-in-out
        hover:bg-gray-100 dark:hover:bg-gray-800
        ${
          isActive
            ? "bg-blue-50 dark:bg-gray-800 border-l-4 border-black"
            : "hover:translate-x-1"
        }
      `}
    >
      <svg
        className={`w-5 h-5 mr-3 ${
          isActive
            ? "text-black-500"
            : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
        }`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>

      <p
        className={`truncate ${
          isActive
            ? "text-black dark:text-gray-200 font-semibold text-sm"
            : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white font-semibold text-sm"
        }`}
      >
        {data.title}
      </p>

      {isLoading && (
        <div className="ml-auto">
          <div className="w-4 h-4 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      )}
    </Link>
  );
}

export default SidebarOption;
