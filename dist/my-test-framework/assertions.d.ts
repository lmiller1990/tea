export interface AssertionFailure {
    pass: false;
    message: string;
}
export interface AssertionSuccess {
    pass: true;
}
export declare type Result = AssertionSuccess | AssertionFailure;
export declare function expect<T>(expected: T): {
    toBe: (actual: T) => void;
};
