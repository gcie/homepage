/* tslint:disable */
/* eslint-disable */
export interface TestcaseResultDto {
    program: string;
    result?: 'OK' | 'TIMEOUT' | 'WRONG_ANSWER' | 'ERROR';
    stderr?: string;
    stdout?: string;
}
