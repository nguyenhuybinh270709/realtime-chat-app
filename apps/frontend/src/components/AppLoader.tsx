function AppLoader() {
  return (
    <div className="flex h-dvh items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>

        <p className="text-4xl font-semibold text-muted-foreground">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default AppLoader;
