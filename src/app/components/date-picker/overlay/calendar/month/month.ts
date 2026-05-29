import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { isToday } from 'date-fns';
import { locale, toDay, formatDayAriaLabel } from '../../../utils/date-utils';
import { DayButton } from '../day-button/day-button';
import type { DayCell, WeekDay } from './types';

const WEEK_DAYS: WeekDay[] = ([0, 1, 2, 3, 4, 5, 6] as const).map((i) => ({
  label: locale.localize!.day(i, { width: 'narrow' }),
  ariaLabel: locale.localize!.day(i, { width: 'wide' }),
}));

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
  readonly pendingStart = input<Date | null>(null);
  readonly pendingEnd = input<Date | null>(null);
  readonly hoverDate = input<Date | null>(null);
  readonly showHoverPreview = input(false);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);

  readonly dayClick = output<Date>();
  readonly dayHover = output<Date>();

  protected readonly weekDays = WEEK_DAYS;

  protected readonly processedGrid = computed<(DayCell | null)[][]>(() => {
    const start = this.pendingStart();
    const end = this.pendingEnd();
    const hover = this.hoverDate();

    const startDay = start ? toDay(start) : null;
    const endDay = end ? toDay(end) : null;
    const minDay = this.minDate() ? toDay(this.minDate()!) : null;
    const maxDay = this.maxDate() ? toDay(this.maxDate()!) : null;

    const hoverDay =
      this.showHoverPreview() && hover !== null && startDay !== null ? toDay(hover) : null;
    const hoverMin = hoverDay !== null && startDay !== null ? Math.min(startDay, hoverDay) : null;
    const hoverMax = hoverDay !== null && startDay !== null ? Math.max(startDay, hoverDay) : null;

    return this.daysGrid().map((week) =>
      week.map((date) => {
        if (!date) return null;
        const cellDay = toDay(date);
        const isDisabled =
          (minDay !== null && cellDay < minDay) || (maxDay !== null && cellDay > maxDay);
        return {
          date,
          dayNumber: date.getDate(),
          ariaLabel: formatDayAriaLabel(date),
          isToday: isToday(date),
          isDisabled,
          isStart: startDay !== null && cellDay === startDay,
          isEnd: endDay !== null && cellDay === endDay,
          isInRange:
            endDay !== null && cellDay < endDay && (startDay === null || cellDay > startDay),
          isHoverPreviewInRange:
            !isDisabled &&
            hoverMin !== null &&
            hoverMax !== null &&
            cellDay > hoverMin &&
            cellDay < hoverMax,
          isHoverPreviewRangeStart: !isDisabled && hoverMin !== null && cellDay === hoverMin,
          isHoverPreviewEndpoint: !isDisabled && hoverDay !== null && cellDay === hoverDay,
        };
      }),
    );
  });

  protected onDayClick(date: Date): void {
    this.dayClick.emit(date);
  }

  protected onDayHover(date: Date): void {
    this.dayHover.emit(date);
  }
}
