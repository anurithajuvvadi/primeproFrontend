import { Component } from '@angular/core';
import { Users } from '../interface/users';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent {

  user:Users;
  isAdmin:boolean;

  constructor( private sharedService:SharedService){
    this.user = this.sharedService.getUser();

    this.isAdmin = this.sharedService.getIsAdmin();
  }

}
