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

  useEffect(() => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return (
      <>
        <LoadingPage />
      </>
    );
  else
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="flex flex-col gap-8 px-4 py-8 w-full max-w-200 mx-auto">
            <section className="flex items-center justify-between">
              <h1 className="text-[2rem] text-text-primary">Skills</h1>
              <Button
                label={"Add a skill"}
                icon={{ icon: "plus", size: 18 }}
                variant={"accent"}
                onClick={() => {
                  navigate("/skills/add");
                }}
              />
            </section>

            <form className="searchbar flex items-center justify-center gap-4">
              <input
                type="text"
                name="search-skills"
                placeholder="Search skills"
              />
            </form>

            {categories.map((category) => {
              return (
                <section
                  key={category._id}
                  className="flex flex-col gap-4 py-3"
                >
                  <h3 className="font-semibold text-2xl pb-3 border-b-1 border-border">
                    {category.name}
                  </h3>

                  <ul className="flex flex-col gap-2 list-inside list-disc">
                    {skills.map((skill) => {
                      if (skill.category === category._id)
                        return (
                          <li key={skill._id} className="text-text-primary">
                            {skill.name}
                          </li>
                        );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </>
    );
}

export default Skills;
