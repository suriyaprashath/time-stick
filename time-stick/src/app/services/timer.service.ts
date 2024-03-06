import { Injectable } from '@angular/core';

interface TimerBundleWithElapsedSteps extends TimerBundle {
  elapsedTime: number;
}

export interface TimerBundle {
  timerFn: Function;
  startTime: number;
  config: TimerConfig;
}

export interface TimerConfig {
  refreshRate: number;
  format: string;
}

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  computeTimerCallbacks: TimerBundleWithElapsedSteps[] = [];
  isTimerRunning = false;
  lastCheckpointTime!: number;

  constructor() {}

  add(timerBundle: TimerBundle) {
    (timerBundle as TimerBundleWithElapsedSteps).elapsedTime = 0;
    this.computeTimerCallbacks.push(timerBundle as TimerBundleWithElapsedSteps);

    if (!this.isTimerRunning) {
      this.start();
    }
  }

  start() {
    if (this.isTimerRunning) {
      return;
    }

    this.isTimerRunning = true;
    this.lastCheckpointTime = +new Date();

    this.progress();
  }

  stop(timerBundle: TimerBundle | null) {
    if (timerBundle) {
      const bundleIndex = this.computeTimerCallbacks.indexOf(
        timerBundle as TimerBundleWithElapsedSteps,
      );

      this.computeTimerCallbacks.splice(bundleIndex, 1);
    }

    if (this.computeTimerCallbacks.length === 0) {
      this.isTimerRunning = false;
    }
  }

  private progress() {
    if (!this.isTimerRunning) {
      return;
    }

    const currentTime = +new Date()
    const diff = currentTime - this.lastCheckpointTime;
    const count = Math.floor(diff / 100);
    const nextUpdateIn = 100 - (diff % 100);

    this.lastCheckpointTime += count * 100;

    this.computeTimerCallbacks.forEach((bundle) => {
      const { config, startTime } = bundle;      

      bundle.elapsedTime += count * 100;
      const elapsedSteps = Math.floor(bundle.elapsedTime / config.refreshRate);
      console.log(bundle.elapsedTime, elapsedSteps);

      if(elapsedSteps > 0) {
        bundle.elapsedTime = bundle.elapsedTime % config.refreshRate;
        bundle.timerFn(elapsedSteps);
      }
    });

    setTimeout(() => this.progress(), nextUpdateIn);
  }
}
