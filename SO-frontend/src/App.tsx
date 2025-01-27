import "./App.css";
import { Box } from "@mui/material";
import { KanbanPage } from "./pages/KanbanPage";
import { AIChatPage } from "./pages/documents/AIChatPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { ClientReportPage } from "./pages/reports/ClientReportPage";
import { UsersPage } from "./pages/users/UsersPage";
import { DashboardPage } from "./pages/DashboardPage";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { FilesPage } from "./pages/files/FilesPage";
import { EditContractPage } from "./pages/files/EditContractPage";
import { ReportPage } from "./pages/reports/ReportPage";

const theme = createTheme({
  typography: {
    fontFamily: "Space Grotesk, Inter, Arial, sans-serif",
    fontSize: 16,
  },
  palette: {
    text: {
      primary: "#050316",
    },
    background: {
      default: "#fbfbfe",
    },
    primary: {
      main: "#2f27ce",
    },
    secondary: {
      main: "#dddbff",
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "secondary",
        },
      },
    },
  },
});

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
      element: <EditContractPage />,
    },
    {
      path: "/documents/chat",
      element: <AIChatPage />,
    },
    {
      path: "/reports",
      element: <ReportPage />,
    },
    {
      path: "/users",
      element: <UsersPage />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { fontSize: "100%" }, // Set base font size to 16px
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
