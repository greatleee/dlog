import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Records } from '../components/Calendar';

type State = {
  date: Date;
  records: Records;
};

type Action = 
  | { type: 'SET_RECORDS'; records: Records }
  | { type: 'SET_CALENDAR_DATE', date: Date };

type dispatch = Dispatch<Action>;

const RecordsStateContext = createContext<State | null>(null);
const RecordsDispatchContext = createContext<dispatch | null>(null);


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_RECORDS':
      return {
        ...state,
        records: action.records,
      };
    case 'SET_CALENDAR_DATE':
      return {
        ...state,
        date: action.date,
      }
    default:
      throw new Error('Unhandled action');
  }
}

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    date: new Date(),
    records: {},
  });

  return (
    <RecordsStateContext.Provider value={state}>
      <RecordsDispatchContext.Provider value={dispatch}>
        { children }
      </RecordsDispatchContext.Provider>
    </RecordsStateContext.Provider>
  );
}

export function useRecordsState() {
  const context = useContext(RecordsStateContext);
  if (!context) {
    throw new Error('Cannot find RecordProvider');
  }
  return context;
}

export function useRecordsDispatch() {
  const context = useContext(RecordsDispatchContext);
  if (!context) {
    throw new Error('Cannot find RecordProvider');
  }
  return context;
}
