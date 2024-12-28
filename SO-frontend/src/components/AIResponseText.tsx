import { Box, Card } from "@mui/material";
import { TextProp } from "./types";

export const AIResponseText = ({ text }: TextProp) => {
  return (
    <Box display="flex">
      <Card
        sx={{
          maxWidth: "60%",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          alignSelf: "flex-start",
          padding: "1rem",
        }}
      >
        {text}
      </Card>
    </Box>
  );
};
