import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interface/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ROOT_URL: string = 'http://localhost:8088/auth';
  constructor(private http: HttpClient) {}

  register(users: Users): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'Application/json');
    return this.http.post(`${this.ROOT_URL}/register`, users, {
      headers,
      responseType: 'text',
    });
  }

  login(users: Users): Observable<any> {
    const headers = new HttpHeaders();
    //headers.set('Content-Type', 'Application/json');
    headers.set('Content-Type', 'application/json'); // Corrected 'Content-Type'

    return this.http.post(`${this.ROOT_URL}/login`, users, {
      headers,
      responseType: 'json',
    });
    //return this.http.get("http://localhost:8088/auth/login/")
  }
}
