import { Component, input } from '@angular/core';

const ICON_NAMES = ['calendar', 'chevron-down'] as const;
export type IconName = (typeof ICON_NAMES)[number];

@Component({
  selector: 'app-icon',
  standalone: true,
  styles: [':host { display: inline-block; }'],
  templateUrl: './icon.html',
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(16);
}
