import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateStepService } from '../step/service/create-step.service';
import { CreateStepByScriptComponent } from './step-script.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
   // BrowserAnimationsModule
  ],
  declarations: [CreateStepByScriptComponent],
  exports: [CreateStepByScriptComponent],
  providers: [CreateStepService]
})
export class CreateStepScriptModule { }
