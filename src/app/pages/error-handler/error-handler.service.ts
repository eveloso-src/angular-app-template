import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor( private toastr: ToastrService ) { }
    handleError( error: any ) {
        if ( error instanceof HttpErrorResponse ) {
            console.error( 'Backend returned status code: ', error.status );
            console.error( 'Response body:', error.message );
            switch ( error.status ) {
                case 0: {
                    this.toastr.error( ' Backend connections are broken', 'Major Error', {
                        disableTimeOut: true,
                    } );
                    break;
                }
                case 400: {
                    for ( const errMsg of error.error ) {
                        this.toastr.error( errMsg.ValidationError, 'Validation Errors', {
                            disableTimeOut: true,
                        } );
                    }
                    break;
                }
                case 500: {
                    this.toastr.error( error.message, 'Internal Server Error', {
                        disableTimeOut: true,
                    } );
                    break;
                }
                case 503: {
                    this.toastr.error( error.message, 'Service Unavailable', {
                        disableTimeOut: true,
                    } );
                    break;
                }
                case 504: {
                    this.toastr.error( error.message, 'Gateway Timeout', {
                        disableTimeOut: true,
                    } );
                    break;
                }
                // default:{
                //     this.toastr.error('Something went wrong, please re-submit the form', 'Error', {
                //         disableTimeOut:true,
                //     });
                //     break;
                // }
            }

        } else {
            if ( !error.message.search( 'clearSearchFilter' ) ) {
                this.toastr.error( error.message, 'Error Occured', {
                    disableTimeOut: true,
                } );
                console.error( 'An error occurred:', error );
            }

        }
    }
}
