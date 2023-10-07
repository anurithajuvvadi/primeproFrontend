import { Component, OnInit } from '@angular/core';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css'],
})
export class CreateTrainerComponent implements OnInit {
  trainer: Trainer = new Trainer();
  isEditMode:boolean;
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

  saveTrainer() {
    this.trainerService.addTrainer(this.trainer).subscribe({
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
  onSubmit() {
    console.log(this.trainer);
    this.saveTrainer();
  }
}
