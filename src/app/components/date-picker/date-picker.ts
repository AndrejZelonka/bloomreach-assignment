import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { Overlay } from './overlay/overlay';

@Component({
  selector: 'date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Input, Label, Overlay],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DateRangePickerComponent {
  readonly label = input.required<string>();

  protected readonly isOpen = signal(false);

  protected onToggle(): void {
    this.isOpen.update((open) => !open);
  }
}
