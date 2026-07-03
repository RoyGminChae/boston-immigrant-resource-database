"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { throwIfClerkError } from "@/features/auth/auth-helpers";

export type SignInWithPasswordInput = {
  identifier: string;
  password: string;
};

export function useClerkSignIn() {
  const router = useRouter();
  const { fetchStatus, signIn } = useSignIn();

  async function signInWithPassword(input: SignInWithPasswordInput) {
    const result = await signIn.create({
      identifier: input.identifier,
      password: input.password,
    });

    throwIfClerkError(result);

    if (signIn.status !== "complete") {
      throw new Error("Additional verification is required before signing in.");
    }

    const finalizeResult = await signIn.finalize();

    throwIfClerkError(finalizeResult);

    router.push("/contact");
    router.refresh();
  }

  return {
    isSigningIn: fetchStatus === "fetching",
    signInWithPassword,
  };
}
