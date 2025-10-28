import { validateInput } from '@/utils/validateInput';
import { z } from 'zod';

export const activitySchema = z.object({
  
  startDate: z
    .string()
    .min(1, "A data de início é obrigatória.")
    .refine(
      (val) => !val || validateInput(val, "startDate"),
      "Data de início inválida"
    )
    .or(z.literal("")),

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
