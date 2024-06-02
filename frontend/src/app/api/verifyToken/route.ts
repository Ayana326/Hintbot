"use server";

import admin from "@/firebase/firebase_admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (await validateToken(request) !== null) {
    return NextResponse.json({ status: "ok" });
  } else {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}

export const validateToken = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;
  const DecodedIdToken = await admin.auth().verifyIdToken(token);
  if (!DecodedIdToken) {
    return null;
  }
  return DecodedIdToken;
}