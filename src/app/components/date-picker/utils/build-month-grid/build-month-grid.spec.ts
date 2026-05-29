import { describe, expect, it } from 'vitest';
import { buildMonthGrid } from './build-month-grid';

describe('buildMonthGrid', () => {
  it('returns a 6x7 grid', () => {
    const grid = buildMonthGrid(2026, 0);
    expect(grid).toHaveLength(6);
    for (const row of grid) {
      expect(row).toHaveLength(7);
    }
  });

  it('pads nulls before the first day when month starts mid-week', () => {
    // January 2026 starts on Thursday (col 4)
    const grid = buildMonthGrid(2026, 0);
    expect(grid[0][0]).toBeNull(); // Sun
    expect(grid[0][1]).toBeNull(); // Mon
    expect(grid[0][2]).toBeNull(); // Tue
    expect(grid[0][3]).toBeNull(); // Wed
    expect(grid[0][4]).toEqual(new Date(2026, 0, 1));
  });

  it('places day 1 in col 0 when month starts on Sunday', () => {
    // February 2026 starts on Sunday — no left padding
    const grid = buildMonthGrid(2026, 1);
    expect(grid[0][0]).toEqual(new Date(2026, 1, 1));
  });

  it('contains exactly the right days of the month', () => {
    // January 2026: 31 days
    const jan = buildMonthGrid(2026, 0)
      .flat()
      .filter((d) => d !== null) as Date[];
    expect(jan).toHaveLength(31);
    expect(jan[0]).toEqual(new Date(2026, 0, 1));
    expect(jan[30]).toEqual(new Date(2026, 0, 31));

    // February 2026: 28 days (not a leap year)
    const feb = buildMonthGrid(2026, 1)
      .flat()
      .filter((d) => d !== null) as Date[];
    expect(feb).toHaveLength(28);
    expect(feb[0]).toEqual(new Date(2026, 1, 1));
    expect(feb[27]).toEqual(new Date(2026, 1, 28));
  });
});
