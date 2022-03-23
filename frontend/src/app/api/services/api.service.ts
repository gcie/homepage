/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AddExerciseInDto } from '../models/add-exercise-in-dto';
import { AddExerciseOutDto } from '../models/add-exercise-out-dto';
import { ExerciseDto } from '../models/exercise-dto';
import { GetExercisesOutDto } from '../models/get-exercises-out-dto';
import { ResultsDto } from '../models/results-dto';
import { RunProgramInDto } from '../models/run-program-in-dto';
import { RunProgramOutDto } from '../models/run-program-out-dto';
import { RunTestcaseOutDto } from '../models/run-testcase-out-dto';
import { SubmissionInDto } from '../models/submission-in-dto';

@Injectable({
    providedIn: 'root',
})
export class ApiService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation login
     */
    static readonly LoginPath = '/auth/login';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `login()` instead.
     *
     * This method doesn't expect any request body.
     */
    login$Response(params?: {}): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.LoginPath, 'post');
        if (params) {
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `login$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    login(params?: {}): Observable<void> {
        return this.login$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation register
     */
    static readonly RegisterPath = '/auth/register';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `register()` instead.
     *
     * This method doesn't expect any request body.
     */
    register$Response(params?: {}): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.RegisterPath, 'post');
        if (params) {
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `register$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    register(params?: {}): Observable<void> {
        return this.register$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation run
     */
    static readonly RunPath = '/api/gym/run';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `run()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    run$Response(params: { body: RunProgramInDto }): Observable<StrictHttpResponse<RunProgramOutDto>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.RunPath, 'post');
        if (params) {
            rb.body(params.body, 'application/json');
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<RunProgramOutDto>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `run$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    run(params: { body: RunProgramInDto }): Observable<RunProgramOutDto> {
        return this.run$Response(params).pipe(map((r: StrictHttpResponse<RunProgramOutDto>) => r.body as RunProgramOutDto));
    }

    /**
     * Path part for operation addExercise
     */
    static readonly AddExercisePath = '/api/gym/exercises/add';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `addExercise()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    addExercise$Response(params: { body: AddExerciseInDto }): Observable<StrictHttpResponse<AddExerciseOutDto>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.AddExercisePath, 'post');
        if (params) {
            rb.body(params.body, 'application/json');
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<AddExerciseOutDto>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `addExercise$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    addExercise(params: { body: AddExerciseInDto }): Observable<AddExerciseOutDto> {
        return this.addExercise$Response(params).pipe(map((r: StrictHttpResponse<AddExerciseOutDto>) => r.body as AddExerciseOutDto));
    }

    /**
     * Path part for operation getExercises
     */
    static readonly GetExercisesPath = '/api/gym/exercises/get';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getExercises()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExercises$Response(params?: {}): Observable<StrictHttpResponse<GetExercisesOutDto>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.GetExercisesPath, 'get');
        if (params) {
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<GetExercisesOutDto>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `getExercises$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExercises(params?: {}): Observable<GetExercisesOutDto> {
        return this.getExercises$Response(params).pipe(map((r: StrictHttpResponse<GetExercisesOutDto>) => r.body as GetExercisesOutDto));
    }

    /**
     * Path part for operation getExercise
     */
    static readonly GetExercisePath = '/api/gym/exercises/{exerciseId}/get';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getExercise()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExercise$Response(params: {
        /**
         * Exercise id
         */
        exerciseId: string;
    }): Observable<StrictHttpResponse<ExerciseDto>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.GetExercisePath, 'get');
        if (params) {
            rb.path('exerciseId', params.exerciseId, {});
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<ExerciseDto>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `getExercise$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExercise(params: {
        /**
         * Exercise id
         */
        exerciseId: string;
    }): Observable<ExerciseDto> {
        return this.getExercise$Response(params).pipe(map((r: StrictHttpResponse<ExerciseDto>) => r.body as ExerciseDto));
    }

    /**
     * Path part for operation runTestcase
     */
    static readonly RunTestcasePath = '/api/gym/exercises/{exerciseId}/testcase/{testcaseId}/run';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `runTestcase()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    runTestcase$Response(params: {
        /**
         * Exercise id
         */
        exerciseId: string;
        testcaseId: number;
        body: SubmissionInDto;
    }): Observable<StrictHttpResponse<RunTestcaseOutDto>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.RunTestcasePath, 'post');
        if (params) {
            rb.path('exerciseId', params.exerciseId, {});
            rb.path('testcaseId', params.testcaseId, {});
            rb.body(params.body, 'application/json');
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<RunTestcaseOutDto>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `runTestcase$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    runTestcase(params: {
        /**
         * Exercise id
         */
        exerciseId: string;
        testcaseId: number;
        body: SubmissionInDto;
    }): Observable<RunTestcaseOutDto> {
        return this.runTestcase$Response(params).pipe(map((r: StrictHttpResponse<RunTestcaseOutDto>) => r.body as RunTestcaseOutDto));
    }

    /**
     * Path part for operation runTestcases
     */
    static readonly RunTestcasesPath = '/api/gym/exercises/{exerciseId}/run';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `runTestcases()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    runTestcases$Response(params: {
        /**
         * Exercise id
         */
        exerciseId: string;
        body: SubmissionInDto;
    }): Observable<StrictHttpResponse<Array<RunTestcaseOutDto>>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.RunTestcasesPath, 'post');
        if (params) {
            rb.path('exerciseId', params.exerciseId, {});
            rb.body(params.body, 'application/json');
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<Array<RunTestcaseOutDto>>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `runTestcases$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    runTestcases(params: {
        /**
         * Exercise id
         */
        exerciseId: string;
        body: SubmissionInDto;
    }): Observable<Array<RunTestcaseOutDto>> {
        return this.runTestcases$Response(params).pipe(
            map((r: StrictHttpResponse<Array<RunTestcaseOutDto>>) => r.body as Array<RunTestcaseOutDto>),
        );
    }

    /**
     * Path part for operation getExerciseResults
     */
    static readonly GetExerciseResultsPath = '/api/gym/exercises/{exerciseId}/results';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getExerciseResults()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExerciseResults$Response(params?: {}): Observable<StrictHttpResponse<Array<ResultsDto>>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.GetExerciseResultsPath, 'get');
        if (params) {
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<Array<ResultsDto>>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `getExerciseResults$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExerciseResults(params?: {}): Observable<Array<ResultsDto>> {
        return this.getExerciseResults$Response(params).pipe(
            map((r: StrictHttpResponse<Array<ResultsDto>>) => r.body as Array<ResultsDto>),
        );
    }

    /**
     * Path part for operation gymControllerSubmit
     */
    static readonly GymControllerSubmitPath = '/api/gym/exercises/{exerciseId}/submit';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `gymControllerSubmit()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    gymControllerSubmit$Response(params: {
        /**
         * Exercise id
         */
        exerciseId: string;
        body: SubmissionInDto;
    }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.GymControllerSubmitPath, 'post');
        if (params) {
            rb.path('exerciseId', params.exerciseId, {});
            rb.body(params.body, 'application/json');
        }

        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*',
                }),
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `gymControllerSubmit$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    gymControllerSubmit(params: {
        /**
         * Exercise id
         */
        exerciseId: string;
        body: SubmissionInDto;
    }): Observable<void> {
        return this.gymControllerSubmit$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
