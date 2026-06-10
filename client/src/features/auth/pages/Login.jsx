import { useState, useEffect } from "react";

import LoginForm from "../components/LoginForm";

function Login() {
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    if (document.body.clientHeight > document.body.clientWidth)
      setIsVertical(true);
  }, []);

  return (
    <>
      <section
        className={`
          px-6 py-8 min-w-sm min-h-screen
          font-medium
          grid ${!isVertical && "md:grid-cols-5 lg:grid-cols-6"}
          gap-4 items-center justify-items-center
        `}
      >
        <div className="md:col-span-3 lg:col-span-4 p-2 inset-shadow-xs inset-shadow-accent shadow-lg shadow-primary/15 rounded-4xl h-full">
          <div className="relative h-full">
            <img
              src="/dashboard.png"
              alt=""
              className="rounded-2xl h-full object-cover object-left opacity-85"
            />

            <div
              className={`
                absolute inset-0 px-6
                flex flex-col justify-end
                ${
                  !isVertical &&
                  "md:bg-linear-to-tl md:text-right md:items-end md:py-10"
                } 
                bg-linear-to-t text-center items-center py-4
                from-background from-20% to-90% to-transparent
              `}
            >
              <h2 className="text-base">Portfolio CMS</h2>
              <p className="text-muted-foreground text-balance max-w-md">
                Manage projects, skills, profile and other portfolio content
                without code from one place.
              </p>
            </div>
          </div>
        </div>

        <LoginForm className="md:col-span-2" />
      </section>
    </>
  );
}

export default Login;
