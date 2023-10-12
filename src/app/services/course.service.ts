import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  addCourse(course:FormData):Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type','multipart/form-data')
    return this.http.post(`${ROOT_URL}/addCourse`,course,{
      headers,responseType:"text"
    })
  }
  updateCourse(course:FormData,id:number):Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type','multipart/form-data')
    return this.http.put(`${ROOT_URL}/updateCourse/${id}`,course,{
      headers,responseType:"text"
    })
  }
  deleteCourse(id:number):Observable<any>{
   
    return this.http.delete(`${ROOT_URL}/deleteCourse/${id}`,{responseType:"text"})
    }


    imageBlobUrls: { [key: number]: Observable<string> } = {};

    getImageFromImages(id: number): Observable<string> {
      if (!this.imageBlobUrls[id]) {
        const apiUrl = `http://localhost:8088/courses/getImage/${id}`;
        this.imageBlobUrls[id] = this.http.get(apiUrl, { responseType: 'arraybuffer' }).pipe(
          map(response => URL.createObjectURL(new Blob([response], { type: 'image/jpg' })))
        );
      }
      return this.imageBlobUrls[id];
    }

    getCourseById(id : number):Observable<any>{
      return this.http.get(`${ROOT_URL}/getCourseById/${id}`);
    }

  // addCourse(course:Course):Observable<any>{
  //   const headers = new HttpHeaders();
  //   headers.set('Content-Type','Application/json')
  //   return this.http.post(`${ROOT_URL}/addCourse`,course,{
  //     headers,responseType:"text"
  //   })
  // }
}
