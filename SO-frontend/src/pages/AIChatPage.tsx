import { Box } from "@mui/material";
import { Chat } from "../components/Chat";
import { TopBar } from "../components/TopBar";
import { SideBar } from "../components/SideBar";

export const AIChatPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <Chat />
      </Box>
    </Box>
  );
};
