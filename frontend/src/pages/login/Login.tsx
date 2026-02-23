import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff } from "lucide-react";
import type z from "zod";
import { mapZodErrors } from "@/lib/zod";
import { loginSchema } from "@/pages/login/login.schema";

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginForm, string>>
  >({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      setErrors(mapZodErrors<LoginForm>(result.error.issues));
      return;
    }

    setErrors({});
    console.log("Login data:", result.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-sm border">
        <ScrollArea className="h-full">
          <div className="p-6">
            {/* Page heading */}
            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username field */}
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  placeholder="Enter username"
                  value={form.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="pr-10"
                  />
                  {/* Show/Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <Button type="submit" className="w-full cursor-pointer">
                  Login
                </Button>
              </div>

              {/* Login redirect */}
              <div className="mt-6 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Signup
                </Link>
              </div>
            </form>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
