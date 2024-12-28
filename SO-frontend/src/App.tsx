import FetchDataComponent from "./components/FetchDataComponent";
import "./App.css";
import Form from "./components/Form";
import { SideBar } from "./components/SideBar";
import { TopBar } from "./components/TopBar";
import { Box } from "@mui/material";
import { KanbanPage } from "./pages/KanbanPage";

function App() {
  return (
    <>
      {/* <FetchDataComponent/>
      <Form/> */}
      <Box display="flex">
        <SideBar />
        <KanbanPage />
      </Box>
    </>
  );
}

export default App;
