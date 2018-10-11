import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'stepScript',
  styleUrls: ['./step-script.component.scss'],
  templateUrl: './step-script.component.html',
})
export class CreateStepByScriptComponent {

    stepFormGroup: FormGroup;

constructor( private formBuilder: FormBuilder ) { }

ngOnInit() {

    
    this.stepFormGroup = this.formBuilder.group( {
        name: [''],
        script: [''],
        artifact: [''],
        author: [''],
        tags: [''],
        language: [''],
        architecture: [''],
        capabilities: [''],
        type: [''],
        device: ['']
    } );
}
}
