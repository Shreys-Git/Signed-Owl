import { Box } from "@mui/material";
import { ClientReport } from "../../components/reports/ClientReport";
import { SideBar } from "../../components/SideBar";
import { TopBar } from "../../components/TopBar";

export const ClientReportPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />

        {/* <ClientReport /> */}
      </Box>
    </Box>
  );
};
