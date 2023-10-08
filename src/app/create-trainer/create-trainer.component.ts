import { Component, OnInit } from '@angular/core';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css'],
})
export class CreateTrainerComponent implements OnInit {
  trainer: Trainer = new Trainer();
  isEditMode:boolean;
  selectedImage:any;
  file : File;
  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      if(param['id']){
        this.trainerService.getTrainerById(param['id']).subscribe({
          next:(data)=>{
            this.isEditMode=true;
            this.trainer = data;
          },
          error:(error:HttpErrorResponse)=>{
            console.log(error);
          }
        })
      }
      if(!param['id']){
        this.isEditMode=false
        this.trainer=new Trainer();
      }
    });
  }

  saveTrainer(formData) {
    this.trainerService.addTrainer(formData).subscribe({
      next: (data) => {
        this.goToTrainerList();
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateTrainer(formData){
    this.trainerService.updateTrainer(formData).subscribe({
      next: (data) => {
        this.goToTrainerList();
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  goToTrainerList() {
    this.router.navigate(['/trainers/trainerlist']);
  }

  images(event:any){
    this.isEditMode = false
    this.file = (event.target as HTMLInputElement).files[0];
    // const file = (event.target as HTMLInputElement).files[0];
    // this.selectedImage = this.file;
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    }
    reader.readAsDataURL(this.file)
  }

  onSubmit() {
    console.log(this.trainer);
    console.log(this.file)
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('trainer', JSON.stringify(this.trainer));
    this.saveTrainer(formData);
  }

  getImage(id:number):Observable<string>{
    return this.trainerService.getImage(id);
  }
}
