import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPageRoutingModule,
    ReactiveFormsModule,
    GooglePlaceModule
  ],
  declarations: [RegistrarPage]
})
export class RegistrarPageModule {}
