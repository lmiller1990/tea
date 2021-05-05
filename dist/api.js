"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.expect = exports.it = exports.describe = void 0;
const framework_1 = require("./framework");
Object.defineProperty(exports, "describe", { enumerable: true, get: function () { return framework_1.describe; } });
Object.defineProperty(exports, "it", { enumerable: true, get: function () { return framework_1.it; } });
Object.defineProperty(exports, "run", { enumerable: true, get: function () { return framework_1.run; } });
const assertions_1 = require("./assertions");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return assertions_1.expect; } });
