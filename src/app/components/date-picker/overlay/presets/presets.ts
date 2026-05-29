import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Preset } from '../../types';
import { IconComponent } from '../../../icon/icon';

const PRESETS: Preset[] = [
  { id: 'lifetime', label: 'Lifetime' },
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'this-week', label: 'This week' },
  { id: 'this-month', label: 'This month' },
  { id: 'this-year', label: 'This year' },
  { id: 'last-7-days', label: 'Last 7 days' },
  { id: 'last-14-days', label: 'Last 14 days' },
  { id: 'last-30-days', label: 'Last 30 days' },
  { id: 'last-90-days', label: 'Last 90 days' },
];

@Component({
  selector: 'date-picker-presets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './presets.html',
  styleUrl: './presets.css',
})
export class Presets {
  protected readonly presets = PRESETS;
  protected readonly activePreset = signal<Preset | null>(PRESETS[0]);
  readonly presetSelected = output<Preset>();

  protected onPresetClick(preset: Preset): void {
    this.activePreset.set(preset);
    this.presetSelected.emit(preset);
  }
}
