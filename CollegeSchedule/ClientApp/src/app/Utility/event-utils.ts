

export function createEventId() {
    return String(Math.floor(Math.random() * 1000000));
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}
