import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Month } from './month/month';

@Component({
  selector: 'date-picker-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Month],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {}
