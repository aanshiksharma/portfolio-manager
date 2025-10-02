import Icon from "./Icon";

function Button({ label, icon, type, className, variant, onClick }) {
  const styles = {
    base: `py-2 rounded-lg text-xs font-semibold transition ease-out cursor-pointer ${
      icon
        ? label
          ? "px-2 flex items-center justify-center gap-2 min-w-15"
          : "px-2 border-1 border-border"
        : "px-3 min-w-15"
    }`,
    primary: "bg-bg-surface-dark/50 text-text-primary hover:bg-bg-surface-dark",
    secondary:
      "bg-transparent text-text-muted hover:bg-bg-surface-dark/50 hover:text-text-primary",
    accent: "bg-accent text-text-primary hover:bg-accent/80",
    delete: "text-error bg-red-800/20 hover:bg-red-800/30",
  };

  return (
    <button
      type={type || "button"}
      className={`
        ${styles.base}
        ${styles[variant]}
        ${className}
      `}
      onClick={onClick}
    >
      {icon && <Icon icon={icon.icon} size={icon.size} />}
      {label && label}
    </button>
  );
}

export default Button;
