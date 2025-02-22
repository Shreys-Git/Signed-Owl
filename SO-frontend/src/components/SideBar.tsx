import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MessageIcon from "@mui/icons-material/Message";
import { Typography, Box } from "@mui/material";
import { Branding } from "./Branding";

export const SideBar = () => {
  const [reportOpen, setReportOpen] = React.useState(true);
  const [taskOpen, setTaskOpen] = React.useState(true);
  const [documentsOpen, setDocumentsOpen] = React.useState(true);

  const handleReportClick = () => {
    setReportOpen(!reportOpen);
  };

  const handleTaskClick = () => {
    setTaskOpen(!taskOpen);
  };

  const handleDocumentsClick = () => {
    setDocumentsOpen(!documentsOpen);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 250,
        height: "100vh",
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Branding />
        </ListSubheader>
      }
    >
      {/**       DASHBOARD          */}
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {/**       DOCUMENTS          */}
      <ListItemButton onClick={handleDocumentsClick}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Documents" />
        {documentsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={documentsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Files" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="AI Chat" />
          </ListItemButton>
        </List>
      </Collapse>

      {/**       REPORTS          */}
      <ListItemButton onClick={handleReportClick}>
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
        {reportOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={reportOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Report A" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Report B" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Report C" />
          </ListItemButton>
        </List>
      </Collapse>

      {/**       TASKS          */}
      <ListItemButton onClick={handleTaskClick}>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
        {taskOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={taskOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Kanban" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};
