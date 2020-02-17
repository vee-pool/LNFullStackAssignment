import { Component, OnInit } from '@angular/core';

import { User } from '../user'
import { UserListService } from '../user-list.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private userListService: UserListService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userListService.getUsers().subscribe(users => this.users = users.data)
  }
}
