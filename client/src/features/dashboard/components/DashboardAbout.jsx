import useAdmin from "../../admin/hooks/useAdmin";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

function DashboardAbout() {
  const { admin, loading } = useAdmin();

  if (loading || !admin) return <LoadingScreen />;

  return (
    <section className="flex flex-col gap-4">
      <h4 className="font-semibold text-xl">About</h4>

      <div className="flex flex-col gap-1">
        {admin?.about.map((line) => (
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
