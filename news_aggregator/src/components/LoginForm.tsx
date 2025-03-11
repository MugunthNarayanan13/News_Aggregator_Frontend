/* eslint-disable react/no-unescaped-entities */
// src/components/LoginForm.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react"; 

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    // TODO: Call backend API here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600 dark:text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2 mt-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button type="submit" className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2">
        Login
      </Button>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
        Don't have an account? <span className="text-blue-600 cursor-pointer hover:underline">Sign Up</span>
      </p>
    </form>
  );
}