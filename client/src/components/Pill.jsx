import { NavLink } from "react-router-dom";
import Icon from "./Icon";

function Pill({ label, icon, to }) {
  const styles = {
    base: `p-2 rounded-lg text-xs font-semibold transition ease-out cursor-pointer ${
      icon ? "flex align-center justify-center gap-2" : ""
    }`,
    selected: "bg-bg-surface-dark text-text-primary text-semibold",
    unSelected: "bg-transparent text-text-muted hover:bg-bg-surface-dark/50",
    hover: "hover:bg-bg-surface-dark/50",
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
          ${styles.base}
          ${isActive ? styles.selected : styles.unSelected}
        `}
    >
      {/* Icon sits here if it is present */}
      {icon && <Icon icon={icon.link} size={icon.size} />}
      {label}
    </NavLink>
  );
}

export default Pill;
