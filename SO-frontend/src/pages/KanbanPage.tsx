import { Box } from "@mui/material";
import { Kanban } from "../components/Kanban";
import { TopBar } from "../components/TopBar";
import { SideBar } from "../components/SideBar";

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
