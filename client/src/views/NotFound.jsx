import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Icon from "../components/Icon";

function NotFound() {
  document.title = "Page not found";
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className="container max-w-6xl flex flex-col items-start justify-center gap-4 m-auto px-4">
        <Icon icon="not-found" size={48} />
        <h1 className="text-4xl text-text-primary font-medium">
          Error 404 : Page Not Found!
        </h1>
        <div>
          <p>
            Looks like the page you are looking for does not exist or has been
            moved.
          </p>
          <p>Do not worry, I will get you back on track!</p>
        </div>
        <Button
          label="Back to Homepage"
          variant="accent"
          type="button"
          onClick={() => {
            navigate("/");
          }}
        />
      </section>
    </>
  );
}

export default NotFound;
