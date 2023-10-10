import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';

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

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  courses:FormGroup;


  constructor(private fb:FormBuilder,private _cs:CourseService){

    this.courses = this.fb.group({
      name:['',Validators.required],
      duration:['',Validators.required],
      price:['',Validators.required]
    })

    this._cs.home().subscribe((res)=>{
      console.log(res)
    });
  }

  onSelect(event:any){
    const file:File = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = ()=>{
     this.image = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  addImage(){

  }

  addCourse(){
    console.log(this.courses.value);
    this._cs.addCourse(this.courses.value)
  }
}
