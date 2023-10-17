import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interface/users';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ROOT_URL: string = 'http://localhost:8088/auth';
  constructor(private http: HttpClient, private router : Router) {}

  register(users: Users): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'Application/json');
    return this.http.post(`${this.ROOT_URL}/register`, users, {
      headers,
      responseType: 'text',
    });
  }

  // login(users: Users): Observable<any> {
  //   const body = { email: users.email, password: users.password };
  //   console.log(users.email);
  //   // const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  //   return this.http.post(`${this.ROOT_URL}/login`, body, {
  //   }).pipe(
  //     catchError(error => {
  //       console.error('Error during login:', error);
  //       this.router.navigate(['/auth/login']);
  //       return throwError(error);
  //     })
  //   );
  // }
  
  login(users:Users):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  const body = new URLSearchParams();
  body.set('email', users.email);
  body.set('password', users.password);
    return this.http.post(`${this.ROOT_URL}/login`,body.toString(),{ headers,responseType:'text'});
  }

}
