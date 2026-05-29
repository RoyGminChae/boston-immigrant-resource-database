import { NextResponse } from "next/server";

import { createClientReferral } from "@/lib/airtable";

export const runtime = "nodejs";

const AIRTABLE_RECORD_ID_REGEX = /^rec[a-zA-Z0-9]{14}$/;

class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}

type ClientReferralRequestBody = {
	message: string;
	servicesCopyRecordIds?: string[];
	targetProviderRecordId?: string;
	targetServiceRecordIds?: string[];
	targetServicePreselected?: string;
};

function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	if (error && typeof error === "object") {
		const airtableError = error as {
			message?: unknown;
			error?: unknown;
			detail?: unknown;
		};

		if (typeof airtableError.message === "string") {
			return airtableError.message;
		}

		if (typeof airtableError.error === "string") {
			return airtableError.error;
		}

		if (typeof airtableError.detail === "string") {
			return airtableError.detail;
		}

		try {
			return JSON.stringify(error);
		} catch {
			return "Unknown error";
		}
	}

	return "Unknown error";
}

function assertRecordId(value: string, fieldName: string): void {
	if (!AIRTABLE_RECORD_ID_REGEX.test(value)) {
		throw new ValidationError(`${fieldName} must be a valid Airtable record ID (rec...).`);
	}
}

function validateRecordIdArray(values: unknown, fieldName: string): string[] | undefined {
	if (values === undefined) {
		return undefined;
	}

	if (!Array.isArray(values)) {
		throw new ValidationError(`${fieldName} must be an array of Airtable record IDs.`);
	}

	const parsed = values.map((value, index) => {
		if (typeof value !== "string") {
			throw new ValidationError(`${fieldName}[${index}] must be a string Airtable record ID.`);
		}

		assertRecordId(value, `${fieldName}[${index}]`);
		return value;
	});

	return parsed;
}

function validateClientReferralBody(body: unknown): ClientReferralRequestBody {
	if (!body || typeof body !== "object") {
		throw new ValidationError("Request body must be a JSON object.");
	}

	const raw = body as Record<string, unknown>;

	if (typeof raw.message !== "string" || raw.message.trim().length === 0) {
		throw new ValidationError("message is required and must be a non-empty string.");
	}

	if (raw.targetProviderPreselected !== undefined) {
		throw new ValidationError(
			"targetProviderPreselected is no longer supported. Send targetProviderRecordId (rec...) instead.",
		);
	}

	let targetProviderRecordId: string | undefined;
	if (raw.targetProviderRecordId !== undefined) {
		if (typeof raw.targetProviderRecordId !== "string") {
			throw new ValidationError("targetProviderRecordId must be a string Airtable record ID.");
		}

		assertRecordId(raw.targetProviderRecordId, "targetProviderRecordId");
		targetProviderRecordId = raw.targetProviderRecordId;
	}

	if (
		raw.targetServicePreselected !== undefined &&
		typeof raw.targetServicePreselected !== "string"
	) {
		throw new ValidationError("targetServicePreselected must be a string.");
	}

	return {
		message: raw.message.trim(),
		servicesCopyRecordIds: validateRecordIdArray(raw.servicesCopyRecordIds, "servicesCopyRecordIds"),
		targetProviderRecordId,
		targetServiceRecordIds: validateRecordIdArray(raw.targetServiceRecordIds, "targetServiceRecordIds"),
		targetServicePreselected: raw.targetServicePreselected as string | undefined,
	};
}

export async function POST(request: Request) {
	try {
		const body = validateClientReferralBody(await request.json());

		const createdRecord = await createClientReferral({
			message: body.message,
			servicesCopyRecordIds: body.servicesCopyRecordIds,
			targetProviderRecordId: body.targetProviderRecordId,
			targetServiceRecordIds: body.targetServiceRecordIds,
			targetServicePreselected: body.targetServicePreselected,
		});

		return NextResponse.json(
			{
				success: true,
				id: createdRecord.id,
			},
			{ status: 201 },
		);
	} catch (error) {
		if (error instanceof ValidationError) {
			return NextResponse.json(
				{
					success: false,
					error: error.message,
				},
				{ status: 400 },
			);
		}

		const message = getErrorMessage(error);

		return NextResponse.json(
			{
				success: false,
				error: message,
			},
			{ status: 500 },
		);
	}
}