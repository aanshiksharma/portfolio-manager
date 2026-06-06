import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useAuth from "../hooks/useAuth";
import useToast from "@/shared/toast/useToast";
import {
  Item,
  ItemHeader,
  ItemTitle,
  ItemContent,
  ItemDescription,
  ItemFooter,
} from "@/components/ui/item";

function LoginForm({ className }) {
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
    addToast("Logged in!", `You are now logged in as Guest`, "success");
    navigate("/");
  };

  return (
    <Item size="" className={`w-full max-w-sm ${className}`}>
      <ItemHeader>
        <h1>Welcome Back!</h1>
      </ItemHeader>

      <ItemContent>
        <ItemTitle>Login to continue!</ItemTitle>
        <ItemDescription>
          Enter your password below to login and make changes to your portfolio.
        </ItemDescription>
      </ItemContent>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto w-full flex flex-col gap-6"
      >
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

          <FieldError className="text-xs">
            {errors.password && errors.password.message}
          </FieldError>
        </Field>

        <ItemFooter className="flex-col items-stretch gap-1.5">
          <Button type="submit" variant="default">
            Log in
          </Button>

          <Button type="button" variant="outline" onClick={handleGuestLogin}>
            Continue as Guest
          </Button>
        </ItemFooter>
      </form>
    </Item>
  );
}

export default LoginForm;
