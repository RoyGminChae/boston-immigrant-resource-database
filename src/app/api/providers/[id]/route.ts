import { NextResponse } from "next/server";
import { getProviderById } from "@/app/api/airtable";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {

    const {id} = await params;

    const provider = await getProviderById(id);
    if (!provider) 
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(provider);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch provider" }, { status: 500 });
  }
}