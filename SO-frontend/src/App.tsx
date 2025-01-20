import FetchDataComponent from "./components/FetchDataComponent";
import "./App.css";
import Form from "./components/Form";
import { SideBar } from "./components/SideBar";
import { TopBar } from "./components/TopBar";
import { Box } from "@mui/material";
import { KanbanPage } from "./pages/KanbanPage";
import { Chat } from "./components/Chat";
import { AIChatPage } from "./pages/AIChatPage";
import { StripeCheckout } from "./components/StripeCheckout";
import { AgreementEditor } from "./components/AgreementEditor";
import { AIContractDrafter } from "./pages/AIContractDrafter";
import DiffViewer from "./components/DiffViewer";
import { NavUpload } from "./components/NavUpload";
import NavFileGrid from "./components/NavFileGrid";

function App() {
  return (
    <>
      {/* <FetchDataComponent />
      <Form /> */}
      <Box display="flex">
        {/* <SideBar /> */}
        <NavFileGrid />
        {/* <AIContractDrafter /> */}
        {/* <StripeCheckout /> */}
        {/* <AIChatPage /> */}

        {/* <KanbanPage /> */}
      </Box>
    </>
  );
}

export default App;
