import Icon from "./Icon";

function Button({ label, icon, type, variant, onClick }) {
  const styles = {
    base: `py-2 rounded-lg min-w-15 text-xs font-semibold transition ease-out cursor-pointer ${
      icon ? "px-2 flex items-center justify-center gap-2" : "px-3"
    }`,
    primary: "bg-bg-surface-dark/50 text-text-primary hover:bg-bg-surface-dark",
    secondary:
      "bg-transparent text-text-muted hover:bg-bg-surface-dark/50 hover:text-text-primary",
    accent: "bg-accent text-text-primary hover:bg-accent/80",
  };

  return (
    <button
      type={type || "button"}
      className={`
            ${styles.base}
            ${styles[variant]}
        `}
      onClick={onClick}
    >
      {icon && <Icon icon={icon.icon} size={icon.size} />}
      {label && label}
    </button>
  );
}

export default Button;
