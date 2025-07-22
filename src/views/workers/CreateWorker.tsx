import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { workerSchema, WorkerFormData } from "@/schemas/workerSchema";
import { createWorker } from "@/api/workerRoutes";
import { getTeams } from "@/api/teamRoutes";
import { getBorderColor } from "@/utils/formUtils"; // A função handleInputChange não é mais necessária aqui

// Componentes de UI
import BackButton from "@/components/shared/BackButton";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import InputTitle from "@/components/title/InputTitle";
import PageTitle from "@/components/title/PageTitle";
import InputString from "@/components/shared/InputString";
import InputDate from "@/components/shared/InputDate";
import ColoredButton from "@/components/shared/ColoredButton";
import Select from "@/components/shared/Select";
import PlainButton from "@/components/shared/PlainButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";

// Ícones
import IconHappy from "@/assets/images/famicons_happy.png";
import IconSad from "@/assets/images/famicons_sad.png";

// --- DADOS MOCKADOS ---
const mockRoles = [
  { id: 1, name: "Administrador" },
  { id: 2, name: "Atendente" },
  { id: 3, name: "Funcionário" },
];

const mockSectors = [
  { id: 1, name: "Design" },
  { id: 2, name: "Social Media" },
];

const CreateWorker = () => {
  const navigate = useNavigate();

  const {
    data: teamsResponse,
    isLoading: isLoadingTeams,
    isError: isErrorTeams,
  } = useQuery({
    queryFn: () => getTeams(),
    staleTime: 1000 * 60 * 5,
    queryKey: ["teams"],
  });

  const [isModalSuccessVisible, setIsModalSucessVisible] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cnpj: "",
      roleId: 0,
      sectorId: 0,
      selectedTeam: 0,
      email: "",
      phone: "",
      birthDate: "",
      entryDate: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const showSuccessModal = () => setIsModalSucessVisible(true);
  const showErrorModal = () => setIsModalErrorVisible(true);

  const registerWorkerForm = async (data: WorkerFormData) => {
    return createWorker({
      first_name: data.firstName,
      last_name: data.lastName,
      cnpj: data.cnpj,
      email: data.email,
      telefone: data.phone,
      data_aniversario: data.birthDate ?? "",
      data_entrada: data.entryDate ?? "",
      role_id: data.roleId,
      id_equipe: data.selectedTeam,
    });
  };

  const onSubmit = async (data: WorkerFormData) => {
    try {
      const response = await registerWorkerForm(data);
      const success = response?.status === 201 || response?.success;
      success ? showSuccessModal() : showErrorModal();
    } catch (error) {
      console.error("Erro ao criar colaborador:", error);
      showErrorModal();
    }
  };

  // Envolvemos o onSubmit em handleSubmit para que a validação ocorra primeiro.
  // O segundo argumento de handleSubmit é opcional para tratar erros de validação.
  const handleFormSubmit = handleSubmit(onSubmit, () => {
    // Você pode adicionar uma lógica aqui caso o formulário seja inválido,
    // mas o Zod já vai exibir as mensagens de erro nos campos.
    console.log("Erro de validação do formulário.");
  });

  return (
    <>
      {isModalSuccessVisible && (
        <Modal
          title="Sucesso!"
          description="O colaborador foi cadastrado com sucesso."
          onClick1={() => navigate("/configuracoes/colaboradores")}
          isModalVisible
          buttonTitle1="OK"
          iconImage={IconHappy}
        />
      )}

      {isModalErrorVisible && (
        <Modal
          title="Erro!"
          description="Não foi possível cadastrar o colaborador. Verifique os dados ou tente novamente."
          onClick1={() => setIsModalErrorVisible(false)}
          isModalVisible
          buttonTitle1="FECHAR"
          iconImage={IconSad}
        />
      )}

      <BaseScreen>
        <BackButton onClick={() => navigate("/configuracoes/colaboradores")} />
        <PageTitle
          icon="fa-solid fa-circle-plus"
          marginTop="mt-4"
          title="Cadastrar Colaborador"
        />

        <Motion>
          <Box
            title="Novo Colaborador"
            subtitle="Cadastre um colaborador aqui."
            width="w-full"
            height="h-fit"
          >
            <form onSubmit={handleFormSubmit}>
              <InputTitle title="Colaborador" />
              <div className="flex gap-4 items-start justify-normal">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputString
                      {...field}
                      title="NOME"
                      width="w-1/2"
                      height="h-8"
                      placeholder="Digite o nome..."
                      isMandatory
                      borderColor={getBorderColor("firstName", errors, touchedFields)}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputString
                      {...field}
                      title="SOBRENOME"
                      width="w-1/2"
                      isMandatory={false}
                      height="h-8"
                      placeholder="Digite o sobrenome..."
                      borderColor={getBorderColor("lastName", errors, touchedFields)}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              <div className="flex gap-4 items-start justify-normal">
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputString
                      {...field}
                      title="CNPJ"
                      width="w-1/2"
                      height="h-8"
                      isMandatory={false}
                      placeholder="__.___.___/____-__"
                      mask="00.000.000/0000-00"
                      borderColor={getBorderColor("cnpj", errors, touchedFields)}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="roleId"
                  control={control}
                  render={({ field }) => (
                     <Select
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Converte para número
                        options={mockRoles}
                        title="CARGO"
                        isMandatory
                        width="w-1/2"
                        errorMessage={errors.roleId?.message}
                      />
                  )}
                />
              </div>

              <div className="flex flex-row gap-4 w-full items-center">
                 <Controller
                  name="sectorId"
                  control={control}
                  render={({ field }) => (
                     <Select
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        options={mockSectors}
                        title="SETOR"
                        isMandatory
                        width="w-1/2"
                        errorMessage={errors.sectorId?.message}
                      />
                  )}
                />
                <div className="flex gap-4 flex-row justify-normal items-center w-full">
                   <Controller
                      name="selectedTeam"
                      control={control}
                      render={({ field }) => (
                         <Select
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            options={
                              isLoadingTeams
                                ? [{ id: 0, name: "Carregando..." }]
                                : isErrorTeams
                                ? [{ id: 0, name: "Erro ao carregar." }]
                                : teamsResponse?.map((t: any) => ({
                                    id: t.id_equipe,
                                    name: t.nome_equipe,
                                  })) || []
                            }
                            title="EQUIPE"
                            isMandatory
                            width="w-1/2"
                            errorMessage={errors.selectedTeam?.message}
                          />
                      )}
                    />
                  <PlainButton
                    title="NOVA EQUIPE"
                    color="bg-customYellow"
                    width="w-1/2"
                  />
                </div>
              </div>

              <div className="flex gap-4 flex-row justify-between items-start w-[100%]">
                 <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputString
                        {...field}
                        title="E-MAIL"
                        width="w-[50%]"
                        height="h-8"
                        placeholder="Digite o e-mail..."
                        isMandatory
                        borderColor={getBorderColor("email", errors, touchedFields)}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputString
                      {...field}
                      title="TELEFONE"
                      width="w-[50%]"
                      height="h-8"
                      isMandatory={false}
                      placeholder="(__) _____-____"
                      mask="(00) 00000-0000"
                      borderColor={getBorderColor("phone", errors, touchedFields)}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              <div className="flex gap-4 flex-row justify-between items-start w-[100%]">
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field, fieldState }) => (
                    <InputDate
                      value={field.value}
                      onChange={field.onChange}
                      title="DATA DE NASCIMENTO"
                      isMandatory={false}
                      width="w-[50%]"
                      borderColor={fieldState.error ? "#EF4444" : "#F6BC0A"}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="entryDate"
                  render={({ field, fieldState }) => (
                    <InputDate
                      value={field.value}
                      onChange={field.onChange}
                      title="DATA DE ENTRADA"
                      isMandatory={false}
                      width="w-[50%]"
                      borderColor={fieldState.error ? "#EF4444" : "#F6BC0A"}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              <div className="w-[100%] flex justify-center mt-6">
                <ColoredButton
                  type="submit"
                  title="CADASTRAR COLABORADOR"
                  color="customYellow"
                  width="w-[40%]"
                  justify="justify-center"
                  icon="fa-solid fa-floppy-disk"
                />
              </div>
            </form>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default CreateWorker;