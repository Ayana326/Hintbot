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
      position="sticky"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: `50px`,
        backgroundColor: "#000033",
        borderBottom: "1px solid lightgrey",
        width: "100%",
      }}
    >
      {children}
    </AppBar>
  );
}
