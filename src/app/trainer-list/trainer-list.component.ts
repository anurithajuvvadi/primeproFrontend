import { Component, OnInit } from '@angular/core';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {

  trainers: Trainer[];
  constructor(private trainerService: TrainerService,
    private router:Router){}

  ngOnInit(): void {
    this.getTrainers();
  }
  private getTrainers(){
  this.trainerService.getTrainersList().subscribe(data => {
    this.trainers = data;
    console.log(data); 
  });
 
   
}

updateTrainer(id: number){
  console.log(`Navigating to 'update-trainer' with id: ${id}`);
  this.router.navigate(['trainers/update-trainer']);
}
}


