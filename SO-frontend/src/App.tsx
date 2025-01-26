import FetchDataComponent from "./components/FetchDataComponent";
import "./App.css";
import Form from "./components/Form";
import { SideBar } from "./components/SideBar";
import { TopBar } from "./components/TopBar";
import { Box } from "@mui/material";
import { KanbanPage } from "./pages/KanbanPage";
import { ChatScreen } from "./components/chat/ChatScreen";
import { AIChatPage } from "./pages/documents/AIChatPage";
import { StripeCheckout } from "./components/StripeCheckout";
import { AgreementEditor } from "./components/AgreementEditor";
import { AIContractDrafter } from "./pages/AIContractDrafter";
// import DiffViewer from "./components/DiffViewer";
import { FileDropArea } from "./components/common/FileDropArea";
import { WorkflowCalendar } from "./components/calendar/Calender";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { FilesPage } from "./pages/FilesPage";
import { ClientReportPage } from "./pages/reports/ClientReportPage";
import { UsersPage } from "./pages/users/UsersPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardPage />,
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
      path: "/documents/files/:documentId",
      element: <AIContractDrafter />,
    },
    {
      path: "/documents/chat",
      element: <AIChatPage />,
    },
    {
      path: "/reports",
      element: <ClientReportPage />,
    },
    {
      path: "/users",
      element: <UsersPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
