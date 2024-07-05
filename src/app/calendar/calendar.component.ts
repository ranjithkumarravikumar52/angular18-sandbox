import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  month: string;
  year: string;
  days: string[];

  private currentDate: Date;

  constructor() {
    this.currentDate = new Date();
    this.month = this.currentDate.toLocaleString('default', { month: 'long' });
    this.year = this.currentDate.getFullYear().toString();
    this.days = this.generateDays();
  }

  ngOnInit(): void {}

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
    this.days = this.generateDays();
  }

  private generateDays(): string[] {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

}
