import logger from '../util/logger';
import { executePython3 } from './execute';

export async function validate(id: string, program: string): Promise<boolean> {
    var prefix = '',
        suffix = '',
        check = (output: string) => true;

    logger.log('debug', 'validating ' + program);

    if (id == 'ex000') {
        suffix = '\n\nprint(x)\nprint(isinstance(x, int))';
        check = (output: string) => {
            logger.debug('program output: ' + output);
            return output.trim() === '12\nTrue';
        };
    }

    const result = await executePython3(prefix + program + suffix);
    logger.debug(`jdoodle response: ${result}`);
    return check(result.output);
}
