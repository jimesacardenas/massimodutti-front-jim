import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StarShipsService } from './star-ships.service';
import { CreateEditStarshipComponent } from '../create-edit-starship/create-edit-starship.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DeleteStarshipComponent } from '../delete-starship/delete-starship.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule 
  ],
  declarations: [HomeComponent, CreateEditStarshipComponent, DeleteStarshipComponent],
})
export class HomeModule { }
