export type RunTestcasesInDto = {
    program: string;
};

export type RunTestcasesOutDto = {
    stdout: string;
    stderr?: string;
    expectedOutput: string;
    result: RunTestcasesResult;
}[];

export enum RunTestcasesResult {
    OK = 'OK',
    TIMEOUT = 'TIMEOUT',
    WRONG_ANSWER = 'WRONG_ANSWER',
    ERROR = 'ERROR',
}
