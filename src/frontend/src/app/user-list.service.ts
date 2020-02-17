import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment'
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private http: HttpClient
  ) { }

  /** GET heroes from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/users')
  }
}
