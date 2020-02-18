import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../user'
import { UserListService } from '../user-list.service'
import { AddUserService } from "../add-user.service";
import { AddUserDialogComponent } from "../add-user-dialog/add-user-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private userListService: UserListService,
    private addUserService: AddUserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userListService.getUsers().subscribe(users => this.users = users)
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(JSON.stringify(result));
        this.addUser(result);
      }
    });
  }

  addUser(user): void {
    this.addUserService.addUser(user).subscribe(response => {
      console.log('POST status', response.status);
      this.getUsers();
    })
  }
}
