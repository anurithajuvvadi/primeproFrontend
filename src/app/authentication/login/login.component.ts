import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/interface/users';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: Users;

  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _us: UserService,
    private _ss: SharedService,
    private router: Router
  ) {
    this.loginForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.user = this._ss.getUser();
  }

  onLogin() {
    // const formData = new FormData();
    // formData.append('email', this.loginForm.value.email);
    // formData.append('password', this.loginForm.value.password);
    this._auth.login(this.loginForm.value).subscribe({
      next: (data) => {
        this._ss.setUser(data);
        console.log(data.role);
        if (data) {
          this.checkRole(data);
        }
        this._ss.setIsLogin(true);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 302) {
          this.router.navigate(['/']);
        }

        console.log(err);
      },
    });

    // this._auth.login(this.loginForm.value).subscribe({
    //   next:(data)=>{
    //     this._ss.setUser(data);
    //     console.log(data.role)
    //     if(data){
    //       this.checkRole(data);
    //     }
    //     this._ss.setIsLogin(true);
    //     this.router.navigate(['/'])
    //   },
    //   error:(err:HttpErrorResponse)=>{
    //     if(err.status==302){
    //         this.router.navigate(['/'])

    //       }

    //     console.log(err);
    //   }
    // })
  }

  checkRole(data) {
    const user = data;
    if (user.role == 'ROLE_ADMIN') {
      this._ss.setIsAdmin(true);
    }
    if (user.role == 'ROLE_USER') {
      this._ss.setIsAdmin(false);
    }
  }
}
