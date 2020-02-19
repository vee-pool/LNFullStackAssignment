import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../environments/environment'
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class AddEditUserService {

  constructor(
    private http: HttpClient 
  ) { }

  addUser(user): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/users', user)
    .pipe(
      catchError(this.handleError)
    )
  }

  editUser(id, user): Observable<any> {
    return this.http.patch<any>(environment.apiUrl + '/users/' + id, user)
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if (error.status === 422) {
        error.error.errors.forEach(element => {
          errorMessage += element.msg + '\n';
        });
      } else {
        errorMessage = 'Could not create user. Server error.';
      }
    }
    
    return throwError(errorMessage);
  }
}
