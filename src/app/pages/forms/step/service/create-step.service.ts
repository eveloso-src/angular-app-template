import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StepModel } from '../model/step-model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class CreateStepService {

    constructor(private http: HttpClient, private ngxService: NgxUiLoaderService, private toastr: ToastrService) { }

    // Service to create a Step
    createStepByImage(stepModel: StepModel) {
        let capabilityList = '';
        capabilityList = stepModel.capabilities.toString();

        let device = '';
        if (stepModel.device_id !== null && stepModel.device_id !== undefined) {
            device = stepModel.device_id.toString();
        }

        let tagsList = '';
        if (stepModel.tags !== null && stepModel.tags !== undefined) {
            tagsList = stepModel.tags.toString();
        }

        const formData = new FormData();
        formData.append('name', stepModel.name);
        formData.append('type', stepModel.type);
        formData.append('author', stepModel.author);
        formData.append('capabilities', capabilityList);
        formData.append('image_name', stepModel.image_name);
        formData.append('image_tag', stepModel.image_tag);
        formData.append('device_id', device);
        formData.append('language', stepModel.language);
        formData.append('architecture', stepModel.architecture);
        formData.append('tags', tagsList);
        formData.append('args', stepModel.argsJSON);

        this.ngxService.start();
        this.http.post(`${environment.mmUrl}/steps`, formData)
        .subscribe(data => {
            this.ngxService.stop();
            this.toastr.success('Step ' + stepModel.name + ' created successfully');
        },
            err => {
                this.ngxService.stop();
                throw err;
            },
        );
    }
}
