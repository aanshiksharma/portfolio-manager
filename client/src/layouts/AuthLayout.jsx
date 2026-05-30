import { Outlet } from "react-router-dom";
import { useTheme } from "@/shared/hooks/useTheme";

function AuthLayout() {
  const { theme } = useTheme();

  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
