import { signout } from "@/firebase/auth";
import { Button, List, ListItem, ListItemButton } from "@mui/material";
import { useRouter } from "next/navigation";
import GlobalHeader from "../header/GlobalHeader";

export const ProjectHeader = () => {
  const router = useRouter();

  const SignOut = () => {
    signout().then(() => {
      document.cookie = "token=; Max-Age=0; Secure;";
      router.push("/");
    });
  };

  return (
    <GlobalHeader>
      <div className="flex justify-between mt-0 h-full">
        <List
          sx={{
            display: "flex",
            justifyContent: "start",
            padding: "0px",
          }}
        >
          <ListItem sx={{ width: "100px", padding: "0px" }}>
            <ListItemButton
              sx={{ height: "100%" }}
              onClick={() => {
                router.push("/");
              }}
            >
              <span className="mx-auto text-sm">Top</span>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ width: "100px", padding: "0px" }}>
            <ListItemButton
              sx={{ height: "100%" }}
              onClick={() => {
                router.push("/work");
              }}
            >
              <span className="mx-auto text-sm">問題一覧</span>
            </ListItemButton>
          </ListItem>
        </List>
        <div className="flex items-center mr-5">
          <Button
            onClick={() => {
              SignOut();
            }}
            color="secondary"
          >
            サインアウト
          </Button>
        </div>
      </div>
    </GlobalHeader>
  );
};
