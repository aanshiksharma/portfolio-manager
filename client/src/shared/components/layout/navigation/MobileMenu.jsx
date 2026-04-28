import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import Pill from "../../ui/Pill";

import links from "./links.data.json";

function MobileMenu({ sidebarVisible, toggleSidebar }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setLoggedIn(true);
  }, []);

  const toggleDropDown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("login-mode");
    navigate("/");
  };

  return (
    sidebarVisible && (
      <div className="sm:hidden fixed inset-0 z-99 h-screen  backdrop-blur">
        <aside className="flex flex-col justify-between h-full px-4 py-8 w-3/4 max-w-xs bg-bg-base/95 backdrop-blur shadow-lg shadow-white/10 border-r-1 border-border">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Button
                icon={{ icon: "list", size: 24 }}
                variant="secondary"
                onClick={toggleSidebar}
                className="self-start backdrop-blur"
              />

              <p>Portfolio Manager</p>
            </div>

            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                return (
                  <Pill
                    key={link.path}
                    to={link.path}
                    label={link.label}
                    icon={{ link: link.icon, size: 16 }}
                    className="!justify-start px-4 py-4"
                  />
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4 relative">
            <Button
              icon={{ icon: "person-fill", size: 16 }}
              variant={"accent"}
              className={"!rounded-full border-none"}
              onClick={toggleDropDown}
            />

            <p>User's Name</p>
          </div>

          {dropdownVisible && (
            <div className="dropdown absolute right-3 top-[58.8px] py-2 min-w-30 rounded-lg bg-bg-base border-border border-1">
              <Button
                label={loggedIn ? "Login as Guest" : "Login as Admin"}
                variant={"secondary"}
                className={"w-full rounded-none"}
                onClick={() => {
                  if (loggedIn) navigate("/auth/visitor-login");
                  else navigate("/auth/login");
                }}
              />

              <Button
                label={"Log Out"}
                variant={"secondary"}
                className={"w-full rounded-none"}
                onClick={() => {
                  handleLogout();
                }}
              />
            </div>
          )}
        </aside>
      </div>
    )
  );
}

export default MobileMenu;
