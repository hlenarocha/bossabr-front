import { validateInput } from '@/utils/validateInput';
import { z } from 'zod';

export const demandSchema = z.object({

  serviceId: z.coerce
    .number({ invalid_type_error: "Selecione um serviço." })
    .min(1, "Selecione um serviço"),

  clientId: z.coerce
    .number({ invalid_type_error: "Selecione um cliente." })
    .min(1, "Selecione um cliente"),

  /* statusId: z.coerce
    .number({ invalid_type_error: "Selecione um status." })
    .min(1, "Selecione um status."), */

  sectorId: z.coerce 
    .number({ invalid_type_error: "O valor do setor deve ser um número." })
    .min(1, "Selecione um setor"),

  quantity: z.coerce 
    .number({ invalid_type_error: "A quantidade deve ser um número." })
    .min(1, "Quantidade deve ser pelo menos 1")
    .optional(),

  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição não pode exceder 500 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,_']+$/, "A descrição contém caracteres inválidos."), // Adicionei ' e _ que são comuns

  driveLink: z
    .string()
    .url("O link do Drive precisa ser uma URL válida.")
    .optional()
    // .or(z.literal('')) permite que o campo seja enviado vazio sem falhar na validação de URL
    .or(z.literal('')), 

  // O input de data geralmente já retorna a string no formato correto.
  // Se o seu componente de data retornar um objeto Date(), você usaria z.coerce.date().
  deadline: z
    .string()
    .refine((val) => !val || validateInput(val, "deadline"), "Data de prazo inválida")
    .optional(),
});

export type DemandFormData = z.infer<typeof demandSchema>;