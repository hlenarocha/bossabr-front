import { z } from 'zod';

const teamSchema = z.object({
    teamName: z
        .string()
        .min(2, "Nome da equipe deve ter pelo menos 2 caracteres")
        .max(100, "Nome da equipe não pode exceder 100 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.]+$/, "O nome contém caracteres inválidos."),
    sectorId:
        z.coerce.number({ required_error: "Selecione um setor.", invalid_type_error: "Selecione um setor." }).min(1, "Selecione um setor."),
    responsibleId: z.coerce.number({ required_error: "Selecione um setor.", invalid_type_error: "Selecione um setor." }).min(1, "Selecione um setor.").optional(),
    isInternal: z.boolean().default(true),
});

type TeamFormData = z.infer<typeof teamSchema>;

export { teamSchema };
export type { TeamFormData };
