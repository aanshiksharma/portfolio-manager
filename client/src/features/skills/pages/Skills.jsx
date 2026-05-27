import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useToast from "../../../shared/toast/useToast";
import Button from "../../../shared/components/ui/Button";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

import SkillCard from "../components/SkillCard";
import useSkill from "../hooks/useSkill";

function Skills() {
  const navigate = useNavigate();

  const { loading, skills, categories, deleteSkill } = useSkill();
  const { addToast } = useToast();

  const handleDeleteSkill = async (skillId) => {
    if (localStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to delete a skill.",
        "error",
      );
      return navigate("/auth/login");
    }

    const response = await deleteSkill(skillId);

    if (!response.success) {
      if (response.unauthorized) {
        addToast(
          "Access unauthorized!",
          "The token provided is either invalid or expired. Please login again.",
          "error",
        );

        return navigate("/auth/login");
      }

      return addToast("Some error occurred!", response.message, "error");
    }

    addToast("Skill deleted!", response.message, "success");
  };

  if (loading) return <LoadingScreen />;

  return (
    <>
      <div className="flex flex-col gap-8 px-4 py-8 w-full max-w-4xl mx-auto">
        <section className="flex items-center justify-between">
          <h1 className="text-[2rem] text-text-primary font-medium">Skills</h1>

          <div className="flex items-center gap-2">
            <Button icon={{ icon: "search", size: 16 }} variant={"primary"} />

            <Button
              label={"Add a skill"}
              icon={{ icon: "plus", size: 16 }}
              variant={"accent"}
              onClick={() => {
                navigate("/skills/add");
              }}
            />
          </div>
        </section>

        {categories.length === 0 ? (
          <section className="flex flex-col min-h-70 items-center justify-center gap-4 py-3">
            <h2 className="text-text-primary text-2xl text-center">
              No skills found.
            </h2>
            <Button
              variant={"accent"}
              label={"Add one right now"}
              icon={{ icon: "plus", size: 20 }}
              onClick={() => {
                navigate("/skills/add");
              }}
            />
          </section>
        ) : (
          categories.map((category) => {
            return (
              <section key={category._id} className="flex flex-col gap-4 py-3">
                <h3 className="font-semibold text-2xl pb-3 border-b-1 border-border text-text-primary">
                  {category.name}
                </h3>

                <ul className="grid grid-cols-4 gap-4 list-inside">
                  {skills.map((skill) => {
                    if (skill.category === category._id)
                      return (
                        <li
                          key={skill._id}
                          onDoubleClick={() =>
                            navigate(`/skills/edit/${skill._id}`)
                          }
                        >
                          <SkillCard
                            skill={skill}
                            handleDeleteSkill={handleDeleteSkill}
                          />
                        </li>
                      );
                  })}
                </ul>
              </section>
            );
          })
        )}
      </div>
    </>
  );
}

export default Skills;
