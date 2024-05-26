import { List, ListItem, ListItemButton } from "@mui/material";
import { useRouter } from "next/navigation";
import GlobalHeader from "../header/GlobalHeader";

export const PublicHeader = () => {
  const router = useRouter();

  return (
    <GlobalHeader>
      <List
        sx={{
          display: "flex",
          justifyContent: "start",
          height: "100%",
          padding: "0px 10px",
        }}
      >
        <ListItem sx={{ width: "100px", padding: "0px" }}>
          <ListItemButton
            sx={{ height: "100%" }}
            onClick={() => {
              router.push("/");
            }}
          >
            <span className="mx-auto text-sm text-white">Top</span>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ width: "100px", padding: "0px" }}>
          <ListItemButton
            sx={{ height: "100%" }}
            onClick={() => {
              router.push("/signin");
            }}
          >
            <span className="mx-auto text-sm text-white">ログイン</span>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ width: "100px", padding: "0px" }}>
          <ListItemButton
            sx={{ height: "100%" }}
            onClick={() => {
              router.push("/signup");
            }}
          >
            <span className="mx-auto text-sm text-white">新規登録</span>
          </ListItemButton>
        </ListItem>
      </List>
    </GlobalHeader>
  );
};
