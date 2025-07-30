import { z } from "zod";
import { validateInput } from "@/utils/validateInput";

// Pessoa {
// id_pessoa	[...]
// id_cargo*	[...]
// first_name*	[...]
// last_name	[...]
// email*	[...]
// cnpj	[...]
// telefone	[...]
// data_entrada	[...]
// data_nascimento	[...]
// avatar	[...] (AVATAR É PEGO QUANDO HÁ AUTENTICAÇÃO. IGNORAR NO SCHEMA.)
// }


// EquipePessoa{
//   id_equipe_pessoa	integer
//   example: 1
//   id_equipe*	integer
//   example: 1
//   id_pessoa*	integer
//   example: 1
// }
  

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
    .refine((val) => !val || validateInput(val, "cnpj"), "CNPJ inválido")
    .or(z.literal("")),


  roleId: z.number().min(1, "Selecione um cargo"),

  sectorId: z.number().min(1, "Selecione um setor"),

  teamId: z.number().min(1, "Selecione uma equipe"),

  email: z
    .string()
    .email("E-mail inválido")
    .max(100, "E-mail não pode exceder 100 caracteres"),

  phone: z
    .string()
    .min(11, "Telefone deve estar completo.")
    .or(z.literal("")),

  birthDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || validateInput(val, "birthDate"),
      "Data de nascimento inválida"
    )
    .or(z.literal("")),


  entryDate: z
    .string()
    .optional()
    .refine(
      (val) => !val || validateInput(val, "entryDate"),
      "Data de entrada inválida"
    )
    .or(z.literal("")),

});

type WorkerFormData = z.infer<typeof workerSchema>;

export { workerSchema };
export type { WorkerFormData };
