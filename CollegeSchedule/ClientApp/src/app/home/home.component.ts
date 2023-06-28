import {Component, ChangeDetectorRef, OnInit, OnDestroy, HostListener, Inject, ViewChild} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventClickArg, EventApi, DatesSetArg, EventInput, EventSourceFuncArg, EventRemoveArg, EventAddArg} from '@fullcalendar/core';
import {createEventId, CalendarEvent} from 'src/app/Utility/event-utils';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {HttpClient, HttpXhrBackend, HttpParams} from "@angular/common/http";
import {getBaseUrl} from "../../main";
import { CalendarComponent } from "../calendar/calendar.component";
import { TimerComponent } from "../timer/timer.component";
import { AssignmentsComponent } from "../assignments/assignments.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  /*
  // TIMER START
  currentMode: any = 'Pomodoro';
  display: any = '25:00';
  buttonDisplay: any = 'START';

  public timerInterval: any;

  processTimerClick() {
    if (this.buttonDisplay == 'START') {
      this.timerStart();
      this.buttonDisplay = 'STOP';
    }
    else {
      clearInterval(this.timerInterval);
      this.buttonDisplay = 'START';
    }

    this.updateDisplay();
  }

  processModeClick(button: string) {
    this.currentMode = button;
    this.buttonDisplay = 'STOP';
    this.processTimerClick();
  }

  updateDisplay() {
    if (this.currentMode == 'Pomodoro')
    {
      this.display = '25:00';
    }
    else if (this.currentMode == 'ShortBreak')
    {
      this.display = '05:00';
    }
    else if (this.currentMode == 'LongBreak')
    {
      this.display = '15:00';
    }
  }

  timerStart() {

    let minute : number = 0;

    if (this.currentMode == 'Pomodoro')
    {
      minute = 25;
    }
    else if (this.currentMode == 'ShortBreak')
    {
      minute = 5;
    }
    else if (this.currentMode == 'LongBreak')
    {
      minute = 15;
    }

    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished'); // RING BELL OR SOMETHING
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
  // TIMER STOP

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
  }

  //currentEvents: EventApi[] = [];

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridDay',
    editable: true,
    selectable: true,
    dayHeaders: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    //datesSet: this.handleDatesSet.bind(this),
    eventsSet: this.handleEvents.bind(this),
    events: this.LoadEvents.bind(this),
    eventAdd: this.handleEventAdd.bind(this),
    eventRemove: this.handleEventRemove.bind(this)
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

  handleEvents(events: EventApi[]) {
    //this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
   */
}
