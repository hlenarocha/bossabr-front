import{ z } from 'zod';

// REVER ESSE SCHEMA
const demandSchema = z.object({
    serviceId: z
        .number()
        .min(1, "Selecione um serviço"),
    clientId: z
        .number()
        .min(1, "Selecione um cliente"),
    statusId: z
        .number()
        .min(1, "Selecione um status"),
    description: z
        .string()
        .min(10, "Descrição deve ter pelo menos 10 caracteres")
        .max(500, "Descrição não pode exceder 500 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,]+$/, "A descrição contém caracteres inválidos."),
    driveLink: z
        .string()
        .optional(),
       // .refine((val) => !val || /^https:\/\/drive\.google\.com\/.*$/.test(val), "Link do Google Drive inválido"),
    deadline: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
            "Data de prazo inválida, deve ser no formato AAAA-MM-DD"
        ),
    quantity: z
        .number()
        .min(1, "Quantidade deve ser pelo menos 1")
        .optional(),
    sectorId: z
        .number()
        .min(1, "Selecione um setor")
        
});

type DemandFormData = z.infer<typeof demandSchema>;

export { demandSchema };
export type { DemandFormData };
