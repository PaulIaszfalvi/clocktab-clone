import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockService } from '../services/clock.service';

@Component({
  selector: 'app-clock-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock-display.component.html',
  styleUrl: './clock-display.component.scss'
})
export class ClockDisplayComponent implements OnInit {
  time: { time: string; period: string } = { time: '00:00', period: 'AM' };
  date: string = '';

  constructor(private clockService: ClockService) {}

  ngOnInit(): void {
    this.clockService.getTime().subscribe(currentTime => {
      this.time = this.clockService.formatTime(currentTime);
      this.date = this.clockService.formatDate(currentTime);
    });
  }
}
