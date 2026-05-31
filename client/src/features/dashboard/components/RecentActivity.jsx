import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const timeDiffFormatter = (timestamp) => {
  const diffInSeconds = (new Date() - new Date(timestamp)) / 1000;
  if (diffInSeconds > 60 * 60 * 24 * 365)
    return `${Math.floor(diffInSeconds / (60 * 60 * 24 * 365))}y ago`; // years

  if (diffInSeconds > 60 * 60 * 24 * 30)
    return `${Math.floor(diffInSeconds / (60 * 60 * 24 * 30))}m ago`; // months

  if (diffInSeconds > 60 * 60 * 24)
    return `${Math.floor(diffInSeconds / (60 * 60 * 24))}d ago`; // days

  if (diffInSeconds > 60 * 60)
    return `${Math.floor(diffInSeconds / (60 * 60))}h ago`; // hours

  if (diffInSeconds > 60)
    return `${Math.floor(diffInSeconds / 60)}min ago`; // minutes
  else return `${Math.floor(diffInSeconds)}s ago`; // seconds
};

function RecentActivity({ recentActivities }) {
  return (
    <section className="px-4 py-6 grid gap-6">
      <div className="space-y-2">
        <h2 className="text-xl">Recent Activity</h2>
        <p className="text-muted-foreground">
          Recent changes across your portfolio content.
        </p>
      </div>

      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Action</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>

        {recentActivities ? (
          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.timestamp}>
                <TableCell>{activity.title}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="secondary"
                    className={`${activity.action === "created" ? "bg-badge-1 text-badge-1-foreground" : "bg-badge-2 text-badge-2-foreground"}`}
                  >
                    {activity.action}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{activity.type}</TableCell>
                <TableCell className="text-right">
                  {timeDiffFormatter(activity.timestamp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {Array.from(new Array(10)).map((_) => (
              <TableRow>
                <TableCell>-</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-right">-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </section>
  );
}

export default RecentActivity;
