import LoginForm from "../components/LoginForm";

import welcomeText from "./loginPage.data.json";

function Login() {
  const isVertical = document.body.offsetHeight > document.body.offsetWidth;

  return (
    <>
      <div
        className={`grid grid-cols-1 ${!isVertical ? "md:grid-cols-2" : ""} min-h-screen`}
      >
        <section
          className="px-6 py-8 min-w-sm bg-foreground text-background
            flex-1 flex items-center justify-center"
        >
          <article className="flex flex-col gap-6 align-center justify-center max-w-lg w-full">
            <p className="text-2xl font-semibold">Welcome!</p>

            <div className="flex flex-col gap-2.5">
              {welcomeText.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p>{item.text}</p>

                  {item.list && (
                    <ul className="list-disc list-inside text-sm grid gap-0.5 text text-muted">
                      {item.list.map((listItem) => (
                        <li>{listItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          className="px-6 py-8 min-w-sm bg-background text-foreground
            font-medium flex-1 flex flex-col gap-6 align-center justify-center"
        >
          <div className="max-w-sm mx-auto w-full grid gap-6">
            <h1 className="text-2xl font-semibold">Login to continue!</h1>

            <LoginForm />
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
