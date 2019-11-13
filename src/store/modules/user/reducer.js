import produce from 'immer';
import * as ActionsAuth from '../auth/actions';
import * as Actions from './actions';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case ActionsAuth.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }

      case Actions.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }

      case ActionsAuth.SIGN_OUT: {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
