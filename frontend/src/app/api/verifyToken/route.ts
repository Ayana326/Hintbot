import admin from "@/firebase/firebase_admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) return NextResponse.json({ error: "Not Found" }, { status: 404 });

  const DecodedIdToken = await admin.auth().verifyIdToken(token);

  if (DecodedIdToken) {
    return NextResponse.json({ status: "ok" });
  } else {
    NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}
