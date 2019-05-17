import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  date: Date;
  monthsList: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  months: Array<string> = new Array();
  years: Array<number> = new Array();
  days: Array<number> = new Array();

  monthIndex: number = 0;
  yearIndex: number = 0;
  dayIndex: number = 0;

  selectedMonth;
  selectedYear;
  selectedDay;

  constructor() {
  }

  ngOnInit() {
    this.date = new Date();
    this.setCurrentYearAndMonthAndDay();
  }

  daysInMonth() {
    return new Date(this.yearIndex, this.monthsList.indexOf((this.selectedMonth)) + 1, 0).getDate();
  }

  setCurrentYearAndMonthAndDay() {
    this.setYears(this.date.getFullYear())
    this.setMonths(this.date.getMonth())
    this.setDays(this.date.getDate())
  }

  setYears(index) {
    this.yearIndex = index;
    for (let i = index; i < index + 10; i++) {
      this.years.push(i);
    }
    this.selectedYear = this.yearIndex;
  }

  setMonths(index) {
    this.months = new Array();
    this.monthIndex = 0;
    for (let i = index; i < 12; i++) {
      this.months.push(this.monthsList[i])
    }
    this.selectedMonth = this.months[0];
  }

  setDays(index) {
    this.days = new Array();
    this.dayIndex = index;
    for (let i = index; i <= this.daysInMonth(); i++) {
      this.days.push(i)
    }
    this.selectedDay = this.days[0];
  }

  nextYear() {
    if (this.date.getFullYear() + 9 > this.yearIndex) {
      this.selectedYear = ++this.yearIndex;
    }
    if (this.date.getFullYear() == this.yearIndex) {
      this.setMonths(this.date.getMonth())
      this.setDays(this.date.getDate())
    } else {
      this.setMonths(0)
      this.setDays(1)
    }
  }

  previousYear() {
    if (this.date.getFullYear() < this.yearIndex) {
      this.selectedYear = --this.yearIndex;
    }
    if (this.date.getFullYear() == this.yearIndex) {
      this.setMonths(this.date.getMonth())
      this.setDays(this.date.getDate())
    } else {
      this.setMonths(0)
      this.setDays(1)
    }
  }

  nextMonth() {
    if (this.monthIndex < this.months.length - 1) {
      this.selectedMonth = this.months[++this.monthIndex];
    } else {
      this.monthIndex = 0;
      this.selectedMonth = this.months[this.monthIndex];
    }
    if (this.monthsList.indexOf((this.selectedMonth)) == this.date.getMonth() && this.yearIndex == this.date.getFullYear()) {
      this.setDays(this.date.getDate())
    } else {
      this.setDays(1)
    }
  }

  previousMonth() {
    if (this.monthIndex > 0) {
      this.selectedMonth = this.months[--this.monthIndex];
    } else {
      this.monthIndex = this.months.length - 1;
      this.selectedMonth = this.months[this.monthIndex];
    }
    if (this.monthsList.indexOf((this.selectedMonth)) == this.date.getMonth() && this.yearIndex == this.date.getFullYear()) {
      this.setDays(this.date.getDate())
    } else {
      this.setDays(1)
    }
  }

  nextDay() {
    if (this.dayIndex+1 > this.daysInMonth()) {
      if (this.monthsList.indexOf((this.selectedMonth)) == this.date.getMonth() && this.yearIndex == this.date.getFullYear()) {
        this.dayIndex = this.date.getDate();
      } else {
        this.dayIndex = 1;
      }
      this.selectedDay = this.dayIndex;
    } else {
      this.selectedDay = ++this.dayIndex;
    }
  }

  previousDay() {
    if (this.dayIndex > this.date.getDate()) {
      this.selectedDay = --this.dayIndex;
    } else {
      this.dayIndex = this.daysInMonth();
      this.selectedDay = this.dayIndex;
    }
  }

  changeYear() {
    this.yearIndex = this.selectedYear;
    if (this.date.getFullYear() == this.yearIndex) {
      this.setMonths(this.date.getMonth())
      this.setDays(this.date.getDate())
    } else {
      this.setMonths(0)
      this.setDays(1)
    }
  }

  changeMonth() {
    this.monthIndex = this.monthsList.indexOf((this.selectedMonth));
    if (this.monthIndex == this.date.getMonth() && this.yearIndex == this.date.getFullYear()) {
      this.setDays(this.date.getDate())
    } else {
      this.setDays(1)
    }
  }

  changeDay() {
    this.dayIndex = parseInt(this.selectedDay);
  }
}
