import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Box, List, ListItem, ListItemText, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../Theme";
import Header from "../components/Header";
import { formatDate } from '@fullcalendar/core';  
import { useNavigate } from "react-router-dom";  
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Import the back arrow icon

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  
  // Navigation setup for the back button
  const navigate = useNavigate(); 
  
  const handleBack = () => {
    navigate(-1);  // This navigates back to the previous page
  };

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new order on the Calendar");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete this order '${selected.event.title}'`)) {
      selected.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);  
  };

  return (
    <Box m="20px">
      <Header title="Calendar" />

      {/* Back Button with Icon */}
      <IconButton onClick={handleBack} color="primary" sx={{ marginBottom: "20px" }}>
        <ArrowBackIcon /> {/* The back arrow icon */}
      </IconButton>

      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
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
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={handleEvents}  
            initialEvents={[
              { id: "12315", title: "All-day event", date: "2022-09-14" },
              { id: "5123", title: "Timed event", date: "2022-09-28" },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
