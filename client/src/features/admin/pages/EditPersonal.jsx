import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useToast from "../../../shared/toast/useToast";
import useAdmin from "../hooks/useAdmin";

import Button from "../../../shared/components/ui/Button";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

import ChangePasswordOverlay from "../components/ChangePasswordOverlay";
import LinksSection from "../components/formSections/LinksSection";
import ImageUploadSection from "../components/formSections/ImageUploadSection";
import PersonalDetailsSection from "../components/formSections/PersonalDetailsSection";

function EditPersonal() {
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const { admin, loading, editAdmin } = useAdmin();
  const { addToast } = useToast();

  useEffect(() => reset(admin), [admin]);

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to edit details.",
        "error",
      );
      return navigate("/auth/login");
    }

    if (
      data.socialMediaLinks[0].platform === "" ||
      data.socialMediaLinks[0].link === ""
    )
      data.socialMediaLinks = [];

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("portfolioLink", data.portfolioLink);
    formData.append("about", JSON.stringify(data.about));
    formData.append("socialMediaLinks", JSON.stringify(data.socialMediaLinks));
    formData.append("resumeLink", data.resumeLink);
    formData.append("profileImage", data.profileImage[0]);

    const response = await editAdmin(admin._id, formData);

    if (!response.success) {
      if (response.unauthrorized) {
        addToast("Unauthorized access!", response.message, "error");
        return navigate("/auth/login");
      }

      return addToast("Error!", response.message, "error");
    }

    addToast("Admin details updated!", response.message, "success");
    return navigate(-1);
  };

  if (loading || !admin) return <LoadingScreen />;

  return (
    <>
      {showOverlay && (
        <ChangePasswordOverlay onClose={() => setShowOverlay(false)} />
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

          <PersonalDetailsSection admin={admin} {...methods} />
          <LinksSection admin={admin} {...methods} />
          <ImageUploadSection admin={admin} {...methods} />

          <section className="p-4 w-full flex gap-4 items-center justify-end">
            <Button
              type={"button"}
              label={"Cancel"}
              variant={"secondary"}
              onClick={() => {
                navigate(-1);
              }}
            />
            <Button type={"submit"} label={"Save Changes"} variant={"accent"} />
          </section>
        </div>
      </form>
    </>
  );
}

export default EditPersonal;
