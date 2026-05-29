import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent, IconName } from '../icon/icon';

@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  readonly value = input('');
  readonly label = input('');
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly readOnly = input(false);
  readonly leadingIcon = input<IconName | null>(null);
  readonly trailingIcon = input<IconName | null>(null);
}
