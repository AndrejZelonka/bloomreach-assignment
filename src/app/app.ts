import { Component, signal } from '@angular/core';
import { DateRangePickerComponent } from './components/date-picker/date-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [DateRangePickerComponent],
})
export class App {
  protected readonly title = signal('bloomreach-assignment');
}
