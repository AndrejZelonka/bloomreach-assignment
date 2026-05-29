export interface DayCell {
  date: Date;
  dayNumber: number;
  ariaLabel: string;
  isToday: boolean;
  isDisabled: boolean;
}

export interface WeekDay {
  label: string;
  ariaLabel: string;
}
