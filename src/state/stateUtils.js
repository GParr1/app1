export const deleteErrorAndSetState = name => (state, action) => {
  if (action.error) {
    // se action.error è true, impostiamo l'errore
    state.error = action.payload?.message ?? action.payload ?? 'Errore';
  } else {
    // rimuoviamo eventuale errore e impostiamo il campo specificato
    if (state.error !== undefined) delete state.error;
    state[name] = action.payload;
  }
};
export const deleteErrorAndMergeState = name => (state, action) => {
  if (action.error) {
    state.error = action.payload?.message ?? action.payload ?? 'Errore';
  } else {
    if (state.error !== undefined) delete state.error;
    // merge: sovrascrive/aggiunge le proprietà del payload nello state
    Object.assign(state[name] ?? {}, action.payload);
  }
};
