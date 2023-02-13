import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserState } from '../store/reducers/user.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  selectedTab = 0;
  users = [
    {
      fullName: 'John Doe',
      emailAddress: 'john.doe@example.com',
      userInfo: 'Hello user info',
    },
  ];
  tabs: any[] = [];
  users$: any;
  userDetails: any;
  activeUserId: any;

  constructor(
    private store: Store<{ user: UserState }>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeUserId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserDetailsById(this.activeUserId);

    // this.users.forEach((user, index) => {
    //   if (index < 2) {
    //     let tabData = {
    //       tabTitle: 'df',
    //       tabContent: `Name: ${user.fullName}
    //         Email: ${user.emailAddress}
    //         UserInfo: ${user.userInfo}`,
    //     };
    //     this.tabs.push(tabData);
    //   }
    // });
  }

  getUserDetailsById(id: any) {
    if (this.activeUserId) {
      this.users$ = this.store.pipe(select((state) => state.user.users));
      this.users$.subscribe((res: any) => {
        if (res) {
          this.userDetails = res.find((user: any) => user.id == id);
          for (let i = 0; i < 2; i++) {
            let dataTab = ['UserInfo', 'History'];
            let obj = {
              tabTitle: dataTab[i],
              tabContent:
                i == 0
                  ? `Name: ${this.userDetails?.fullName}<br>
                           Email: ${this.userDetails?.emailAddress}<br>
                           UserInfo: ${this.userDetails?.userInfo}`
                  : 'History is not available',
            };
            this.tabs.push(obj);
          }
        }
      });
    }
  }
}
