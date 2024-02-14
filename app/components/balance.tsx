"use client";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import pb from "../store";
import { useState } from "react";

interface BalanceCardProps {
  accountId: string;
  balance: number;
  title: string;
}

export default function BalanceCard({
  accountId,
  balance,
  title,
}: BalanceCardProps) {
  const [currentBalance, setBalance] = useState(balance);
  const [currentTitle, setTitle] = useState(title);

  // Subscribe to changes
  pb.collection("accounts").subscribe(accountId, function (e) {
    setBalance(e.record.balance);
    setTitle(e.record.name);
  });

  return (
    <Grid item xs={6} md={8}>
      <Card sx={{ minWidth: 100, padding: 2 }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {currentTitle}
        </Typography>
        <Typography component="p" variant="h4">
          $ {currentBalance}
        </Typography>
      </Card>
    </Grid>
  );
}
