import { z } from 'zod';

export const activitySchema = z.object({
  
  startDate: z
    .string()
    .min(1, "A data de início é obrigatória."),

  driveLink: z
    .string()
    .url({ message: "Insira um link válido." })
    .or(z.literal(''))
    .optional(),

  observations: z
    .string()
    .optional(),
  
    // apenas para social media activities
  text: z
    .string()
    .optional(),

  statusId: z
    .number({ required_error: "Selecione um status." })
    .min(1, "Selecione um status."),
});

export type ActivityFormData = z.infer<typeof activitySchema>;
