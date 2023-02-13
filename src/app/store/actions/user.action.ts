import { createAction, props } from '@ngrx/store';

export interface UserActionPayload {
  fullName: string;
  emailAddress: string;
  userInfo: string;
}

export const addUser = createAction(
  '[User] Add User',
  props<UserActionPayload>()
);
export const loadUsersFromCookies = createAction(
  '[User] Load Users from Cookies',
  props<{ users: UserActionPayload[] }>()
);
