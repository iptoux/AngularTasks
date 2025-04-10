import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-clock',
  imports: [DatePipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  private clockSubscription: Subscription | null = null;

  ngOnInit(): void {
    // Update clock every second
    this.clockSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date();
    });
  }

  ngOnDestroy(): void {
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
  }
}
