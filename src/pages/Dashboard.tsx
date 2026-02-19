import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, User, ShieldCheck, Activity, Clock, Key } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background auth-gradient">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">AuthVault</span>
          </div>
          <div className="flex items-center gap-4">
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, <span className="text-gradient">{user?.name}</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Your secure dashboard</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          <DashboardCard
            icon={<User className="h-5 w-5 text-primary" />}
            title="Profile"
            value={user?.email || ""}
            label="Email address"
          />
          <DashboardCard
            icon={<ShieldCheck className="h-5 w-5 text-primary" />}
            title="Role"
            value={user?.role === "admin" ? "Administrator" : "User"}
            label="Access level"
          />
          <DashboardCard
            icon={<Key className="h-5 w-5 text-primary" />}
            title="Session"
            value="Active"
            label="JWT authenticated"
          />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6 animate-fade-in">
          <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Security Info
          </h2>
          <div className="space-y-3 text-sm">
            <InfoRow label="Authentication" value="JWT Bearer Token" />
            <InfoRow label="Password hashing" value="bcrypt (10 salt rounds)" />
            <InfoRow label="Session storage" value="localStorage (token)" />
            <InfoRow label="Role" value={user?.role || "user"} />
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({ icon, title, value, label }: { icon: React.ReactNode; title: string; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">{icon}</div>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <p className="text-lg font-semibold text-foreground truncate">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-xs text-foreground bg-secondary px-2 py-1 rounded">{value}</span>
    </div>
  );
}
