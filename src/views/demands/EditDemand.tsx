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
import TextArea from "@/components/shared/TextArea";
import InputQuantity from "@/components/shared/InputQuantity";
import SearchableSelect from "@/components/shared/SearchableSelect";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";

// API, schemas, hooks e assets
import { demandSchema, DemandFormData } from "@/schemas/demandSchema";
import {
  getDemandFormData,
  updateDemandById,
  DemandDTO,
  DemandItem,
} from "@/api/demandRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import { useReadDemandById } from "@/hooks/demands/useReadDemandById";
import { useDeleteDemand } from "@/hooks/demands/useDeleteDemand";
import IconSad from "@/assets/images/famicons_sad.png";

const EditDemand = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const demandId = Number(id);

  const {
    data: demandData,
    isLoading: isLoadingData,
    isError,
  } = useReadDemandById(demandId);
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["demandFormData"],
    queryFn: getDemandFormData,
  });

  const {
    mutate: update,
    isPending: isUpdating,
    isErrorModalVisible: isUpdateErrorModalVisible,
    errorModalMessage: updateErrorMessage,
    closeErrorModal: closeUpdateErrorModal,
  } = useResourceMutation<DemandDTO, DemandItem>({
    mutationFn: (vars) => updateDemandById(vars.id!, vars.payload),
    successToastMessage: "Demanda atualizada com sucesso!",
    successNavigationRoute: "/configuracoes/demandas",
    errorModalMessage: "Não foi possível atualizar a demanda.",
  });

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteDemand();
  const [isDeleteErrorModalVisible, setDeleteErrorModalVisible] =
    useState(false);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false);

  // --- LÓGICA DO FORMULÁRIO ---
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemandFormData>({
    resolver: zodResolver(demandSchema),
  });

  useEffect(() => {
    if (demandData) {
      reset({
        clientId: demandData.id_cliente,
        serviceId: demandData.id_tipo_servico,
        personId: demandData.id_pessoa,
        statusId: demandData.id_status,
        description: demandData.descricao || "",
        quantity: demandData.quantidade,
        driveLink: demandData.link_drive || "",
        deadline: demandData.prazo,
      });
    }
  }, [demandData, reset]);

  const onUpdateSubmit = (data: DemandFormData) => {
    const payload: DemandDTO = {
      id_cliente: data.clientId,
      id_tipo_servico: data.serviceId,
      prazo: data.deadline,
      id_pessoa: data.personId,
      id_status: data.statusId,
      descricao: data.description || "",
      link_drive: data.driveLink || "",
      quantidade: data.quantity,
    };
    update({ id: demandId, payload });
  };

  const handleDeleteConfirm = () => {
    deleteItem(demandId, {
      onSuccess: () => {
        navigate("/configuracoes/demandas", {
          state: {
            toastMessage: `Demanda #${demandData?.id_demanda} excluída com sucesso!`,
          },
        });
      },
      onError: () => {
        setDeleteConfirmModalVisible(false);
        setDeleteErrorModalVisible(true);
      },
    });
  };

  const clientOptions =
    formData?.clientes?.map((c) => ({
      value: c.id_cliente,
      label: c.nome_empresa,
    })) || [];
  const serviceOptions =
    formData?.tiposServicos?.map((s) => ({
      value: s.id_tipo_servico,
      label: s.nome_servico,
    })) || [];
  const personOptions =
    formData?.pessoas?.map((p) => ({
      value: p.id_pessoa,
      label: p.first_name,
    })) || [];
  const statusOptions =
    formData?.status?.map((s) => ({ value: s.id_status, label: s.status })) ||
    [];

  const isLoading = isLoadingData || isLoadingFormData;

  return (
    <>
      <Modal
        title="Confirmar Exclusão"
        isModalVisible={isDeleteConfirmModalVisible}
        description={`Tem certeza que deseja excluir a Demanda #${demandData?.id_demanda}? Esta ação não pode ser desfeita.`}
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
        description="Não foi possível excluir a demanda."
        onClick1={() => setDeleteErrorModalVisible(false)}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
        isError
      />

      <BaseScreen>
        <BackButton onClick={() => navigate("/configuracoes/demandas")} />
        <PageTitle
          marginTop="mt-4"
          icon="fa-solid fa-pencil"
          title="Editar Demanda"
        />
        <Motion>
          <Box
            width="w-full"
            height="h-fit"
            title={`Detalhes da Demanda #${demandData?.id_demanda || ""}`}
            subtitle="Altere os dados ou exclua a demanda."
          >
            <StatusView isLoading={isLoading} isError={isError}>
              <form onSubmit={handleSubmit(onUpdateSubmit)}>
                <InputTitle title="Cliente" marginTop="mt-4" />
                <div className="w-2/3">
                  <Controller
                    name="clientId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="CLIENTE"
                        isMandatory
                        options={clientOptions}
                        value={
                          clientOptions.find((c) => c.value === field.value) ||
                          null
                        }
                        onChange={(option) => field.onChange(option?.value)}
                        placeholder={
                          isLoadingFormData
                            ? "Carregando..."
                            : "Pesquise um cliente..."
                        }
                        errorMessage={errors.clientId?.message}
                      />
                    )}
                  />
                </div>

                <InputTitle title="Serviço" marginTop="mt-4" />
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 flex-row w-full">
                    <Controller
                      name="serviceId"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          title="TIPO DE SERVIÇO"
                          isMandatory
                          options={serviceOptions}
                          value={
                            serviceOptions.find(
                              (s) => s.value === field.value
                            ) || null
                          }
                          onChange={(option) => field.onChange(option?.value)}
                          placeholder={
                            isLoadingFormData ? "Carregando..." : "Selecione..."
                          }
                          errorMessage={errors.serviceId?.message}
                          width="w-1/3"
                        />
                      )}
                    />
                    <Controller
                      name="deadline"
                      control={control}
                      render={({ field }) => (
                        <InputDate
                          title="PRAZO"
                          isMandatory
                          value={field.value}
                          onChange={field.onChange}
                          errorMessage={errors.deadline?.message}
                          borderColor={errors.deadline ? "#EF4444" : "#F6BC0A"}
                        />
                      )}
                    />
                  </div>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        title="DESCRIÇÃO DO SERVIÇO"
                        placeholder="Digite detalhes..."
                        isMandatory={false}
                        errorMessage={errors.description?.message}
                        height="h-[100px]"
                        borderColor={
                          errors.description
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                  <div className="flex flex-row gap-4">
                    <Controller
                      name="driveLink"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          value={field.value || ""}
                          title="LINK DO DRIVE"
                          isMandatory={false}
                          placeholder="Insira o link..."
                          width="w-2/3"
                          errorMessage={errors.driveLink?.message}
                          borderColor={
                            errors.driveLink
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                          height="h-[40px]"
                        />
                      )}
                    />
                    <Controller
                      name="quantity"
                      control={control}
                      render={({ field }) => (
                        <InputQuantity
                          title="QUANTIDADE"
                          isMandatory
                          value={field.value}
                          onChange={field.onChange}
                          borderColor={
                            errors.quantity
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                          errorMessage={errors.quantity?.message}
                          min={1}
                          width="w-1/3"
                          height="h-[40px]"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-4 w-full">
                  <div className="flex flex-col w-1/2">
                    <InputTitle title="Atribuição" marginTop="mt-4" />
                    <Controller
                      name="personId"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          title="RESPONSÁVEL"
                          isMandatory
                          options={personOptions}
                          value={
                            personOptions.find(
                              (p) => p.value === field.value
                            ) || null
                          }
                          onChange={(option) => field.onChange(option?.value)}
                          placeholder={
                            isLoadingFormData ? "Carregando..." : "Selecione..."
                          }
                          errorMessage={errors.personId?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <InputTitle title="Status" marginTop="mt-4" />
                    <Controller
                      name="statusId"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          title="STATUS"
                          isMandatory
                          options={statusOptions}
                          value={
                            statusOptions.find(
                              (s) => s.value === field.value
                            ) || null
                          }
                          onChange={(option) => field.onChange(option?.value)}
                          placeholder={
                            isLoadingFormData ? "Carregando..." : "Selecione..."
                          }
                          errorMessage={errors.statusId?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                  <ColoredButton
                    type="button"
                    onClick={() => setDeleteConfirmModalVisible(true)}
                    title={isDeleting ? "EXCLUINDO..." : "EXCLUIR DEMANDA"}
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

export default EditDemand;
