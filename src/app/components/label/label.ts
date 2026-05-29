import { Component, input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.html',
  styleUrl: './label.css',
})
export class Label {
  readonly label = input<string>('');
  readonly wrapperClass = input<string>('');
}
