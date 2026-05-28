import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import useToast from "../../../shared/toast/useToast";
import useAdmin from "../hooks/useAdmin";

import Button from "../../../shared/components/ui/Button";

function ChangePasswordForm({ onClose }) {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { admin, loading, changePassword } = useAdmin();

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denies",
        "You need to be logged in as admin to change the password",
        "error",
      );
      return onClose();
    }

    const response = await changePassword(admin._id, data);

    if (!response.success) {
      if (response.unauthorized)
        addToast("Unauthorized access", response.message, "error");
      else addToast("Error!", response.message, "error");

      return onClose();
    }

    addToast("Password Changed", response.message, "success");
    return onClose();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-4">
        <div className="input-group">
          <h4 className="label">Old Password</h4>

          <input
            type="password"
            placeholder="********"
            {...register("oldPassword", {
              required: { value: true, message: "This feild is required" },
            })}
          />

          <div className="error-message">
            {errors.oldPassword && errors.oldPassword.message}
          </div>
        </div>

        <div className="input-group">
          <h4 className="label">New Password</h4>

          <input
            type="password"
            placeholder="********"
            {...register("newPassword", {
              required: { value: true, message: "This feild is required" },
            })}
          />

          <div className="error-message">
            {errors.newPassword && errors.newPassword.message}
          </div>
        </div>
      </section>

      <section className="flex items-center gap-2">
        <Button type={"submit"} label={"Change Password"} variant={"accent"} />

        <Button
          type={"button"}
          label={"Cancel"}
          variant={"secondary"}
          onClick={() => {
            reset();
            onClose();
          }}
        />
      </section>
    </form>
  );
}

export default ChangePasswordForm;
