import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageUploadService } from '../../image-upload/service/image-upload.service';
import { CapabilityService } from '../service/capability.service';
import { CapabilityModel } from '../../image-upload/model/capability-model';
import { Device } from '../../image-upload/model/device-model';

@Component( {
    selector: 'deploy-cap-device',
    styleUrls: ['./deploy-cap-device.component.scss'],
    templateUrl: './deploy-cap-device.component.html',
} )

export class DeployCapDeviceComponent implements OnInit {
    deployCapDeviceForm: FormGroup;
    capDropdownList: CapabilityModel[];
    DdefDropdownList: Device[];
    capDropdownSettings = {};
    DdefDropdownSettings = {};
    submitted = false;
    selectedCap: number;
    selectedDev: number;

    constructor( private formBuilder: FormBuilder, private imageUploadService: ImageUploadService,
      private capabilityService: CapabilityService) { }

    ngOnInit() {
        this.deployCapDeviceForm = this.formBuilder.group({
          capability: ['', Validators.required],
          deviceDef: ['', Validators.required],
        });

        this.capDropdownSettings = {
          singleSelection: true,
          idField: 'id',
          textField: 'name',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: true,
        };

        this.DdefDropdownSettings = {
          singleSelection: true,
          idField: 'id',
          textField: 'name',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: true,
        };

        this.imageUploadService.getAllCapabilities()
          .subscribe((data: CapabilityModel[]) => {
            this.capDropdownList = data;
          },
          err => {
              throw err;
        });

        this.capabilityService.getAllDeviceDef()
          .subscribe((data: Device[]) => {
            this.DdefDropdownList = data;
          },
          err => {
              throw err;
        });
    }

  onItemSelect(item: any) {
  }
  // To deploy capability to device.
  onDeployCap() {
    this.submitted = true;
    this.deployCapDeviceForm.value['capability'].forEach((item, index) => {
        this.selectedCap = item.id;
    });
    this.deployCapDeviceForm.value['deviceDef'].forEach((item, index) => {
        this.selectedDev = item.id;
    });

    this.capabilityService.onDeployCapDevice(this.selectedCap, this.selectedDev);
  }
}
