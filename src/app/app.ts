import { Component } from '@angular/core';
import { DateRangePickerComponent } from './components/date-picker/date-picker';
import { PRESETS } from './presets/presets';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [DateRangePickerComponent],
})
export class App {
  protected readonly presets = PRESETS;
}
