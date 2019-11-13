export const UPDATE_PROFILE_REQUEST = '@user/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = '@user/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = '@user/UPDATE_PROFILE_FAILURE';

export function updateProfileRequest(data) {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: UPDATE_PROFILE_FAILURE,
  };
}
