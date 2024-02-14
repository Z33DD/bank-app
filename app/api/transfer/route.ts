"use server";
import { NextRequest, NextResponse } from "next/server";
import pb from "../../store";

async function POST(req: NextRequest) {
  const body = await req.json();

  const sourceId = body.sourceId;
  const targetId = body.targetId;
  const amount = body.amount;

  const sourceAccount = await pb.collection("accounts").getOne(sourceId);
  const targetAccount = await pb.collection("accounts").getOne(targetId);

  if (sourceAccount.balance < amount) {
    return NextResponse.json(
      { message: "Insufficient funds!" },
      { status: 400 }
    );
  }

  await pb.collection("accounts").update(sourceId, {
    balance: sourceAccount.balance - amount,
  });
  await pb.collection("accounts").update(targetId, {
    balance: targetAccount.balance + amount,
  });

  return NextResponse.json({ message: "Success!" }, { status: 200 });
}

export { POST };
