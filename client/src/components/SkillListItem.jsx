import { useNavigate } from "react-router-dom";

import Button from "./Button";

function SkillListItem({ name, categoryName, onDoubleClick }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center hover:bg-bg-surface-dark rounded-sm px-2 py-1 transition duration-200 ease-out"
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

export default SkillListItem;
