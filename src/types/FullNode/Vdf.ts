export interface VdfOutput {
    data: string;
}

export interface Vdf {
    challenge: string;
    number_of_iterations: string;
    output: VdfOutput;
}
