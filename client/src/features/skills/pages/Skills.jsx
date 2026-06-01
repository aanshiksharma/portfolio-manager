import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useToast from "../../../shared/toast/useToast";
import useSkill from "../hooks/useSkill";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, LayoutGrid, List, Plus } from "lucide-react";

import Searchbar from "@/shared/components/ui/Searchbar";

import { SkillCardSkeleton, SkillCard } from "../components/SkillCard";
import SkillsHeader from "../components/SkillsHeader";

function Skills() {
  const [searchInput, setSearchInput] = useState("");
  const [layout, setLayout] = useState("grid");
  const navigate = useNavigate();

  const { loading, skills, deleteSkill } = useSkill();
  const { addToast } = useToast();

  const toggleLayout = () => {
    setLayout((prev) => {
      if (prev === "list") return "grid";
      else return "list";
    });
  };

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

  const filteredSkills =
    skills?.filter((skill) => {
      const titleMatch = skill.name
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      const categoryMatch = skill.categoryName
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      return titleMatch || categoryMatch;
    }) || [];

  return (
    <>
      <SkillsHeader skills={skills} />
      <Separator />

      <section className="px-4 py-6 grid gap-6">
        <div className="flex items-center justify-between gap-2">
          <Searchbar
            placeholder="Search Skills by name..."
            className={"max-w-xs bg-transparent"}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <ArrowUpDown />
              Sort
            </Button>
            <Button variant="outline" size="icon" onClick={toggleLayout}>
              {layout === "grid" ? <List /> : <LayoutGrid />}
            </Button>
          </div>
        </div>

        <div
          className={`
            grid gap-4
            ${layout === "grid" && "lg:grid-cols-2 2xl:grid-cols-3 min-[116rem]:grid-cols-4"}
          `}
        >
          {loading || !skills ? (
            Array.from(new Array(3)).map((_, index) => (
              <SkillCardSkeleton key={index} />
            ))
          ) : skills.length === 0 ? (
            <section
              className={`
                ${layout === "grid" && "lg:col-span-2 2xl:col-span-3 min-[116rem]:col-span-4"}
                flex flex-col min-h-70 items-center justify-center gap-4 py-3
              `}
            >
              <h2>No skills found!</h2>
              <Button asChild>
                <Link to={"/skills/add"}>
                  <Plus />
                  <span>Add a Skill</span>
                </Link>
              </Button>
            </section>
          ) : searchInput.trim() ? (
            filteredSkills.length === 0 ? (
              <section
                className={`
                ${layout === "grid" && "lg:col-span-2 2xl:col-span-3 min-[116rem]:col-span-4"}
                flex flex-col min-h-70 items-center justify-center gap-4 py-3
              `}
              >
                <h2>No skills found based on search!</h2>
              </section>
            ) : (
              filteredSkills.map((skill) => (
                <SkillCard
                  key={skill._id}
                  skill={skill}
                  handleDeleteSkill={handleDeleteSkill}
                />
              ))
            )
          ) : (
            skills.map((skill) => (
              <SkillCard
                key={skill._id}
                skill={skill}
                handleDeleteSkill={handleDeleteSkill}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default Skills;
