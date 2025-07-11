import { z } from "zod";
import { validateInput } from "@/utils/validateInput";

const businessSchema = z.object({
  businessName: z
    .string()
    .min(2, "Nome do setor deve ter pelo menos 2 caracteres")
    .max(100, "Nome do setor não pode exceder 100 caracteres")
    .refine((val) => !val || validateInput(val, "name"), "Nome do setor deve conter apenas letras")

});

type BusinessFormData = z.infer<typeof businessSchema>;

export { businessSchema };
export type { BusinessFormData };