export const LOAD_ACCOUNT = 'LOAD_ACCOUNT';
export const CLEAR_ACCOUNT = 'CLEAR_ACCOUNT';
import { postSignup, postLogin } from 'services/web3Api';

const defaultAccount = null;

export default function account(state = defaultAccount, action) {
  switch (action.type) {
    case LOAD_ACCOUNT:
      return action.payload;
    case CLEAR_ACCOUNT:
      return defaultAccount;
    default:
      return state;
  }
}

export function signup(username, email, password) {
  return dispatch => {
    return postSignup(username, email, password).then((account) => {
      dispatch({
        type: LOAD_ACCOUNT,
        payload: account
      });
      return account;
    });
  };
}

export function login(username, password) {
  return dispatch => {
    return postLogin(username, password).then((account) => {
      dispatch({
        type: LOAD_ACCOUNT,
        payload: account
      });
      return account;
    });
  };
}

export function logout() {
  return { type: CLEAR_ACCOUNT };
}
