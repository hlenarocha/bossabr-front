// hooks e bibliotecas
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import InputDate from "@/components/shared/InputDate";
import SearchableSelect from "@/components/shared/SearchableSelect";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";

// API, schemas, hooks e assets
import { workerSchema, WorkerFormData } from "@/schemas/workerSchema";
import {
  getWorkerFormData,
  updateWorkerById,
  WorkerDTO,
  WorkerItem,
} from "@/api/workerRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import { useReadWorkerById } from "@/hooks/worker/useReadWorkerById";
import { useDeleteWorker } from "@/hooks/worker/useDeleteWorker";
import IconSad from "@/assets/images/famicons_sad.png";

const EditWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const workerId = Number(id);

  // --- BUSCA DE DADOS ---
  const {
    data: workerData,
    isLoading: isLoadingData,
    isError,
  } = useReadWorkerById(workerId);
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["workerFormData"],
    queryFn: getWorkerFormData,
  });

  // --- MUTAÇÕES (UPDATE E DELETE) ---
  const {
    mutate: update,
    isPending: isUpdating,
    isErrorModalVisible: isUpdateErrorModalVisible,
    errorModalMessage: updateErrorMessage,
    closeErrorModal: closeUpdateErrorModal,
  } = useResourceMutation<WorkerDTO, WorkerItem>({
    mutationFn: (vars) => updateWorkerById(vars.id!, vars.payload),
    successToastMessage: "Colaborador atualizado com sucesso!",
    successNavigationRoute: "/configuracoes/colaboradores",
    errorModalMessage: "Não foi possível atualizar o colaborador.",
  });

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteWorker();
  const [isDeleteErrorModalVisible, setDeleteErrorModalVisible] =
    useState(false);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
    mode: "onChange", // Adicionado para consistência
  });

  useEffect(() => {


    if (workerData) {
     // console.log("DADOS DO BACK: ", workerData);

      reset({
        firstName: workerData.first_name,
        lastName: workerData.last_name,
        email: workerData.email,
        phone: workerData.telefone,
        birthDate: workerData.data_nascimento,
        entryDate: workerData.data_entrada,
        roleId: workerData.id_cargo,
        teamId: workerData.id_equipe,
        cnpj: workerData.cnpj,
      });
    }
  }, [workerData, reset]);

  const onUpdateSubmit = (data: WorkerFormData) => {
    const payload: WorkerDTO = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      telefone: data.phone,
      data_nascimento: data.birthDate || "",
      data_entrada: data.entryDate || "",
      id_cargo: data.roleId,
      id_equipe: data.teamId,
      cnpj: data.cnpj || "",
    };

    console.log("DADOS SENDO ENVIADOS: ", payload);

    update({ id: workerId, payload });
    
  };

  const handleDeleteConfirm = () => {
    deleteItem(workerId, {
      onSuccess: () => {
        navigate("/configuracoes/colaboradores", {
          state: {
            toastMessage: `Colaborador "${workerData?.first_name}" excluído com sucesso!`,
          },
        });
      },
      onError: () => {
        setDeleteConfirmModalVisible(false);
        setDeleteErrorModalVisible(true);
      },
    });
  };

  const roleOptions =
    formData?.cargos?.map((role) => ({
      value: role.id_cargo,
      label: role.cargo,
    })) || [];
  const teamOptions =
    formData?.equipes?.map((team) => ({
      value: team.id_equipe,
      label: `${team.nome_equipe} - ${team.nome_setor}`,
    })) || [];

  const isLoading = isLoadingData || isLoadingFormData;

  return (
    <>
      <Modal
        title="Confirmar Exclusão"
        isModalVisible={isDeleteConfirmModalVisible}
        description={`Tem certeza que deseja excluir o colaborador "${workerData?.first_name}"? Esta ação não pode ser desfeita.`}
        onClick1={() => setDeleteConfirmModalVisible(false)}
        buttonTitle1="CANCELAR"
        buttonColor1="bg-customYellow"
        onClick2={handleDeleteConfirm}
        buttonTitle2="CONFIRMAR"
        buttonColor2="bg-customRedAlert"
        iconName="fa-circle-exclamation"
        iconColor="text-customRedAlert"
      />
      <Modal
        title="Erro na Atualização"
        isModalVisible={isUpdateErrorModalVisible}
        description={updateErrorMessage}
        onClick1={closeUpdateErrorModal}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
        isError
      />
      <Modal
        title="Erro na Exclusão"
        isModalVisible={isDeleteErrorModalVisible}
        description="Não foi possível excluir o colaborador."
        onClick1={() => setDeleteErrorModalVisible(false)}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
        isError
      />

      <BaseScreen>
        <BackButton onClick={() => navigate("/configuracoes/colaboradores")} />
        <PageTitle
          marginTop="mt-4"
          icon="fa-solid fa-pencil"
          title="Editar Colaborador"
        />
        <Motion>
          <Box
            width="w-full"
            height="h-fit"
            title={`Detalhes de: ${workerData?.first_name || "Carregando..."}`}
            subtitle="Altere os dados ou exclua o colaborador."
          >
            <StatusView isLoading={isLoading} isError={isError}>
              <form onSubmit={handleSubmit(onUpdateSubmit)}>
                <InputTitle title="Dados Pessoais" />
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          title="NOME"
                          width="w-1/2"
                          isMandatory
                          placeholder="Digite o nome..."
                          errorMessage={errors.firstName?.message}
                          height="h-[40px]"
                          borderColor={
                            errors.firstName
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                        />
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          title="SOBRENOME"
                          width="w-1/2"
                          placeholder="Digite o sobrenome..."
                          errorMessage={errors.lastName?.message}
                          height="h-[40px]"
                          isMandatory={false}
                          borderColor={
                            errors.lastName
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          title="E-MAIL"
                          width="w-1/2"
                          isMandatory
                          placeholder="Digite o e-mail..."
                          errorMessage={errors.email?.message}
                          height="h-[40px]"
                          borderColor={
                            errors.email
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                        />
                      )}
                    />
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          title="TELEFONE"
                          width="w-1/2"
                          placeholder="(__) _____-____"
                          mask="(00) 00000-0000"
                          errorMessage={errors.phone?.message}
                          isMandatory={false}
                          height="h-[40px]"
                          borderColor={
                            errors.phone
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                        />
                      )}
                    />
                  </div>
                  <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                      <InputDate
                        {...field}
                        title="DATA DE NASCIMENTO"
                        width="w-1/2"
                        errorMessage={errors.birthDate?.message}
                        isMandatory={false}
                        height="h-[40px]"
                        borderColor={errors.birthDate ? "#EF4444" : "#F6BC0A"}
                      />
                    )}
                  />
                </div>

                <InputTitle marginTop="mt-4" title="Dados Profissionais" />
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Controller
                      name="roleId"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          title="CARGO"
                          isMandatory
                          width="w-1/2"
                          options={roleOptions}
                          value={
                            roleOptions.find(
                              (opt) => opt.value === field.value
                            ) || null
                          }
                          onChange={(option) => field.onChange(option?.value)}
                          placeholder={
                            isLoadingFormData
                              ? "Carregando..."
                              : "Selecione um cargo"
                          }
                          errorMessage={errors.roleId?.message}
                        />
                      )}
                    />
                    <Controller
                      name="teamId"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          title="EQUIPE"
                          isMandatory
                          width="w-1/2"
                          options={teamOptions}
                          value={
                            teamOptions.find(
                              (opt) => opt.value === field.value
                            ) || null
                          }
                          onChange={(option) => field.onChange(option?.value)}
                          placeholder={
                            isLoadingFormData
                              ? "Carregando..."
                              : "Selecione uma equipe"
                          }
                          errorMessage={errors.teamId?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Controller
                      name="entryDate"
                      control={control}
                      render={({ field }) => (
                        <InputDate
                          {...field}
                          title="DATA DE ENTRADA"
                          width="w-1/2"
                          errorMessage={errors.entryDate?.message}
                          isMandatory={false}
                          height="h-[40px]"
                          borderColor={errors.entryDate ? "#EF4444" : "#F6BC0A"}
                        />
                      )}
                    />
                    <Controller
                      name="cnpj"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          value={field.value || ""}

                          title="CNPJ"
                          width="w-1/2"
                          placeholder="__.___.___/____-__"
                          mask="00.000.000/0000-00"
                          errorMessage={errors.cnpj?.message}
                          height="h-[40px]"
                          isMandatory={false}
                          borderColor={
                            errors.cnpj
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                  <ColoredButton
                    type="button"
                    onClick={() => setDeleteConfirmModalVisible(true)}
                    title={isDeleting ? "EXCLUINDO..." : "EXCLUIR COLABORADOR"}
                    color="customRedAlert"
                    icon="fa-solid fa-trash"
                    width="w-full sm:w-auto"
                    justify="justify-center"
                    borderColor="border-customRedAlert"
                  />
                  <ColoredButton
                    type="submit"
                    title={isUpdating ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
                    color="customYellow"
                    icon="fa-solid fa-floppy-disk"
                    width="w-full sm:w-auto"
                    justify="justify-center"
                  />
                </div>
              </form>
            </StatusView>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default EditWorker;
