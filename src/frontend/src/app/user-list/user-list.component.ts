import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../user'
import { UserListService } from '../user-list.service'
import { AddEditUserService } from "../add-user.service";
import { AddEditUserDialogComponent } from "../add-user-dialog/add-user-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private userListService: UserListService,
    private userService: AddEditUserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userListService.getUsers().subscribe(users => this.users = users)
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      width: '350px',
      data: {
        actionButtonText: 'ADD USER'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  openEditUserDialog(user): void {

    let editUser = Object.create(user);

    editUser['actionButtonText'] = 'EDIT USER';
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      width: '350px',
      data: editUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //if any field is edited
        this.editUser(result);
      }
    });
  }

  addUser(user): void {
    this.userService.addUser(user).subscribe(response => {
      console.log('POST status', response.status);
      this.getUsers();
    }, error => {
      alert(error);
    })
  }

  editUser(user): void {

    let userId= user.id;
    delete user.id;
    this.userService.editUser(userId, user).subscribe(response => {
      this.getUsers();
    }, error => {
      alert(error);
    })
  }
}
