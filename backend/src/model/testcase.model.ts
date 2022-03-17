export interface Testcase {
    input: string;
    timeLimit?: number;
    output?: string;
    checker?: string;
}

export const TestcasesType = {
    type: [
        {
            input: { type: String },
            timeLimit: { type: Number },
            output: { type: String },
            checker: { type: String },
        },
    ],
};
