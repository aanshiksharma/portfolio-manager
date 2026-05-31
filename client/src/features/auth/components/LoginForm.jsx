import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useAuth from "../hooks/useAuth";
import useToast from "@/shared/toast/useToast";

function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await login("admin", data);

    if (!response.success) {
      if (response.unauthorized)
        return setError("password", {
          type: 401,
          message: "Incorrect Password",
        });

      return addToast("Admin not found!", response.message, "info");
    }

    addToast(
      "Logged in!",
      `You are now logged in as ${response.user?.name.split(" ")[0]}`,
      "success",
    );

    navigate("/");
  };

  const handleGuestLogin = () => {
    sessionStorage.setItem("login-mode", "guest");
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto w-full flex flex-col gap-6"
    >
      <>
        <Field>
          <FieldLabel htmlFor="password">Enter your password</FieldLabel>

          <Input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="password"
            autoFocus
            {...register("password", {
              required: {
                value: true,
                message: "This field is required.",
              },
            })}
          />

          <FieldDescription className="text-destructive text-xs">
            {errors.password && errors.password.message}
          </FieldDescription>

          <Button type="submit" variant="default">
            Log in
          </Button>

          <Button type="button" variant="secondary" onClick={handleGuestLogin}>
            Log in as Guest
          </Button>
        </Field>
      </>
    </form>
  );
}

export default LoginForm;
