import { useEffect, useState } from "react";
import { useToast } from "../contexts/ToastContext";

import Icon from "./Icon";
import Button from "./Button";

function Toast({ toast }) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const { removeToast } = useToast();

  const styles = {
    info: "text-info",
    success: "text-success",
    error: "text-error",
  };

  const icon =
    toast.type === "info"
      ? "info-circle"
      : toast.type === "success"
      ? "check-circle"
      : toast.type === "error"
      ? "exclamation-circle"
      : "";

  return (
    <div
      className={`
        rounded-lg w-xs border-1 border-border/40
        text-text-secondary bg-bg-surface-dark/30 backdrop-blur-lg shadow-lg
        text-sm relative overflow-hidden
    `}
    >
      <div
        className={`h-1 w-full absolute bottom-0 rounded-l-lg origin-left bg-${toast.type}`}
      ></div>

      <div className="py-3 px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between flex-1">
          <div className="flex gap-2 items-center">
            <span className={`icon-container ${styles[toast.type]}`}>
              <Icon icon={icon} size={16} />
            </span>

            <h3>{toast.heading}</h3>
          </div>

          <div className="flex gap-2 items-center">
            <Button
              icon={{ icon: "x", size: 12 }}
              variant={"normal"}
              className="border-none bg-none hover:rotate-90 duration-300"
              onClick={() => removeToast(toast.id)}
            />
          </div>
        </div>

        <p
          className={`text-xs text-text-muted transition duration-300 ease-out origin-top`}
        >
          {toast.message}
        </p>
      </div>

      <p className="text-xs text-text-muted border-t-1 border-border/50 pt-2 pb-3 px-4">
        This message will close in {seconds} seconds.
      </p>
    </div>
  );
}

export default Toast;
