import { Preset, SelectionPhase } from '../../types';
import { toDay } from '../date-utils';

export interface SelectionState {
  pendingStart: Date | null;
  pendingEnd: Date | null;
  selectionPhase: SelectionPhase;
  pendingPreset: Preset | null;
}

export function applyDayClick(state: SelectionState, date: Date): SelectionState {
  if (state.selectionPhase === 'start') {
    return {
      pendingStart: date,
      pendingEnd: null,
      selectionPhase: 'end',
      pendingPreset: null,
    };
  }

  const { pendingStart } = state;
  const clickedDay = toDay(date);
  const startDay = pendingStart ? toDay(pendingStart) : null;

  if (startDay !== null && clickedDay < startDay) {
    return {
      pendingStart: date,
      pendingEnd: null,
      selectionPhase: 'end',
      pendingPreset: null,
    };
  }

  return {
    pendingStart,
    pendingEnd: date,
    selectionPhase: 'start',
    pendingPreset: null,
  };
}
