import { z } from "zod";

export const createPlantSchema = z.object({
	body: z.object({
	  name: z.string({
		required_error: "Name is required",
		invalid_type_error: "Name must be a string",
	  }),
	  category: z.string({
		required_error: "Category is required",
		invalid_type_error: "Category must be a string",
	  }),
	  image: z.string().optional(),
	}),
  });

export const params = z.object({
	plantId: z.string(),
});

export const updatePlantSchema = z.object({
	params,
	body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
	})
	.partial(),
});

export const filterQuery = z.object({
	limit: z.number().default(1),
	page: z.number().default(10),
});

export type ParamsInput = z.infer<typeof params>;
export type FilterQueryInput = z.infer<typeof filterQuery>;
export type CreatePlantInput = z.infer<typeof createPlantSchema>["body"];
export type UpdatePlantInput = z.infer<typeof updatePlantSchema>["body"];
