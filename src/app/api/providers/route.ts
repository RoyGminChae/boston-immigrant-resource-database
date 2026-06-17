import { NextResponse } from "next/server";
import { getAllProviders } from "@/app/api/airtable";

export async function GET() {
  try {
    const providers = await getAllProviders();
    return NextResponse.json(providers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}