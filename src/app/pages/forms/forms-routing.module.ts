import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageUploadComponent, ImageModule } from './image-upload';
import { FormsComponent } from './forms.component';
import { PipelineModule } from './pipeline/pipeline.module';
import { CreateStepByImageComponent } from './step/create-step-by-image/create-step-by-image.component';
import { CreateStepByScriptComponent } from './step-script/step-script.component';
import { PipelineComponent } from './pipeline/pipeline-component/pipeline.component';
import { DeviceComponent } from './device/device.component';
import { DeployCapDeviceComponent } from './capability/deploy-cap-device/deploy-cap-device.component';
import { CapabilityModule } from './capability/capability.module';
import { CreateStepModule } from './step/create-step.module';
import { NifiComponent } from './nifi/nifi.component';
import { DeviceModule } from './device/device.module';
import { ModalComponent } from './device/modal/modal.component';
import { UpdateDeviceModalComponent } from './device/update/update-device.component';

const routes: Routes = [{
    path: '',
    component: FormsComponent,
    children: [{
        path: 'image-upload',
        component: ImageUploadComponent,
    },
    {
        path: 'pipeline',
        component: PipelineComponent,
    }, {
        path: 'step',
        component: CreateStepByImageComponent,
    }, {
        path: 'stepScript',
        component: CreateStepByScriptComponent,
    }, {
        path: 'device',
        component: DeviceComponent,
    }, {
        path: 'nifi',
        component: NifiComponent,
    }, {
        path: 'capability',
        component: DeployCapDeviceComponent,
    }],
}];

@NgModule( {
    imports: [
        RouterModule.forChild( routes ),
        ImageModule,
        PipelineModule,
        CapabilityModule,
        CreateStepModule,
        DeviceModule,
    ],
    exports: [
        RouterModule,
    ],
} )
export class FormsRoutingModule {

}

export const routedComponents = [
    FormsComponent,
    ImageUploadComponent,
    DeviceComponent,
    ModalComponent,
    UpdateDeviceModalComponent,
    PipelineComponent,
    DeployCapDeviceComponent,
    NifiComponent,
    CreateStepByScriptComponent,
    CreateStepByImageComponent,
];
