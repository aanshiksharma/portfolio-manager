import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "../../../shared/components/ui/Button";

function LoginForm({
  role,
  onSubmit,
  register,
  handleSubmit,
  reset,
  formState: { errors },
}) {
  useEffect(reset, [role]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto w-full flex flex-col gap-4"
    >
      <>
        <div className="input-group">
          <label htmlFor="password" className="label">
            {role === "admin"
              ? "Enter your password"
              : "Please enter your name"}
          </label>

          {role === "admin" ? (
            <input
              id="password"
              type="password"
              placeholder="********"
              autoComplete="password"
              autoFocus
              {...register("password", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />
          ) : (
            <input
              id="password"
              placeholder="John Doe"
              autoComplete="name"
              autoFocus
              {...register(`${role}Name`, {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />
          )}

          <span className="error-message">
            {errors.password && errors.password.message}
            {errors[`${role}Name`] && errors[`${role}Name`].message}
          </span>
        </div>

        <Button type="submit" variant="accent" label="Log in" />
      </>
    </form>
  );
}

export default LoginForm;
