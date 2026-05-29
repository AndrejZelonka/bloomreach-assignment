import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { Overlay } from './overlay/overlay';
import { CUSTOM_RANGE_PRESET, DateRange, Preset } from './types';
import { formatTriggerDate, toDay } from './utils/date-utils';

function formatDateRange(range: DateRange | null): string | null {
  if (!range) return null;
  const formattedEnd = formatTriggerDate(range.end);
  if (!range.start) return formattedEnd;
  if (toDay(range.start) === toDay(range.end)) return formattedEnd;
  return `${formatTriggerDate(range.start)} – ${formattedEnd}`;
}

@Component({
  selector: 'date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Input, Label, Overlay],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
})
export class DateRangePickerComponent {
  private readonly elementRef = inject(ElementRef);

  readonly label = input.required<string>();
  readonly presets = input.required<Preset[]>();
  readonly value = input<DateRange | null>(null);
  readonly disabled = input(false);
  readonly allowCustomRangePreset = input(true);

  readonly rangeChange = output<DateRange>();

  protected readonly committedRange = signal<DateRange | null>(null);
  protected readonly isOpen = signal(false);
  protected readonly formattedRange = computed(() => formatDateRange(this.committedRange()));
  protected readonly effectivePresets = computed(() =>
    this.allowCustomRangePreset() ? [...this.presets(), CUSTOM_RANGE_PRESET] : this.presets(),
  );

  constructor() {
    effect(() => {
      this.committedRange.set(this.value());
    });
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  protected onToggle(): void {
    if (this.disabled()) return;
    this.isOpen.update((open) => !open);
  }

  protected onCancel(): void {
    this.isOpen.set(false);
  }

  protected onApply(range: DateRange): void {
    this.committedRange.set(range);
    this.rangeChange.emit(range);
    this.isOpen.set(false);
  }
}
