import { Component, ElementRef } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

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
    if (this.isToggle) event.target.classList.add('active');
    if (!this.isToggle) event.target.classList.remove('active');
    this.isToggle = !this.isToggle;

    const linksElement = document.querySelectorAll('.links')[0];
    console.log(linksElement);
    if (linksElement) {
      if (this.isToggle) {
        linksElement.classList.add('hidden');
      } else {
        linksElement.classList.remove('hidden');
      }
    }
  }

  logout() {
    this._ss.setIsLogin(false);
    this._ss.setIsAdmin(false);
    this._ss.setUser(null);

  }
}
