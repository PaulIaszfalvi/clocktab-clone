import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private clockContainer: HTMLElement | null = null;
  private optionsBar: HTMLElement | null = null;
  private destroyRef = inject(DestroyRef);

  constructor(private clockService: ClockService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.clockContainer = document.querySelector('.clock-container');
    this.optionsBar = document.querySelector('.options-bar');
    this.clockService.getTime()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(time => {
        const formatted = this.clockService.formatTime(time);
        this.displayTime = formatted.time;
        this.seconds = formatted.seconds;
        this.period = formatted.period;
        this.fullDate = this.clockService.formatDate(time);
        this.hideButton();
        this.cdr.markForCheck();
      });
  }

  private hideButton(): void {
    if (this.optionsBar) {
      this.optionsBar.style.opacity = '0';
    }
  }

  toggleFullscreen(): void {
    if (!this.clockContainer) {
      console.warn('Clock container not found');
      return;
    }

    if (!document.fullscreenElement) {
      this.clockContainer.requestFullscreen().catch(err => {
        console.error('Failed to enter fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Failed to exit fullscreen:', err);
      });
    }
  }
}
