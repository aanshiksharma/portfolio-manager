import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

import LoadingPage from "../LoadingPage";

function EditPersonal() {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const {
    fields: aboutFields,
    append: addAbout,
    remove: removeAbout,
  } = useFieldArray({
    control,
    name: "about",
  });

  const {
    fields: socialFields,
    append: addSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socialMediaLinks",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadPersonalData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin`);

        const response = await res.json();

        if (!res.ok) {
          alert(response.message);
          console.error(response.message);
          return;
        }

        reset(response);
      } catch (err) {
        alert("Something went wrong at our end.");
      } finally {
        setLoading(false);
      }
    };

    loadPersonalData();
  }, []);

  useEffect(() => {
    if (aboutFields.length === 0) addAbout("");
    if (socialFields.length === 0) addSocial({ platform: "", link: "" });
  }, []);

  const adminDetails = watch();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/${adminDetails._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      alert(response.message);
      reset(response.admin);
      console.log(response);
    } catch (err) {
      alert("Internal Server Error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <LoadingPage />
      </>
    );

  return (
    <>
      <Navbar />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 px-4 py-8 w-full">
          <section className="flex items-center justify-between">
            <h1 className="text-[2rem] text-text-primary font-medium">
              Edit Personal Information
            </h1>

            <div className="flex gap-2 items-center">
              <Button
                label={"Change Password"}
                variant={"primary"}
                onClick={() => {}}
              />
            </div>
          </section>

          <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
            <div className="left text-text-primary">Project Details</div>

            <div className="right max-w-200 w-full">
              <div className="w-full flex flex-col gap-6">
                <div className="input-group">
                  <span className="label">Name*</span>
                  <input
                    placeholder="John Doe"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "This field is required.",
                      },
                    })}
                  />

                  <span className="error-message">
                    {errors.name && errors.name.message}
                  </span>
                </div>

                <div className="input-group">
                  <span className="label">Email address*</span>
                  <input
                    placeholder="john_doe@gmail.com"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "This field is required.",
                      },
                    })}
                  />

                  <span className="error-message">
                    {errors.email && errors.email.message}
                  </span>
                </div>

                <div className="input-group">
                  <span className="label">Mobile Number</span>
                  <input placeholder="9898989898" {...register("mobile")} />
                </div>

                <div className="input-group">
                  <span className="label">Portfolio Link*</span>
                  <input
                    placeholder="https://portfolio-link.com"
                    {...register("portfolioLink", {
                      required: {
                        value: true,
                        message: "This field is required.",
                      },
                    })}
                  />

                  <span className="error-message">
                    {errors.portfolioLink && errors.portfolioLink.message}
                  </span>
                </div>

                <div className="input-group">
                  <span className="label">About*</span>

                  {aboutFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3">
                      <textarea
                        placeholder="Write something about yourself"
                        className="flex-1"
                        {...register(`about.${index}`)}
                      ></textarea>

                      <Button
                        type="button"
                        variant="delete"
                        icon={{ icon: "trash", size: 16 }}
                        className={"self-start border-none bg-transparent"}
                        onClick={() => removeAbout(index)}
                      />
                    </div>
                  ))}

                  <Button
                    variant={"secondary"}
                    icon={{ icon: "plus", size: 16 }}
                    label={"Add another line"}
                    className={"self-start"}
                    onClick={() => {
                      addAbout("");
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
            <div className="left text-text-primary">Social Media Links</div>

            <div className="right max-w-200 w-full">
              <div className="flex flex-col gap-3">
                {socialFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Platform"
                      className="basis-40 !text-text-muted"
                      {...register(`socialMediaLinks.${index}.platform`)}
                    />
                    <input
                      type="text"
                      placeholder="Link"
                      className="flex-1"
                      {...register(`socialMediaLinks.${index}.link`)}
                    />
                    <Button
                      variant={"delete"}
                      icon={{ icon: "trash", size: 16 }}
                      className={"border-none bg-transparent rounded-sm"}
                      onClick={() => {
                        removeSocial(index);
                      }}
                    />
                  </div>
                ))}

                <Button
                  variant={"secondary"}
                  icon={{ icon: "plus", size: 16 }}
                  label={"Add a link"}
                  className={"self-start"}
                  onClick={() => {
                    addSocial({ platform: "", link: "" });
                  }}
                />
              </div>
            </div>
          </section>

          <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
            <div className="left text-text-primary">Resume</div>

            <div className="right max-w-200 w-full">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="https://example.com/resume-link"
                  {...register("resumeLink")}
                />

                <Button
                  variant={"delete"}
                  icon={{ icon: "trash", size: 16 }}
                  className={"border-none bg-transparent"}
                />
              </div>
            </div>
          </section>

          <div className="p-4 w-full flex gap-4 items-center justify-end">
            <Button type={"reset"} label={"Cancel"} variant={"secondary"} />
            <Button type={"submit"} label={"Save Changes"} variant={"accent"} />
          </div>
        </div>
      </form>
    </>
  );
}

export default EditPersonal;
