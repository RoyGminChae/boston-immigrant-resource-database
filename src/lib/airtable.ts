import Airtable from "airtable";

const AIRTABLE_BASE_ID = "appKHrrX5ekPYIQBm";
const AIRTABLE_CONTACT_US_TABLE_NAME = "Contact Us Requests";
const AIRTABLE_CLIENT_REFERRALS_TABLE_NAME = "Client Referrals";

const airtableClient = new Airtable({
	apiKey: process.env.AIRTABLE_API_KEY,
});

const contactUsRequestsTable: Airtable.Table<ContactUsRequestFieldSet> =
	airtableClient.base(AIRTABLE_BASE_ID)(
		AIRTABLE_CONTACT_US_TABLE_NAME,
	) as Airtable.Table<ContactUsRequestFieldSet>;

const clientReferralsTable: Airtable.Table<ClientReferralFieldSet> =
	airtableClient.base(AIRTABLE_BASE_ID)(
		AIRTABLE_CLIENT_REFERRALS_TABLE_NAME,
	) as Airtable.Table<ClientReferralFieldSet>;

type ContactUsRequestFieldSet = {
	Organization: string;
	"First Name": string;
	"Last Name": string;
	"Primary Reason For Contact": string;
	"Preferred Method of Contact": string;
	Email: string;
	Phone: string;
	Message: string;
};

type ClientReferralFieldSet = {
	Message: string;
	"Services copy"?: string[];
	"Target Provider Preselected"?: string;
	"Target Service"?: string[];
	"Target Service Preselected"?: string;
};

export type CreateContactUsRequestInput = {
	organizationName: string;
	firstName: string;
	lastName: string;
	primaryReasonForContact: string;
	preferredMethodOfContact: string;
	email: string;
	phoneNumber: string;
	message: string;
};

export type CreateContactUsRequestResult = {
	id: string;
};

export type CreateClientReferralInput = {
	message: string;
	servicesCopyRecordIds?: string[];
	targetProviderRecordId?: string;
	targetServiceRecordIds?: string[];
	targetServicePreselected?: string;
};

export type CreateClientReferralResult = {
	id: string;
};

export async function createContactUsRequest(
	input: CreateContactUsRequestInput,
): Promise<CreateContactUsRequestResult> {
	if (!process.env.AIRTABLE_API_KEY) {
		throw new Error("AIRTABLE_API_KEY is not set.");
	}

	const record = await new Promise<Airtable.Record<ContactUsRequestFieldSet>>(
		(resolve, reject) => {
		contactUsRequestsTable.create(
			[
				{
					fields: {
						Organization: input.organizationName,
						"First Name": input.firstName,
						"Last Name": input.lastName,
						"Primary Reason For Contact": input.primaryReasonForContact,
						"Preferred Method of Contact": input.preferredMethodOfContact,
						Email: input.email,
						Phone: input.phoneNumber,
						Message: input.message,
					},
				},
			],
			{ typecast: true },
			(error, records) => {
				if (error) {
					reject(error);
					return;
				}

				const createdRecord = records?.[0];

				if (!createdRecord) {
					reject(new Error("Airtable did not return a created record."));
					return;
				}

				resolve(createdRecord);
			},
		);
	},
	);

	return { id: record.id };
}

export async function createClientReferral(
	input: CreateClientReferralInput,
): Promise<CreateClientReferralResult> {
	if (!process.env.AIRTABLE_API_KEY) {
		throw new Error("AIRTABLE_API_KEY is not set.");
	}

	const record = await new Promise<Airtable.Record<ClientReferralFieldSet>>(
		(resolve, reject) => {
			clientReferralsTable.create(
				[
					{
						fields: {
							Message: input.message,
							"Services copy": input.servicesCopyRecordIds,
							"Target Provider Preselected": input.targetProviderRecordId,
							"Target Service": input.targetServiceRecordIds,
							"Target Service Preselected": input.targetServicePreselected,
						},
					},
				],
				{ typecast: true },
				(error, records) => {
					if (error) {
						reject(error);
						return;
					}

					const createdRecord = records?.[0];

					if (!createdRecord) {
						reject(new Error("Airtable did not return a created record."));
						return;
					}

					resolve(createdRecord);
				},
			);
		},
	);

	return { id: record.id };
}
