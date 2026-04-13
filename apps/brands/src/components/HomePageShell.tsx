interface HomePageShellProps {
  livePreview?: boolean;
}

export function HomePageShell({ livePreview }: HomePageShellProps) {
  void livePreview;

  return (
    <div>
      <h1>Home Page Shell</h1>
    </div>
  );
}
