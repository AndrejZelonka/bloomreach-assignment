import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Preset } from '../../types';
import { IconComponent } from '../../../icon/icon';

@Component({
  selector: 'date-picker-presets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './presets.html',
  styleUrl: './presets.css',
})
export class Presets {
  readonly presets = input.required<Preset[]>();
  readonly activePreset = input.required<Preset | null>();
  readonly presetSelected = output<Preset>();
}
