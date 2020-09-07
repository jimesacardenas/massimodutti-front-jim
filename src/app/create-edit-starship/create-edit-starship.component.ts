import { Component, OnInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { StarShipsService, IStarShips } from '@app/home/star-ships.service';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilDestroyed } from '@app/@core';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-create-edit-starship',
  templateUrl: './create-edit-starship.component.html',
  styleUrls: ['./create-edit-starship.component.scss']
})
export class CreateEditStarshipComponent implements OnInit, OnDestroy {
  createEditForm!: FormGroup;
  files: File[] = [];
  id = '';
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateEditStarshipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { starShip: IStarShips },
    private starShipsService: StarShipsService,
  ) {
  }

  ngOnInit(): void {
    this.createForm(this.data.starShip);
  }

  ngOnDestroy() {  }

  excAction() {
    if (this.createEditForm.valid) {
      const reader = new FileReader();

      if (this.files.length > 0){
        reader.readAsDataURL(this.files[0]);

        reader.onloadend = () => {
          this.createEditForm.get('url').setValue(reader.result);
          this.runAcction();
        }
      } else {
        const url = `https://starwars-visualguide.com/assets/img/starships/${Guid.create()}.jpg`
        this.createEditForm.get('url').setValue(url);
        this.runAcction();
      }

    } else {
      Object.keys(this.createEditForm.controls).forEach(field => {
        const control = this.createEditForm.get(field);
        control.markAsTouched();
      });
    }

  }

  onSelect(event: any) {
    this.files = [];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  private runAcction() {
    if (this.id === '') {
      this.starShipsService.create(this.createEditForm.value)
      .pipe(untilDestroyed(this))
        .subscribe((resp: any) => {
          this.dialogRef.close(resp);
        });
    } else {
      this.starShipsService.update(this.id, this.createEditForm.value)
      .pipe(untilDestroyed(this))
      .subscribe((resp: any) => {
        this.dialogRef.close(resp);
      });
    }
  }

  private createForm(starship: IStarShips = {}) {

    if (Object.keys(starship).length !== 0){
      this.id = starship.url;
    }

    if (starship.url && starship.url !== '') {
      fetch(starship.url, { mode: 'cors' })
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'dot.png', { type: 'image/png' });
          this.files = [];
          this.files.push(file);
        });
    }
    this.createEditForm = this.formBuilder.group({
      url: [starship.url,],
      name: [starship.name, Validators.required],
      manufacturer: [starship.manufacturer, Validators.required],
      model: [starship.model, Validators.required],
      starship_class: [starship.starship_class, Validators.required],
      max_atmosphering_speed: [starship.starship_class, Validators.required],
      length: [starship.length, Validators.required],
    });
  }
}
