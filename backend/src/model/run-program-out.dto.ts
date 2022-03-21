import { ApiPropertyOptional } from '@nestjs/swagger';

export class RunProgramOutDto {
    constructor(object: Partial<RunProgramOutDto>) {
        this.stdout = object.stdout;
        this.stderr = object.stderr;
        this.signal = object.signal;
        this.code = object.code;
        this.error = object.error;
    }

    @ApiPropertyOptional()
    stdout?: string;

    @ApiPropertyOptional()
    stderr?: string;

    @ApiPropertyOptional()
    signal?: NodeJS.Signals;

    @ApiPropertyOptional()
    code?: number;

    @ApiPropertyOptional()
    error?: Error;
}
