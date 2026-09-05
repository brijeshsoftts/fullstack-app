import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="text-sm font-medium text-foreground">
                {user?.name}
              </p>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">
                {user?.email}
              </p>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ID</p>
              <p className="font-mono text-xs break-all text-foreground">
                {user?.id}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
