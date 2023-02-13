import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, map } from 'rxjs/operators';
import { CommonserviceService } from '../services/commonservice.service';
import { UserState } from '../store/reducers/user.reducer';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users$!: Observable<any>;
  @Input() searchTerm: string = '';
  constructor(
    private store: Store<{ user: UserState }>,
    public commonService: CommonserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.store.pipe(select((state) => state.user.users));
  }

  ngOnChanges() {
    this.users$ = this.store.pipe(select((state) => state.user.users));

    // search filtering by email
    this.commonService.filteredUsers$ = this.users$.pipe(
      map((users: any) => {
        return users.filter((user: any) =>
          user.emailAddress.includes(this.searchTerm)
        );
      }),
      debounceTime(500)
    );
  }

  routeTo(id: any) {
    this.router.navigateByUrl('profile/' + id);
  }
}
