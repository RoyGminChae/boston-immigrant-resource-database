const AIRTABLE_BASE_ID = "appKHrrX5ekPYIQBm";
const AIRTABLE_USER_TABLE_NAME = "User";

export type UserAccessStatus = "approved" | "pending" | "rejected";

type AirtableUserAccessResponse = {
	records?: Array<{
		fields?: {
			access?: unknown;
		};
	}>;
};

function getAirtableApiKey() {
	return process.env.AIRTABLE_API_KEY;
}

function escapeAirtableFormulaValue(value: string) {
	return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function normalizeUserAccessStatus(value: unknown): UserAccessStatus {
	const accessValue = Array.isArray(value) ? value[0] : value;

	if (typeof accessValue !== "string") {
		return "pending";
	}

	const normalizedValue = accessValue.trim().toLowerCase();

	if (
		normalizedValue === "approved" ||
		normalizedValue === "pending" ||
		normalizedValue === "rejected"
	) {
		return normalizedValue;
	}

	return "pending";
}

function chooseUserAccessStatus(records: AirtableUserAccessResponse["records"]) {
	const statuses = records?.map((record) => normalizeUserAccessStatus(record.fields?.access)) ?? [];

	if (statuses.includes("approved")) {
		return "approved";
	}

	if (statuses.includes("rejected")) {
		return "rejected";
	}

	return "pending";
}

function buildUserAccessUrl(clerkUserId: string) {
	const url = new URL(
		`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
			AIRTABLE_USER_TABLE_NAME,
		)}`,
	);

	url.searchParams.set(
		"filterByFormula",
		`{clerkUserId} = '${escapeAirtableFormulaValue(clerkUserId)}'`,
	);
	url.searchParams.set("maxRecords", "10");
	url.searchParams.append("fields[]", "access");

	return url;
}

export async function getUserAccessStatus(clerkUserId: string): Promise<UserAccessStatus> {
	const apiKey = getAirtableApiKey();

	if (!apiKey) {
		return "pending";
	}

	try {
		const response = await fetch(buildUserAccessUrl(clerkUserId), {
			cache: "no-store",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});

		if (!response.ok) {
			return "pending";
		}

		const data = (await response.json()) as AirtableUserAccessResponse;

		return chooseUserAccessStatus(data.records);
	} catch {
		return "pending";
	}
}
