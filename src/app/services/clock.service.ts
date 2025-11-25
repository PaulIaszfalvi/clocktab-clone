import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private currentTime$ = new BehaviorSubject<Date>(new Date());

  constructor() {
    interval(1000).pipe(
      map(() => new Date()),
      startWith(new Date())
    ).subscribe(time => this.currentTime$.next(time));
  }

  getTime(): Observable<Date> {
    return this.currentTime$.asObservable();
  }

  formatTime(date: Date): { time: string; period: string } {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return {
      time: `${String(displayHours).padStart(2, ' ')}:${String(minutes).padStart(2, '0')}`,
      period
    };
  }

  formatDate(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayDate = date.getDate();

    return `${dayName} - ${monthName} ${dayDate}`;
  }
}
