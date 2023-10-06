import { Component } from '@angular/core';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-trainer',
  templateUrl: './update-trainer.component.html',
  styleUrls: ['./update-trainer.component.css']
})
export class UpdateTrainerComponent {
  id:number;
  trainer: Trainer = new Trainer();
  constructor(private trainerService: TrainerService,
    private route:ActivatedRoute){}

    ngOnInit():void{
      this.id=this.route.snapshot.params['id'];

       this.trainerService.getTrainerById(this.id).subscribe(data =>{
        this.trainer = data;
       }, error => console.log(error));
       }
       onSubmit(){
        console.log(this.trainer);
        //this.saveTrainer();
    
      }
        
    }

  


