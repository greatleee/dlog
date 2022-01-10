import React, { createContext, Dispatch, useContext, useReducer } from 'react';

type State = {
  showCreateModal: boolean;
  createDate: Date;
};

type Action = 
  | { type: 'TOGGLE_CREATE_MODAL'; show: boolean; date: Date };

type RecordDispatch = Dispatch<Action>;

const RecordStateContext = createContext<State | null>(null);
const RecordDispatchContext = createContext<RecordDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_CREATE_MODAL':
      return {
        ...state,
        showCreateModal: action.show,
        createDate: action.date,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function RecordProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    showCreateModal: false,
    createDate: new Date(),
  });

  return (
    <RecordStateContext.Provider value={state}>
      <RecordDispatchContext.Provider value={dispatch}>
        { children }
      </RecordDispatchContext.Provider>
    </RecordStateContext.Provider>
  );
}

export function useRecordState() {
  const context = useContext(RecordStateContext);
  if (!context) {
    throw new Error('Cannot find RecordProvider');
  }
  return context;
}

export function useRecordDispatch() {
  const context = useContext(RecordDispatchContext);
  if (!context) {
    throw new Error('Cannot find RecordProvider');
  }
  return context;
}
