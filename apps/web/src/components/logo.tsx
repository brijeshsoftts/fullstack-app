import { ListChecks } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/">
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <ListChecks className="h-4 w-4" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">
          FullStack App
        </span>
      </div>
    </Link>
  );
}
