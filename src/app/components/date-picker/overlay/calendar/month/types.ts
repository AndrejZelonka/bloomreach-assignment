export interface DayCell {
  date: Date;
  dayNumber: number;
  ariaLabel: string;
  isToday: boolean;
  isDisabled: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoverPreviewInRange: boolean;
  isHoverPreviewRangeStart: boolean;
  isHoverPreviewEndpoint: boolean;
}

export interface WeekDay {
  label: string;
  ariaLabel: string;
}
