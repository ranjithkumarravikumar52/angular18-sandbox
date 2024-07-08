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

  private currentDate: Date;

  constructor() {
    this.currentDate = new Date();
    this.month = this.currentDate.toLocaleString('default', { month: 'long' });
    this.year = this.currentDate.getFullYear().toString();
    this.days = this.generateDays();
    this.dates = this.generateDates();
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

  /*
   * output format - array contains 42 days
   * how many max weeks are possible in any month of a year, for a uniform calendar grid - 6 weeks
   * so total days in a calendar grid for any month is 42
   */
  private generateDates(): number[] {
    // Initialize an empty array to hold the dates for the calendar
    const dates: number[] = [];

    // initial data
    const currentDate: Date = this.currentDate;
    const currentYear: number = currentDate.getFullYear();
    const currentMonth: number = currentDate.getMonth(); // FYI - month is 0-based
    const oneDayInMs: number = 24 * 60 * 60 * 1000;

    // date constructor format = new Date(year, month, date)
    const firstDateofCurrentMonth: Date = new Date(currentYear, currentMonth, 1);
    const firstDayOfCurrentMonth: number = firstDateofCurrentMonth.getDay();

    // 1. prefill the previous month in current month view (to avoid complex index management)
    for (let datesArrIndex = 0; datesArrIndex < firstDayOfCurrentMonth; datesArrIndex++) {
      const delta = firstDateofCurrentMonth.getTime() - oneDayInMs * (firstDayOfCurrentMonth - datesArrIndex);
      const prevDate: Date = new Date(delta);
      dates.push(prevDate.getDate());
    }

    // 2. fill out the current month days
    // Subtract one day to get the last day of the current month in ms
    const firstDayOfNextMonth: Date = new Date(currentYear, currentMonth + 1, 1);
    const lastDayOfCurrentMonth: Date = new Date(firstDayOfNextMonth.getTime() - oneDayInMs);
    const lastDayOfCurrentMonthInNumber: number = lastDayOfCurrentMonth.getDay();

    // last date in current month
    const totalDaysInCurrentMonth: number = lastDayOfCurrentMonth.getDate();

    // total dates in current month
    const totalDatesInCurrentMonth: number = totalDaysInCurrentMonth - firstDateofCurrentMonth.getDate() + 1;

    // loop through the array and fill out current month days
    for (let i = 1; i <= totalDatesInCurrentMonth; i++) {
      dates.push(i);
    }

    // 3. fill out the end of the current month dates coming from next month
    for (let i = lastDayOfCurrentMonthInNumber + 1; i < 7; i++) {
      dates.push(-2);
    }

    return dates;
  }
}
