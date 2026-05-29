import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Input } from '../input/input';
import { Label } from '../label/label';

@Component({
  selector: 'date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Input, Label],
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
