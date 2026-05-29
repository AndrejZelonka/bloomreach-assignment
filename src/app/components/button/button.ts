import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export const BUTTON_VARIANTS = ['ghost', 'primary'] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SPACINGS = ['sm', 'none'] as const;
export type ButtonSpacing = (typeof BUTTON_SPACINGS)[number];

@Component({
  selector: 'ui-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly ariaLabel = input.required<string>();
  readonly disabled = input(false);
  readonly variant = input<ButtonVariant>('ghost');
  readonly spacing = input.required<ButtonSpacing>();

  readonly clicked = output<void>();
  readonly hovered = output<void>();
}
