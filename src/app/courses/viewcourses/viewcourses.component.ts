import { Component , Input} from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interface/course';
import { CourseService } from 'src/app/services/course.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-viewcourses',
  templateUrl: './viewcourses.component.html',
  styleUrls: ['./viewcourses.component.css']
})
export class ViewcoursesComponent {

  emptyprofile:string = "\assets\emptyprofile.jpg"
  course:any;

  constructor(private _cs : CourseService, private _ts:TrainerService){
    this._cs.getCourses().subscribe((res)=>{
      console.log(res)
      this.course = res;
    });
  }

  @Input()  isAdmin:boolean=true;

  getImage(id: number): Observable<string> {
    return this._ts.getImageFromImages(id);
  }












}
