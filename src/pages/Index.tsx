import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, ShieldCheck, Key } from "lucide-react";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background auth-gradient flex flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">AuthVault</span>
          </div>
          <div className="flex gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="sm">Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            ) : (
              <>
                <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
                <Link to="/signup"><Button size="sm">Get started</Button></Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-in max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Lock className="h-3.5 w-3.5" />
            Production-grade authentication
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Secure auth,
            <br />
            <span className="text-gradient">built right.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
            JWT authentication, bcrypt hashing, role-based access control, and protected routes — production ready from day one.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button size="lg">
                {isAuthenticated ? "Go to dashboard" : "Create account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid max-w-3xl gap-6 sm:grid-cols-3 animate-fade-in">
          <FeatureCard
            icon={<Key className="h-5 w-5 text-primary" />}
            title="JWT Tokens"
            description="Stateless session management with secure token rotation"
          />
          <FeatureCard
            icon={<Lock className="h-5 w-5 text-primary" />}
            title="bcrypt Hashing"
            description="Industry-standard password hashing with salt rounds"
          />
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5 text-primary" />}
            title="Role-Based Access"
            description="User and admin roles with protected routes"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/30">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">{icon}</div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
