import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'primepro';
  token:string;



  constructor(private _authS:AuthService, private _ss:SharedService, private _us:UserService){
    // this.checkIsToken();

  }



  // checkIsToken() {
  //   this._authS.isToken().subscribe({
  //     next: (data) => {
  //       this.token = data;
  //       console.log(data);
  //       // this._ss.setToken(data);
  //       // if(data!="null" && this._ss.getToken()!=null){
  //       //   this._us.getUserByToken(data).subscribe({
  //       //     next:(data)=>{
  //       //       console.log(data)
  //       //       this._ss.checkRole(data);
  //       //       this._ss.setIsLogin(true)
  //       //     }
  //       //   })
  //       // }
  //     },
  //   });
  // }
}
