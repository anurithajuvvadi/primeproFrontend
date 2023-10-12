import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Trainer } from '../../trainer';
import { TrainerService } from '../../services/trainer.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoComponent } from '../../info/info.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css'],
})
export class TrainerListComponent implements OnInit {
  trainers: Trainer[];
  msg: string;
  isTrainers: boolean;
  isAdmin:boolean;
  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private dialog: MatDialog,private renderer: Renderer2, private el: ElementRef, private _ss : SharedService
  ) {
      this.isAdmin = this._ss.getIsAdmin();
  }

  ngOnInit(): void {
    this.getTrainers();
  }
  getTrainers() {
    this.trainerService.getTrainersList().subscribe((data: any) => {
      this.trainers = data;
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

  openDialog(
    data:any,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {

    this.dialog.open(InfoComponent, {
      data: data,
      // width: '700px',
      // height:'500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });


  }
}
