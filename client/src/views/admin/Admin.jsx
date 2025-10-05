import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import TableRow from "../../components/TableRow";

import LoadingPage from "../LoadingPage";

function Admin() {
  const [adminDetails, setAdminDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadPersonalData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin`);
        const response = await res.json();

        if (!res.ok) return alert(response.message);

        setAdminDetails(response);
      } catch (err) {
        alert("Something went wrong at our end.");
      } finally {
        setLoading(false);
      }
    };

    loadPersonalData();
  }, []);

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
            <TableRow
              heading={"Name"}
              value={adminDetails.name}
              background={true}
            />

            <TableRow heading={"Email address"} value={adminDetails.email} />

            <TableRow
              heading={"Mobile number"}
              value={adminDetails.mobile || "Mobile number not set."}
              background={true}
            />

            <TableRow
              heading={"Portfolio link"}
              value={adminDetails.portfolioLink}
              type="link"
            />

            <TableRow
              heading={"About"}
              value={
                adminDetails.about[0] === ""
                  ? "About text not set."
                  : adminDetails.about
              }
              background={true}
              type={adminDetails.about[0] === "" ? "text" : "textArray"}
            />

            <TableRow
              heading={"Resume link"}
              value={
                adminDetails.resumeLink
                  ? [{ platform: "link", link: adminDetails.resumeLink }]
                  : "Resume link not set."
              }
              type={adminDetails.resumeLink ? "linkArray" : "text"}
            />

            <TableRow
              heading={"Social media links"}
              value={
                adminDetails.socialMediaLinks.length === 0
                  ? "Social media links not set"
                  : adminDetails.socialMediaLinks
              }
              background={true}
              type={
                adminDetails.socialMediaLinks.length === 0
                  ? "text"
                  : "linkArray"
              }
              last={true}
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default Admin;
