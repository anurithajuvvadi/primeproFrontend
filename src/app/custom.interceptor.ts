import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { SharedService } from './services/shared.service';
import { AuthService } from './services/auth.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
isToken:string;
private tokenChecked:boolean;
  constructor(private _ss : SharedService,private _authS:AuthService) {
   

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (!this.tokenChecked) {
    //   this.tokenChecked = true;
    //   this._authS.isToken().subscribe({
    //     next: (data) => {
    //       if(data!="null")
    //       this._ss.setToken(data)
    //       if(data=="null"){
    //         this._ss.setToken(null);
    //       }
    //       this.tokenChecked=false
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.tokenChecked=false
    //     }
    //   });
    // }
          if(this._ss.getToken()!=null){
            request = request.clone({
              setHeaders:{
                Authorization: `Bearer ${this._ss.getToken()}`
              }
            })
          }
          return next.handle(request).pipe(
            catchError((error,caught) => {
              if (error.status ===403){
                localStorage.clear();
              }else{
                console.log(error)
              }
              throw error;
            })
          );
        }
      }
      