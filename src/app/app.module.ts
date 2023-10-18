import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { TrainersComponent } from './trainers/trainers.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { TrainerListComponent } from './trainers/trainer-list/trainer-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateTrainerComponent } from './trainers/create-trainer/create-trainer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { InfoComponent } from './info/info.component'

import {MatDialogModule} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { ViewcoursesComponent } from './courses/viewcourses/viewcourses.component';
import { AddcourseComponent } from './courses/addcourse/addcourse.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CustomInterceptor } from './custom.interceptor';

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
    InfoComponent,
    ViewcoursesComponent,
    AddcourseComponent,
    LoginComponent,
    RegistrationComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [{

    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
