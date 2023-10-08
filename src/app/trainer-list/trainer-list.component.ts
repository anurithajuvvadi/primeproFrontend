import { Component, OnInit } from '@angular/core';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css'],
})
export class TrainerListComponent implements OnInit {
  trainers: Trainer[];
  msg: string;
  isTrainers: boolean;
  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private toastr: ToastrService,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.getTrainers();
  }
  getTrainers() {
    this.trainerService.getTrainersList().subscribe((data:any) => {
      this.trainers = data;
      console.log(typeof(data[0].img));
      if (this.trainers.length > 0) this.isTrainers = true;
      if (this.trainers.length <= 0) this.isTrainers = false;
    });
  }

  // updateTrainer(id: number){
  //   console.log(`Navigating to 'update-trainer' with id: ${id}`);
  //   this.router.navigate([`trainers/create-trainer/${id}`],);
  // }

  delete(id: number) {
    console.log('trainer delete');
    this.trainerService.deleteTrainer(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getTrainers();
        this.toastr.success('deleted');
      },
      error: (error) => {
        console.log(error);
        // this.toastr.warning(error.error);
      },
    });
  }

  findByKey(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 0) {
      this.trainerService.getTrainerByKey(value).subscribe({
        next: (data) => {
          if (data.length < 1) {
            this.msg = 'No Data Found';
            this.isTrainers = false;
          }
          if (data.length > 0) {
            this.trainers = data;
            this.isTrainers = true;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.msg = 'No Data Found';
        },
      });
    } else {
      this.getTrainers();
    }
  }

  getImage(id: number): Observable<string> {
   return this.trainerService.getImage(id);  
  }

}
