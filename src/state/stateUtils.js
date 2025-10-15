export const deleteErrorAndSetState = name => (state, action) =>
  action.error
    ? state.set('error', action.payload.message)
    : state.remove('error').set(name, action.payload);
export const deleteErrorAndMergeState = () => (state, action) =>
  action.error ? state.set('error', action.payload.message) : state.merge(action.payload);
