import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interface/users';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class  AuthService {
  ROOT_URL: string = 'http://localhost:8088/auth';
  constructor(private http: HttpClient, private router : Router,private _ss:SharedService) {}

  register(users: Users): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(`${this.ROOT_URL}/register`, users, {
      headers,
      responseType: 'text',
    });
  }

  login(users: Users): Observable<any> {
    const body = { email: users.email, password: users.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    return this.http.post(`${this.ROOT_URL}/login`, body, {headers,withCredentials:true//this line will go to authcontroller.java
    }).pipe(
      catchError(error => {
        console.error('Error during login:', error);
        this.router.navigate(['/auth/login']);
        return throwError(error);
      })
    );
  }

  
  deleteToken():Observable<any>{
   return this.http.delete(`${this.ROOT_URL}/delete`,{responseType:"text"});
  }

  isToken():Observable<any>{
    return this.http.get(`${this.ROOT_URL}/isToken`,{responseType:"text"});
  }
  
  // login(users:Users):Observable<any>{
  //   const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  // const body = new URLSearchParams();
  // body.set('email', users.email);
  // body.set('password', users.password);
  //   return this.http.post(`${this.ROOT_URL}/login`,body.toString(),{ headers,responseType:'text'});
  // }

  logout() {
    this._ss.setIsLogin(false);
    this._ss.setIsAdmin(false);
    this._ss.setUser(null);
    this._ss.setToken(null);
    this.deleteToken().subscribe({
      next:(data)=>{
        console.log("loggedout")
      }
    });
    //return this.http.get("http://localhost:8088/auth/login/")
  }
}
