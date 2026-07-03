"use client";

import { useSignIn } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type SignInWithPasswordInput = {
	identifier: string;
	password: string;
};

type EmailCodeClientTrustFactor = {
	emailAddressId: string;
	safeIdentifier?: string;
	strategy: "email_code";
};

type PhoneCodeClientTrustFactor = {
	phoneNumberId: string;
	safeIdentifier?: string;
	strategy: "phone_code";
};

type ClientTrustFactor = EmailCodeClientTrustFactor | PhoneCodeClientTrustFactor;

type ClerkSecondFactor = {
	emailAddressId?: string;
	phoneNumberId?: string;
	safeIdentifier?: string;
	strategy: string;
};

function getClientTrustFactor(factors: ClerkSecondFactor[] | null | undefined) {
	const emailCodeFactor = factors?.find(
		(factor): factor is EmailCodeClientTrustFactor =>
			factor.strategy === "email_code" && typeof factor.emailAddressId === "string",
	);

	if (emailCodeFactor) {
		return emailCodeFactor;
	}

	return factors?.find(
		(factor): factor is PhoneCodeClientTrustFactor =>
			factor.strategy === "phone_code" && typeof factor.phoneNumberId === "string",
	);
}

export function useClerkSignIn() {
	const router = useRouter();
	const { isLoaded, setActive, signIn } = useSignIn();
	const [clientTrustFactor, setClientTrustFactor] = useState<ClientTrustFactor>();
	const [isSigningIn, setIsSigningIn] = useState(false);

	function getLoadedClerk() {
		if (!isLoaded || !setActive || !signIn) {
			throw new Error("Clerk is still loading. Please try again.");
		}

		return { setActive, signIn };
	}

	async function prepareClientTrustFactor(factor: ClientTrustFactor) {
		const { signIn } = getLoadedClerk();

		if (factor.strategy === "email_code") {
			await signIn.prepareSecondFactor({
				emailAddressId: factor.emailAddressId,
				strategy: factor.strategy,
			});
			return;
		}

		await signIn.prepareSecondFactor({
			phoneNumberId: factor.phoneNumberId,
			strategy: factor.strategy,
		});
	}

	async function completeSignIn(sessionId: string | null) {
		const { setActive } = getLoadedClerk();

		if (!sessionId) {
			throw new Error("Clerk did not return a session for this sign-in.");
		}

		await setActive({ session: sessionId });
		router.push("/contact");
		router.refresh();
	}

	async function signInWithPassword(input: SignInWithPasswordInput) {
		const { signIn } = getLoadedClerk();

		setIsSigningIn(true);

		try {
			const signInAttempt = await signIn.create({
				identifier: input.identifier,
				password: input.password,
				strategy: "password",
			});

			if (signInAttempt.status === "complete") {
				await completeSignIn(signInAttempt.createdSessionId);
				return;
			}

			if (signInAttempt.status === "needs_client_trust") {
				const factor = getClientTrustFactor(signInAttempt.supportedSecondFactors);

				if (!factor) {
					const supportedSecondFactors = signInAttempt.supportedSecondFactors
						?.map((secondFactor) => secondFactor.strategy)
						.filter(Boolean)
						.join(", ");

					throw new Error(
						`Clerk requires client trust verification, but this custom form does not support any of these second factors yet: ${
							supportedSecondFactors || "none"
						}.`,
					);
				}

				await prepareClientTrustFactor(factor);
				setClientTrustFactor(factor);
				return;
			}

			const supportedFactors = signInAttempt.supportedFirstFactors
				?.map((factor) => factor.strategy)
				.filter(Boolean)
				.join(", ");

			throw new Error(
				`Clerk did not complete this sign-in. Status: ${
					signInAttempt.status ?? "unknown"
				}. Supported first factors: ${supportedFactors || "none"}.`,
			);
		} finally {
			setIsSigningIn(false);
		}
	}

	async function verifyClientTrustCode(code: string) {
		const { signIn } = getLoadedClerk();

		if (!clientTrustFactor) {
			throw new Error("No verification code has been requested yet.");
		}

		setIsSigningIn(true);

		try {
			const signInAttempt = await signIn.attemptSecondFactor({
				code,
				strategy: clientTrustFactor.strategy,
			});

			if (signInAttempt.status === "complete") {
				await completeSignIn(signInAttempt.createdSessionId);
				return;
			}

			throw new Error(
				`Clerk did not complete this verification. Status: ${
					signInAttempt.status ?? "unknown"
				}.`,
			);
		} finally {
			setIsSigningIn(false);
		}
	}

	async function resendClientTrustCode() {
		if (!clientTrustFactor) {
			throw new Error("No verification code has been requested yet.");
		}

		setIsSigningIn(true);

		try {
			await prepareClientTrustFactor(clientTrustFactor);
		} finally {
			setIsSigningIn(false);
		}
	}

	function restartSignIn() {
		setClientTrustFactor(undefined);
	}

	return {
		clientTrustFactor,
		isSigningIn,
		resendClientTrustCode,
		restartSignIn,
		signInWithPassword,
		verifyClientTrustCode,
	};
}
