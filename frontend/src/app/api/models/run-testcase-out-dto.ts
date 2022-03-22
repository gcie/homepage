/* tslint:disable */
/* eslint-disable */
export interface RunTestcaseOutDto {
    result?: 'OK' | 'TIMEOUT' | 'WRONG_ANSWER' | 'ERROR';
    stderr?: string;
    stdout?: string;
}
