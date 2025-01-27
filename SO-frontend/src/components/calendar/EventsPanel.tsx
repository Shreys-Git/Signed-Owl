import { formatDate } from "@fullcalendar/core/index.js";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
} from "@mui/material";
import { CalendarEvent } from "./Calender";

interface EventsProps {
  events: CalendarEvent[];
}
export const EventsPanel = ({ events }: EventsProps) => {
  return (
    <Card
      sx={{
        flex: "1 1 20%",
        p: "15px",
        borderRadius: "4px",
        height: "80vh",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          background: "#dddbff",
          color: "black",
          padding: "16px 24px",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Upcoming Deadlines
        </Typography>
      </Box>
      <List>
        {(events || []).map((event) => (
          <ListItem key={event.event_id}>
            <ListItemText
              primary={<Typography variant="h6">{event.title}</Typography>}
              secondary={
                <Typography>
                  {event.description} —{" "}
                  {formatDate(new Date(event.start), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
