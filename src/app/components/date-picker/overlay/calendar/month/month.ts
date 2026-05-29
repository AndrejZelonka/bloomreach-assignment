import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { isToday, format } from 'date-fns';
import { DayButton } from '../day-button/day-button';
import type { DayCell, WeekDay } from './types';

// TODO: localization
const WEEK_DAYS: WeekDay[] = [
  { label: 'S', ariaLabel: 'Sunday' },
  { label: 'M', ariaLabel: 'Monday' },
  { label: 'T', ariaLabel: 'Tuesday' },
  { label: 'W', ariaLabel: 'Wednesday' },
  { label: 'T', ariaLabel: 'Thursday' },
  { label: 'F', ariaLabel: 'Friday' },
  { label: 'S', ariaLabel: 'Saturday' },
];

@Component({
  selector: 'date-picker-month',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DayButton],
  templateUrl: './month.html',
  styleUrl: './month.css',
})
export class Month {
  readonly daysGrid = input.required<(Date | null)[][]>();
  readonly heading = input.required<string>();

  readonly dayClick = output<Date>();

  protected readonly weekDays = WEEK_DAYS;

  protected readonly processedGrid = computed<(DayCell | null)[][]>(() =>
    this.daysGrid().map((week) =>
      week.map((date) => {
        if (!date) return null;
        return {
          date,
          dayNumber: date.getDate(),
          ariaLabel: format(date, 'EEEE, MMMM d, yyyy'),
          isToday: isToday(date),
          isDisabled: false,
        };
      }),
    ),
  );

  protected onDayClick(date: Date): void {
    this.dayClick.emit(date);
  }
}
