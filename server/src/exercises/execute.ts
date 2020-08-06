import * as request from 'request';
import logger from '../util/logger';
import { JDOODLE_CLIENT_ID, JDOODLE_CLIENT_SECRET } from '../util/secrets';

export interface ProgramResult {
    output: string;
    statusCode: number;
    memory: number;
    cpuTime: number;
}

export function executePython3(program: string): Promise<ProgramResult> {
    const JDOODLE_ENDPOINT = 'https://api.jdoodle.com/execute';

    const body = {
        script: program,
        language: 'python3',
        versionIndex: 3,
        clientId: JDOODLE_CLIENT_ID,
        clientSecret: JDOODLE_CLIENT_SECRET,
    };

    return new Promise((resolve, reject) => {
        request
            .post({
                url: JDOODLE_ENDPOINT,
                json: body,
            })
            .on('error', (error) => {
                logger.error(error);
                reject();
            })
            .on('data', (data: Buffer) => {
                // data is of Buffer type (array of bytes), need to be parsed to an object.
                const parsedData = JSON.parse(data.toString());
                if (parsedData.error) {
                    logger.error(parsedData.error);
                    reject();
                } else {
                    resolve({
                        output: parsedData.output,
                        statusCode: parsedData.statusCode,
                        memory: +parsedData.memory,
                        cpuTime: +parsedData.cpuTime,
                    });
                }
            });
    });
}
