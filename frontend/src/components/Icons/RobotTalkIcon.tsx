import ChatIcon from "@mui/icons-material/Chat";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export const RobotTalkIcon = () => {
  return (
    <div style={{ position: "relative" }}>
      <SmartToyIcon sx={{ fontSize: 45 }} />
      <ChatIcon
        sx={{
          fontSize: 30,
          position: "absolute",
          bottom: "25px",
          left: "40px",
        }}
      />
    </div>
  );
};
