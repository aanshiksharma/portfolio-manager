import { Skeleton } from "@/components/ui/skeleton";

function ProjectPageSkeleton() {
  return (
    <section className="space-y-4">
      <Skeleton className="h-[60vh]" />

      <Skeleton className="h-6 w-60" />

      <div className="space-y-1.5">
        <Skeleton className="h-3 max-w-2xl" />
        <Skeleton className="h-3 w-60" />
      </div>

      <section className="space-y-3 border-l-3 px-3 py-2 border-muted my-8">
        <Skeleton className="w-40 h-3" />

        <div className="flex gap-2 items-center flex-wrap">
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-2 w-12" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 2xl:grid-cols-3 gap-3">
        <Skeleton className="aspect-video" />
        <Skeleton className="aspect-video" />
        <Skeleton className="aspect-video" />
      </section>
    </section>
  );
}

export default ProjectPageSkeleton;
