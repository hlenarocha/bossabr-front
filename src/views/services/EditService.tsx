import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useReadServiceById } from "@/hooks/service/useReadServiceById";
import { useDeleteService } from "@/hooks/service/useDeleteService";
import { useResourceMutation } from "@/hooks/useResourceMutation";

import { updateServiceById, ServiceDTO, getServiceFormData } from "@/api/serviceRoutes";
import { serviceSchema, ServiceFormData } from "@/schemas/serviceSchema";
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import Box from "@/components/box/BoxContent";
import InputString from "@/components/shared/InputString";
import InputQuantity from "@/components/shared/InputQuantity";
import SearchableSelect from "@/components/shared/SearchableSelect";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";
import IconSad from "@/assets/images/famicons_sad.png";
import { StatusView } from "@/components/shared/StatusView";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const serviceId = Number(id);

  const {
    data: serviceData,
    isLoading: isLoadingData,
    isError,
  } = useReadServiceById(serviceId);

  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["serviceFormData"],
    queryFn: getServiceFormData,
  });

  const {
    mutate: update,
    isPending: isUpdating,
    isErrorModalVisible: isUpdateErrorModalVisible,
    errorModalMessage: updateErrorMessage,
    closeErrorModal: closeUpdateErrorModal,
  } = useResourceMutation<ServiceDTO>({
    mutationFn: (vars) => updateServiceById(vars.id!, vars.payload),
    successToastMessage: "Serviço atualizado com sucesso!",
    successNavigationRoute: "/configuracoes/servicos",
    errorModalMessage: "Não foi possível atualizar o serviço. Verifique os dados e tente novamente.",
  });

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteService();
  const [isDeleteErrorModalVisible, setDeleteErrorModalVisible] = useState(false);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  useEffect(() => {
    if (serviceData) {
      reset({
        serviceName: serviceData.nome_servico,
        sectorId: serviceData.id_setor,
        pontuation: serviceData.pontuacao ?? 0,
      });
    }
  }, [serviceData, reset]);

  const onUpdateSubmit = (data: ServiceFormData) => {
    const payload: ServiceDTO = {
      nome_servico: data.serviceName,
      id_setor: data.sectorId,
      pontuacao: data.pontuation ?? null,
    };
    update({ id: serviceId, payload });
  };

  // 8. Função de submit para EXCLUIR
  const handleDeleteConfirm = () => {
    deleteItem(serviceId, {
      onSuccess: () => {
        navigate("/configuracoes/servicos", {
          state: {
            toastMessage: `Serviço excluído com sucesso!`,
            // toastMessage: `Serviço "${serviceData?.nome_servico}" excluído com sucesso!`,

          },
        });
      },
      onError: () => {
        setDeleteConfirmModalVisible(false);
        setDeleteErrorModalVisible(true);
      },
    });
  };

  const sectorOptions = formData?.setores?.map((setor) => ({
    value: setor.id_setor,
    label: setor.nome_setor,
  })) || [];

  const isLoading = isLoadingData || isLoadingFormData;

  return (
    <>
      <Modal
        title="Confirmar Exclusão"
        description={`Tem certeza que deseja excluir o serviço "${serviceData?.nome_servico}"? Esta ação não pode ser desfeita.`}
        isModalVisible={isDeleteConfirmModalVisible}
        buttonTitle1="CANCELAR"
        onClick1={() => setDeleteConfirmModalVisible(false)}
        buttonColor1="bg-customYellow"
        buttonTitle2="CONFIRMAR"
        onClick2={handleDeleteConfirm}
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
        isError={true}
      />

      <Modal
        title="Erro na Exclusão"
        isModalVisible={isDeleteErrorModalVisible}
        description="Não foi possível excluir o serviço. Tente novamente."
        onClick1={() => setDeleteErrorModalVisible(false)}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
        isError={true}
      />

      <BaseScreen>
        <BackButton onClick={() => navigate("/configuracoes/servicos")} />
        <PageTitle marginTop="mt-4" icon="fa-solid fa-pencil" title="Editar Serviço" />
        <Motion>
          <Box
            width="w-full"
            height="h-fit"
            title={`Detalhes de: ${serviceData?.nome_servico || ""}`}
            subtitle="Altere os dados ou exclua o serviço."
          >
            <StatusView isLoading={isLoading} isError={isError}>
              <form onSubmit={handleSubmit(onUpdateSubmit)}>
                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Controller
                      name="serviceName"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          height="h-12"
                          {...field}
                          title="NOME DO SERVIÇO"
                          width="w-full sm:w-1/2"
                          isMandatory
                          placeholder="Digite o nome do serviço..."
                          errorMessage={errors.serviceName?.message}
                          borderColor={errors.serviceName ? "border-customRedAlert" : "border-customYellow"}
                        />
                      )}
                    />
                    <Controller
                      name="sectorId"
                      control={control}
                      render={({ field }) => (
                        <SearchableSelect
                          title="SETOR RESPONSÁVEL"
                          isMandatory
                          width="w-full sm:w-1/2"
                          options={sectorOptions}
                          value={sectorOptions.find((c) => c.value === field.value) || null}
                          onChange={(option) => field.onChange(option ? option.value : undefined)}
                          placeholder={isLoadingFormData ? "Carregando..." : "Selecione um setor"}
                          errorMessage={errors.sectorId?.message}
                        />
                      )}
                    />
                  </div>
                  <Controller
                    name="pontuation"
                    control={control}
                    render={({ field }) => (
                      <InputQuantity
                        title="PONTUAÇÃO"
                        width="w-full sm:w-1/3"
                        isMandatory={false}
                        min={0}
                        max={10}
                        step={0.5}
                        value={field.value ?? 0}
                        onChange={field.onChange}
                        errorMessage={errors.pontuation?.message}
                        borderColor={errors.pontuation ? "border-customRedAlert" : "border-customYellow"}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                  <ColoredButton
                    type="button"
                    onClick={() => setDeleteConfirmModalVisible(true)}
                    title={isDeleting ? "EXCLUINDO..." : "EXCLUIR"}
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

export default EditService;
