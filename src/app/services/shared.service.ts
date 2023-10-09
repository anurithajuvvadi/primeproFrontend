import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private linkActive  :  BehaviorSubject<boolean>;
  public $linkActive : Observable<boolean>
  constructor() {
    this.linkActive = new BehaviorSubject<boolean>(false);
    this.$linkActive = this.linkActive.asObservable();
   }

   getLinkActive(){
    return this.linkActive.value;
   }

   setLinkActive(value:boolean){
    this.linkActive.next(value);
   }
}
