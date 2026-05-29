import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Button } from '../../../button/button';
import { formatFooterDate } from '../../utils/date-utils';
import { isSameDay } from 'date-fns';

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
  readonly dayCount = input(0);
  readonly timezone = input('');

  readonly cancelled = output<void>();
  readonly applied = output<void>();

  protected readonly rangeText = computed(() => {
    const end = this.endDate();
    const start = this.startDate();
    const singleDay = !!end && !!start ? isSameDay(end, start) : !end && !!start;
    if (singleDay && start) return formatFooterDate(start);
    if (end && start) {
      const formattedEnd = formatFooterDate(end);
      return start ? `${formatFooterDate(start)} – ${formattedEnd}` : formattedEnd;
    }
    return null;
  });
}
