import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { TrainersComponent } from './trainers/trainers.component';
import { ContactComponent } from './contact/contact.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { CreateTrainerComponent } from './create-trainer/create-trainer.component';
import { UpdateTrainerComponent } from './update-trainer/update-trainer.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'aboutus',
    component:AboutusComponent
  },
  {
    path:'contact',
    component:ContactComponent

  },
  {
    path:'courses',
    component:CoursesComponent
  },
  {
    path:'trainers',
    component:TrainersComponent,
    children: [
      {
      path:  'trainerlist',
      component: TrainerListComponent  
      },
      {
        path:'create-trainer',
        component:CreateTrainerComponent
      },
      {
        path:'update-trainer',
        component:UpdateTrainerComponent
      }

    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
