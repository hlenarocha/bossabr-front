import { z } from "zod";
import { validateInput } from "@/utils/validateInput";

const workerSchema = z.object({
  firstName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(80, "Nome não pode exceder 100 caracteres")
    .refine((val) => !val || validateInput(val, "name"), "Nome contém caracteres inválidos"),

  lastName: z
  .string()
  .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
  .max(200, "Sobrenome não pode exceder 200 caracteres")
  .optional()
  .refine((val) => !val || validateInput(val, "name"), "Sobrenome contém caracteres inválidos"),

  cnpj: z
    .string()
    .min(14, "CNPJ deve ter 14 caracteres")
    .max(14, "CNPJ deve ter 14 caracteres")
    .optional()
    .refine((val) => !val || validateInput(val, "cnpj"), "CNPJ inválido"),

  roleId: z.number().min(1, "Selecione um cargo"),

  sectorId: z.number().min(1, "Selecione um setor"),

  selectedTeam: z.number().min(1, "Selecione uma equipe"), // mudar para "teamId" 

  email: z
    .string()
    .email("E-mail inválido")
    .max(100, "E-mail não pode exceder 100 caracteres"),

  phone: z
    .string()
    .min(11, "Telefone deve ter 11 caracteres")
    .max(11, "Telefone deve ter 11 caracteres")
    .refine((val) => !val || validateInput(val, "phone"), "Telefone inválido"),

  birthDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || validateInput(val, "birthDate"),
      "Data de nascimento inválida"
    ),

  entryDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || validateInput(val, "entryDate"),
      "Data de entrada inválida"
    ),
});

type WorkerFormData = z.infer<typeof workerSchema>;

export { workerSchema };
export type { WorkerFormData };
