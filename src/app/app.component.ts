import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { CommonserviceService } from './services/commonservice.service';
import { loadUsersFromCookies } from './store/actions/user.action';
import { UserState } from './store/reducers/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cookiesData: any;
  users$: any;
  constructor(
    private cookieService: CookieService,
    private store: Store<{ user: UserState }>,
    private commonService: CommonserviceService
  ) {}

  ngOnInit(): void {
    // retrieve data from cookies
    this.cookiesData = this.cookieService.get('Users')
      ? JSON.parse(this.cookieService.get('Users'))
      : null;

    if (this.cookiesData) {
      // dispatch loadUsersFromCookies action to store the retrieved data in the store
      this.store.dispatch(loadUsersFromCookies({ users: this.cookiesData }));
    }

    // retrieving users list data from store
    this.users$ = this.store.pipe(select((state) => state.user.users));

    this.commonService.filteredUsers$ = this.store.pipe(
      select((state) => state.user.users)
    );
  }

  title = 'test-task';
}
