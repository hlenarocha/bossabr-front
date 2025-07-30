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
import SearchableSelect from "@/components/shared/SearchableSelect";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";

// API, schemas, hooks e assets
import { clientSchema, ClientFormData } from "@/schemas/clientSchema";
import {
  getClientFormData,
  updateClientById,
  ClientDTO,
  ClientItem,
} from "@/api/clientRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import { useReadClientById } from "@/hooks/client/useReadClientById";
import { useDeleteClient } from "@/hooks/client/useDeleteClient";
import IconSad from "@/assets/images/famicons_sad.png";

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);

  // --- BUSCA DE DADOS ---
  const {
    data: clientData,
    isLoading: isLoadingData,
    isError,
  } = useReadClientById(clientId);
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["clientFormData"],
    queryFn: getClientFormData,
  });

  // --- MUTAÇÕES (UPDATE E DELETE) ---
  const {
    mutate: update,
    isPending: isUpdating,
    isErrorModalVisible: isUpdateErrorModalVisible,
    errorModalMessage: updateErrorMessage,
    closeErrorModal: closeUpdateErrorModal,
  } = useResourceMutation<ClientDTO, ClientItem>({
    mutationFn: (vars) => updateClientById(vars.id!, vars.payload),
    successToastMessage: "Cliente atualizado com sucesso!",
    successNavigationRoute: "/configuracoes/clientes",
    errorModalMessage: "Não foi possível atualizar o cliente.",
  });

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteClient();
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
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      enterpriseName: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      isActive: true,
      businessId: undefined,
    },
    mode: "onChange",
  });

  useEffect(() => {


    if (clientData) {

      console.log(clientData);
      reset({
        enterpriseName: clientData.nome_empresa,
        contactName: clientData.nome_responsavel,
        businessId: clientData.id_setor_negocio,
        contactEmail: clientData.email,
        contactPhone: clientData.telefone,
        entryDate: clientData.data_entrada,
        contractEndDate: clientData.data_fim_contrato,
        contractDescription: clientData.desc_contrato,
        briefing: clientData.briefing,
        isActive: clientData.ativo,
        classification: clientData.classificacao,
      });
    }
  }, [clientData, reset]);

  const onUpdateSubmit = (data: ClientFormData) => {
    const payload: ClientDTO = {
      nome_empresa: data.enterpriseName,
      nome_responsavel: data.contactName,
      id_setor_negocio: data.businessId ?? 0,
      email: data.contactEmail ?? "",
      telefone: data.contactPhone ?? "",
      data_entrada: data.entryDate ?? "",
      data_fim_contrato: data.contractEndDate ?? "",
      desc_contrato: data.contractDescription ?? "",
      briefing: data.briefing ?? "",
      ativo: data.isActive ?? true,
      classificacao: data.classification ?? "",
    };
    update({ id: clientId, payload });
  };

  const handleDeleteConfirm = () => {
    deleteItem(clientId, {
      onSuccess: () => {
        navigate("/configuracoes/clientes", {
          state: {
            toastMessage: `Cliente "${clientData?.nome_empresa}" excluído com sucesso!`,
          },
        });
      },
      onError: () => {
        setDeleteConfirmModalVisible(false);
        setDeleteErrorModalVisible(true);
      },
    });
  };

  const businessSectorOptions =
    formData?.setoresNegocio?.map((s) => ({
      value: s.id_setor_negocio,
      label: s.nome_setor_negocio,
    })) || [];

  const isLoading = isLoadingData || isLoadingFormData;

  return (
    <>
      {/* --- MODAIS --- */}
      <Modal
        title="Confirmar Exclusão"
        isModalVisible={isDeleteConfirmModalVisible}
        description={`Tem certeza que deseja excluir o cliente "${clientData?.nome_empresa}"? Esta ação não pode ser desfeita.`}
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
        description="Não foi possível excluir o cliente."
        onClick1={() => setDeleteErrorModalVisible(false)}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
        isError
      />

      <BaseScreen>
        <BackButton onClick={() => navigate("/configuracoes/clientes")} />
        <PageTitle
          marginTop="mt-4"
          icon="fa-solid fa-pencil"
          title="Editar Cliente"
        />
        <Motion>
          <Box
            width="w-full"
            height="h-fit"
            title={`Detalhes de: ${
              clientData?.nome_empresa || "Carregando..."
            }`}
            subtitle="Altere os dados ou exclua o cliente."
          >
            <StatusView isLoading={isLoading} isError={isError}>
              <form onSubmit={handleSubmit(onUpdateSubmit)}>
                <InputTitle title="Dados do Cliente" />
                <div className="flex flex-col gap-4 mb-4">
                  <div className="flex flex-row items-end gap-4">
                    <Controller
                      name="enterpriseName"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          title="NOME DO CLIENTE"
                          width="w-2/3"
                          height="h-[40px]"
                          isMandatory={true}
                          placeholder="Digite o nome do cliente..."
                          errorMessage={errors.enterpriseName?.message}
                          borderColor={
                            errors.enterpriseName
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                        />
                      )}
                    />
                    <div className="w-1/3 mb-1">
                      <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                          <ToggleSwitch
                            title="CLIENTE ATIVO?"
                            isMandatory={true}
                            isChecked={field.value ?? false}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <Controller
                    name="classification"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="CLASSIFICAÇÃO"
                        width="w-2/3"
                        height="h-[40px]"
                        isMandatory={false}
                        placeholder="ex.: Lead Qualificado"
                        errorMessage={errors.classification?.message}
                        borderColor={
                          errors.classification
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                  <Controller
                    name="businessId"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        title="SETOR DE NEGÓCIO"
                        isMandatory={false}
                        options={businessSectorOptions}
                        value={
                          businessSectorOptions.find(
                            (c) => c.value === field.value
                          ) || null
                        }
                        onChange={(option) => field.onChange(option?.value)}
                        placeholder={
                          isLoadingFormData
                            ? "Carregando..."
                            : "Selecione um setor"
                        }
                        errorMessage={errors.businessId?.message}
                        width="w-full"
                      />
                    )}
                  />
                  <div className="flex gap-4">
                    <Controller
                      name="entryDate"
                      control={control}
                      render={({ field }) => (
                        <InputDate
                          {...field}
                          title="DATA DE ENTRADA"
                          width="w-1/2"
                          isMandatory={false}
                          errorMessage={errors.entryDate?.message}
                          borderColor={errors.entryDate ? "#EF4444" : "#F6BC0A"}
                        />
                      )}
                    />
                    <Controller
                      name="contractEndDate"
                      control={control}
                      render={({ field }) => (
                        <InputDate
                          {...field}
                          title="DATA DE FIM DO CONTRATO"
                          width="w-1/2"
                          isMandatory={false}
                          errorMessage={errors.contractEndDate?.message}
                          borderColor={
                            errors.contractEndDate ? "#EF4444" : "#F6BC0A"
                          }
                        />
                      )}
                    />
                  </div>
                  <Controller
                    name="contractDescription"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        title="DESCRIÇÃO DO CONTRATO"
                        placeholder="Digite um resumo do contrato..."
                        height="h-[100px]"
                        isMandatory={false}
                        errorMessage={errors.contractDescription?.message}
                        borderColor={
                          errors.contractDescription
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                  <Controller
                    name="briefing"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        title="BRIEFING"
                        placeholder="Digite o briefing do cliente..."
                        height="h-[100px]"
                        isMandatory={false}
                        errorMessage={errors.briefing?.message}
                        borderColor={
                          errors.briefing
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                </div>

                <InputTitle title="Responsável pelo Cliente" />
                <div className="flex flex-col gap-4">
                  <Controller
                    name="contactName"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="NOME DO RESPONSÁVEL"
                        width="w-2/3"
                        height="h-[40px]"
                        isMandatory
                        placeholder="Digite o nome..."
                        errorMessage={errors.contactName?.message}
                        borderColor={
                          errors.contactName
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
                      />
                    )}
                  />
                  <div className="flex gap-4">
                    <Controller
                      name="contactPhone"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          title="NÚMERO PARA CONTATO"
                          width="w-1/2"
                          height="h-[40px]"
                          isMandatory={false}
                          placeholder="(__) _____-____"
                          mask="(00) 00000-0000"
                          errorMessage={errors.contactPhone?.message}
                          borderColor={
                            errors.contactPhone
                              ? "border-customRedAlert"
                              : "border-customYellow"
                          }
                        />
                      )}
                    />
                    <Controller
                      name="contactEmail"
                      control={control}
                      render={({ field }) => (
                        <InputString
                          {...field}
                          title="E-MAIL PARA CONTATO"
                          width="w-1/2"
                          height="h-[40px]"
                          isMandatory={false}
                          placeholder="Digite o e-mail..."
                          errorMessage={errors.contactEmail?.message}
                          borderColor={
                            errors.contactEmail
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
                    title={isDeleting ? "EXCLUINDO..." : "EXCLUIR CLIENTE"}
                    color="customRedAlert"
                    icon="fa-solid fa-trash"
                    width="w-full sm:w-auto"
                    justify="justify-center"
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

export default EditClient;
