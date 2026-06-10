import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SunMoon, LogOut } from "lucide-react";

import { useTheme } from "@/shared/hooks/useTheme";
import useAuth from "@/features/auth/hooks/useAuth";
import useAdmin from "@/features/admin/hooks/useAdmin";

import links from "./links.data.json";
import { useNavigate } from "react-router-dom";

function SideBar({ ...props }) {
  const { toggleTheme } = useTheme();
  const { loading, admin } = useAdmin();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="xl"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              asChild
            >
              <a href="/">
                {loading || !admin ? (
                  <>
                    <Skeleton className="h-10 w-10 rounded-full" />

                    <div className="grid flex-1 gap-1.5">
                      <Skeleton className="w-full h-3 rounded-sm" />
                      <Skeleton className="w-full h-3 rounded-sm" />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarImage
                        src={admin.profileImage.url}
                        alt={admin.name}
                      />
                      <AvatarFallback className="rounded-lg">AS</AvatarFallback>
                    </Avatar>

                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{admin.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        Admin
                      </span>
                    </div>
                  </>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {links.map((link) => (
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton asChild>
                  <a href={link.url}>{link.title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={toggleTheme}>
              <button>
                <SunMoon />
                Toggle Theme
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={handleLogout}>
              <button>
                <LogOut />
                Log out
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBar;
