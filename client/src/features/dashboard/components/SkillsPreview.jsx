import { useNavigate } from "react-router-dom";

import useSkill from "../../skills/hooks/useSkill";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

import Button from "../../../shared/components/ui/Button";
import DashboardSkillCard from "./DashboardSkillCard";

function SkillsPreview() {
  const navigate = useNavigate();

  const { skills, loading } = useSkill();

  if (loading) return <LoadingScreen />;

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

      <div className="grid grid-cols-3 gap-4">
        {skills?.map(
          (skill, index) =>
            index < 5 && <DashboardSkillCard key={skill._id} skill={skill} />,
        )}
      </div>
    </section>
  );
}

export default SkillsPreview;
