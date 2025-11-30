import { SignUpForm } from "@/src/components/auth/signup-form/signup-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7]">
      <div className="w-full max-w-md space-y-8 border-1 border-gray-300 rounded-lg bg-white px-8 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Create an account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign up to get started
          </p>
        </div>
         <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}