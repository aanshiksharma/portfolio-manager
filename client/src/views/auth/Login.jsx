import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../components/Button";
import Pill from "../../components/Pill";
import { useEffect } from "react";

function Login({ role }) {
  if (!role) role = "admin";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [role]);

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const onSubmit = async (data) => {
    try {
      let res;
      if (role === "admin") {
        res = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: data.password }),
        });

        const user = await res.json();
        if (!res.ok) {
          setError("password", {
            type: 401,
            message: "Incorrect Password",
          });
          return;
        }

        const token = user.token;
        localStorage.setItem("token", token);
      } else {
        res = await fetch(`${BACKEND_URL}/api/auth/${role}-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: data[`${role}Name`], role: role }),
        });

        if (!res.ok) return;
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const welcomeText = [
    "This project runs behind my portfolio and keeps everything working smoothly",
    "To protect the real data, only I (the admin) can save changes to the main database.",
    "You’re free to explore, add or edit content, and see how it all looks in my portfolio — but those changes won’t stick.",
    "Recruiters, feel free to explore without fear, this won’t alter my actual portfolio.",
    "Thanks for dropping by, and have fun!",
  ];
  return (
    <>
      <div className="flex min-h-screen">
        <div
          className={`
            left 
            p-4
            bg-neutral-200
            font-medium text-neutral-950
            flex-1 flex flex-col gap-4 align-center justify-center
          `}
        >
          <h2 className="max-w-lg w-full mx-auto text-2xl font-semibold">
            Welcome!
          </h2>

          <div className="container max-w-lg mx-auto flex flex-col gap-3">
            {welcomeText.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            <p>~ Aanshik</p>
          </div>
        </div>

        <div
          className={`
            right
            p-4
            font-medium text-neutral-50
            flex-1 flex flex-col gap-6 align-center justify-center
            `}
        >
          <div className="container max-w-md mx-auto flex flex-col gap-4">
            <h2 className="w-full text-2xl font-semibold">
              Login to continue!
            </h2>
            <div className="flex gap-4 align-center">
              <Pill to="/auth/login" label="Admin" />
              <Pill to="/auth/recruiter-login" label="Recruiter" />
              <Pill to="/auth/visitor-login" label="Visitor" />
            </div>
          </div>

          {/* LOGIN FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="container max-w-md mx-auto flex flex-col gap-4"
          >
            <>
              <div className="input-group">
                <span className="font-semibold text-xs text-neutral-400">
                  {role === "admin"
                    ? "Enter your password"
                    : "Please enter your name"}
                </span>

                {role === "admin" ? (
                  <input
                    type="password"
                    placeholder="********"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "This field is required.",
                      },
                    })}
                  />
                ) : (
                  <input
                    placeholder="John Doe"
                    {...register(`${role}Name`, {
                      required: {
                        value: true,
                        message: "This field is required.",
                      },
                    })}
                  />
                )}

                <span className="font-semibold text-xs text-red-500">
                  {errors.password && errors.password.message}
                  {errors[`${role}Name`] && errors[`${role}Name`].message}
                </span>
              </div>

              <div className="flex gap-4 align-center">
                <Button type="submit" variant="accent" label="Log in" />

                {role === "admin" && (
                  <Button
                    variant="secondary"
                    label="Register admin"
                    onClick={() => {
                      navigate("/auth/register");
                    }}
                  />
                )}
              </div>
            </>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
