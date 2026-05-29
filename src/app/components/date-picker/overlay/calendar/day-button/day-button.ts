import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'date-picker-day-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './day-button.html',
  styleUrl: './day-button.css',
})
export class DayButton {
  readonly ariaLabel = input.required<string>();
  readonly disabled = input(false);
  readonly isToday = input(false);
  readonly isStart = input(false);
  readonly isEnd = input(false);
  readonly isInRange = input(false);
  readonly isHoverPreviewInRange = input(false);
  readonly isHoverPreviewEndpoint = input(false);

  readonly clicked = output<void>();
}
