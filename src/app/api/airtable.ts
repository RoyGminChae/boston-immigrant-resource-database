import Airtable, { FieldSet, Record } from "airtable";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY!,
}).base(process.env.AIRTABLE_BASE_ID!);

export interface Provider {
  id: string;
  name: string;
  email: string;
  primary_phone_number: string;
  secondary_phone_number: string;
  address: string;
  status?: string;
  website: string;
  google_maps_link: string;
  service_types?: string;
  description: string;
  language_support: string[];
  services: string;
}

export interface Service {
  id: string;
  name: string;
  provider: string;
  description?: string;
  status: string;
  link?: string;
  service_types: string;
  provider_email: string;
  provider_record_ID: string;
}

function toProvider(r: Record<FieldSet>): Provider {
  return {
    id: r.id,
    name: r.get("Name") as string,
    email: r.get("Email") as string,
    primary_phone_number: r.get("Primary Phone Number") as string,
    secondary_phone_number: r.get("Secondary Phone Number") as string,
    address: r.get("Address") as string,
    website: r.get("Website") as string,
    google_maps_link: r.get("Google Maps Link") as string,
    description: r.get("Description") as string,
    services: r.get("Services") as string,
    language_support: r.get("Language Support") as string[],
    status: r.get("Status") as string | undefined,
  };
}

function toService(r: Record<FieldSet>): Service {
  return {
    id: r.id,
    provider: r.get("Provider") as string,
    provider_email: r.get("Provider Email") as string,
    service_types: r.get("Service Types") as string,
    name: r.get("Name") as string,
    description: r.get("Description") as string | undefined,
    status: r.get("Status") as string,
    link: r.get("Link") as string | undefined,
    provider_record_ID: r.get("Provider RECORD ID") as string,
  };
}

export async function getAllProviders(): Promise<Provider[]> {
  const records = await base("Providers").select({ view: "Grid view" }).all();
  return records.map(toProvider);
}

export async function getProviderById(id: string): Promise<Provider | null> {
  try {
    return toProvider(await base("Providers").find(id));
  } catch {
    return null;
  }
}

export async function getAllServices(): Promise<Service[]> {
  const records = await base("Services").select({ view: "Grid view" }).all();
  return records.map(toService);
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    return toService(await base("Services").find(id));
  } catch {
    return null;
  }
}