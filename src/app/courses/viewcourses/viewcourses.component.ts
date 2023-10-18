import { Component , Input} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interface/course';
import { CourseService } from 'src/app/services/course.service';
import { SharedService } from 'src/app/services/shared.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-viewcourses',
  templateUrl: './viewcourses.component.html',
  styleUrls: ['./viewcourses.component.css']
})
export class ViewcoursesComponent {

  isAdmin:boolean;
  emptyprofile:string = "\assets\emptyprofile.jpg"
  course:any;

  constructor(private _cs : CourseService, private _ts:TrainerService,
     private _toastr: ToastrService,private _ss:SharedService){
    this.isAdmin= this._ss.getIsAdmin();
    this.getAllCourses();
  }


  getImage(id: number): Observable<string> {
    return this._cs.getImageFromImages(id);
  }


  delete(id:number){
    this._cs.deleteCourse(id).subscribe({
      next:(data)=>{
        this.getAllCourses();
        this._toastr.success("Course Deleted")
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

    getAllCourses(){
      this._cs.getCourses().subscribe({
        next:(data)=>{
          this.course = data;
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }









}
