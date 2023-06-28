import {createEventId, CalendarEvent} from 'src/app/Utility/event-utils';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {HttpClient, HttpXhrBackend, HttpParams} from "@angular/common/http";
import {getBaseUrl} from "../../main";
import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { CalendarOptions, DateSelectArg, EventAddArg, EventApi, EventClickArg, EventInput, EventRemoveArg, EventSourceFuncArg} from "@fullcalendar/core";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy{

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
  }

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridDay',
    editable: true,
    selectable: true,
    dayHeaders: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    events: this.LoadEvents.bind(this),
    eventAdd: this.handleEventAdd.bind(this),
    eventRemove: this.handleEventRemove.bind(this),
    headerToolbar: {
      right: 'today prev,next',
    }
  };


  handleEventRemove(removeInfo : EventRemoveArg)
  {
    let url = getBaseUrl() + 'calendarevent'
    let httpParams = new HttpParams().set('id', removeInfo.event.id);
    let options = { params: httpParams };

    const http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));

    http.delete(url, options).subscribe( data => {
      if (data == 0) {
        alert('Failed to remove event: ' + removeInfo.event.title);
        removeInfo.revert();
      }
    })
  }
  handleEventAdd(addInfo : EventAddArg)
  {
    console.log(addInfo.event);
    let url = getBaseUrl() + 'calendarevent';

    const http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));

    http.post(url, addInfo.event).subscribe( data => {
      if (data == 0) {
        alert('Failed to remove event: ' + addInfo.event.title);
        addInfo.revert();
      }
    })
  }

  async LoadEvents(args: EventSourceFuncArg): Promise<EventInput[]> {
    const http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }));

    let httpParams = new HttpParams().append('date', args.startStr)

    return new Promise<EventInput[]>((resolve) => {
      http.get<CalendarEvent[]>(getBaseUrl() + 'calendarevent', {params: httpParams}).subscribe(result => {
        result.forEach(function (val) {
          const events: EventInput[] = [];
          events.push({
            id: val.id,
            title: val.title,
            start: val.start,
            end: val.end,
            allDay: val.allDay,
          });

          console.log(events);
          resolve(events);
        });
      }, error => console.error(error));
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    let eventInput : EventInput;
    const title = prompt('Enter event title:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {

      eventInput = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      calendarApi.addEvent(eventInput, true);
      calendarApi.refetchEvents();
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents() {
    this.changeDetector.detectChanges();
  }

}
