import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
ROOT_URL:string = "http://localhost:8088/user"
  constructor(private http:HttpClient, private _ss:SharedService) { }

  getUserByEmail(email:string):Observable<any>{
    return this.http.get(`${this.ROOT_URL}/${email}`)
  }

  getUserByToken(token:string):Observable<any>{
    return this.http.get(`${this.ROOT_URL}/userFromToken/${token}`)//will go to usercontroller.java
  }
}
