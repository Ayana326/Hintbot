import { useAuthContext } from "@/context/AuthContext";
import { signout } from "@/firebase/auth";
import { Button, List, ListItem, ListItemButton } from "@mui/material";
import { useRouter } from "next/navigation";
import GlobalHeader from "../header/GlobalHeader";

export const ProjectHeader = () => {
  const router = useRouter();
  const { setCurrentUser } = useAuthContext();

  const SignOut = () => {
    signout().then(() => {
      document.cookie = "token=; Max-Age=0; Secure;";
      localStorage.removeItem("id");
      localStorage.removeItem("messages");
      localStorage.removeItem("start_time");
      setCurrentUser(undefined);
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
              <span className="mx-auto text-sm text-white">Top</span>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ width: "100px", padding: "0px" }}>
            <ListItemButton
              sx={{ height: "100%" }}
              onClick={() => {
                router.push("/work");
              }}
            >
              <span className="mx-auto text-sm text-white">問題一覧</span>
            </ListItemButton>
          </ListItem>
        </List>
        <div className="flex items-center mr-5">
          <Button
            onClick={() => {
              SignOut();
            }}
            sx={{ color: "white" }}
          >
            サインアウト
          </Button>
        </div>
      </div>
    </GlobalHeader>
  );
};
