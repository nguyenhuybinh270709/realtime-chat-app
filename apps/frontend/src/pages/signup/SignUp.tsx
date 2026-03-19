import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff } from "lucide-react";
import { signUpSchema } from "@/pages/signup/signUp.schema";
import type z from "zod";
import { mapZodErrors } from "@/lib/zod";
import { useSignUp } from "@/hooks/mutations/useSignUp";

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { mutate, isPending } = useSignUp();

  const [form, setForm] = useState<SignUpForm>({
    username: "",
    displayName: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpForm, string>>
  >({});

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof SignUpForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signUpSchema.safeParse(form);

    if (!result.success) {
      setErrors(mapZodErrors<SignUpForm>(result.error.issues));
      return;
    }

    setErrors({});

    mutate(result.data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-sm border h-[90vh]">
        <ScrollArea className="h-full">
          <div className="p-6">
            {/* Page heading */}
            <h1 className="text-3xl font-bold text-center mb-6">
              Create Account
            </h1>

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

              {/* Display name field */}
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input
                  placeholder="Enter display name"
                  value={form.displayName}
                  onChange={(e) => handleChange("displayName", e.target.value)}
                />
                {errors.displayName && (
                  <p className="text-sm text-destructive">
                    {errors.displayName}
                  </p>
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

              {/* Confirm password field */}
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                    className="pr-10"
                  />
                  {/* Show/Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Gender selection */}
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={form.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>

              {/* Login redirect */}
              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
