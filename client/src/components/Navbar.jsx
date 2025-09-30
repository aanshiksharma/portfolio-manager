import Pill from "./Pill";

function Navbar() {
  const links = [
    { path: "/", label: "Overview", icon: "book" },
    { path: "/projects", label: "Projects", icon: "layout" },
    { path: "/skills", label: "Skills", icon: "cpu" },
    { path: "/personal", label: "Personal", icon: "person" },
  ];

  return (
    <>
      <header className="border-b-1 border-border px-4 py-3 fixed inset-0 bottom-auto bg-bg-base/25 backdrop-blur-3xl">
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
      </header>
    </>
  );
}

export default Navbar;
