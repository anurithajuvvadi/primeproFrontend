import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./addcourse.component.css'],
})
export class AddcourseComponent {
  image: string;

  selectedCourse: any;
  selectedValue: string;
  course: Course[];
  file: File;
  courses: FormGroup;
  imageForm: FormGroup;
  id: number;
  isEditMode: boolean = false;
  isImageSelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _cs: CourseService,
    private _is: ImageService,
    private _toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isEditMode=false;
    this.courses = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(1000)]],
    });

    // this.imageForm= this.fb.group({
    //   id:['',Validators.required],
    //   img:['',Validators.required]
    // })

    this.route.queryParams.subscribe({
      next: (data) => {
        this.id = data['id'];
        if (this.id != null) {
          this.isEditMode = true;
          this._cs.getCourseById(this.id).subscribe({
            next: (data) => {
              this.selectedCourse = data;
              // this._cs.getImageFromImages(this.id).subscribe({
              //   next:(data)=>{
              //     this.image= data;
              //   }
              // })
              this.courses = this.fb.group({
                name: [this.selectedCourse.name, [Validators.required]],
                duration: [this.selectedCourse.duration, [Validators.required]],
                price: [this.selectedCourse.price, [Validators.required]],
              });
            },
          });
        }
      },
    });

    this.getAllCourses();
  }

  onSelectImage(event: any) {
    this.isImageSelected = true;
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  // addImage(){
  //   console.log(this.imageForm.value)
  //   const formData = new FormData();
  //   formData.append('file',this.file,this.file.name);
  //   formData.append('courseId',this.imageForm.value.id)
  //   this._is.addImage(formData).subscribe({
  //     next:(data)=>{
  //       this._toastr.success(`Image added successfully`)
  //       this.router.navigate(['/courses/view'])
  //     },
  //     error:(err)=>{
  //       console.log(err)
  //     }
  //   });
  // }

  addCourse() {
    const courseData: Course = {
      name: this.courses.value.name,
      duration: this.courses.value.duration,
      price: this.courses.value.price,
    };
    const formData = new FormData();
    if (this.isImageSelected)
      formData.append('file', this.file, this.file.name);
    if (!this.isImageSelected)
      formData.append('file', new Blob(),'');
    formData.append('data', JSON.stringify(courseData));
    if (!this.isEditMode) {
      this._cs.addCourse(formData).subscribe({
        next: (data) => {
          this.router.navigate(['courses/view'])
          this._toastr.success('Course Add Successfully');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    if(this.isEditMode){
      this._cs.updateCourse(formData,this.id).subscribe({
        next: (data) => {
          this.router.navigate(['courses/view'])
          this._toastr.success('Course Updated Successfully');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getAllCourses() {
    this._cs.getCourses().subscribe({
      next: (data) => {
        this.course = data;
      },
    });
  }
}
