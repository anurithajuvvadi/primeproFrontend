import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/interface/course';
import { CourseService } from 'src/app/services/course.service';
import { ImageService } from 'src/app/services/image.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent {
  image:string;

  selectedValue: string;
  course:Course[];
  file:File;
  courses:FormGroup;
  imageForm:FormGroup;


  constructor(private fb:FormBuilder,
    private _cs:CourseService,
    private _is:ImageService,
    private _toastr:ToastrService,
    private router:Router){

    this.courses = this.fb.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      duration:['',[Validators.required, Validators.minLength(2)]],
      price:['',[Validators.required,Validators.min(1000)]]
    })

    this.imageForm= this.fb.group({
      id:['',Validators.required],
      img:['',Validators.required]
    })  

    this.getAllCourses();
  }

  onSelectImage(event:any){
     this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = ()=>{
     this.image = reader.result as string;
    }
    reader.readAsDataURL(this.file);
  }

  addImage(){
    console.log(this.imageForm.value)
    const formData = new FormData();
    formData.append('file',this.file,this.file.name);
    formData.append('courseId',this.imageForm.value.id)
    this._is.addImage(formData).subscribe({
      next:(data)=>{
        this._toastr.success(`Image added successfully`)
        this.router.navigate(['/courses/view'])
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }

  addCourse(){
    // console.log(this.courses.value);
    this._cs.addCourse(this.courses.value).subscribe({
      next:(data)=>{
        this._toastr.success("Course Add Successfully")
        this.getAllCourses();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getAllCourses(){
    this._cs.getCourses().subscribe({
      next:(data)=>{
        this.course = data;
      }
    })
  }
}
