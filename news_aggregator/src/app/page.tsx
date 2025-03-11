"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { sendData } from "@/utils/sendData";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const sqlInjectionPattern =
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND|EXEC|--|#|;)\b|['"=])/i;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (sqlInjectionPattern.test(email) || sqlInjectionPattern.test(password)) {
      setError("Invalid input detected");
      return;
    }

    const data = await sendData("/login", "POST", { email, password });

    // Simulate login success
    console.log("Logging in with:", email, password, data);
    setError("");

    // Redirect to /home after successful login
    // router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cdd7f0] dark:bg-background_dark">
      <form
        onSubmit={(e) => handleLogin(e)}
        className="w-full max-w-sm p-8 bg-white dark:bg-foreground_dark rounded-2xl shadow-xl space-y-6 border border-[#cdd7f0]"
      >
        <h2 className="text-2xl font-semibold text-center text-black dark:text-white">
          Login to News Daily
        </h2>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 pr-10"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-[#687EFF] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#687EFF] text-white py-2 rounded-lg hover:bg-[#5a6be0] transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-700 mt-2">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#687EFF] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
