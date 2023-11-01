import { Component, ElementRef } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isToggle: boolean = false;
  isLogin: boolean;

  constructor(
    private _ss: SharedService,
    private _authS:AuthService,
    private el: ElementRef,
    private router: Router
  ) {
    // this.isLogin = this._ss.getIsLogin();
    this._ss.$isLogin.subscribe({
      next: (data) => {
        this.isLogin = data;
      },
    });
  }

  setActiveLink(event) {
    const link = document.querySelectorAll('.nav-link');
    link.forEach((link) => link.classList.remove('active'));
    // const links = document.querySelectorAll(".nav-link .nav-tabs");
    // links.forEach(link=>link.classList.remove("active"))
    event.target.classList.add('active');
    this._ss.setLinkActive(false);
  }

  toggleClose(event: any) {
    const element = document.querySelectorAll('.close');
    if (this.isToggle) event.target.classList.add('active');//button is not visible here 
    if (!this.isToggle) event.target.classList.remove('active');//button is seen here 
    this.isToggle = !this.isToggle;//button is seen now 

    const linksElement = document.querySelectorAll('.links')[0];
    console.log(linksElement);//printing links by default on button visible 
    if (linksElement) {
      if (this.isToggle) {//button clicked after displaying links initially 
        linksElement.classList.add('hidden');//lnks are hidden now 
      } else {
        linksElement.classList.remove('hidden');//links are visible now 
      }
    }
  }

  logout() {
    this._ss.setIsLogin(false);
    this._ss.setIsAdmin(false);
    this._ss.setUser(null);
    this._ss.setToken(null);
    this._authS.deleteToken().subscribe({
      next:(data)=>{
        console.log("loggedout")
      }
    });
  }
}
