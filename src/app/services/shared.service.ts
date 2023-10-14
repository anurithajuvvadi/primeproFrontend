import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from'rxjs';
import { Users } from '../interface/users';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  user1:Users;

  private linkActive  :  BehaviorSubject<boolean>;
  public $linkActive : Observable<boolean>

  private user : BehaviorSubject<any>;
  public $user : Observable<any>;

  private isAdmin : BehaviorSubject<boolean>;
  public $isAdmin : Observable<boolean>;

  private isLogin : BehaviorSubject<boolean>;
  public $isLogin : Observable<boolean>;

  constructor() {
    this.linkActive = new BehaviorSubject<boolean>(false);
    this.$linkActive = this.linkActive.asObservable();

    this.user = new BehaviorSubject<any>(this.user1);
    this.$user = this.user.asObservable();

    this.isAdmin = new BehaviorSubject<boolean>(false);
    this.$isAdmin = this.isAdmin.asObservable();

    this.isLogin = new BehaviorSubject<boolean>(false);
    this.$isLogin = this.isLogin.asObservable();
   }

   getLinkActive(){
    return this.linkActive.value;
   }

   setLinkActive(value:boolean){
    this.linkActive.next(value);
   }

   getUser(){
    return this.user.value;
   }

   setUser(user:Users){
    this.user.next(user);
   }

   setIsAdmin(value:boolean){
    this.isAdmin.next(value);
   }

   getIsAdmin(){
    return this.isAdmin.value;
   }

   setIsLogin(value:boolean){
    this.isLogin.next(value);
   }

   getIsLogin(){
    return this.isLogin.value;
   }

}
