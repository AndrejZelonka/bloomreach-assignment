import { getDaysInMonth, getDay } from 'date-fns';

export function buildMonthGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1);
  const totalDays = getDaysInMonth(firstDay);
  const startOffset = getDay(firstDay);

  const cells: (Date | null)[] = [];

  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length < 42) {
    cells.push(null);
  }

  const grid: (Date | null)[][] = [];
  for (let row = 0; row < 6; row++) {
    grid.push(cells.slice(row * 7, row * 7 + 7));
  }
  return grid;
}
