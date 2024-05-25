import { Chip, styled } from "@mui/material";

type Props = {
  message: string;
  position: "right" | "left";
};

const CustomChip = styled(Chip)({
  ".MuiChip-label": {
    overflow: "visible",
  },
});

export const MessageBubble = ({ message, position }: Props) => {
  return (
    <div
      data-position={position == "right"}
      className={`data-[position=true]:text-right mt-3 mb-8`}
    >
      {message.length != 0 ? (
        <Chip
          sx={{
            padding: "5px 0",
            maxWidth: "70%",
            height: "auto",
            "& .MuiChip-label": {
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            },
            textAlign: "left",
          }}
          label={message}
        />
      ) : (
        <CustomChip
          sx={{
            padding: "0px 0",
            width: "100px",
            height: "30px",
            overflow: "none",
          }}
          label={<div className="loader"></div>}
        />
      )}
    </div>
  );
};
