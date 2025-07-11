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
import { useState } from "react";
import InputDate from "@/components/shared/InputDate";
import getTeam from "@/api/teamRoutes";
import Modal from "@/components/modal/Modal";
import IconHappy from "@/assets/images/famicons_happy.png";
import IconSad from "@/assets/images/famicons_sad.png";
import { createWorker } from "@/api/workerRoutes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Motion } from "@/components/animation/Motion";
import { workerSchema, WorkerFormData } from "@/schemas/workerSchema";
import { getBorderColor, handleInputChange } from "@/utils/formUtils";

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
    queryFn: () => getTeam(),
    staleTime: 1000 * 60 * 5,
    queryKey: ["teams"],
  });

  const [isModalSuccessVisible, setIsModalSucessVisible] = useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    setValue,
    trigger,
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

  const handleFormSubmit = handleSubmit(onSubmit, () => {
    showErrorModal();
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
            height="h-[700px]"
          >
            <form onSubmit={handleFormSubmit}>
              <InputTitle title="Colaborador" />
              <div className="flex gap-4 items-start justify-normal">
                <InputString
                  {...register("firstName")}
                  onChange={(e) =>
                    handleInputChange(setValue, trigger, "firstName", e.target.value)
                  }
                  title="NOME"
                  width="w-1/2"
                  height="h-8"
                  placeholder="Digite o nome..."
                  isMandatory
                  borderColor={getBorderColor("firstName", errors, touchedFields as Record<string, boolean>)}
                  errorMessage={errors.firstName?.message}
                />
                <InputString
                  {...register("lastName")}
                  onChange={(e) =>
                    handleInputChange(setValue, trigger, "lastName", e.target.value)
                  }
                  title="SOBRENOME"
                  width="w-1/2"
                  isMandatory={false}
                  height="h-8"
                  placeholder="Digite o sobrenome..."
                  borderColor={getBorderColor("lastName", errors, touchedFields as Record<string, boolean>)}
                  errorMessage={errors.lastName?.message}
                />
              </div>

              <div className="flex gap-4 items-start justify-normal">
                <InputString
                  {...register("cnpj")}
                  onChange={(e) =>
                    handleInputChange(setValue, trigger, "cnpj", e.target.value)
                  }
                  title="CNPJ"
                  width="w-1/2"
                  height="h-8"
                  isMandatory={false}

                  placeholder="__.___.___/____-__"
                  mask="99.999.999/9999-99"
                  borderColor={getBorderColor("cnpj", errors, touchedFields as Record<string, boolean>)}
                  errorMessage={errors.cnpj?.message}
                />
                <Select
                  {...register("roleId", { valueAsNumber: true })}
                  onChange={(e) =>
                    handleInputChange(setValue, trigger, "roleId", Number(e.target.value))
                  }
                  options={mockRoles}
                  title="CARGO"
                  isMandatory
                  width="w-1/2"
                  errorMessage={errors.roleId?.message}
                />
              </div>

              <div className="flex flex-row gap-4 w-full items-center">
                <Select
                  {...register("sectorId", { valueAsNumber: true })}
                  onChange={(e) =>
                    handleInputChange(setValue, trigger, "sectorId", Number(e.target.value))
                  }
                  options={mockSectors}
                  title="SETOR"
                  isMandatory
                  width="w-1/2"
                  errorMessage={errors.sectorId?.message}
                />
                <div className="flex gap-4 flex-row justify-normal items-center w-full">
                  <Select
                    {...register("selectedTeam", { valueAsNumber: true })}
                    onChange={(e) =>
                      handleInputChange(setValue, trigger, "selectedTeam", Number(e.target.value))
                    }
                    options={
                      isLoadingTeams
                        ? [{ id: 0, name: "Carregando..." }]
                        : isErrorTeams
                        ? [{ id: 0, name: "Erro ao carregar." }]
                        : teamsResponse?.map((t) => ({
                            id: t.id_equipe,
                            name: t.nome_equipe,
                          })) || []
                    }
                    title="EQUIPE"
                    isMandatory
                    width="w-1/2"
                    errorMessage={errors.selectedTeam?.message}
                  />
                  <PlainButton
                    title="NOVA EQUIPE"
                    color="bg-customYellow"
                    width="w-1/2"
                  />
                </div>
              </div>

              <div className="flex gap-4 flex-row justify-between items-start w-[100%]">
                <InputString
                  {...register("email")}
                  onChange={(e) =>
                    handleInputChange(setValue, trigger, "email", e.target.value)
                  }
                  title="E-MAIL"
                  width="w-[50%]"
                  height="h-8"
                  placeholder="Digite o e-mail..."
                  isMandatory
                  borderColor={getBorderColor("email", errors, touchedFields as Record<string, boolean>)}
                  errorMessage={errors.email?.message}
                />
                <InputString
                  {...register("phone")}
                  onChange={(e) =>
                    handleInputChange(setValue, trigger, "phone", e.target.value)
                  }
                  title="TELEFONE"
                  width="w-[50%]"
                  height="h-8"
                  isMandatory={false}

                  placeholder="(__) _____-____"
                  mask="(99) 99999-9999"
                  borderColor={getBorderColor("phone", errors, touchedFields as Record<string, boolean>)}
                  errorMessage={errors.phone?.message}
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
