import { store } from 'state/store';
import { setLoading } from 'state/support/reducer';

export const doSetLoading = async value => {
  store.dispatch(setLoading(value));
};
