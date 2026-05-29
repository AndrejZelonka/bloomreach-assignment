import { format, startOfDay, startOfMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';

// TODO: Allow localization via prop? Use browser settings?
export const locale = enUS;

export function toDay(d: Date): number {
  return startOfDay(d).getTime();
}

export function toMonthStart(d: Date): number {
  return startOfMonth(d).getTime();
}

export function formatTriggerDate(date: Date): string {
  return format(date, 'd MMM yyyy', { locale });
}

export function formatFooterDate(date: Date): string {
  return format(date, 'EEEE, d MMMM yyyy, HH:mm', { locale });
}

export function formatMonthHeading(date: Date): string {
  return format(date, 'MMM yyyy', { locale }).toUpperCase();
}

export function formatDayAriaLabel(date: Date): string {
  return format(date, 'EEEE, MMMM d, yyyy', { locale });
}
