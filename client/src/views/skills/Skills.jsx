import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";

function Skills() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesRes = await fetch(`${BACKEND_URL}/api/categories`);
        const categories = categoriesRes.ok ? await categoriesRes.json() : [];
        setCategories(categories);

        const skillsRes = await fetch(`${BACKEND_URL}/api/skills`);
        const skills = skillsRes.ok ? await skillsRes.json() : [];
        setSkills(skills);
      } catch (err) {
        console.error("Error fetching data.", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [loading]);

  const onDelete = async (skillId) => {
    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_URL}/api/skills/${skillId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const response = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          alert("You need to be logged in as admin to delete a skill!");
          return navigate("/auth/login");
        }

        alert(response.message);
        return;
      }

      alert(response.message);
      console.log("Deleted", skillId);
    } catch (err) {
      console.log("INTERNAL SERVER ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <LoadingPage />;
      </>
    );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="flex flex-col gap-8 px-4 py-8 w-full max-w-200 mx-auto">
          <section className="flex items-center justify-between">
            <h1 className="text-[2rem] text-text-primary font-medium">
              Skills
            </h1>

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
                <section
                  key={category._id}
                  className="flex flex-col gap-4 py-3"
                >
                  <h3 className="font-semibold text-2xl pb-3 border-b-1 border-border text-text-primary">
                    {category.name}
                  </h3>

                  <ul className="flex flex-col gap-1 list-inside">
                    {skills.map((skill) => {
                      if (skill.category === category._id)
                        return (
                          <li
                            key={skill._id}
                            className="text-text-muted px-2 py-1 rounded-sm hover:bg-bg-surface-dark transition ease-out duration-200 cursor-default flex items-center justify-between"
                            onDoubleClick={() =>
                              navigate(`/skills/edit/${skill._id}`)
                            }
                          >
                            <span>{skill.name}</span>

                            <div className="flex items-center gap-2">
                              <Button
                                className="!p-0 bg-transparent border-none hover:bg-transparent !text-text-muted hover:!text-text-primary rounded-xs"
                                icon={{ icon: "edit", size: 14 }}
                                variant={"primary"}
                                onClick={() =>
                                  navigate(`/skills/edit/${skill._id}`)
                                }
                              />

                              <Button
                                className="!p-0 bg-transparent border-none hover:bg-transparent rounded-xs"
                                icon={{ icon: "trash", size: 14 }}
                                variant={"delete"}
                                onClick={() => onDelete(skill._id)}
                              />
                            </div>
                          </li>
                        );
                    })}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Skills;
