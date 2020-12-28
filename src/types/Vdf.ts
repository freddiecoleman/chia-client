export interface VdfOutput {
    a: string;
    b: string;
}

export interface Vdf {
    challenge: string;
    number_of_iterations: string;
    output: VdfOutput;
}
