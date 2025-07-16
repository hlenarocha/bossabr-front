import { z } from 'zod';

const teamSchema = z.object({
    teamName: z
        .string()
        .min(2, "Nome da equipe deve ter pelo menos 2 caracteres")
        .max(100, "Nome da equipe não pode exceder 100 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.]+$/, "O nome contém caracteres inválidos."),
    sectorId: z
        .number()
        .min(1, "Selecione um setor"),
    teamLeaderId: z
        .number()
        .min(1, "Selecione um líder de equipe")
        .optional(), 
        
});

type TeamFormData = z.infer<typeof teamSchema>;

export { teamSchema };
export type { TeamFormData };
