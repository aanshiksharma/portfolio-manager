import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Icon from "../components/Icon";

import LoadingPage from "./LoadingPage";
import Pill from "../components/Pill";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState();
  const [data, setData] = useState({ projects: [], skills: [], admin: {} });

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loginMode = localStorage.getItem("login-mode");

    const verifyToken = async () => {
      setLoadingText("Verifying");

      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!res.ok) {
          const response = await res.json();
          alert(response.message);
          return navigate("/auth/login");
        }
      } catch (err) {
        setLoadingText("An error occurred on our side.");
      }
    };

    const loadData = async () => {
      setLoading(true);
      setLoadingText("Fetching Data...");

      try {
        const [projectsRes, skillsRes, adminRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/projects`),
          fetch(`${BACKEND_URL}/api/skills`),
          fetch(`${BACKEND_URL}/api/admin`),
        ]);

        if (!projectsRes.ok && projectsRes.status !== 404)
          throw new Error("Could not fetch projects");
        if (!skillsRes.ok && skillsRes.status !== 404)
          throw new Error("Could not fetch skills");
        if (!adminRes.ok && adminRes.status !== 404)
          throw new Error("Could not fetch admin data");

        const [projects, skills, admin] = await Promise.all([
          projectsRes.json(),
          skillsRes.json(),
          adminRes.json(),
        ]);

        setData((prev) => ({
          ...prev,
          projects: Array.isArray(projects) ? projects : [],
          skills: Array.isArray(skills) ? skills : [],
          admin,
        }));
      } catch (err) {
        console.error(err);
        alert(err.message || "Something went wrong while fetching data");
      } finally {
        setLoading(false);
        setLoadingText("");
      }
    };

    if (!loginMode) {
      verifyToken();
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingPage text={loadingText} />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container !max-w-300">
        <div className="px-4 py-8 flex gap-4 w-full">
          <SideBar admin={data.admin} />

          <main className="px-2 flex-1 flex flex-col gap-8">
            <section className="flex flex-col gap-3">
              <h1 className="text-[2rem] font-medium text-text-primary">
                Hi, {data.admin.name.split(" ")[0]}!
              </h1>

              <p>
                Your portfolio is live at{" "}
                <a
                  href={data.admin.portfolioLink}
                  target="_blank"
                  className="hover:text-text-primary transition-all ease-out duration-200"
                >
                  {data.admin.portfolioLink}
                </a>
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h4 className="font-semibold text-xl">About</h4>

              <div className="flex flex-col gap-1">
                {data.admin.about.map((line) => (
                  <p
                    key={line}
                    className="px-3 py-2 bg-bg-surface-dark/50 rounded-sm w-full"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>

            <hr className="border-border/50" />

            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2 py-1">
                <h4 className="font-semibold text-xl">Featured Projects</h4>

                <Button
                  variant={"normal"}
                  label={"See All ->"}
                  onClick={() => navigate("/projects")}
                />
              </div>

              {data.projects.length !== 0 ? (
                <div className="flex flex-wrap gap-4">
                  {data.projects.map(
                    (project) =>
                      project.featured && (
                        <ProjectCard
                          key={project._id}
                          project={project}
                          onDoubleClick={() =>
                            navigate(`/projects/${project._id}`)
                          }
                        />
                      )
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-25">
                  <p>Projects not found</p>
                </div>
              )}
            </section>

            <hr className="border-border/50" />

            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2 py-1">
                <h4 className="font-semibold text-xl">Skills</h4>

                <Button
                  variant={"normal"}
                  label={"See All ->"}
                  onClick={() => navigate("/skills")}
                />
              </div>

              <div className="flex flex-col gap-1">
                {data.skills.map((skill) => (
                  <SkillListItem
                    key={skill._id}
                    name={skill.name}
                    categoryName={skill.categoryName}
                    onDoubleClick={() => navigate(`/skills/edit/${skill._id}`)}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

function SideBar({ admin }) {
  return (
    <aside
      id="sidebar"
      className={`
        flex-1 flex flex-col gap-6
        px-2 max-w-xs
      `}
    >
      <div className="bg-bg-surface-light/50 w-full aspect-square max-w-45 self-center flex items-center justify-center rounded-full border-1 border-border">
        <img
          src={admin.profileImage.url}
          alt="admin profile image"
          className="text-xs"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-2xl text-text-primary">
          {admin.name}
        </h3>

        <span>Admin</span>
      </div>

      <Button
        label={"Edit personal details"}
        variant={"primary"}
        className={"border-1 border-border"}
        onClick={() => {
          navigate("/personal/edit");
        }}
      />

      <section className="flex flex-col gap-1">
        <div className="flex items-center gap-2 hover:bg-bg-surface-dark px-2 py-1 rounded-sm">
          <Icon icon={"mobile"} size={16} />
          <span>{admin.mobile}</span>
        </div>

        <div className="flex items-center gap-2 hover:bg-bg-surface-dark px-2 py-1 rounded-sm">
          <Icon icon={"mail"} size={16} />
          <span>{admin.email}</span>
        </div>

        {admin.socialMediaLinks.map((link) => {
          const splitLink = link.link.split("/");
          const visibleLink = splitLink[splitLink.length - 1];
          return (
            <a
              key={link.platform}
              href={link.link}
              target="_blank"
              className="flex items-center gap-2 hover:bg-bg-surface-dark px-2 py-1 rounded-sm"
            >
              <Icon icon={link.platform.toLowerCase()} />
              <span>{visibleLink}</span>
            </a>
          );
        })}
      </section>
    </aside>
  );
}

function ProjectCard({ project, onDoubleClick }) {
  return (
    <div
      className="flex flex-col gap-4 p-4 rounded-lg border-1 border-border basis-100"
      onDoubleClick={onDoubleClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <img src={project.coverImage.url} alt="" />
        </div>

        <div className="flex-1 flex flex-col gap-1 basis-[67%] shrink-0">
          <h4 className="font-semibold text-text-primary">{project.title}</h4>

          <a
            href={project.projectLink}
            target="_blank"
            className="text-xs hover:text-text-primary transition ease-out duration-200"
          >
            {project.projectLink}
          </a>
        </div>
      </div>

      <div className="skills flex items-center gap-2 flex-wrap">
        {project.skills.map((skill) => (
          <Pill key={skill} label={skill} />
        ))}
      </div>
    </div>
  );
}

function SkillListItem({ name, categoryName, onDoubleClick }) {
  return (
    <div
      className="flex items-center hover:bg-bg-surface-dark rounded-sm px-2 py-1"
      onDoubleClick={onDoubleClick}
    >
      <span
        className={`text-text-primary ${categoryName ? "basis-60" : "flex-1"}`}
      >
        {name}
      </span>

      {categoryName && <span className="flex-1">{categoryName}</span>}

      <div className="flex items-center gap-2">
        <Button
          icon={{ icon: "edit", size: 16 }}
          variant={"primary"}
          className={"bg-transparent !p-0 border-none hover:bg-tranparent"}
          onClick={() => navigate(`/skills/edit/${skill._id}`)}
        />

        <Button
          icon={{ icon: "trash", size: 16 }}
          variant={"delete"}
          className={"bg-transparent !p-0 border-none hover:bg-tranparent"}
          onClick={() => navigate(`/skills/edit/${skill._id}`)}
        />
      </div>
    </div>
  );
}

export default Dashboard;
