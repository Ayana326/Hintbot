import AppBar from "@mui/material/AppBar";

export default function GlobalHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppBar
      elevation={0}
      color="default"
      position="static"
      sx={{
        height: `50px`,
        backgroundColor: "white",
        borderBottom: "1px solid lightgrey",
        width: "100%",
      }}
    >
      {children}
    </AppBar>
  );
}
