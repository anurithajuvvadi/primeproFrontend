import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { TrainersComponent } from './trainers/trainers.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateTrainerComponent } from './create-trainer/create-trainer.component';
import { FormsModule } from '@angular/forms';
import { UpdateTrainerComponent } from './update-trainer/update-trainer.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    TrainersComponent,
    AboutusComponent,
    ContactComponent,
    TrainerListComponent,
    HeaderComponent,
    FooterComponent,
    CreateTrainerComponent,
    UpdateTrainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
