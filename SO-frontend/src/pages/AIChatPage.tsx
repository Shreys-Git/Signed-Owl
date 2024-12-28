import { Box } from "@mui/material";
import { Chat } from "../components/Chat";
import { TopBar } from "../components/TopBar";

export const AIChatPage = () => {
  return (
    <Box width="100%">
      <TopBar />
      <Chat />
    </Box>
  );
};
