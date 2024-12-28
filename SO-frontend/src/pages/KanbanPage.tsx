import { Box } from "@mui/material";
import { Kanban } from "../components/Kanban";
import { TopBar } from "../components/TopBar";

export const KanbanPage = () => {
  return (
    <Box width="100%">
      <TopBar />
      <Kanban />
    </Box>
  );
};
