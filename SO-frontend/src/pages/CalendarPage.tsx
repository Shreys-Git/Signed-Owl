import { Box } from "@mui/material";
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";
import { WorkflowCalendar } from "../components/calendar/Calender";

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
