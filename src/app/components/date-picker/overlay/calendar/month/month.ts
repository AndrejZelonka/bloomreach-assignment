import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'date-picker-month',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './month.html',
  styleUrl: './month.css',
})
export class Month {}
