"use client";

import { useState, type FormEvent } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ClerkMethodResult = {
  error: Error | null;
};

function getRequiredString(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required.`);
  }

  return value.trim();
}

function throwIfClerkError(result: ClerkMethodResult) {
  if (result.error) {
    throw result.error;
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Sign in could not be completed.";
}

export function LoginForm() {
  const router = useRouter();
  const { fetchStatus, signIn } = useSignIn();
  const [errorMessage, setErrorMessage] = useState<string>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(undefined);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await signIn.create({
        identifier: getRequiredString(formData, "identifier"),
        password: getRequiredString(formData, "password"),
      });

      throwIfClerkError(result);

      if (signIn.status !== "complete") {
        setErrorMessage("Additional verification is required before signing in.");
        return;
      }

      const finalizeResult = await signIn.finalize();

      throwIfClerkError(finalizeResult);

      router.push("/contact");
      router.refresh();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  const isSubmitting = fetchStatus === "fetching";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="identifier" className="text-sm font-medium text-slate-700">
          Username
        </Label>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="Your username"
          required
          className="h-12 rounded-lg border-slate-300 px-4 text-sm shadow-sm placeholder:text-slate-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your Password"
          required
          className="h-12 rounded-lg border-slate-300 px-4 text-sm shadow-sm placeholder:text-slate-400"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-lg bg-[#5d93c7] text-base font-semibold text-white shadow-[0_10px_24px_rgba(93,147,199,0.28)] transition-colors hover:bg-[#4b81b6]"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
