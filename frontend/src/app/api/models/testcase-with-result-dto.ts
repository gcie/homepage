/* tslint:disable */
/* eslint-disable */
export interface TestcaseWithResultDto {
    checker?: string;
    input: string;
    output?: string;
    program?: string;
    result?: 'OK' | 'TIMEOUT' | 'WRONG_ANSWER' | 'ERROR';
    stderr?: string;
    stdout?: string;
}
