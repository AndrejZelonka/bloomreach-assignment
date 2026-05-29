export interface DateRange {
  start: Date | null;
  end: Date;
}

export type SelectionPhase = 'start' | 'end';
export interface Preset {
  id: string;
  label: string;
  toDateRange: (today: Date) => DateRange;
}

export const CUSTOM_RANGE_PRESET: Preset = {
  id: 'custom',
  label: 'Custom range',
  toDateRange: (today) => ({ start: null, end: today }),
};
