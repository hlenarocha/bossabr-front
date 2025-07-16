import { z } from 'zod';

const serviceSchema = z.object({
  serviceName: z
    .string()
    .min(2, "Nome do serviço deve ter pelo menos 2 caracteres")
    .max(200, "Nome do serviço não pode exceder 200 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.]+$/, "O nome contém caracteres inválidos."),
  sectorId: z.number().min(1, "Selecione um setor"),
  pontuation: z.number().min(1, "Pontuação deve ser maior que 0"),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export { serviceSchema };
export type { ServiceFormData };
