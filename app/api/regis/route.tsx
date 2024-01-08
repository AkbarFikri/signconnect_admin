import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  const body = await req.json();
  const { email, password } = body;

  const count = await prisma.user.count({
    where: {
      email: email,
    },
  });

  if (count == 1) {
    return NextResponse.json({ massage: "Alredy Registered" }, { status: 401 });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashPassword,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return NextResponse.json(
    { massage: "Register Succes", data: user },
    { status: 200 }
  );
}
