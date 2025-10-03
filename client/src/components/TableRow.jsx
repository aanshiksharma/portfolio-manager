function TableRow({ heading, value, background, last, type = "text" }) {
  return (
    <div
      className={`
        px-4 py-6
        flex items-start
        border-t border-border/50 
        ${background && "bg-bg-surface-dark/20"}
        ${last && "border-b"}
    `}
    >
      <h6 className="min-w-3xs text-text-primary font-medium">{heading}</h6>
      {type === "link" && (
        <a
          href={value}
          target="_blank"
          className="hover:text-text-secondary transition ease-out"
        >
          {value}
        </a>
      )}
      {type === "text" && <p className="w-full">{value}</p>}
    </div>
  );
}

export default TableRow;
