import { Component } from '@angular/core';
import { ClockDisplayComponent } from './components/clock-display.component';

@Component({
  selector: 'app-root',
  imports: [ClockDisplayComponent],
  template: '<app-clock-display></app-clock-display>',
  styleUrl: './app.scss'
})
export class App {}
