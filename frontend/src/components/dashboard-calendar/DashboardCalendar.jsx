import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/en-gb";
const localizer = momentLocalizer(moment);
const DashboardCalendar = () => {
  const [events, setEvents] = useState([]);
  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      const newEvent = {
        title,
        start,
        end,
      };
      setEvents([...events, newEvent]);
    }
  };
  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
      />
    </div>
  );
};
export default DashboardCalendar;
