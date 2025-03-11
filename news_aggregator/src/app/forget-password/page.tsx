/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }

    // Simulate sending reset link
    console.log('Sending password reset to:', email);
    setError('');
    setMessage('Reset link sent! Check your email.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cdd7f0] dark:bg-background_dark">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm p-8 bg-white dark:bg-foreground_dark rounded-2xl shadow-xl space-y-6 border border-[#cdd7f0]"
      >
        <h2 className="text-2xl font-semibold text-center text-black dark:text-white">
          Forgot Password?
        </h2>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center">{message}</p>}

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#687EFF] text-white py-2 rounded-lg hover:bg-[#5a6be0] transition duration-200"
        >
          Send Reset Link
        </button>

        <p className="text-center text-sm text-gray-700 mt-2">
          Back to{' '}
          <Link href="/" className="text-[#687EFF] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}