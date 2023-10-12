import { Component, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { Users } from '../interface/users';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  user:Users;
  isAdmin:boolean;
   public $linkActive : boolean; 
  constructor(private el : ElementRef, private sharedService:SharedService){
    this.$linkActive = this.sharedService.getLinkActive();
    this.isAdmin = this.sharedService.getIsAdmin();
  }
  ngOnInit(){
    this.$linkActive = this.sharedService.getLinkActive();
  console.log(this.$linkActive)

  this.user = this.sharedService.getUser();
}

  onClick(event:any){
    const elements = document.querySelectorAll(".nav-tabs .nav-link");
     elements.forEach((x)=>{
      x.classList.remove("active");
    })
    event.target.classList.add("active");
    this.$linkActive = true;
  }
}
