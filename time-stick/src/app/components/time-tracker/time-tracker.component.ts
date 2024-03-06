import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'ts-time-tracker',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './time-tracker.component.html',
  styleUrl: './time-tracker.component.scss'
})
export class TimeTrackerComponent {

  constructor() { }

  linkToZoho() {
    console.log("Linking to Zoho...");
    // Add your code to link to Zoho here
  }
}
