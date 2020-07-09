import { executePython3, ProgramResult } from './execute';

export async function validate(id: string, program: string): Promise<ProgramResult & { score: number }> {
    var prefix = '',
        suffix = '',
        rate = (output: string) => 0;

    if (id == 'ex000') {
        suffix = '\n\nprint(tuzin)\nprint(isinstance(tuzin, int))';
        rate = (output: string) => {
            return output === '12\nTrue' ? 1 : 0;
        };
    }

    const result = await executePython3(prefix + program + suffix);
    return Object.assign(result, { score: rate(result.output.trim()) });
}
