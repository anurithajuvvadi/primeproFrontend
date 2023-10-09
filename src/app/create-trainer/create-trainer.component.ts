import { Component, OnInit } from '@angular/core';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css'],
})
export class CreateTrainerComponent implements OnInit {
  trainer: any;
  isEditMode!:boolean;
   selectedImage:any;
  file : File;
  requestedId:number;
  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr : ToastrService
  ) {
    this.route.queryParams.subscribe((param) => {
      this.requestedId = param['id'];
      if(this.requestedId){
        console.log(true)
        this.trainerService.getTrainerById(param['id']).subscribe({
          next:(data)=>{
            this.isEditMode=true;
            this.trainer = data;
             this.getImage(this.requestedId).subscribe((data)=>{
              this.selectedImage = data;
            });
          },
          error:(error:HttpErrorResponse)=>{
            console.log(error);
          }
        })
      }else{
        console.log(false)
        this.isEditMode=false
        this.trainer=new Trainer();
      }
    });
  }
  ngOnInit(): void {
    
  }

  saveTrainer(formData) {
    console.log(this.isEditMode)
    if(!this.isEditMode){
      this.trainerService.addTrainer(formData).subscribe({
        next: (data) => {
          this.toastr.success("Data Created")
          this.goToTrainerList();
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
    if(this.isEditMode){
      this.trainerService.updateTrainer(this.requestedId,formData).subscribe({
        next:(data)=>{
          this.toastr.success("Data updated")
          this.goToTrainerList();
          console.log(data)
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  goToTrainerList() {
    this.router.navigate(['/trainers/trainerlist']);
  }

  images(event:any){
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    }
    reader.readAsDataURL(this.file)
  }

  onSubmit() {
    const trainer:Trainer = {
      firstname: this.trainer.firstname,
      lastname: this.trainer.lastname,
      emailid: this.trainer.emailid,
      designation: this.trainer.designation,
      qualification: this.trainer.qualification,
      id: this.trainer.id
    };
  
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('trainer', JSON.stringify(trainer));
    this.saveTrainer(formData);
  }

  getImage(id:number):Observable<string>{
    return this.trainerService.getImage(id);
  }
}
