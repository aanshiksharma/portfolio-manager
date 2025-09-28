function Button({ label, icon, type, variant, onClick }) {
  const styles = {
    base: `py-2 rounded-lg min-w-15 text-xs font-semibold transition ease-out cursor-pointer ${
      icon ? "px-2 flex align-center justify-center gap-2" : "px-3"
    }`,
    primary: "bg-neutral-900/50 text-neutral-50 hover:bg-neutral-900",
    secondary:
      "bg-transparent text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-50",
    accent: "bg-orange-600 text-neutral-50 hover:bg-orange-600/80",
  };

  if (icon) {
    return (
      <button
        type={type || "button"}
        className={`
            ${styles.base}
            ${styles[variant]}
        `}
        onClick={onClick}
      >
        {label}
      </button>
    );
  } else {
    return (
      <button
        type={type || "button"}
        className={`
            ${styles.base}
            ${styles[variant]}
        `}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}

export default Button;
