function DashboardHeader({ admin }) {
  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-[2rem] font-medium text-text-primary">
        Hi, {admin.name?.split(" ")[0]}!
      </h1>

      <p>
        Your portfolio is live at{" "}
        <a
          href={admin.portfolioLink}
          target="_blank"
          className="hover:text-text-primary transition-all ease-out duration-200"
        >
          {admin.portfolioLink}
        </a>
      </p>
    </section>
  );
}

export default DashboardHeader;
