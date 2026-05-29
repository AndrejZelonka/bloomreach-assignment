import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'date-picker-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
