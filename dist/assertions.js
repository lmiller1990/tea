"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = void 0;
const emitter_1 = require("./emitter");
function toBe(actual) {
    return (expected) => {
        if (expected === actual) {
            return {
                pass: true,
            };
        }
        return {
            pass: false,
            message: `Expected ${expected} to be ${actual}.`,
        };
    };
}
function _expect(expected) {
    return {
        toBe: (actual) => {
            if (expected === actual) {
                return {
                    pass: true,
                };
            }
            return {
                pass: false,
                message: `Expected ${expected} to be ${actual}.`,
            };
        },
    };
}
function expect(expected) {
    return {
        toBe: (actual) => {
            const result = toBe(actual)(expected);
            if (result.pass === false) {
                emitter_1.emitter.emit("test:fail", result);
            }
        },
    };
}
exports.expect = expect;
