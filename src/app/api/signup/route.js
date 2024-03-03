import { prisma } from "@/utils/prisma";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const user = await prisma.user.create({
    data: {
      pseudo: body.pseudo,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword);
}