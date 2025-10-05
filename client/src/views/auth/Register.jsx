import { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";
import Overlay from "../../components/Overlay";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();

  const inputMountedRef = useRef({ about: false, social: false });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
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
    if (!inputMountedRef.current.about && aboutFields.length === 0) {
      addAbout("", { shouldFocus: false });
      inputMountedRef.current.about = true;
    }

    if (!inputMountedRef.current.social && socialFields.length === 0) {
      inputMountedRef.current.social = true;
      addSocial({ platform: "", link: "" }, { shouldFocus: false });
    }
  }, [aboutFields, socialFields]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (
      data.socialMediaLinks[0].platform === "" ||
      data.socialMediaLinks[0].link === ""
    ) {
      data.socialMediaLinks = [];
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 401) {
          return alert("The secret password is incorrect.");
        }

        const response = await res.json();
        return alert(response.message);
      }

      const response = await res.json();
      alert(response.message, "Please login with the password");
      navigate("/auth/login");
    } catch (err) {
      alert("Internal Server Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar text={"Register an admin"} />
        <LoadingPage />
      </>
    );

  return (
    <>
      <Navbar text={"Register an admin"} />

      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        {showOverlay && (
          <MainPasswordOverlay
            register={register}
            errors={errors}
            onClose={() => {
              setShowOverlay(false);
            }}
          />
        )}

        <div className="flex flex-col gap-4 px-4 py-8 w-full">
          <section className="flex items-center justify-between">
            <h1 className="text-[2rem] text-text-primary font-medium">
              Register Admin
            </h1>
          </section>

          <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
            <div className="left text-text-primary">Personal Details</div>

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
                  <span className="label">About</span>

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
                        onClick={() => {
                          if (index === 0)
                            inputMountedRef.current.about = false;
                          removeAbout(index);
                        }}
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
              <div className="w-full flex flex-col gap-3">
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
                        if (index === 0) inputMountedRef.current.social = false;
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
              <div className="w-full flex items-center gap-4">
                <input
                  type="text"
                  placeholder="https://example.com/resume-link"
                  {...register("resumeLink")}
                />

                <Button
                  variant={"delete"}
                  icon={{ icon: "trash", size: 16 }}
                  className={"border-none bg-transparent"}
                  onClick={() => {
                    const data = watch();
                    reset({ ...data, resumeLink: "" });
                  }}
                />
              </div>
            </div>
          </section>

          <section className="p-4 w-full flex gap-4 items-center justify-end">
            <Button type={"reset"} label={"Cancel"} variant={"secondary"} />

            <Button
              type={"button"}
              label={"Save Changes"}
              variant={"accent"}
              onClick={async () => {
                const isValid = await trigger();
                if (isValid) setShowOverlay(true);
              }}
            />
          </section>
        </div>
      </form>
    </>
  );
}

function MainPasswordOverlay({ register, errors, onClose }) {
  return (
    <Overlay>
      <div
        className={`
          py-8 px-6 rounded-lg border-1 max-w-xs w-full
        bg-bg-base border-border/50
        flex flex-col gap-6
        `}
      >
        <section className="flex items-center justify-between">
          <h2 className="font-semibold text-text-primary">Set Password</h2>

          <Button
            icon={{ icon: "x", size: 16 }}
            variant={"secondary"}
            className={"!p-0 border-none hover:bg-transparent"}
            onClick={onClose}
          />
        </section>

        <section className="flex flex-col gap-4">
          <div className="input-group">
            <h5 className="label">Set a Password</h5>

            <input
              type="password"
              placeholder="********"
              {...register("password", {
                required: { value: true, message: "This field is required" },
              })}
            />

            <p className="error-message">
              {errors.password && errors.password.message}
            </p>
          </div>

          <div className="input-group">
            <h5 className="label">Enter Secret Password</h5>

            <input
              type="password"
              placeholder="********"
              {...register("secretPassword", {
                required: { value: true, message: "This field is required" },
              })}
            />

            <p className="error-message">
              {errors.secretPassword && errors.secretPassword.message}
            </p>
          </div>
        </section>

        <section className="flex items-center gap-2">
          <Button label={"Submit"} type={"submit"} variant={"accent"} />
          <Button
            label={"Cancel"}
            type={"button"}
            variant={"secondary"}
            onClick={onClose}
          />
        </section>
      </div>
    </Overlay>
  );
}

export default Register;
