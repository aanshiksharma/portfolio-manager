import Icon from "./Icon";

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
          className="hover:text-text-secondary transition ease-out truncate"
        >
          {value}
        </a>
      )}

      {type === "text" && <p className="w-full whitespace-pre-wrap">{value}</p>}

      {type === "textArray" && (
        <div className={`flex flex-col gap-2`}>
          {value.map((val) => {
            return <p key={val}>{val}</p>;
          })}
        </div>
      )}

      {type === "linkArray" && (
        <div className={`flex flex-col gap-3`}>
          {value.map(({ platform, link }) => {
            return (
              <a
                key={link}
                href={link}
                target="_blank"
                className="flex items-center gap-4 hover:text-text-secondary transition ease-out"
              >
                <Icon icon={platform.toLowerCase()} size={16} />
                <span className="truncate max-w-xs">{link}</span>
              </a>
            );
          })}
        </div>
      )}

      {type === "pills" && (
        <div className="flex flex-wrap gap-2">
          {value.map((val) => {
            if (val === "Skills not set.")
              return (
                <p key={val} className="w-full whitespace-pre-wrap">
                  {val}
                </p>
              );
            else
              return (
                <span
                  key={val}
                  className="p-2 bg-bg-surface-light/75 rounded-lg text-xs font-semibold text-text-secondary"
                >
                  {val}
                </span>
              );
          })}
        </div>
      )}
    </div>
  );
}

export default TableRow;
