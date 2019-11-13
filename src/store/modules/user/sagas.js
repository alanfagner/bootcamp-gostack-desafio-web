import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import * as Actions from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucess!');

    yield put(Actions.updateProfileSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(Actions.updateProfileFailure());
  }
}

export default all([takeLatest(Actions.UPDATE_PROFILE_REQUEST, updateProfile)]);
