import { store } from 'state/store';
import { matches } from 'state/support/reducer';

export const doSetMatches = async value => {
  store.dispatch(matches(value));
};
