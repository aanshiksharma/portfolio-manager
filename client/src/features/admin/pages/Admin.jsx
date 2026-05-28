import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/ui/Button";
import TableRow from "../../../shared/components/ui/TableRow";

import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import useAdmin from "../hooks/useAdmin";

function Admin() {
  const navigate = useNavigate();

  const { admin, loading } = useAdmin();

  if (loading || !admin) return <LoadingScreen />;

  return (
    <>
      <div className="container">
        <div className="flex flex-col gap-4 px-4 py-8 w-full">
          <section className="flex items-center justify-between">
            <h1 className="text-[2rem] text-text-primary font-medium">
              Personal Information
            </h1>

            <div className="flex gap-2 items-center">
              <Button
                label={"Edit Details"}
                variant={"primary"}
                onClick={() => {
                  navigate("/personal/edit");
                }}
              />
            </div>
          </section>

          <section>
            <TableRow heading={"Name"} value={admin.name} background={true} />

            <TableRow heading={"Email address"} value={admin.email} />

            <TableRow
              heading={"Mobile number"}
              value={admin.mobile || "Mobile number not set."}
              background={true}
            />

            <TableRow
              heading={"Portfolio link"}
              value={admin.portfolioLink}
              type="link"
            />

            <TableRow
              heading={"About"}
              value={
                admin.about[0] === "" ? "About text not set." : admin.about
              }
              background={true}
              type={admin.about[0] === "" ? "text" : "textArray"}
            />

            <TableRow
              heading={"Resume link"}
              value={
                admin.resumeLink
                  ? [{ platform: "link", link: admin.resumeLink }]
                  : "Resume link not set."
              }
              type={admin.resumeLink ? "linkArray" : "text"}
            />

            <TableRow
              heading={"Social media links"}
              value={
                admin.socialMediaLinks.length === 0
                  ? "Social media links not set"
                  : admin.socialMediaLinks
              }
              background={true}
              type={admin.socialMediaLinks.length === 0 ? "text" : "linkArray"}
              last={true}
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default Admin;
