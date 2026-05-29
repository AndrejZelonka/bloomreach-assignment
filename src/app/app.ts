import { Component } from '@angular/core';
import { DateRangePickerComponent } from './components/date-picker/date-picker';
import { PRESETS } from './presets/presets';
import { DateRange } from './components/date-picker/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [DateRangePickerComponent],
  styleUrl: './app.css',
})
export class App {
  protected readonly presets = PRESETS;

  protected onRangeChange(range: DateRange): void {
    console.log('Date range: ', range);
  }
}
