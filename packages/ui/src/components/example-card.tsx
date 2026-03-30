import { cn } from "@repo/ui/lib/utils";

export type ExampleCardProps = {
  title: string;
  className?: string;
};

export function ExampleCard({ title, className }: ExampleCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm",
        className,
      )}
    >
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}
