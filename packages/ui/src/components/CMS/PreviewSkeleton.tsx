/**
 * Shown while the Live Preview route is loading or refreshing after a CMS edit.
 * Helps content authors understand the view is updating, not broken.
 */
export function PreviewSkeleton() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-background px-6 pt-20 text-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-hidden
      />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Loading preview…
        </p>
        <p className="max-w-md text-xs text-muted-foreground">
          Loading page components. This appears briefly while your changes are
          applied to the preview.
        </p>
      </div>
    </div>
  );
}
