import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Breadcrumbs() {
  const path = usePathname();
  const parts = path.split("/");
  const partsWithoutSpace = parts.filter((part) => part !== "");

  return (
    <Breadcrumb className="justify-center flex pb-4">
      <BreadcrumbList>
        <BreadcrumbItem className="hover:text-slate-100">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {partsWithoutSpace.map((part, index) => {
          const href = `/${parts.slice(0, index + 1).join("/")}`;
          const isLast = index === parts.length - 1;

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="hover:text-slate-100">
                {isLast ? (
                  <BreadcrumbPage>{part}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{part}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
