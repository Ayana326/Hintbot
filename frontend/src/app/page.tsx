import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Container
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        Topページ
      </Container>
    </Box>
  );
}
