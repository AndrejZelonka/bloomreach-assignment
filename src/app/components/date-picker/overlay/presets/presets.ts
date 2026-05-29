import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'date-picker-presets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './presets.html',
  styleUrl: './presets.css',
})
export class Presets {}
