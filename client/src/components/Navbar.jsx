import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Pill from "./Pill";
import Button from "./Button";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && setLoggedIn(true);
  }, []);

  const links = [
    { path: "/dashboard", label: "Overview", icon: "book" },
    { path: "/projects", label: "Projects", icon: "layout" },
    { path: "/skills", label: "Skills", icon: "cpu" },
    { path: "/personal", label: "Personal", icon: "person" },
  ];

  const toggleDropDown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login-mode");
    navigate("/");
  };

  return (
    <>
      <header className="border-b-1 border-border px-4 py-3 fixed inset-0 bottom-auto bg-bg-base/25 backdrop-blur-3xl flex items-center justify-between">
        <nav className="flex gap-4 items-center">
          {links.map((link) => {
            return (
              <Pill
                key={link.path}
                to={link.path}
                label={link.label}
                icon={{ link: link.icon, size: 16 }}
              />
            );
          })}
        </nav>

        <Button
          icon={{ icon: "person-fill", size: 16 }}
          variant={"accent"}
          className={"!rounded-full border-none"}
          onClick={toggleDropDown}
        />

        {dropdownVisible && (
          <div className="dropdown absolute right-3 top-[58.8px] py-2 min-w-30 rounded-lg border-border border-1">
            <Button
              label={loggedIn ? "Log Out" : "Login as Admin"}
              variant={"secondary"}
              className={"w-full rounded-none"}
              onClick={() => {
                if (loggedIn) handleLogout();
                else navigate("/auth/login");
              }}
            />
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
