export interface RunResult {
    stdout?: string;
    stderr?: string;
    signal?: NodeJS.Signals;
    code?: number;
    error?: Error;
}
