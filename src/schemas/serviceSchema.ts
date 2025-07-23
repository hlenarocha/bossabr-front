import { z } from 'zod';

const serviceSchema = z.object({
  serviceName: z
    .string({ required_error: "O nome do serviço é obrigatório." })
    .min(2, "Nome do serviço deve ter pelo menos 2 caracteres")
    .max(200, "Nome do serviço não pode exceder 200 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.]+$/, "O nome contém caracteres inválidos."),

  sectorId: z.coerce.number({ required_error: "Selecione um setor.", invalid_type_error: "Selecione um setor." }).min(1, "Selecione um setor."),
  
  pontuation: z.coerce.number().nullable().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export { serviceSchema };
export type { ServiceFormData };