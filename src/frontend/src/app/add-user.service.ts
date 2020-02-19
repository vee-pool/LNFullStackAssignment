import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment'
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class AddEditUserService {

  constructor(
    private http: HttpClient
  ) { }

  addUser(user): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/users', user)
  }

  editUser(id, user): Observable<any> {
    return this.http.patch<any>(environment.apiUrl + '/users/' + id, user)
  }
}
