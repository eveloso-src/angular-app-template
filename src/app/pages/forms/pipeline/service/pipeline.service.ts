import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { PipelineModel } from '../model/pipeline-model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class PipelineService {

	constructor(private http: HttpClient, private toastr: ToastrService, private ngxService: NgxUiLoaderService) { }

	getAllSteps() {
		return this
			.http
			.get(`${environment.mmUrl}/steps`);
	}

	onCreatePipeline(pipelineModel: PipelineModel) {
		console.log('Posting Pipeline Metadata');
		var i: any;
		var stepList: Array<{ step_id: string }> = [];

		for (i in pipelineModel.steps) {
			stepList.push({ step_id: pipelineModel.steps[i].toString() });
		}
		console.log(stepList);
		console.log(JSON.stringify(stepList));
        this.ngxService.start();
		this.http.post(`${environment.mmUrl}/pipelines`,
			{
				'attributes': {
					'name': pipelineModel.name,
					'description': pipelineModel.description,
					'project': pipelineModel.project
				},
				'note': pipelineModel.note,
				'author': pipelineModel.author,
				'pipeline_entities': stepList

			})
			.subscribe(
				data => {
					console.log('Pipeline metadata has been updated', data);
					this.ngxService.stop();
					this.toastr.success('Pipeline ' + pipelineModel.name + ' created successfully');
				},
				err => {
					this.ngxService.stop();
					throw err;
				}
			);
	}
	onCreatePipelineWithEVal(pipelineModel: PipelineModel, evalMap: Map<any, any>) {
		console.log('Posting Pipeline Metadata');
		var i: any;
		var stepList: Array<{ step_id: string }> = [];
		var listWithoutValues
		var completeStepList = []
		
		evalMap.forEach((value: any, key: any) => {
			if (value === '') {
				stepList.push({ step_id: String(key) });
			}
			else if (key !== undefined){
				let stepIDList = 
					{ step_id: String(key) ,
					  success: [ { "step_id":  String(value[0][0].id)} ],
					  failure: [ { "step_id": String(value[1][0].id) } ],
					};
				  completeStepList.push(stepIDList);
			}
		});
		for (let step of stepList) {
			completeStepList.push(step);
		}

		console.log(JSON.stringify(completeStepList));
		this.http.post(`${environment.mmUrl}/pipelines`,
			{
				'attributes': {
					'name': pipelineModel.name,
					'description': pipelineModel.description,
					'project': pipelineModel.project
				},
				'note': pipelineModel.note,
				'author': pipelineModel.author,
				'pipeline_entities': completeStepList

			})
			.subscribe(
				data => {
					console.log('Pipeline metadata has been updated', data);
				},
				err => {
					throw err;
				}
			);
	}


	onCreatePipelineWithRecipeAndEval(pipelineModel: PipelineModel, evalMap: Map<any, any>) {
		console.log('Posting Pipeline Metadata');
		var i: any;
		var stepList: Array<{ step_id: string }> = [];
		var listWithoutValues
		var completeStepList = []
		
		evalMap.forEach((value: any, key: any) => {
			if (value === '') {
				stepList.push({ step_id: String(key) });
			}
			else if (key !== undefined){
				let stepIDList = 
					{ step_id: String(key) ,
					  success: [ { "step_id":  String(value[0][0].id)} ],
					  failure: [ { "step_id": String(value[1][0].id) } ],
					};
				  completeStepList.push(stepIDList);
			}
		});
		for (i in pipelineModel.steps) {
			stepList.push({ step_id: pipelineModel.steps[i].toString() });
		}
		for (let step of stepList) {
			completeStepList.push(step);
		}

		console.log(JSON.stringify(completeStepList));
		this.http.post(`${environment.mmUrl}/pipelines`,
			{
				'attributes': {
					'name': pipelineModel.name,
					'description': pipelineModel.description,
					'project': pipelineModel.project
				},
				'note': pipelineModel.note,
				'author': pipelineModel.author,
				'pipeline_entities': completeStepList

			})
			.subscribe(
				data => {
					console.log('Pipeline metadata has been updated', data);
				},
				err => {
					throw err;
				}
			);
	}
	

}