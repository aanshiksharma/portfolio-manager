import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

function SkillsHeader({ skills }) {
  return (
    <section className="px-4 py-6 grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Skills Library</h1>
        <Button asChild>
          <Link to="/skills/add">Add Skill</Link>
        </Button>
      </div>

      <p className="text-secondary-foreground">
        Organize and maintain your portfolio skill set
      </p>

      <div className="text-muted-foreground text-xs space-x-2">
        <span>
          {skills ? skills.length : "-"} Skill{skills?.length > 1 && "s"}
        </span>
        <span>&bull;</span>
        <span>Updated 7d ago</span>
      </div>
    </section>
  );
}

export default SkillsHeader;
