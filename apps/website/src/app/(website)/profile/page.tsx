import { auth } from "@/auth";
import { UserMenu } from "@/src/components/auth/user-menu";
import { Button } from "@/shadcn/ui/button";
import Link from "next/link";

export default async function WebPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Web Dashboard</h1>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {session?.user ? (
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-2xl font-bold">
                Welcome, {session.user.name || "User"}!
              </h2>
              <p className="mt-2 text-gray-600">
                You're signed in as {session.user.email}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Role: <span className="font-medium">{session.user.role}</span>
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold">Profile</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Manage your account settings
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold">Dashboard</h3>
                <p className="mt-2 text-sm text-gray-600">
                  View your statistics
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold">Settings</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Configure preferences
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p className="mt-2 text-gray-600">
              Please sign in to access the dashboard
            </p>
            <Link href="/auth/signin" className="mt-4 inline-block">
              <Button>Sign In</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}