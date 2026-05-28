import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useToast from "../../../shared/toast/useToast";
import useAuth from "../hooks/useAuth";

import Button from "../../../shared/components/ui/Button";
import Pill from "../../../shared/components/ui/Pill";
import LoginForm from "../components/LoginForm";

function Login({ role = "admin" }) {
  const navigate = useNavigate();
  const methods = useForm();
  const { setError } = methods;
  const { addToast } = useToast();
  const { user, loading, login } = useAuth();

  const onSubmit = async (data) => {
    const response = await login(role, data);

    if (!response.success) {
      if (response.unauthorized)
        return setError("password", {
          type: 401,
          message: "Incorrect Password",
        });

      return addToast("Admin not found!", response.message, "info");
    }

    if (role === "admin") {
      addToast(
        "Logged in!",
        `You are now logged in as ${user?.name.split(" ")[0]}`,
        "success",
      );
    } else {
      addToast(
        `Welcome${user?.noOfVisits > 1 ? " back" : ""}, ${data[`${role}Name`]}!`,
        `You are now logged in as a ${role}.`,
        "success",
      );
    }

    navigate("/dashboard");
  };

  const welcomeText = [
    "This project runs behind my portfolio and keeps everything working smoothly",
    "To protect the real data, only I (the admin) can save changes to the main database. You’re free to explore, add or edit content — but those changes won’t stick.",
    "Recruiters, feel free to explore without fear, this won’t alter my actual portfolio.",
    "Thanks for dropping by, and have fun!",
  ];

  return (
    <>
      <div className="flex flex-wrap min-h-screen">
        <div
          className={`
            left 
            p-4 min-w-sm
            bg-text-secondary
            font-medium text-bg-base
            flex-1 flex flex-col gap-4 align-center justify-center
          `}
        >
          <h2 className="max-w-lg w-full mx-auto text-2xl font-semibold">
            Welcome!
          </h2>

          <div className="max-w-lg mx-auto flex flex-col gap-3">
            {welcomeText.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            <p>~ Aanshik</p>
          </div>
        </div>

        <div
          className={`
            p-4 min-w-sm
            font-medium text-text-primary
            flex-1 flex flex-col gap-6 align-center justify-center
            `}
        >
          <div className="max-w-md mx-auto w-full flex flex-col gap-4">
            <h2 className="w-full text-2xl font-semibold">
              Login to continue!
            </h2>

            <div className="flex gap-4 align-center">
              <Pill to="/auth/login" label="Admin" />
              <Pill to="/auth/recruiter-login" label="Recruiter" />
              <Pill to="/auth/visitor-login" label="Visitor" />
            </div>
          </div>

          <LoginForm onSubmit={onSubmit} role={role} {...methods} />
        </div>
      </div>
    </>
  );
}

export default Login;
