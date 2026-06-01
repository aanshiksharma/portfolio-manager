import { Outlet, useLocation } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Sidebar from "@/shared/components/layout/navigation/Sidebar";

function MainLayout() {
  const location = useLocation();
  const pathname = location.pathname.split("/");

  return (
    <SidebarProvider>
      <Sidebar />

      <main className="flex-1">
        <header className="sticky top-0 z-100 bg-background flex h-16 shrink-0 items-center gap-2 px-4 border-b">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 mt-6 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              {pathname.map((path, index) => {
                if (
                  index > 0 &&
                  index < pathname.length - 2 &&
                  pathname.length > 2
                )
                  return (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">{path}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />;
                    </>
                  );
              })}
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {pathname[pathname.length - 1] === ""
                    ? "overview"
                    : pathname[pathname.length - 1]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default MainLayout;
