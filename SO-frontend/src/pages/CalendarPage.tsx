import { Box } from "@mui/material";
import { Kanban } from "../components/Kanban";
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";
import { WorkflowCalendar } from "../components/Calander";

export const CalendarPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <WorkflowCalendar />
      </Box>
    </Box>
  );
};
