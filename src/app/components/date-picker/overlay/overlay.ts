import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Calendar } from './calendar/calendar';
import { Footer } from './footer/footer';
import { Presets } from './presets/presets';

@Component({
  selector: 'date-picker-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Calendar, Presets, Footer],
  templateUrl: './overlay.html',
  styleUrl: './overlay.css',
})
export class Overlay {
  readonly startDate = input<Date | null>(null);
  readonly endDate = input<Date | null>(null);
}
