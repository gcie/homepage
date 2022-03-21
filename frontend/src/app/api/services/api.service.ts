/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { AddExerciseInDto } from '../models/add-exercise-in-dto';
import { AddExerciseOutDto } from '../models/add-exercise-out-dto';
import { ExerciseOutDto } from '../models/exercise-out-dto';
import { RunProgramInDto } from '../models/run-program-in-dto';
import { RunProgramOutDto } from '../models/run-program-out-dto';
import { SubmissionInDto } from '../models/submission-in-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

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
    getExercises$Response(params?: {}): Observable<StrictHttpResponse<Array<ExerciseOutDto>>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.GetExercisesPath, 'post');
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
                    return r as StrictHttpResponse<Array<ExerciseOutDto>>;
                }),
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `getExercises$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExercises(params?: {}): Observable<Array<ExerciseOutDto>> {
        return this.getExercises$Response(params).pipe(
            map((r: StrictHttpResponse<Array<ExerciseOutDto>>) => r.body as Array<ExerciseOutDto>),
        );
    }

    /**
     * Path part for operation gymControllerGetExercise
     */
    static readonly GymControllerGetExercisePath = '/api/gym/exercises/{id}/get';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `gymControllerGetExercise()` instead.
     *
     * This method doesn't expect any request body.
     */
    gymControllerGetExercise$Response(params?: {}): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.GymControllerGetExercisePath, 'post');
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
     * To access the full response (for headers, for example), `gymControllerGetExercise$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    gymControllerGetExercise(params?: {}): Observable<void> {
        return this.gymControllerGetExercise$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation gymControllerSubmit
     */
    static readonly GymControllerSubmitPath = '/api/gym/exercises/{id}/submit';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `gymControllerSubmit()` instead.
     *
     * This method doesn't expect any request body.
     */
    gymControllerSubmit$Response(params?: {}): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.GymControllerSubmitPath, 'post');
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
     * To access the full response (for headers, for example), `gymControllerSubmit$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    gymControllerSubmit(params?: {}): Observable<void> {
        return this.gymControllerSubmit$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation gymControllerRunTestcases
     */
    static readonly GymControllerRunTestcasesPath = '/api/gym/exercises/{id}/runTestcases';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `gymControllerRunTestcases()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    gymControllerRunTestcases$Response(params: { body: SubmissionInDto }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, ApiService.GymControllerRunTestcasesPath, 'post');
        if (params) {
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
     * To access the full response (for headers, for example), `gymControllerRunTestcases$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    gymControllerRunTestcases(params: { body: SubmissionInDto }): Observable<void> {
        return this.gymControllerRunTestcases$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
