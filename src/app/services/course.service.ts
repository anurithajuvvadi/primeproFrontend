import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const ROOT_URL = "http://localhost:8088/courses";
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  home():Observable<any>{
    return this.http.get(`${ROOT_URL}/`,{responseType:'text'})
  }
}
