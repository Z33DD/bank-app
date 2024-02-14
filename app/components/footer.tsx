import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">Made with ❤️ by Pedro</Typography>
      </Container>
    </Box>
  );
}
