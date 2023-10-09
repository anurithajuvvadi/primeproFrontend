import { Component, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  
   public $linkActive : boolean; 
  constructor(private el : ElementRef, private sharedService:SharedService){
    this.$linkActive = this.sharedService.getLinkActive();
  }
  ngOnInit(){
    this.$linkActive = this.sharedService.getLinkActive();
  console.log(this.$linkActive)

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
