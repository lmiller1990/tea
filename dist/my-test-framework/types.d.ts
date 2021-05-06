import { Result } from "./assertions";
export declare type Handler = () => any;
export interface Suite {
    id: string;
    type: "suite";
    title: string;
    depth: number;
    children: string[];
}
export interface Test {
    id: string;
    type: "test";
    parent: string;
    only: boolean;
    title: string;
    result: Result;
    handler: () => void | Promise<unknown>;
}
