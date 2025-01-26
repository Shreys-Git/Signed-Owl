import { Box } from "@mui/material";
import { SideBar } from "../../components/SideBar";
import { UserGrid } from "../../components/users/UserGrid";
import { TopBar } from "../../components/TopBar";
import { Users } from "../../components/users/Users";

export const UsersPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <Users />
      </Box>
    </Box>
  );
};
