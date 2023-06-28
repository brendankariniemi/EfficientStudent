import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
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
}
