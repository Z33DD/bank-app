"use server";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import pb from "../../store";
import Account from "../../model/account";

type AccountsResponseData = {
  message: string;
  accounts: Array<Account>;
};

async function GET(
  req: NextApiRequest,
  res: NextApiResponse<AccountsResponseData>
) {
  const { searchParams: params } = new URL(req.url as string);
  const userId = params.get("uid") as string;

  const results = await pb.collection("accounts").getList(1, 50, {
    filter: `user.id = "${userId}"`,
  });
  const accounts: Array<Account> = [];

  results.items.forEach((element) => {
    accounts.push({
      id: element.id,
      name: element.name,
      balance: element.balance,
    });
  });

  return NextResponse.json(
    { message: "Success!", accounts: accounts },
    { status: 200 }
  );
}

export { GET };
