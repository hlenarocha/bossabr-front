import { validateInput } from '@/utils/validateInput';
import { z } from 'zod';

// id_demanda	integer
// example: 1
// id_tipo_servico*	integer
// example: 1
// id_pessoa*	integer
// example: 1
// id_cliente*	integer
// example: 1
// quantidade*	integer
// example: 2
// prazo*	string($date)
// example: 2025-03-20
// descricao	string
// maxLength: 1000
// example: Produzir um banner para promoção do dia das mães
// nullable: true
// link_drive	string
// maxLength: 500
// example: https://drive.google.com/drive/folders/00000000000000000000000000000000000
// nullable: true
// id_status	integer
// example: 1
// nullable: true


export const demandSchema = z.object({

  serviceId: z.coerce
  .number({ required_error: "Selecione um serviço.", invalid_type_error: "Selecione um serviço." })
  .min(1, "Selecione um serviço."),

clientId: z.coerce
  .number({ required_error: "Selecione um cliente.", invalid_type_error: "Selecione um cliente." })
  .min(1, "Selecione um cliente."),

personId: z.coerce
  .number({ required_error: "Selecione o responsável pelo setor.", invalid_type_error: "Selecione o responsável pelo setor." })
  .min(1, "Selecione o responsável pelo setor."),

quantity: z.coerce
  .number({ required_error: "A quantidade é obrigatória.", invalid_type_error: "A quantidade é obrigatória." })
  .min(1, "A quantidade deve ser no mínimo 1."),

description: z
  .string()
  .min(5, "A descrição deve ter no mínimo 5 caracteres.")
  .max(500, "A descrição não pode exceder 500 caracteres.")
  //.regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-&.,_'"%]+$/, "A descrição contém caracteres inválidos.")
  .optional()
  .or(z.literal('')), // Permite string vazia para campos opcionais

driveLink: z
  .string()
  .url("O link do Drive precisa ser uma URL válida.")
  .optional()
  .or(z.literal('')), // Permite string vazia e não falha na validação de URL

deadline: z
  .string({ required_error: "A data do prazo é obrigatória." })
  .min(1, "A data do prazo é obrigatória.") // Garante que o campo não está vazio
  .refine((val) => validateInput(val, "deadline"), "Formato de data inválido."),
});


export type DemandFormData = z.infer<typeof demandSchema>;