import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';
import { CommonserviceService } from '../services/commonservice.service';
import { addUser } from '../store/actions/user.action';
import { UserState } from '../store/reducers/user.reducer';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  @ViewChild('dialogTemplate', { static: false })
  dialogTemplate!: TemplateRef<any>;
  users = [
    {
      fullName: 'John Doe',
      emailAddress: 'john.doe@example.com',
      userInfo: 'User 1',
    },
    {
      fullName: 'Jane Doe',
      emailAddress: 'jane.doe@example.com',
      userInfo: 'User 2',
    },
    {
      fullName: 'Jim Smith',
      emailAddress: 'jim.smith@example.com',
      userInfo: 'User 3',
    },
  ];
  users$!: Observable<any>;
  userForm!: FormGroup;
  dialogRef: any;
  filteredUsers$!: Observable<any>;
  searchTerm: string = '';
  cookiesData: any;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private store: Store<{ user: UserState }>,
    private commonService: CommonserviceService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      userInfo: ['', Validators.required],
    });
    // retrieving users list data from store
    this.users$ = this.store.pipe(select((state) => state.user.users));
  }

  searchUsers(event: any) {
    this.searchTerm = event.target.value;
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px',
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.userForm.reset();
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.store.dispatch(addUser(this.userForm.value));
      this.userForm.reset();
      this.dialogRef.close();
      this.commonService.filteredUsers$ = this.store.pipe(
        select((state) => state.user.users)
      );
      this.users$.subscribe((res: any) => {
        this.cookiesData = res;
        if (this.cookiesData) {
          this.cookieService.set('Users', JSON.stringify(this.cookiesData));
        }
      });
    }
  }
}
