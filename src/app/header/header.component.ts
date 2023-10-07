import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  setActiveLink(event){
    const  link = document.querySelectorAll(".nav-link");
    link.forEach(link=>link.classList.remove('active'));

    event.target.classList.add('active');
  }


  isExpanded: boolean = false;


  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }
  
}
