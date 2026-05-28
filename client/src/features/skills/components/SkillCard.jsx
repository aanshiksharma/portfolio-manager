import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/ui/Button";

function SkillCard({ skill, handleDeleteSkill }) {
  const navigate = useNavigate();

  return (
    <div className="border border-border/30 hover:border-border rounded-lg p-4 flex flex-col h-full gap-4">
      <span className="flex-1 text-text-primary">{skill.name}</span>

      <div className="flex items-center gap-2">
        <Button
          label="Edit"
          icon={{ icon: "edit", size: 14 }}
          variant={"primary"}
          className="bg-transparent flex-1"
          onClick={() => navigate(`/skills/edit/${skill._id}`)}
        />

        <Button
          label="Delete"
          icon={{ icon: "trash", size: 14 }}
          variant={"delete"}
          className="bg-transparent flex-1"
          onClick={() => handleDeleteSkill(skill._id)}
        />
      </div>
    </div>
  );
}

export default SkillCard;
