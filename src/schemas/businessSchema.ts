import { z } from "zod";

const businessSchema = z.object({
  businessName: z
    .string()
    .min(2, "Nome do setor deve ter pelo menos 2 caracteres")
    .max(150, "Nome do setor não pode exceder 150 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.]+$/, "O nome contém caracteres inválidos.")
});

type BusinessFormData = z.infer<typeof businessSchema>;

export { businessSchema };
export type { BusinessFormData };