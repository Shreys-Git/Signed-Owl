import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "@fullcalendar/core";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Modal,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import axios from "axios";

interface Event {
  id?: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

export const WorkflowCalendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>("/api/events");
        setEvents(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch events", error);
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    const eventToAdd = {
      ...newEvent,
      id: Date.now().toString(),
      title: newEvent.title || "Untitled Event",
    } as Event;

    try {
      // Add to local state first
      setEvents((prevEvents) => [...prevEvents, eventToAdd]);

      // Send to backend
      //   await axios.post("/api/events", eventToAdd);

      setOpenAddModal(false);
      setNewEvent({});
    } catch (error) {
      console.error("Failed to add event", error);
      // Optionally revert local state if backend fails
      setEvents((prevEvents) =>
        prevEvents.filter((e) => e.id !== eventToAdd.id)
      );
    }
  };

  const handleDateClick = (selected: DateSelectArg) => {
    setNewEvent({
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    });
    setOpenAddModal(true);
  };

  const handleEventClick = async (selected: EventClickArg) => {
    const confirmDelete = window.confirm(
      `Delete event '${selected.event.title}'?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/api/events/${selected.event.id}`);
        selected.event.remove();
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== selected.event.id)
        );
      } catch (error) {
        console.error("Failed to delete event", error);
      }
    }
  };

  const calendarOptions: CalendarOptions = {
    height: "75vh",
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: handleDateClick,
    eventClick: handleEventClick,
    events: events,
  };

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between">
          <Box flex="1 1 20%" p="15px" borderRadius="4px">
            <Typography variant="h5">Events</Typography>
            <List>
              {(events || []).map((event) => (
                <ListItem key={event.id || Date.now()}>
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
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
          </Box>
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar {...calendarOptions} />
          </Box>
        </Box>
      </Box>

      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: 400,
            p: 3,
            outline: "none",
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Event
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            value={newEvent.title || ""}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={() => setOpenAddModal(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddEvent}>
              Add Event
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
