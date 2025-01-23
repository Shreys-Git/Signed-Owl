import { Box } from "@mui/material";
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";
import NavFileGrid from "../components/NavFileGrid";

export const FilesPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <NavFileGrid />
      </Box>
    </Box>
  );
};
