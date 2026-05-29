import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const ICON_NAMES = ['calendar', 'chevron-down', 'check'] as const;
export type IconName = (typeof ICON_NAMES)[number];

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: inline-flex; }'],
  templateUrl: './icon.html',
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(16);
  protected readonly strokeWidth = computed(() => (this.name() === 'check' ? 2.5 : 2));
}
