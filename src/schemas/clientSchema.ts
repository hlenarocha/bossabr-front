import { validateInput } from '@/utils/validateInput';
import { z } from 'zod';

const clientSchema = z.object({
  businessId: z
   .number()
    .min(1, "Selecione um negócio")
    .optional(),
   enterpriseName: z
     .string()
        .min(1, "Nome da empresa deve ter pelo menos 1 caractere")
        .max(255, "Nome da empresa não pode exceder 255 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,'"()/:;!?_#@%*+]+$/
, "O nome da empresa contém caracteres inválidos."),
    contactName: z
        .string()
        .min(1, "Nome do contato deve ter pelo menos 1 caractere")
        .max(255, "Nome do contato não pode exceder 255 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,'"()/:;!?_#@%*+]+$/
, "O nome do contato contém caracteres inválidos."),
    contactEmail: z
        .string()
        .email("E-mail inválido")
        .optional(),
    contactPhone: z
    .string()
        .min(11, "Telefone deve ter 11 caracteres")
        .max(11, "Telefone deve ter 11 caracteres")
        // .refine((val) => !val || validateInput(val, "phone"), "Telefone inválido")
        .optional(),
    entryDate: z
        .string()
        .optional()
        .refine(
            (val) => !val || validateInput(val, "entryDate"),
            "Data de entrada inválida"
        )
        .optional(),

    // verificar regra de negócio para o campo abaixo
    contractEndDate: z
        .string()
        .refine(
            (val) => !val || validateInput(val, "contractEndDate"),
            "Data de término de contrato inválida"
        )   
        .optional(),
    contractDescription: z
        .string()
        .min(10, "Descrição do contrato deve ter pelo menos 10 caracteres")
        .max(500, "Descrição do contrato não pode exceder 500 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,'"()/:;!?_#@%*+]+$/
, "A descrição do contrato contém caracteres inválidos.")
        .optional(),
    briefing: z
        .string()
        .min(10, "Briefing deve ter pelo menos 10 caracteres")
        .max(1000, "Briefing não pode exceder 1000 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,'"()/:;!?_#@%*+]+$/
, "O briefing contém caracteres inválidos.")
        .optional(),
    isActive: z
        .boolean()
        .optional(),
    classification: z
        .string()
        .min(1, "Classificação deve ter pelo menos 1 caractere")
        .max(100, "Classificação não pode exceder 100 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,'"()/:;!?_#@%*+]+$/
, "A classificação contém caracteres inválidos.")
        .optional(),

});

type ClientFormData = z.infer<typeof clientSchema>;

export { clientSchema };
export type { ClientFormData };