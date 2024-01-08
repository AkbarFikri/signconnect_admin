import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const MAX_AGE = 3600 * 6;

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (user == null) {
    return NextResponse.json(
      { massage: "username or password wrong" },
      { status: 401 }
    );
  }

  const checkpass = await bcrypt.compare(password, user.password);

  if (!checkpass) {
    return NextResponse.json(
      { massage: "username or password wrong" },
      { status: 401 }
    );
  }

  const secret = process.env.JWT_SECRET || "";
  const token = sign(
    {
      email,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const seralized = serialize("AdminSignConnect", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  return NextResponse.json(
    { massage: "Authorized" },
    { status: 200, headers: { "Set-Cookie": seralized } }
  );
}
