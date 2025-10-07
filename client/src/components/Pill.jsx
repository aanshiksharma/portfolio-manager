import { NavLink } from "react-router-dom";
import Icon from "./Icon";

function Pill({ label, icon, to }) {
  const styles = {
    base: `p-2 rounded-lg text-xs font-semibold transition ease-out whitespace-nowrap
    ${icon && "flex align-center justify-center gap-2"}
    ${to && "cursor-pointer"}`,
    selected: "bg-bg-surface-dark text-text-primary text-semibold",
    unSelected: "bg-transparent text-text-muted hover:bg-bg-surface-dark/50",
    hover: "hover:bg-bg-surface-dark/50",
  };

  if (to) {
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
  } else {
    return <span className={`${styles.base} ${styles.selected}`}>{label}</span>;
  }
}

export default Pill;
