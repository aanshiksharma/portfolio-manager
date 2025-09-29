import { useForm } from "react-hook-form";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

function AddSkill() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ skillName, category }) => {
    console.log(
      `Data acquired -> \nSkill : ${skillName},\nCategory : ${category}`
    );
    const promise = new Promise((resolve, rej) => {
      setTimeout(() => resolve(), 1500);
    });
    await promise;
    reset();
  };
  return (
    <>
      <Navbar />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4">
          <h1 className="text-[2rem] text-text-primary font-medium">
            Add a new skill
          </h1>
        </div>

        <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
          <div className="left text-text-primary">Skill</div>

          <div className="right max-w-200 w-full">
            <div className="w-full flex flex-col gap-6">
              <div className="input-group">
                <span className="label">Name*</span>
                <input
                  placeholder="Name of the skill."
                  {...register("skillName", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  })}
                />
                <span className="error-message">
                  {errors.skillName && errors.skillName.message}
                </span>
              </div>

              <div className="input-group">
                <span className="label">Category*</span>
                <input
                  placeholder="Choose from existing categories or create a new one."
                  {...register("category", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  })}
                />
                <span className="error-message">
                  {errors.category && errors.category.message}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="p-4 w-full flex gap-4 items-center justify-end">
          <Button type={"button"} label={"Cancel"} variant={"secondary"} />
          <Button type={"submit"} label={"Add Skill"} variant={"accent"} />
        </div>
      </form>
    </>
  );
}

export default AddSkill;
