"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterQuery = exports.updatePlantSchema = exports.params = exports.createPlantSchema = void 0;
const zod_1 = require("zod");
exports.createPlantSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        category: zod_1.z.string({
            required_error: "Category is required",
            invalid_type_error: "Category must be a string",
        }),
        image: zod_1.z.string().optional(),
    }),
});
exports.params = zod_1.z.object({
    plantId: zod_1.z.string(),
});
exports.updatePlantSchema = zod_1.z.object({
    params: exports.params,
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
    })
        .partial(),
});
exports.filterQuery = zod_1.z.object({
    limit: zod_1.z.number().default(1),
    page: zod_1.z.number().default(10),
});
