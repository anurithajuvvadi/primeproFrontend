import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  userForm:FormGroup

  constructor(private _fb : FormBuilder, 
    private _auth:AuthService, 
    private _us : UserService, 
    private _toastr:ToastrService,
    private _router:Router){
    this.userForm = this._fb.group({
      email:['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )]],
      password:['',[Validators.required,Validators.minLength(4)]],
      roles:['',Validators.required]
    })
  }

  register(){
    this._auth.register(this.userForm.value).subscribe({
      next:(data)=>{
        this._toastr.success("Registerd Successfully")
        this._router.navigate(['/auth/login'])
      }
    })
    // this.getUserByEmail(this.userForm.value.email)
  }

  getUserByEmail(email:string){
    this._us.getUserByEmail(email).subscribe({
      next:(data)=>{
        console.log(data);
      }
    })
  }
  getdata(event:any){
    const email = event.target.value;
    this.getUserByEmail(email);
  }
}
