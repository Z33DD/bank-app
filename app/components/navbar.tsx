"use client";
import { Inter } from "next/font/google";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import pb from "../store";

const inter = Inter({ subsets: ["latin"] });

export default function NavBar() {
  const router = useRouter();

  function handleLogout() {
    pb.authStore.clear();
    router.push("/signin");
  }
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Scalis Challenge
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
