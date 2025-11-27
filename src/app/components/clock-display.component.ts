import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockService } from '../services/clock.service';

@Component({
  selector: 'app-clock-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock-display.component.html',
  styleUrl: './clock-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockDisplayComponent implements OnInit {
  displayTime = '';
  seconds = '00';
  period = '';
  fullDate = '';
  clockContainer: HTMLElement | null = null;

  constructor(private clockService: ClockService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.clockContainer = document.querySelector('.clock-container');
    this.clockService.getTime()
      .subscribe(time => {
        const formatted = this.clockService.formatTime(time);
        this.displayTime = formatted.time;
        this.seconds = formatted.seconds;
        this.period = formatted.period;
        this.fullDate = this.clockService.formatDate(time);
        this.cdr.markForCheck();
      });
  }

  toggleFullscreen(): void {
    if (!this.clockContainer) return;
    
    if (!document.fullscreenElement) {
      this.clockContainer.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  }
}
