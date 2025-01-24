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
// import DiffViewer from "./components/DiffViewer";
import { NavUpload } from "./components/NavUpload";
import NavFileGrid from "./components/NavFileGrid";
import { WorkflowCalendar } from "./components/Calander";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { FilesPage } from "./pages/FilesPage";
import { ClientReportPage } from "./pages/Reports/ClientReportPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Box> Homepage </Box>,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
    {
      path: "/workload/kanban",
      element: <KanbanPage />,
    },
    {
      path: "/workload/calendar",
      element: <CalendarPage />,
    },
    {
      path: "/documents/files",
      element: <FilesPage />,
    },
    {
      path: "/documents/chat",
      element: <AIChatPage />,
    },
    {
      path: "/reports/client",
      element: <ClientReportPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
