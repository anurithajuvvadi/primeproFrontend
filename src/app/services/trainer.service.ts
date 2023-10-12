import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Trainer } from '../trainer';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private baseURL = 'http://localhost:8088/trainers';

  constructor(private httpClient: HttpClient) {}
  getTrainersList(): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(`${this.baseURL}`);
  }

  addTrainer(formData:FormData): Observable<any> {
    return this.httpClient.post(`${this.baseURL}`, formData,{responseType:"text"});
  }

  updateTrainer(id:number,formData:FormData):Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type','multipart/from-data')
    return this.httpClient.put(`${this.baseURL}/update/${id}`,formData,{ 
      headers,responseType:'text'});
  }
  getTrainerById(id: number): Observable<Trainer> {
    return this.httpClient.get<Trainer>(`${this.baseURL}/${id}`);
  }

  getTrainerByKey(key:string): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/findbykey/${key}`)
  }

  deleteTrainer(id:number):Observable<any>{
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`,{responseType:"text"});
  }

  imageBlobUrls: { [key: number]: Observable<string> } = {};

  getImage(id: number): Observable<string> {
    if (!this.imageBlobUrls[id]) {
      const apiUrl = `http://localhost:8088/trainers/img/${id}`;
      this.imageBlobUrls[id] = this.httpClient.get(apiUrl, { responseType: 'arraybuffer' }).pipe(
        map(response => URL.createObjectURL(new Blob([response], { type: 'image/jpg' })))
      );
    }
    return this.imageBlobUrls[id];
  }
  getImageFromImages(id: number): Observable<string> {
    if (!this.imageBlobUrls[id]) {
      const apiUrl = `http://localhost:8088/image/getImage/${id}`;
      this.imageBlobUrls[id] = this.httpClient.get(apiUrl, { responseType: 'arraybuffer' }).pipe(
        map(response => URL.createObjectURL(new Blob([response], { type: 'image/jpg' })))
      );
    }
    return this.imageBlobUrls[id];
  }
  
}
