import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GradesComponent } from './grades/grades.component';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { RouterModule } from "@angular/router";
import { CalendarComponent } from './calendar/calendar.component';
import { TimerComponent } from './timer/timer.component';
import { AssignmentsComponent } from './assignments/assignments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GradesComponent,
    NavMenuComponent,
    CalendarComponent,
    TimerComponent,
    AssignmentsComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'grades', component: GradesComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
