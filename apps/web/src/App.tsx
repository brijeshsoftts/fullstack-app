import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-5xl font-medium">Welcome to the React App!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}

export default App;
