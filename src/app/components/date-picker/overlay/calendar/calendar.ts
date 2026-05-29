import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { addMonths } from 'date-fns';
import { buildMonthGrid } from '../../utils/build-month-grid/build-month-grid';
import { formatMonthHeading, toMonthStart } from '../../utils/date-utils';
import { Button } from '../../../button/button';
import { IconComponent } from '../../../icon/icon';
import { Month } from './month/month';

@Component({
  selector: 'date-picker-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Month, Button, IconComponent],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  readonly viewMonth = input.required<Date>();
  readonly pendingStart = input<Date | null>(null);
  readonly pendingEnd = input<Date | null>(null);
  readonly hoverDate = input<Date | null>(null);
  readonly showHoverPreview = input(false);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);

  readonly monthNavigated = output<Date>();
  readonly dayClick = output<Date>();
  readonly dayHover = output<Date>();
  readonly calendarLeave = output<void>();

  protected readonly secondMonth = computed(() => addMonths(this.viewMonth(), 1));

  protected readonly primaryGrid = computed(() => {
    const m = this.viewMonth();
    return buildMonthGrid(m.getFullYear(), m.getMonth());
  });

  protected readonly secondaryGrid = computed(() => {
    const m = this.secondMonth();
    return buildMonthGrid(m.getFullYear(), m.getMonth());
  });

  protected readonly primaryHeading = computed(() => formatMonthHeading(this.viewMonth()));
  protected readonly secondaryHeading = computed(() => formatMonthHeading(this.secondMonth()));

  protected readonly canGoBack = computed(() => {
    const min = this.minDate();
    if (!min) return true;
    return toMonthStart(this.viewMonth()) > toMonthStart(min);
  });

  protected readonly canGoForward = computed(() => {
    const max = this.maxDate();
    if (!max) return true;
    return toMonthStart(this.secondMonth()) < toMonthStart(max);
  });

  protected onPrev(): void {
    this.monthNavigated.emit(addMonths(this.viewMonth(), -1));
  }

  protected onNext(): void {
    this.monthNavigated.emit(addMonths(this.viewMonth(), 1));
  }
}
