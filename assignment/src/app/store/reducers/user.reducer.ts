import { createReducer, on } from '@ngrx/store';
import {
  addUser,
  loadUsersFromCookies,
  UserActionPayload,
} from '../actions/user.action';

export interface UserState {
  users: UserActionPayload[];
}
let userId = 1;

export const initialState: UserState = {
  users: [],
};
// adding user details
export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { fullName, emailAddress, userInfo }) => {
    const newUser = {
      id: userId++,
      fullName,
      emailAddress,
      userInfo,
    };
    return {
      ...state,
      users: [...state.users, newUser],
    };
  }),
  on(loadUsersFromCookies, (state, { users }) => {
    return {
      ...state,
      users,
    };
  })
);
// function retrieveDataFromCookies(): UserActionPayload[] {
//   // code to retrieve data from cookies
//   return ;
// }
