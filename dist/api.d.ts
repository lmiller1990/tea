import { Handler } from "./types";
declare type TestDefinition = (title: string, test: () => any) => any;
export interface It extends TestDefinition {
    only: TestDefinition;
}
export declare const it: It;
export declare function describe(title: string, handler: Handler): void;
export declare function run(): void;
export {};
