interface HomePageShellProps {
  livePreview?: boolean;
}

export function HomePageShell({ livePreview }: HomePageShellProps) {
  console.log("livePreview", livePreview);

  return (
    <div className="wrapper">
      <h1>Home Page Shell</h1>
    </div>
  );
}
