import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ListPlus, UserPen, Presentation, FolderPlus } from "lucide-react";
import Searchbar from "@/shared/components/ui/Searchbar";

import useAdmin from "@/features/admin/hooks/useAdmin";

const iconSize = "size-6";

const actions = [
  {
    href: "/projects/add",
    icon: <FolderPlus className={iconSize} />,
    label: "Add a Project",
  },
  {
    href: "/skills/add",
    icon: <ListPlus className={iconSize} />,
    label: "Add a Skill",
  },
  {
    href: "/profile/edit",
    icon: <UserPen className={iconSize} />,
    label: "Edit Profile",
  },
];

function DashboardHeader() {
  const { loading, admin } = useAdmin();

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Workspace</h1>

        <Searchbar
          placeholder="Search projects, skills, etc..."
          className="max-w-2xs"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        {actions.map((action, index) => (
          <Button key={index} variant="outline" asChild>
            <Link
              to={action.href}
              className="flex-col py-16 items-center gap-3"
            >
              {action.icon}
              <span>{action.label}</span>
            </Link>
          </Button>
        ))}

        <Button variant="outline" asChild>
          <a
            href={loading || !admin ? "/" : admin.portfolioLink}
            target="_blank"
            className="flex-col py-16 items-center gap-3"
          >
            <Presentation className={iconSize} />
            <span>View Portfolio</span>
          </a>
        </Button>
      </div>
    </section>
  );
}

export default DashboardHeader;
