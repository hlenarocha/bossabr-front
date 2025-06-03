import { useNavigate } from "react-router-dom";
import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import PageTitle from "@/components/title/PageTitle";
import InputString from "@/components/shared/InputString";
import ColoredButton from "@/components/shared/ColoredButton";
import Select from "@/components/shared/Select";
import PlainButton from "@/components/shared/PlainButton";
import React, { useState } from "react";
import { validateInput } from "@/utils/validateInput";
import InputDate from "@/components/shared/InputDate";
import getTeam from "@/api/teamRoutes";
import Modal from "@/components/modal/Modal";
import IconHappy from "@/assets/images/famicons_happy.png";
import IconSad from "@/assets/images/famicons_sad.png";
import { createWorker } from "@/api/workerRoutes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

// schema de validação com Zod e react hook form
// para o formulário de cadastro de colaborador
const workerSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome não pode exceder 100 caracteres"),
  email: z
    .string()
    .email("E-mail inválido")
    .max(100, "E-mail não pode exceder 100 caracteres"),
  phone: z
    .string()
    .refine((val) => !val || validateInput(val, "phone"), "Telefone inválido"),
  selectedTeam: z.number().min(1, "Selecione uma equipe"),
  birthday: z
    .string()
    .optional()
    .refine(
      (val) => !val || validateInput(val, "birthdayDate"),
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

const CreateWorker = () => {
  const navigate = useNavigate();

  const {
    data: teamsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getTeam(),
    staleTime: 1000 * 60 * 5, // dados "fresh" por 5 min
    queryKey: ["teams"], // chave única para a query
    // cria cache de dados, otimizando a necessidade de requisições
    // o useMutation é utilizado qnd há updates -> quando há sucesso, queryKey deve dar refetch nos dados
  });

  const [isModalSuccessVisible, setIsModalSucessVisible] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
  const [isModalFailedVisible, setIsModalFailedVisible] = useState(false);
  const [isModalFailedDatesVisible, setIsModalFailedDatesVisible] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
    setValue,
    trigger,
  } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      selectedTeam: 0,
      birthday: "",
      entryDate: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const getBorderColor = (fieldName: keyof WorkerFormData) => {
    if (fieldName === "entryDate" || fieldName === "birthday") {
      if (errors[fieldName]) {
        return "#EF4444";
      }

      return "#F6BC0A";
    }

    if (touchedFields[fieldName] && errors[fieldName]) {
      return "border-customRedAlert";
    }

    return "border-customYellow";
  };

  const handleInputChange = async (
    fieldName: keyof WorkerFormData,
    value: string | number
  ) => {
    setValue(fieldName, value, { shouldTouch: true, shouldValidate: true });
    await trigger(fieldName);
  };

  const onSubmit = async (data: WorkerFormData) => {
    try {
      const response = await createWorker({
        first_name: data.name,
        //last_name: "",
        email: data.email,
        telefone: data.phone,
        data_aniversario: data.birthday ?? "",
        data_entrada: data.entryDate ?? "",
        role: "funcionario",
        id_equipe: data.selectedTeam,
      });

      if (
        // verificar documentação da API para saber se o status é 200 ou 201
        response?.status === 200 ||
        response?.success === true ||
        response?.status === 201
      ) {
        setIsModalSucessVisible(true);
      } else {
        setIsModalErrorVisible(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsModalErrorVisible(true);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit, (errors) => {
    console.log(errors);
    setIsModalErrorVisible(true);
  });

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <>
      <Modal
        title="Sucesso!"
        description="A operação de cadastro do (a) colaborador (a) foi concluída."
        onClick1={() => setIsModalSucessVisible(false)}
        isModalVisible={isModalSuccessVisible}
        buttonTitle1="OK"
        iconImage={IconHappy}
      ></Modal>
      <Modal
        title="Erro!"
        description="A operação de cadastro do (a) colaborador (a) NÃO foi concluída."
        onClick1={() => setIsModalErrorVisible(false)}
        isModalVisible={isModalErrorVisible}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
      ></Modal>
      <Modal
        title="Reveja os campos obrigatórios!"
        description="Preencha todos os campos obrigatórios (*) corretamente."
        onClick1={() => setIsModalFailedVisible(false)}
        isModalVisible={isModalFailedVisible}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
      ></Modal>
      <Modal
        title="Reveja os campos de data!"
        description="Preencha os campos de data com datas válidas."
        onClick1={() => setIsModalFailedDatesVisible(false)}
        isModalVisible={isModalFailedDatesVisible}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
      ></Modal>

      <BaseScreen>
        <BackButton
          onClick={() => handleNavigate("/settings/configure-worker")}
        ></BackButton>
        <PageTitle marginTop="mt-4" title="Cadastrar Colaborador"></PageTitle>

        <Box
          title="Cadastrar"
          subtitle="Cadastre um colaborador aqui."
          width="xl:w-[1000px] w-[600px] lg:w-[800px]"
          height="h-[700px]"
        >
          <form onSubmit={handleFormSubmit}>
            <InputTitle title="Colaborador" />
            <InputString
              {...register("name")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("name", e.target.value);
              }}
              title="NOME DO COLABORADOR"
              width="w-[100%]"
              height="h-8"
              placeholder="Digite o nome..."
              isMandatory={true}
              stringType="text"
              borderColor={getBorderColor("name")}
              errorMessage={errors.name?.message}
            ></InputString>

            <div className="flex gap-4 flex-row justify-normal items-center w-[100%]">
              <Select
                {...register("selectedTeam", { valueAsNumber: true })}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleInputChange("selectedTeam", e.target.value);
                }}
                options={
                  isLoading
                    ? [
                        {
                          id: 0,
                          name: "Carregando...",
                          className: "text-customYellow",
                        },
                      ]
                    : isError
                    ? [
                        {
                          id: 0,
                          name: "Erro.",
                          className: "text-customRedAlert",
                        },
                      ]
                    : teamsResponse?.map((t) => {
                        return {
                          id: t.id_equipe,
                          name: t.nome_equipe,
                        };
                      }) || []
                }
                title="EQUIPE"
                isMandatory={true}
                width="w-[70%]"
                errorMessage={errors.selectedTeam?.message}
              ></Select>
             
              {isError && (
                <span className="text-customRedAlert text-xs mt-4">Erro ao carregar equipes.</span>
              )}
              
              <PlainButton
                title="NOVA EQUIPE"
                color="bg-customYellow"
                width="w-[30%]"
              ></PlainButton>
            </div>

            <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
              <InputString
                {...register("email")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange("email", e.target.value);
                }}
                title="E-MAIL"
                width="w-[50%]"
                height="h-8"
                placeholder="Digite o email..."
                isMandatory={true}
                borderColor={getBorderColor("email")}
                stringType="email"
                errorMessage={errors.email?.message}
              ></InputString>
              <InputString
                {...register("phone")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange("phone", e.target.value);
                }}
                title="TELEFONE"
                width="w-[50%]"
                height="h-8"
                placeholder="(__) _____-____"
                isMandatory={true}
                mask="(99) 99999-9999"
                borderColor={getBorderColor("phone")}
                errorMessage={errors.phone?.message}
              ></InputString>
            </div>

            <div className="flex gap-4 flex-row justify-between items-center w-[100%]">
              <InputDate
                {...register("birthday")}
                onChange={(value: string) => {
                  setValue("birthday", value, { shouldValidate: true });
                }}
                title="DATA DE NASCIMENTO"
                isMandatory={false}
                width="w-[50%]"
                borderColor={getBorderColor("birthday")}
                errorMessage={errors.birthday?.message}
                value={watch("birthday")}
              ></InputDate>
              <InputDate
                {...register("entryDate")}
                onChange={(value: string) => {
                  setValue("entryDate", value, { shouldValidate: true });
                }}
                title="DATA DE ENTRADA"
                isMandatory={false}
                width="w-[50%]"
                borderColor={getBorderColor("entryDate")}
                errorMessage={errors.entryDate?.message}
                value={watch("entryDate")}
              ></InputDate>
            </div>

            <div className="w-[100%] flex justify-center mt-6">
              <ColoredButton
                type="submit"
                title="SALVAR"
                color="customYellow"
                width="w-[180px]"
                justify="justify-center"
                icon="fa-solid fa-floppy-disk"
              ></ColoredButton>
            </div>
          </form>
        </Box>
      </BaseScreen>
    </>
  );
};

export default CreateWorker;
