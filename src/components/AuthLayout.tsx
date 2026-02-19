import { Shield } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background auth-gradient px-4">
      <div className="mb-8 flex items-center gap-3 animate-fade-in">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <span className="text-xl font-semibold tracking-tight text-foreground">AuthVault</span>
      </div>
      <div className="w-full max-w-md animate-fade-in">{children}</div>
    </div>
  );
}
