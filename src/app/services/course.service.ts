import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../interface/course';


const ROOT_URL = "http://localhost:8088/courses";
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses():Observable<any>{
    return this.http.get(`${ROOT_URL}/`)
  }

  addCourse(course:Course):Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type','Application/json')
    return this.http.post(`${ROOT_URL}/addCourse`,course,{
      headers,responseType:"text"
    })
  }
}
