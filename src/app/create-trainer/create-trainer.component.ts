import { Component, OnInit } from '@angular/core';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css'],
})
export class CreateTrainerComponent implements OnInit {
  trainer: Trainer = new Trainer();
  constructor(private trainerService: TrainerService, private router: Router) {}
  ngOnInit(): void {}

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
    this.router.navigate(['/trainers']);
  }
  onSubmit() {
    console.log(this.trainer);
    this.saveTrainer();
  }
}
