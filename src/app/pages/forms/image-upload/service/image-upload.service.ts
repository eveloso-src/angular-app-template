import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ImageUploadModel } from '../model/image-upload-model';
import { CapabilityModel } from '../model/capability-model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import { Device } from '../model/device-model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class ImageUploadService {
    selectedFile: File = null;
    private subject = new Subject<any>();
    constructor(private http: HttpClient, private ngxService: NgxUiLoaderService) { }
    registryId :number;
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }
    
    getAllImages() {
        return this
            .http
            .get<ImageUploadModel[]>(`${environment.metadataApiUrl}/image`);
    }

    getAllCapabilities() {
        return this
            .http
            .get<CapabilityModel[]>(`${environment.metadataApiUrl}/capabilities/environmental`);
    }

    getAllDevices() {
        return this
            .http
            .get<Device[]>(`${environment.metadataApiUrl}/device`);
    }

    deleteImageMetaData(id: number) {
        return this
            .http
            .delete(`${environment.metadataApiUrl}/image/id`);
    }

    getRegistryId() {
        return new Promise((resolve, reject) => {
             setTimeout(() => {
                this
            .http
            .get(`${environment.metadataApiUrl}/repository`)
            .subscribe((responseData: any[]) => {
                if (typeof responseData !== 'undefined' && responseData.length > 0) {
                    this.registryId = responseData[0].id;
                    resolve();
                } else {
                    reject();
                    //console.log('More than 1 Registry Exists');
                }
            },
                err => {
                    reject(err);
                    throw err;
                });
            }
                , 1000);
        });
    }

    onImageUpload(imageUploadModel: ImageUploadModel) {
        let uploadedPercentage: string;
        return new Promise((resolve, reject) => {
            //console.log('Loading docker image');
            this.http.post(`${environment.dockerEngineApiUrl}/images/load`, this.selectedFile, { reportProgress: true, observe: 'events' })
                .subscribe(event => {
                    if (event.type === HttpEventType.UploadProgress) {
                        uploadedPercentage = Math.round(100 * event.loaded / event.total) + '%';
                        this.subject.next({ uploadedPercentage});
//                        console.log('Image  upload Progress, Completed =' + uploadedPercentage);
                    } else if (event.type === HttpEventType.Response) {
                        resolve();
                    }
                },
                    err => {
                        reject(err);
                        throw err;
                    });

        });
    }


    tagImageToRegistry(imageName: String, tagName: String) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            this.http.post(
              `${environment.dockerEngineApiUrl}/images/${imageName}/tag?repo=${environment.dockerRepo}/${imageName}&tag=${tagName}`, null)
            .subscribe(data => {
//                console.log('Image Tagging completed');
                resolve();
            },
                err => {
                    reject(err);
                    throw err;
                },
            );
            },
            1000);
        });
    }

    pushImageToRegistry(imageName: String, tagName: String) {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/octet-stream',
                // tslint:disable-next-line:max-line-length
                'X-Registry-Auth': 'eyAidXNlcm5hbWUiOiAiYWRtaW4iLCJwYXNzd29yZCI6ICJhZG1pbiIsInNlcnZlcmFkZHJlc3MiOiAibG9jYWxob3N0OjUwMDAifQ==',
            });
            const options = { headers: headers };
            this.http.post(`${environment.dockerEngineApiUrl}/images/${environment.dockerRepo}/${imageName}:${tagName}/push`, null, options)
                .subscribe(data => {
                    resolve();
                },
                    err => {
                        resolve();
                        throw err;
                    },
                );
        });
    }

    postImageMetadata(imageUploadModel: ImageUploadModel) {
        this.getRegistryId().then(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (typeof this.registryId !== null) {
//                      console.log('posting Image metadat');
                      this.http.post<ImageUploadModel>(`${environment.metadataApiUrl}/image`,
                          {
                              'name': imageUploadModel.name,
                              'repository_id': this.registryId,
                              'image_name': imageUploadModel.image_name,
                              'image_tag': imageUploadModel.image_tag,
                              'capabilities': imageUploadModel.capabilities,
                          })
                          .subscribe(
                              data => {
                                  resolve();
                              },
                              err => {
                                  reject(err);
                                  throw err;
                              },
                          );
                  }
              }
                  , 1000);
          }).then(() => {
            this.ngxService.stop();
          });
        })
        .catch(() => console.error('error occured while posting metadata api'));
    }

    getUploadedImagePercentage(): Observable<any> {
        return this.subject.asObservable();
    }

}
