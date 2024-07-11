import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  month: string;
  year: string;
  days: string[];
  dates: number[];
  today: Date;

  private currentDate: Date;

  constructor() {
    this.currentDate = new Date();
    this.month = this.currentDate.toLocaleString('default', { month: 'long' });
    this.year = this.currentDate.getFullYear().toString();
    this.days = this.generateDays();
    this.dates = this.generateDates();
    this.today = new Date();
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  private updateCalendar(): void {
    this.month = this.currentDate.toLocaleString('default', { month: 'long' });
    this.year = this.currentDate.getFullYear().toString();
    this.dates = this.generateDates();
  }

  private generateDays(): string[] {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  private generateDates(): number[] {
    // init empty array
    const dates: number[] = [];

    // initial data
    const currentDate: Date = this.currentDate;
    const currentYear: number = currentDate.getFullYear();
    const currentMonth: number = currentDate.getMonth();

    // Prefill previous month's dates
    const firstDayOfMonth: number = new Date(currentYear, currentMonth, 1).getDay();
    for (let i: number = 0; i < firstDayOfMonth; i++) {
      const prevDate: Date = new Date(currentYear, currentMonth, -i);
      dates.unshift(prevDate.getDate());
    }

    // Fill current month's dates
    const daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i: number = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }

    // Fill next month's dates
    const remainingDays: number = 42 - dates.length;
    for (let i: number = 1; i <= remainingDays; i++) {
      dates.push(i);
    }

    // return output
    return dates;
  }

  isToday(date: number): boolean {
    return (
      date === this.today.getDate() &&
      this.currentDate.getMonth() === this.today.getMonth() &&
      this.currentDate.getFullYear() === this.today.getFullYear()
    );
  }
}
