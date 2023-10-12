import { Component, OnInit, Input } from '@angular/core';
import { Trainer } from '../../trainer';
import { TrainerService } from '../../services/trainer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-trainer',
  templateUrl: './create-trainer.component.html',
  styleUrls: ['./create-trainer.component.css'],
})
export class CreateTrainerComponent implements OnInit {
  trainer: Trainer = new Trainer();
  isEditMode!: boolean;
  selectedImage: any;
  file: File;
  requestedId: number;
  isImageChange: boolean;
  constructor(
    private trainerService: TrainerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.queryParams.subscribe((param) => {
      this.isImageChange = false;
      this.requestedId = param['id'];
      if (this.requestedId) {
        this.trainerService.getTrainerById(param['id']).subscribe({
          next: (data) => {
            this.isEditMode = true;
            this.trainer = data;
            this.getImage(this.requestedId).subscribe((data) => {
              this.selectedImage = data;
            });
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
      } else {
        this.isEditMode = false;
        this.selectedImage = null;
        this.trainer = new Trainer();
      }
    });
  }
  ngOnInit(): void {}

  @Input() user: any;

  saveTrainer(formData) {
    if (!this.isEditMode) {
      this.trainerService.addTrainer(formData).subscribe({
        next: (data) => {
          this.toastr.success('Data Created');
          this.goToTrainerList();
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
    if (this.isEditMode) {
      this.trainerService.updateTrainer(this.requestedId, formData).subscribe({
        next: (data) => {
          this.toastr.success('Data updated');
          this.goToTrainerList();
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  goToTrainerList() {
    this.router.navigate(['/trainers/trainerlist']);
  }

  images(event: any) {
    this.isImageChange = true;
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  onSubmit() {
    const trainer: Trainer = {
      firstname: this.trainer.firstname,
      lastname: this.trainer.lastname,
      emailid: this.trainer.emailid,
      designation: this.trainer.designation,
      qualification: this.trainer.qualification,
      id: this.trainer.id,
    };

    const formData = new FormData();
    if (this.isImageChange) {
      formData.append('file', this.file, this.file.name);
      console.log(this.isImageChange);
    }
    if (!this.isImageChange) {
      formData.append('file', new Blob(), '');
      console.log(this.isImageChange)
    }
    formData.append('trainer', JSON.stringify(trainer));
    this.saveTrainer(formData);
  }

  getImage(id: number): Observable<string> {
    return this.trainerService.getImage(id);
  }
}
