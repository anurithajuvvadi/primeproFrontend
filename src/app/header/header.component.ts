import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private _ss:SharedService){

}

  setActiveLink(event){
    const  link = document.querySelectorAll(".nav-link");
    link.forEach(link=>link.classList.remove('active'));
    // const links = document.querySelectorAll(".nav-link .nav-tabs");
    // links.forEach(link=>link.classList.remove("active"))
    event.target.classList.add('active');
    this._ss.setLinkActive(false)
  }


  isExpanded: boolean = false;


  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }
  
}
