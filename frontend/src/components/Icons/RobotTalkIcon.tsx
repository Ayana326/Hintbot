import ChatIcon from "@mui/icons-material/Chat";
import SmartToyIcon from "@mui/icons-material/SmartToy";

type Props = {
  size?: number;
};

export const RobotTalkIcon = ({ size = 45 }: Props) => {
  return (
    <div style={{ position: "relative" }}>
      <SmartToyIcon sx={{ fontSize: size }} />
      <ChatIcon
        sx={{
          fontSize: (size * 2) / 3,
          position: "absolute",
          bottom: `calc(${size}px - 20px)`,
          left: `calc(${size})px`,
        }}
      />
    </div>
  );
};
