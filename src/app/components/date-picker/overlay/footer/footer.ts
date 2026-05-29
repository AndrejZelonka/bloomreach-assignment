import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Button } from '../../../button/button';
import { differenceInCalendarDays } from 'date-fns';

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

@Component({
  selector: 'date-picker-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly startDate = input<Date | null>(null);
  readonly endDate = input<Date | null>(null);

  readonly closed = output<void>();

  protected readonly rangeText = computed(() => {
    const end = this.endDate();
    if (!end) return null;
    const start = this.startDate();
    const formattedEnd = DATE_FORMAT.format(end);
    return start ? `${DATE_FORMAT.format(start)} – ${formattedEnd}` : formattedEnd;
  });

  protected readonly dayCount = computed(() => {
    const start = this.startDate();
    const end = this.endDate();
    if (!end) return 0;
    if (!start) return 1;
    return differenceInCalendarDays(end, start) + 1;
  });

  protected readonly timezone = computed(() =>
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
}
