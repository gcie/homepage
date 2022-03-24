/* tslint:disable */
/* eslint-disable */
export interface SubmissionDto {
    atTestcase?: number;
    program: string;
    status: 'WAITING' | 'RUNNING' | 'OK' | 'TIMEOUT' | 'WRONG_ANSWER' | 'ERROR';
}
