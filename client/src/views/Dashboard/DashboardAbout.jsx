function DashboardAbout({ about }) {
  return (
    <section className="flex flex-col gap-4">
      <h4 className="font-semibold text-xl">About</h4>

      <div className="flex flex-col gap-1">
        {about?.map((line) => (
          <p
            key={line}
            className="px-3 py-2 bg-bg-surface-dark/50 rounded-sm w-full"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

export default DashboardAbout;
