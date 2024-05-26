"use client";
import { ProjectHeader } from "@/components/headers/ProjectHeader";
import { PublicHeader } from "@/components/headers/PublicHeader";
import { useAuthContext } from "@/context/AuthContext";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";

export default function Home() {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <Box>
      {currentUser ? <ProjectHeader /> : <PublicHeader />}
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
