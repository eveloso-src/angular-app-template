import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component( {
    selector: 'ngx-form-inputs',
    styleUrls: ['./pipeline.component.scss'],
    templateUrl: './pipeline.component.html',
} )
export class PipelineComponent {

    pipelineFormGroup: FormGroup;

    constructor( private formBuilder: FormBuilder ) { }

    ngOnInit() {


        this.pipelineFormGroup = this.formBuilder.group( {
            name: [''],
            description: [''],
            project: [''],
            note: [''],
            step: [''],
            success: [''],
            failure: [''],
            author: ['']
        } );
    }
}
