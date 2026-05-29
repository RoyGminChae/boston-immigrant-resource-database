import { NextResponse } from "next/server";

import { createContactUsRequest } from "@/lib/airtable";

export const runtime = "nodejs";

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as {
			organizationName?: string;
			firstName?: string;
			lastName?: string;
			primaryReasonForContact?: string;
			preferredMethodOfContact?: string;
			email?: string;
			phoneNumber?: string;
			message?: string;
		};

		const createdRecord = await createContactUsRequest({
			organizationName: body.organizationName ?? "",
			firstName: body.firstName ?? "",
			lastName: body.lastName ?? "",
			primaryReasonForContact: body.primaryReasonForContact ?? "",
			preferredMethodOfContact: body.preferredMethodOfContact ?? "",
			email: body.email ?? "",
			phoneNumber: body.phoneNumber ?? "",
			message: body.message ?? "",
		});

		return NextResponse.json(
			{
				success: true,
				id: createdRecord.id,
			},
			{ status: 201 },
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";

		return NextResponse.json(
			{
				success: false,
				error: message,
			},
			{ status: 500 },
		);
	}
}