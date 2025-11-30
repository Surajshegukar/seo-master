import { SignInForm } from "@/src/components/auth/signin-form/signin-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7]">
      <div className="w-full max-w-md space-y-8  border-1 border-gray-300 rounded-lg  py-12 px-10 bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>
         <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}