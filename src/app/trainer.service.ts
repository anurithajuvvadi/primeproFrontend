import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainer } from './trainer';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private baseURL = 'http://localhost:8088/trainers';

  constructor(private httpClient: HttpClient) {}
  getTrainersList(): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(`${this.baseURL}`);
  }
  addTrainer(trainer: Trainer): Observable<any> {
    return this.httpClient.post(`${this.baseURL}`, trainer, {
      headers: { 'Content-Type': 'application/json' },
      responseType:"text"
    });
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
}
