import { endOfDay, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays } from 'date-fns';
import { Preset } from '../components/date-picker/types';

export const PRESETS: Preset[] = [
  {
    id: 'lifetime',
    label: 'Lifetime',
    toDateRange: (today) => ({ start: null, end: today }),
  },
  {
    id: 'today',
    label: 'Today',
    toDateRange: (today) => ({ start: startOfDay(today), end: today }),
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    toDateRange: (today) => {
      const yesterday = subDays(today, 1);
      return { start: startOfDay(yesterday), end: endOfDay(yesterday) };
    },
  },
  {
    id: 'this-week',
    label: 'This week',
    toDateRange: (today) => ({ start: startOfWeek(today, { weekStartsOn: 0 }), end: today }),
  },
  {
    id: 'this-month',
    label: 'This month',
    toDateRange: (today) => ({ start: startOfMonth(today), end: today }),
  },
  {
    id: 'this-year',
    label: 'This year',
    toDateRange: (today) => ({ start: startOfYear(today), end: today }),
  },
  {
    id: 'last-7-days',
    label: 'Last 7 days',
    toDateRange: (today) => ({ start: startOfDay(subDays(today, 6)), end: today }),
  },
  {
    id: 'last-14-days',
    label: 'Last 14 days',
    toDateRange: (today) => ({ start: startOfDay(subDays(today, 13)), end: today }),
  },
  {
    id: 'last-30-days',
    label: 'Last 30 days',
    toDateRange: (today) => ({ start: startOfDay(subDays(today, 29)), end: today }),
  },
  {
    id: 'last-90-days',
    label: 'Last 90 days',
    toDateRange: (today) => ({ start: startOfDay(subDays(today, 89)), end: today }),
  },
];
