import { Component, Input, OnInit } from '@angular/core';
import { TimerBundle, TimerService } from '../../services/timer.service';
import { formatDate } from '@angular/common';

enum TimerStatus {
  IDLE,
  RUNNING,
  PAUSED,
}

@Component({
  selector: 'ts-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit {
  startTime = 0;
  elapsed = 0;
  computeTimerBundle: TimerBundle | null = null;
  timerStatus: TimerStatus = TimerStatus.IDLE;
  displayTimer!: string;
  locale = 'en-US';
  timezone = '+0000';

  @Input() format = 'HH:mm:ss';
  @Input() refreshRate = 1000;

  constructor(private timer: TimerService) {}

  ngOnInit(): void {
    this.displayTimer = this.formatTime(
      this.elapsed,
      this.format,
      this.locale,
      this.timezone,
    );
  }

  start() {
    if (this.timerStatus === TimerStatus.RUNNING) {
      return;
    }

    this.startTime = +new Date();
    this.computeTimerBundle = {
      timerFn: this.computeTimerData.bind(this),
      startTime: this.startTime,
      config: {
        refreshRate: this.refreshRate,
        format: this.format,
      },
    };

    this.timer.add(this.computeTimerBundle);
    this.updateTimerStatus(TimerStatus.RUNNING);
  }

  stop() {
    if (this.timerStatus === TimerStatus.IDLE) {
      return;
    }

    this.timer.stop(this.computeTimerBundle);
    this.computeTimerBundle = null;
    this.updateTimerStatus(TimerStatus.IDLE);
  }

  private computeTimerData(steps: number) {
    this.elapsed += steps * this.refreshRate;

    this.displayTimer = this.formatTime(
      this.elapsed,
      this.computeTimerBundle!.config.format,
      this.locale,
      this.timezone,
    );
  }

  private formatTime(
    timeInMs: number,
    format: string,
    locale: string,
    timezone: string,
  ) {
    return formatDate(timeInMs, format, locale, timezone);
  }

  private updateTimerStatus(status: TimerStatus) {
    this.timerStatus = status;
  }
}
