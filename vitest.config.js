"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
// https://vitejs.dev/config/
exports.default = (0, config_1.defineConfig)({
    test: {
        include: [
            'test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ]
    },
    plugins: [
        (0, vite_tsconfig_paths_1.default)({
            // This is needed to avoid Vitest picking up tsconfig.json files from other unrelated projects in the monorepo
            ignoreConfigErrors: true
        })
    ]
});
