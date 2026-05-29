import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { differenceInCalendarDays, endOfDay } from 'date-fns';
import { applyDayClick } from '../utils/apply-day-click/apply-day-click';
import { CUSTOM_RANGE_PRESET, DateRange, Preset, SelectionPhase } from '../types';
import { Calendar } from './calendar/calendar';
import { Footer } from './footer/footer';
import { Presets } from './presets/presets';
import { startOfDay } from 'date-fns/fp';

@Component({
  selector: 'date-picker-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Calendar, Presets, Footer],
  templateUrl: './overlay.html',
  styleUrl: './overlay.css',
  host: {
    role: 'dialog',
    'aria-label': 'Date picker',
    'aria-modal': 'true',
  },
})
export class Overlay implements OnInit {
  readonly committedRange = input<DateRange | null>(null);
  readonly presets = input.required<Preset[]>();
  readonly allowCustomRangePreset = input(true);
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);

  readonly cancel = output<void>();
  readonly apply = output<DateRange>();

  protected readonly pendingStart = signal<Date | null>(null);
  protected readonly pendingEnd = signal<Date | null>(null);
  protected readonly pendingPreset = signal<Preset | null>(null);
  protected readonly hoverDate = signal<Date | null>(null);
  protected readonly viewMonth = signal<Date>(new Date());
  protected readonly selectionPhase = signal<SelectionPhase>('start');

  protected readonly today = new Date();
  protected readonly timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  protected readonly showHoverPreview = computed(() => this.selectionPhase() === 'end');

  protected readonly pendingDayCount = computed(() => {
    const start = this.pendingStart();
    const end = this.pendingEnd();
    if (!end && !start) return 0;
    if (!end || !start) return 1;
    return differenceInCalendarDays(end, start) + 1;
  });

  ngOnInit(): void {
    const range = this.committedRange();
    this.pendingStart.set(range?.start ?? null);
    this.pendingEnd.set(range?.end ?? null);
    this.pendingPreset.set(range ? this.matchPreset(range) : this.allowCustomRangePreset() ? CUSTOM_RANGE_PRESET : null);
    this.hoverDate.set(null);
    this.viewMonth.set(range?.end ?? new Date());
    this.selectionPhase.set('start');
  }

  private matchPreset(range: DateRange): Preset | null {
    for (const preset of this.presets()) {
      if (preset.id === CUSTOM_RANGE_PRESET.id) continue;
      const candidate = preset.toDateRange(this.today);
      const candidateStart = candidate.start ? startOfDay(candidate.start) : null;
      const candidateEnd = endOfDay(candidate.end);
      const startMatches =
        candidateStart === null
          ? range.start === null
          : range.start !== null && candidateStart.getTime() === range.start.getTime();
      if (startMatches && candidateEnd.getTime() === range.end.getTime()) return preset;
    }
    return this.allowCustomRangePreset() ? CUSTOM_RANGE_PRESET : null;
  }

  protected onCancel(): void {
    this.cancel.emit();
  }

  protected onApply(): void {
    const start = this.pendingStart();
    const end = this.pendingEnd() ?? start;
    if (!end) return;
    this.apply.emit({ start: start ? startOfDay(start) : null, end: endOfDay(end) });
  }

  protected onMonthNavigated(month: Date): void {
    this.viewMonth.set(month);
  }

  protected onDayClick(date: Date): void {
    const next = applyDayClick(
      {
        pendingStart: this.pendingStart(),
        pendingEnd: this.pendingEnd(),
        selectionPhase: this.selectionPhase(),
        pendingPreset: this.pendingPreset(),
      },
      date,
    );
    this.pendingStart.set(next.pendingStart);
    this.pendingEnd.set(next.pendingEnd);
    this.selectionPhase.set(next.selectionPhase);
    this.pendingPreset.set(this.allowCustomRangePreset() ? CUSTOM_RANGE_PRESET : null);
    this.hoverDate.set(null);
  }

  protected onDayHover(date: Date): void {
    this.hoverDate.set(date);
  }

  protected onCalendarLeave(): void {
    this.hoverDate.set(null);
  }

  protected onPresetSelected(preset: Preset): void {
    if (preset.id === CUSTOM_RANGE_PRESET.id) {
      this.pendingStart.set(null);
      this.pendingEnd.set(null);
      this.selectionPhase.set('start');
      this.pendingPreset.set(CUSTOM_RANGE_PRESET);
      return;
    }
    const range = preset.toDateRange(this.today);
    this.pendingStart.set(range.start);
    this.pendingEnd.set(range.end);
    this.pendingPreset.set(preset);
    this.viewMonth.set(range.start ?? range.end);
  }
}
