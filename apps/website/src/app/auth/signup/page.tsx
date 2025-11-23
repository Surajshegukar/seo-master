import { SignUpForm } from "@/src/components/auth/signup-form/signup-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
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