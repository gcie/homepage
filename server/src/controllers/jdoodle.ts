import { Router, Response, Request } from 'express';
import * as request from 'request';
import logger from '../util/logger';
import { check } from 'express-validator';
import { JDOODLE_CLIENT_ID, JDOODLE_CLIENT_SECRET } from '../util/secrets';

export const jdoodle = Router();

jdoodle.post('/python3', async (req: Request, res: Response) => {
    logger.debug(req.body);

    const JDOODLE_ENDPOINT = 'https://api.jdoodle.com/execute';

    await check('program', 'Brak programu').notEmpty().run(req);

    const body = {
        script: req.body.program,
        language: 'python3',
        versionIndex: 3,
        clientId: JDOODLE_CLIENT_ID,
        clientSecret: JDOODLE_CLIENT_SECRET,
    };

    request
        .post({
            url: JDOODLE_ENDPOINT,
            json: body,
        })
        .on('error', (error) => {
            logger.error(error);
            res.status(400).send(error);
        })
        .on('data', (data: Buffer) => {
            // data is of Buffer type (array of bytes), need to be parsed to an object.
            const parsedData = JSON.parse(data.toString());
            if (parsedData.error) {
                return res.status(400).send(parsedData);
            } else {
                return res.status(200).send({ runResult: parsedData });
            }
        });
});
