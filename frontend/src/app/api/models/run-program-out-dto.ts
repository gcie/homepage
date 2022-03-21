/* tslint:disable */
/* eslint-disable */
import { Error } from './error';
export interface RunProgramOutDto {
  code?: number;
  error?: Error;
  signal?: string;
  stderr?: string;
  stdout?: string;
}
