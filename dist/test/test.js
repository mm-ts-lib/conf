"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configTest_1 = __importDefault(require("./configTest"));
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const d = debug_1.default(path_1.default.basename(__filename));
d(configTest_1.default.server.port);
//# sourceMappingURL=test.js.map