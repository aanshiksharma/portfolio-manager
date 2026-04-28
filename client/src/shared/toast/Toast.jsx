import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import useToast from "./useToast";

import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";

function Toast({ toast }) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const { removeToast } = useToast();

  const styles = {
    icon: {
      info: "text-info",
      success: "text-success",
      error: "text-error",
    },
    bg: {
      info: "bg-info",
      success: "bg-success",
      error: "bg-error",
    },
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
    <motion.div
      initial={{ x: 500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 500, opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`
        rounded-lg w-xs border-1 border-border/40
        text-text-secondary bg-bg-surface-dark/30 backdrop-blur-lg shadow-lg
        text-sm relative overflow-hidden
        `}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className={`h-1 w-full absolute bottom-0 left-0 origin-left ${
          styles.bg[toast.type]
        }`}
      ></motion.div>

      <div className="py-3 px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between flex-1">
          <div className="flex gap-2 items-center">
            <span className={`icon-container ${styles.icon[toast.type]}`}>
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
    </motion.div>
  );
}

export default Toast;
