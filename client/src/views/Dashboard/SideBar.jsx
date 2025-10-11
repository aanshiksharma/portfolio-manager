import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Icon from "../../components/Icon";

import { useImageViewer } from "../../contexts/ImageViewerContext";

function SideBar({ admin }) {
  const navigate = useNavigate();
  const { open } = useImageViewer();
  return (
    <aside
      className={`
        flex-1 flex flex-col gap-6
        px-2 max-w-xs
      `}
    >
      <button
        className="bg-bg-surface-light/50 w-full aspect-square max-w-45 self-center flex items-center justify-center rounded-full border-1 border-border overflow-hidden"
        onClick={() => open(admin.profileImage.url)}
      >
        <img
          src={admin.profileImage.url}
          alt="admin profile image"
          className="text-xs"
        />
      </button>

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
        <div className="flex items-center gap-2 hover:bg-bg-surface-dark px-2 py-1 rounded-sm transition duration-200 ease-out">
          <Icon icon={"mobile"} size={16} />
          <span>{admin.mobile}</span>
        </div>

        <div className="flex items-center gap-2 hover:bg-bg-surface-dark px-2 py-1 rounded-sm transition duration-200 ease-out">
          <Icon icon={"mail"} size={16} />
          <span>{admin.email}</span>
        </div>

        <a
          href={admin.resumeLink}
          target="_blank"
          className="flex items-center gap-2 hover:bg-bg-surface-dark px-2 py-1 rounded-sm transition duration-200 ease-out"
        >
          <Icon icon={"resume"} />
          <span>Resume</span>
        </a>

        {admin.socialMediaLinks.map((link) => {
          const splitLink = link.link.split("/");
          const visibleLink = splitLink[splitLink.length - 1];
          return (
            <a
              key={link.platform}
              href={link.link}
              target="_blank"
              className="flex items-center gap-2 hover:bg-bg-surface-dark px-2 py-1 rounded-sm transition duration-200 ease-out"
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

export default SideBar;
