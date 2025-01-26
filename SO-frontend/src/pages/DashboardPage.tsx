import { Box } from "@mui/material";
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";

export const DashboardPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
      </Box>
    </Box>
  );
};
