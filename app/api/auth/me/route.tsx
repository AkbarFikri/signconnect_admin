import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const store = cookies();
  const token = store.get("AdminSignConnect");

  if (!token) {
    return NextResponse.json({ massage: "Unouthorized" }, { status: 401 });
  }
  const secret = process.env.JWT_SECRET || "";
  try {
    verify(token.value, secret);
    return NextResponse.json({ massage: "Halo Admin!" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { massage: "Something went wrong" },
      { status: 400 }
    );
  }
}
