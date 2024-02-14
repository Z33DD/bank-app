import { Modal, Box } from "@mui/material";
import { Button } from "@mui/material";
import Account from "../model/account";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Input } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { MySwal } from "./alert";

interface TransferModalProps {
  closeModal: Function;
  isOpen: boolean;
  accounts: Array<Account>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransferModal({
  closeModal,
  isOpen,
  accounts,
}: TransferModalProps) {
  const [sourceAccountId, setSourceAccountId] = useState("");
  const [targetAccountId, setTargetAccountId] = useState("");
  const [amount, setAmount] = useState(0.0);

  const handleClose = () => closeModal();
  const handleSourceAccountChange = (event: SelectChangeEvent) => {
    setSourceAccountId(event.target.value as string);
  };
  const handleTargetAccountChange = (event: SelectChangeEvent) => {
    setTargetAccountId(event.target.value as string);
  };
  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAmount(parseFloat(event.target.value));
  };
  const handleSubmit = () => {
    const payload = {
      sourceId: sourceAccountId,
      targetId: targetAccountId,
      amount: amount,
    };

    fetch("/api/transfer", {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((value) => {
      value.json().then((body) => {
        if (value.status != 200) {
          MySwal.fire({
            title: "Oops!",
            text: body.message,
            icon: "error",
            timer: 1000,
          });
        } else {
          MySwal.fire({
            title: "Done!",
            text: body.message,
            icon: "success",
            timer: 1000,
          });
        }
      });
    });
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Typography
              component="h2"
              variant="h4"
              color="primary"
              gutterBottom
            >
              Transfer
            </Typography>
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              From
            </Typography>
            <Select
              value={sourceAccountId}
              label="From"
              onChange={handleSourceAccountChange}
            >
              {accounts.map((account, index) => {
                return (
                  <MenuItem value={account.id} key={index}>
                    {account.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              To
            </Typography>
            <Select
              value={targetAccountId}
              label="To"
              onChange={handleTargetAccountChange}
            >
              {accounts.map((account, index) => {
                return (
                  <MenuItem value={account.id} key={index}>
                    {account.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Amount
            </Typography>

            <Input type="number" value={amount} onChange={handleAmountChange} />
          </Grid>
          <Grid item xs={6} md={8}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={
                sourceAccountId == "" || targetAccountId == "" || amount <= 0
              }
            >
              Transfer
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
