import { AssertionFailure } from "./assertions";
import { Handler } from "./types";
declare type EventMap = Record<string, any>;
declare type EventKey<T extends EventMap> = string & keyof T;
declare type EventReceiver<T> = (params: T) => void;
interface Emitter<T extends EventMap> {
    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}
declare class EventEmitter<T extends EventMap> implements Emitter<T> {
    #private;
    currentTest: string | undefined;
    stack: string[];
    rootSuites: string[];
    hasOnly: boolean;
    clear(): void;
    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}
interface Events {
    "suite:add": {
        title: string;
        handler: Handler;
    };
    "suite:add:test": {
        title: string;
        handler: Handler;
    };
    "suite:add:test:only": {
        title: string;
        handler: Handler;
    };
    "test:fail": AssertionFailure;
    run: undefined;
}
declare const emitter: EventEmitter<Events>;
export { emitter };
