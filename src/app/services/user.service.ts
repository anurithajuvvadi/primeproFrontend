import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
ROOT_URL:string = "http://localhost:8088/user"
  constructor(private http:HttpClient) { }

  getUserByEmail(email:string):Observable<any>{
    return this.http.get(`${this.ROOT_URL}/${email}`)
  }
}
