import { useState } from "react";

import HeaderNavigation from "./navigation/HeaderNavigation";
import MobileMenu from "./navigation/MobileMenu";
import Button from "./Button";

function Navbar({ text }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <>
      <header className="sm:hidden fixed inset-0 bottom-auto px-4 py-8">
        <Button
          icon={{ icon: "list", size: 24 }}
          variant="secondary"
          onClick={toggleSidebar}
          className="self-start border-0 backdrop-blur"
        />
      </header>

      <HeaderNavigation text={text && text} />

      <MobileMenu
        sidebarVisible={sidebarVisible}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
}

export default Navbar;
