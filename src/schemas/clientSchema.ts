import { validateInput } from '@/utils/validateInput';
import { z } from 'zod';

// id_cliente	[...]
// id_setor_negocio	[...]
// nome_empresa*	[...]
// nome_responsavel*	[...]
// email	[...]
// telefone	[...]
// data_entrada	[...]
// data_fim_contrato	[...]
// desc_contrato	[...]
// briefing	[...]
// ativo*	[...]
// classificacao	[...]
// }

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
        .or(z.literal(""))
        .optional(),
    contactPhone: z
        .string()
        .min(11, "Telefone deve estar completo."),
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
        .min(2, "Descrição do contrato deve ter pelo menos 2 caracteres")
        .max(500, "Descrição do contrato não pode exceder 500 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,'"()/:;!?_#@%*+]+$/
            , "A descrição do contrato contém caracteres inválidos.")
        .or(z.literal(""))
        .optional(),
    briefing: z
        .string()
        .min(2, "Briefing deve ter pelo menos 2 caracteres")
        .max(1000, "Briefing não pode exceder 1000 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,'"()/:;!?_#@%*+]+$/
            , "O briefing contém caracteres inválidos.")
        .or(z.literal(""))

        .optional(),
    isActive: z
        .boolean()
        .optional(),
    classification: z
        .string()
        .max(100, "Classificação não pode exceder 100 caracteres")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,'"()/:;!?_#@%*+]+$/
            , "A classificação contém caracteres inválidos.")
        .or(z.literal(""))
        .optional(),

});

type ClientFormData = z.infer<typeof clientSchema>;

export { clientSchema };
export type { ClientFormData };