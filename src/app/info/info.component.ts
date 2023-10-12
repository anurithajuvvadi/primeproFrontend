import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Trainer } from '../trainer';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  trainer:Trainer;
  image:any;
  constructor(private dialogRef:MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private trainerService : TrainerService
    ){
    this.trainerService.getTrainerById(data).subscribe({
      next:(res)=>{
        this.trainer = res
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.trainerService.getImage(data).subscribe({
      next:(res)=>{
        this.image =res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    // console.log(data);
  }

  close(){
    this.dialogRef.close();
  }
}
