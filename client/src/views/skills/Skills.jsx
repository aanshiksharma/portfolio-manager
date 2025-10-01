import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

function Skills() {
  const categories = [
    { _id: 123456, name: "Programming Languages" },
    { _id: 234567, name: "Frontend Technologies" },
    { _id: 345678, name: "Backend Technologies" },
    { _id: 456789, name: "Databases" },
  ];
  const skills = [
    { _id: 1234, name: "JavaScript", category: 123456 },
    { _id: 2345, name: "ReactJS", category: 234567 },
    { _id: 3456, name: "Tailwind CSS", category: 234567 },
    { _id: 4567, name: "Redux", category: 234567 },
    { _id: 5678, name: "MongoDB", category: 456789 },
    { _id: 6789, name: "Java", category: 123456 },
    { _id: 7890, name: "Python", category: 123456 },
    { _id: 8901, name: "NodeJS", category: 345678 },
    { _id: 9012, name: "ExpressJS", category: 345678 },
  ];

  const navigate = useNavigate();
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
              <section key={category._id} className="flex flex-col gap-4 py-3">
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
