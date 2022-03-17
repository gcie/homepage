import { IsNotEmpty } from 'class-validator';

export class TestcaseDto {
    @IsNotEmpty() input: string;
    output?: string;
    checker?: string;
}
