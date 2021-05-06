import { Result } from "./assertions";

export type Handler = () => any;

export interface Suite {
  id: string;
  type: "suite";
  only: boolean;
  title: string;
  depth: number;
  children: string[];
}

export interface Test {
  id: string;
  type: "test";
  only: boolean;
  parent: string;
  title: string;
  result: Result;
  handler: () => void | Promise<unknown>;
}
