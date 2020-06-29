import { executePython3 } from './execute';

export async function validate(id: string, program: string): Promise<boolean> {
    var prefix = '',
        suffix = '',
        check = (output: string) => true;

    if (id == 'ex000') {
        suffix = '\n\nprint(x)\nprint(isinstance(x, int))';
        check = (output: string) => {
            return output.trim() === '12\nTrue';
        };
    }

    const result = await executePython3(prefix + program + suffix);
    return check(result.output);
}
