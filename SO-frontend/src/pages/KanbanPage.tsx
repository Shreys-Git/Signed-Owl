import { Box } from "@mui/material";
import { TopBar } from "../components/TopBar";
import { SideBar } from "../components/SideBar";
import { Kanban } from "../components/kanban/Kanban";

export const KanbanPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <Kanban />
      </Box>
    </Box>
  );
};
