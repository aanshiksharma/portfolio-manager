import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ListPlus, UserPen, Presentation, FolderPlus } from "lucide-react";
import Searchbar from "@/shared/components/ui/Searchbar";

const actions = [
  {
    href: "/projects/add",
    icon: <FolderPlus />,
    label: "Add a Project",
  },
  {
    href: "/skills/add",
    icon: <ListPlus />,
    label: "Add a Skill",
  },
  {
    href: "/personal/edit",
    icon: <UserPen />,
    label: "Edit Personal Info",
  },
  {
    href: "#",
    icon: <Presentation />,
    label: "View Portfolio",
  },
];

function DashboardHeader() {
  return (
    <section className="px-4 py-6 grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Workspace</h1>

        <Searchbar />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="secondary"
            className="h-10 justify-start"
            asChild
          >
            <Link to={action.href} className="flex items-center gap-2">
              {action.icon}
              {action.label}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}

export default DashboardHeader;
