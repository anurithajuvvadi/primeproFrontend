import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { TrainersComponent } from './trainers/trainers.component';
import { ContactComponent } from './contact/contact.component';
import { TrainerListComponent } from './trainers/trainer-list/trainer-list.component';
import { CreateTrainerComponent } from './trainers/create-trainer/create-trainer.component';
import { AddcourseComponent } from './courses/addcourse/addcourse.component';
import { ViewcoursesComponent } from './courses/viewcourses/viewcourses.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';

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
    component:CoursesComponent,
    children:[
      {
        path:'add',
        component:AddcourseComponent
      },
      {
        path:'view',
        component:ViewcoursesComponent
      },
      
    ]
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
      }
    ]
  },
  {
    path:"auth",
    component:AuthenticationComponent,
    children:[
      {
        path:"register",
        component:RegistrationComponent
      },
      {
        path:"login",
        component:LoginComponent
      }
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
