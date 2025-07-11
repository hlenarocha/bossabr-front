import { z } from "zod";
import { validateInput } from "@/utils/validateInput";

const workerSchema = z.object({
  firstName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome não pode exceder 100 caracteres"),
  lastName: z.string().optional(),
  cnpj: z
    .string()
    .optional()
    .refine((val) => !val || validateInput(val, "cnpj"), "CNPJ inválido"),
  roleId: z.number().min(1, "Selecione um cargo"),
  sectorId: z.number().min(1, "Selecione um setor"),
  selectedTeam: z.number().min(1, "Selecione uma equipe"),
  email: z
    .string()
    .email("E-mail inválido")
    .max(100, "E-mail não pode exceder 100 caracteres"),
  phone: z
    .string()
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
