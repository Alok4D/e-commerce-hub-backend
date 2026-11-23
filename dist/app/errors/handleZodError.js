"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handle Zod validation errors
 */
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => ({
        path: String(issue?.path?.[issue.path.length - 1] || ''),
        message: issue.message,
    }));
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleZodError;
