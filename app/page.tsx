"use client";
import pb from "./store";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";

import { Button } from "@mui/material";
import BalanceCard from "./components/balance";
import { useEffect, useState } from "react";
import Account from "./model/account";
import TransferModal from "./components/transferModal";

type AccountsResponseData = {
  message: string;
  accounts: Array<Account>;
};

export default function Home() {
  const router = useRouter();

  if (!pb.authStore.isValid) {
    console.error("No login, redirecting");

    router.push("/signin");
  }
  const [data, setData] = useState<AccountsResponseData>();
  const [isLoading, setLoading] = useState(true);
  const [isMakeTransferModalOpen, setMakeTransferModalOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/accounts?uid=${pb.authStore.model?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No accounts data</p>;

  return (
    <>
      <Grid container spacing={2} padding={4}>
        {data?.accounts?.map((account, index) => {
          return (
            <BalanceCard
              key={index}
              accountId={account.id}
              title={account.name}
              balance={account.balance}
            />
          );
        })}
        <Grid item xs={6} md={8}>
          <Button
            variant="contained"
            onClick={() => {
              setMakeTransferModalOpen(true);
            }}
          >
            Transfer
          </Button>
        </Grid>
      </Grid>
      <TransferModal
        accounts={data.accounts}
        closeModal={() => {
          setMakeTransferModalOpen(false);
        }}
        isOpen={isMakeTransferModalOpen}
      />
    </>
  );
}
