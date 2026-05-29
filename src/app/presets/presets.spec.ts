import { describe, expect, it } from 'vitest';
import { PRESETS } from './presets';
import { endOfDay, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays } from 'date-fns';

// Reference: Friday 2026-05-29 18:30:00
const NOW = new Date(2026, 4, 29, 18, 30, 0);

function find(id: string) {
  const preset = PRESETS.find((p) => p.id === id);
  if (!preset) throw new Error(`Preset not found: ${id}`);
  return preset;
}

describe('PRESETS', () => {
  it('lifetime returns null start and now as end', () => {
    const result = find('lifetime').toDateRange(NOW);
    expect(result.start).toBeNull();
    expect(result.end).toEqual(NOW);
  });

  it('today returns start of today to now', () => {
    const result = find('today').toDateRange(NOW);
    expect(result.start).toEqual(startOfDay(NOW));
    expect(result.end).toEqual(NOW);
  });

  it('yesterday returns full day of yesterday', () => {
    const yesterday = subDays(NOW, 1);
    const result = find('yesterday').toDateRange(NOW);
    expect(result.start).toEqual(startOfDay(yesterday));
    expect(result.end).toEqual(endOfDay(yesterday));
  });

  it('this-week starts on Sunday of the current week', () => {
    const result = find('this-week').toDateRange(NOW);
    expect(result.start).toEqual(startOfWeek(NOW, { weekStartsOn: 0 }));
    expect(result.start).toEqual(new Date(2026, 4, 24));
    expect(result.end).toEqual(NOW);
  });

  it('this-week on Sunday starts today', () => {
    const sunday = new Date(2026, 4, 24, 9, 0, 0);
    const result = find('this-week').toDateRange(sunday);
    expect(result.start).toEqual(startOfWeek(sunday, { weekStartsOn: 0 }));
    expect(result.start).toEqual(new Date(2026, 4, 24));
  });

  it('this-month starts on the first of the current month', () => {
    const result = find('this-month').toDateRange(NOW);
    expect(result.start).toEqual(startOfMonth(NOW));
    expect(result.start).toEqual(new Date(2026, 4, 1));
    expect(result.end).toEqual(NOW);
  });

  it('this-year starts on January 1st', () => {
    const result = find('this-year').toDateRange(NOW);
    expect(result.start).toEqual(startOfYear(NOW));
    expect(result.start).toEqual(new Date(2026, 0, 1));
    expect(result.end).toEqual(NOW);
  });

  it('last-7-days covers 7 days including today', () => {
    const result = find('last-7-days').toDateRange(NOW);
    expect(result.start).toEqual(startOfDay(subDays(NOW, 6)));
    expect(result.end).toEqual(NOW);
  });

  it('last-30-days covers 30 days including today', () => {
    const result = find('last-30-days').toDateRange(NOW);
    expect(result.start).toEqual(startOfDay(subDays(NOW, 29)));
    expect(result.end).toEqual(NOW);
  });
});
