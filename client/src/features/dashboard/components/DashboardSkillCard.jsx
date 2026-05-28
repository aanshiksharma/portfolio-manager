import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/ui/Button";

function DashboardSkillCard({ skill }) {
  const navigate = useNavigate();

  return (
    <div
      className="border-1 border-border/30 hover:border-border rounded-lg px-4 py-5 flex flex-col gap-1.5 transition duration-200 ease-out"
      onDoubleClick={() => navigate(`/skills/edit/${skill._id}`)}
    >
      <h3 className={`text-text-primary`}>{skill.name}</h3>

      <p className="text-xs text-text-muted">{skill.categoryName}</p>
    </div>
  );
}

export default DashboardSkillCard;
