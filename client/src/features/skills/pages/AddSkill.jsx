import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useToast from "@/shared/toast/useToast";
import useSkill from "../hooks/useSkill";
import SkillForm from "../components/SkillForm";

function AddSkill() {
  const navigate = useNavigate();
  const { reset } = useForm();
  const { loading, addSkill } = useSkill();
  const { addToast } = useToast();

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to delete a skill.",
        "error",
      );

      return navigate("/auth/login");
    }

    const response = await addSkill(data);

    if (!response.success) {
      if (response.unauthorized) {
        addToast(
          "Unauthorized access!",
          "The token provided is either unauthorized or expired. Please login again.",
          "error",
        );

        return navigate("/auth/login");
      }

      return addToast("Error!", response.message, "error");
    }

    addToast("New skill added!", response.message, "success");
    reset();
    return navigate(-1);
  };

  return (
    <>
      <section className="px-4 py-6 grid gap-4">
        <h1>Add Skill</h1>
      </section>

      <SkillForm onSubmit={onSubmit} />
    </>
  );
}

export default AddSkill;
