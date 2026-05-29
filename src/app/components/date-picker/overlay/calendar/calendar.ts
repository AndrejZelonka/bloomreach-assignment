import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { addMonths, format } from 'date-fns';
import { buildMonthGrid } from '../../utils/build-month-grid/build-month-grid';
import { Month } from './month/month';

@Component({
  selector: 'date-picker-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Month],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  private readonly today = new Date();

  protected readonly displayYear = signal(this.today.getFullYear());
  protected readonly displayMonth = signal(this.today.getMonth());

  private readonly primaryDate = computed(() => new Date(this.displayYear(), this.displayMonth()));

  private readonly secondaryDate = computed(() => addMonths(this.primaryDate(), 1));

  protected readonly primaryGrid = computed(() =>
    buildMonthGrid(this.displayYear(), this.displayMonth()),
  );

  protected readonly primaryHeading = computed(() => format(this.primaryDate(), 'MMMM yyyy'));

  protected readonly secondaryGrid = computed(() => {
    const d = this.secondaryDate();
    return buildMonthGrid(d.getFullYear(), d.getMonth());
  });

  protected readonly secondaryHeading = computed(() => format(this.secondaryDate(), 'MMMM yyyy'));

  protected onDayClick(date: Date): void {
    console.log('day click', date);
  }
}
