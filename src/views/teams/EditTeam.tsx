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
import InputString from "@/components/shared/InputString";
import SearchableSelect from "@/components/shared/SearchableSelect";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";

// API, schemas, hooks e assets
import { teamSchema, TeamFormData } from "@/schemas/teamSchema";
import {
  getTeamFormData,
  updateTeamById,
  TeamDTO,
  TeamItem,
} from "@/api/teamRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import { useReadTeamById } from "@/hooks/teams/useReadTeamById";
import { useDeleteTeam } from "@/hooks/teams/useDeleteTeam";
import IconSad from "@/assets/images/famicons_sad.png";

const EditTeam = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const teamId = Number(id);

  const {
    data: teamData,
    isLoading: isLoadingData,
    isError,
  } = useReadTeamById(teamId);
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["teamFormData"],
    queryFn: getTeamFormData,
  });

  const {
    mutate: update,
    isPending: isUpdating,
    isErrorModalVisible: isUpdateErrorModalVisible,
    errorModalMessage: updateErrorMessage,
    closeErrorModal: closeUpdateErrorModal,
  } = useResourceMutation<TeamDTO, TeamItem>({
    mutationFn: (vars) => updateTeamById(vars.id!, vars.payload),
    successToastMessage: "Equipe atualizada com sucesso!",
    successNavigationRoute: "/configuracoes/equipes",
    errorModalMessage: "Não foi possível atualizar a equipe.",
  });

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteTeam();
  const [isDeleteErrorModalVisible, setDeleteErrorModalVisible] =
    useState(false);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
  });

  useEffect(() => {
    if (teamData) {
      reset({
        teamName: teamData.nome_equipe,
        sectorId: teamData.id_setor,
        responsibleId: teamData.responsavel_equipe,
        isInternal: teamData.equipe_interna,
      });
    }
  }, [teamData, reset]);

  const onUpdateSubmit = (data: TeamFormData) => {
    const payload: TeamDTO = {
      nome_equipe: data.teamName,
      id_setor: data.sectorId,
      responsavel_equipe: data.responsibleId,
      equipe_interna: data.isInternal,
    };
    update({ id: teamId, payload });
  };

  const handleDeleteConfirm = () => {
    deleteItem(teamId, {
      onSuccess: () => {
        navigate("/configuracoes/equipes", {
          state: {
            toastMessage: `Equipe "${teamData?.nome_equipe}" excluída com sucesso!`,
          },
        });
      },
      onError: () => {
        setDeleteConfirmModalVisible(false);
        setDeleteErrorModalVisible(true);
      },
    });
  };

  console.log("DADOS FORM:", formData?.pessoas);

  const sectorOptions =
    formData?.setores?.map((s) => ({
      value: s.id_setor,
      label: s.nome_setor,
    })) || [];

  const responsibleOptions =
    formData?.pessoas?.map((p) => ({
      value: p.id_pessoa,
      // Combina nome e sobrenome se houver
      label: p.first_name + (p.last_name ? ` ${p.last_name}` : ""),
    })) || [];

  // LÓGICA DE SEGURANÇA: Garante que o valor atual esteja na lista de opções
  if (
    teamData?.id_setor &&
    !sectorOptions.some((opt) => opt.value === teamData.id_setor)
  ) {
    sectorOptions.push({
      value: teamData.id_setor,
      label: teamData.nome_setor || `Setor ID: ${teamData.id_setor}`,
    });
  }

  if (
    teamData?.responsavel_equipe &&
    !responsibleOptions.some((opt) => opt.value === teamData.responsavel_equipe)
  ) {
    responsibleOptions.push({
      value: teamData.responsavel_equipe,
      label:
        `${teamData.first_name || ""} ${teamData.last_name || ""}`.trim() ||
        `Responsável ID: ${teamData.responsavel_equipe}`,
    });
  }

  const isLoading = isLoadingData || isLoadingFormData;

  return (
    <>
      <Modal
        title="Confirmar Exclusão"
        isModalVisible={isDeleteConfirmModalVisible}
        description={`Tem certeza que deseja excluir a equipe "${teamData?.nome_equipe}"? Esta ação não pode ser desfeita.`}
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
        description="Não foi possível excluir a equipe."
        onClick1={() => setDeleteErrorModalVisible(false)}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
        isError
      />

      <BaseScreen>
        <BackButton onClick={() => navigate("/configuracoes/equipes")} />
        <PageTitle
          marginTop="mt-4"
          icon="fa-solid fa-pencil"
          title="Editar Equipe"
        />
        <Motion>
          <Box
            width="w-full"
            height="h-fit"
            title={`Detalhes de: ${teamData?.nome_equipe || ""}`}
            subtitle="Altere os dados ou exclua a equipe."
          >
            <StatusView isLoading={isLoading} isError={isError}>
              <form onSubmit={handleSubmit(onUpdateSubmit)}>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-row gap-4 items-end">
                    <Controller
                      name="teamName"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          title="NOME DA EQUIPE"
                          width="w-2/3"
                          height="h-[40px]"
                          isMandatory
                          placeholder="Digite o nome da equipe..."
                          errorMessage={errors.teamName?.message}
                          borderColor={
                            errors.teamName
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                        />
                      )}
                    />
                    <div className="w-1/3 mb-1">
                      <Controller
                        name="isInternal"
                        control={control}
                        render={({ field }) => (
                          <ToggleSwitch
                            isMandatory={true}
                            title="EQUIPE INTERNA?"
                            isChecked={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-4">
                    <Controller
                      name="sectorId"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          title="SETOR"
                          isMandatory
                          width="w-1/2"
                          options={sectorOptions}
                          value={
                            sectorOptions.find(
                              (c) => c.value === field.value
                            ) || null
                          }
                          onChange={(option) => field.onChange(option?.value)}
                          placeholder={
                            isLoadingFormData
                              ? "Carregando..."
                              : "Selecione um setor"
                          }
                          errorMessage={errors.sectorId?.message}
                        />
                      )}
                    />
                    <Controller
                      name="responsibleId"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          title="RESPONSÁVEL PELA EQUIPE"
                          isMandatory
                          width="w-1/2"
                          options={responsibleOptions}
                          value={
                            responsibleOptions.find(
                              (c) => c.value === field.value
                            ) || null
                          }
                          onChange={(option) => field.onChange(option?.value)}
                          placeholder={
                            isLoadingFormData
                              ? "Carregando..."
                              : "Selecione um responsável"
                          }
                          errorMessage={errors.responsibleId?.message}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                  <ColoredButton
                    type="button"
                    onClick={() => setDeleteConfirmModalVisible(true)}
                    title={isDeleting ? "EXCLUINDO..." : "EXCLUIR EQUIPE"}
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

export default EditTeam;
