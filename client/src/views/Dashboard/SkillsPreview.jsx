import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import SkillListItem from "../../components/SkillListItem";

function SkillsPreview({ skills }) {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2 py-1">
        <h4 className="font-semibold text-xl">Skills</h4>
        <Button
          variant="normal"
          label="See All ->"
          onClick={() => navigate("/skills")}
        />
      </div>

      <div className="flex flex-col gap-1">
        {skills?.map(
          (skill, index) =>
            index < 5 && (
              <SkillListItem
                key={skill._id}
                id={skill._id}
                name={skill.name}
                categoryName={skill.categoryName}
                disableDelete
                onDoubleClick={() => navigate(`/skills/edit/${skill._id}`)}
              />
            )
        )}
      </div>
    </section>
  );
}

export default SkillsPreview;
