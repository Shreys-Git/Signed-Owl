import { Box } from "@mui/material";
import { ChatScreen } from "../../components/chat/ChatScreen";
import { TopBar } from "../../components/TopBar";
import { SideBar } from "../../components/SideBar";

export const AIChatPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <ChatScreen />
      </Box>
    </Box>
  );
};
