import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useImageViewer } from "../../contexts/ImageViewerContext";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

import LoadingPage from "../LoadingPage";
import Overlay from "../../components/Overlay";

function EditPersonal() {
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();

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
  }, [aboutFields, socialFields]);

  const adminDetails = watch();

  const { open } = useImageViewer();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    if (
      data.socialMediaLinks[0].platform === "" ||
      data.socialMediaLinks[0].link === ""
    ) {
      data.socialMediaLinks = [];
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("portfolioLink", data.portfolioLink);
    formData.append("about", JSON.stringify(data.about));
    formData.append("socialMediaLinks", JSON.stringify(data.socialMediaLinks));
    formData.append("resumeLink", data.resumeLink);
    formData.append("profileImage", data.profileImage[0]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/${adminDetails._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          alert("You need to be logged in as admin to save changes.");
          return navigate(-1);
        }

        const response = await res.json();
        alert(response.message);
      }

      const response = await res.json();
      alert(response.message);
      reset(response.admin);
      navigate(-1);
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

      {showOverlay && (
        <ChangePasswordOverlay
          onClose={() => {
            setShowOverlay(false);
          }}
        />
      )}

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
                onClick={() => {
                  setShowOverlay(true);
                }}
              />
            </div>
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

          <section className="py-8 px-4 w-full flex flex-col gap-6 border-b-1 border-border">
            <div className="w-full flex items-start justify-between">
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
                      const hasEmpty = socialFields.some(
                        (field) => !field.platform.trim() || !field.link.trim()
                      );
                      if (!hasEmpty) addSocial({ platform: "", link: "" });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-start justify-between">
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
                    onClick={() => {
                      const data = watch();
                      reset({ ...data, resumeLink: "" });
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
            <div className="left text-text-primary">Profile Picture</div>

            <div className="right max-w-200 w-full flex flex-col gap-6">
              <div className="input-group">
                <span className="label">Admin Profile Image</span>

                <button
                  type="button"
                  className="image-overview"
                  onClick={() => {
                    open(adminDetails.profileImage.url);
                  }}
                >
                  <div className="flex items-center justify-center rounded-sm w-9.5 min-h-7.5 aspect-sqare overflow-hidden">
                    <img
                      src={adminDetails.profileImage.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-text-secondary">
                    {adminDetails.profileImage.fileName}
                  </span>
                </button>

                <input type="file" {...register("profileImage")} />
              </div>
            </div>
          </section>

          <div className="p-4 w-full flex gap-4 items-center justify-end">
            <Button
              type={"button"}
              label={"Cancel"}
              variant={"secondary"}
              onClick={() => {
                navigate(-1);
              }}
            />
            <Button type={"submit"} label={"Save Changes"} variant={"accent"} />
          </div>
        </div>
      </form>
    </>
  );
}

function ChangePasswordOverlay({ onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {};

  return (
    <Overlay>
      <form
        className={`
          py-8 px-6 rounded-lg border-1 max-w-sm w-full
        bg-bg-base border-border/50
          flex flex-col gap-6
        `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="flex items-center justify-between">
          <h2 className="font-semibold text-text-primary">Change Password</h2>

          <Button
            icon={{ icon: "x", size: 16 }}
            variant={"secondary"}
            className={"!p-0 border-none hover:bg-transparent"}
            onClick={onClose}
          />
        </section>

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
          <Button
            type={"submit"}
            label={"Change Password"}
            variant={"accent"}
          />

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
    </Overlay>
  );
}

export default EditPersonal;
