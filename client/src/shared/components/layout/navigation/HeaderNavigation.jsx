import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import Pill from "../../ui/Pill";

import links from "./links.data.json";

function HeaderNavigation({ text }) {
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
    <header className="border-b-1 border-border px-4 py-3 fixed inset-0 bottom-auto bg-bg-base/25 backdrop-blur-3xl hidden sm:flex items-center justify-between">
      {text ? (
        <span>{text}</span>
      ) : (
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
      )}

      <Button
        icon={{ icon: "person-fill", size: 16 }}
        variant={"accent"}
        className={"!rounded-full border-none"}
        onClick={toggleDropDown}
      />

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
    </header>
  );
}

export default HeaderNavigation;
