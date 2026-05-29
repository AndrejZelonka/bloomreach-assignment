import { describe, expect, it } from 'vitest';
import { SelectionState, applyDayClick } from './apply-day-click';

const jan = (day: number) => new Date(2024, 0, day);

const fresh: SelectionState = {
  pendingStart: null,
  pendingEnd: null,
  selectionPhase: 'start',
  pendingPreset: null,
};

describe('applyDayClick — phase start', () => {
  it('sets pendingStart, clears pendingEnd and preset, advances to phase end', () => {
    const next = applyDayClick(fresh, jan(10));
    expect(next.pendingStart).toEqual(jan(10));
    expect(next.pendingEnd).toBeNull();
    expect(next.selectionPhase).toBe('end');
    expect(next.pendingPreset).toBeNull();
  });
});

describe('applyDayClick — phase end', () => {
  const afterFirst: SelectionState = {
    pendingStart: jan(10),
    pendingEnd: null,
    selectionPhase: 'end',
    pendingPreset: null,
  };

  it('click after start completes range, clears preset, resets to phase start', () => {
    const next = applyDayClick(afterFirst, jan(20));
    expect(next.pendingStart).toEqual(jan(10));
    expect(next.pendingEnd).toEqual(jan(20));
    expect(next.selectionPhase).toBe('start');
    expect(next.pendingPreset).toBeNull();
  });

  it('click on same day as start produces single-day range', () => {
    const next = applyDayClick(afterFirst, jan(10));
    expect(next.pendingStart).toEqual(jan(10));
    expect(next.pendingEnd).toEqual(jan(10));
    expect(next.selectionPhase).toBe('start');
  });

  it('click before start updates start and stays in phase end', () => {
    const next = applyDayClick(afterFirst, jan(3));
    expect(next.pendingStart).toEqual(jan(3));
    expect(next.pendingEnd).toBeNull();
    expect(next.selectionPhase).toBe('end');
  });
});
