import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Hooks
import { useReadBusinessById } from "@/hooks/business/useReadBusinessById";
import { useDeleteBusiness } from "@/hooks/business/useDeleteBusiness";
import { useResourceMutation } from "@/hooks/useResourceMutation"; // 1. Importando o seu novo hook genérico

// API, Schemas e Componentes
import { updateBusinessById, BusinessDTO } from "@/api/businessRoutes";
import { businessSchema, BusinessFormData } from "@/schemas/businessSchema";
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import Box from "@/components/box/BoxContent";
import InputString from "@/components/shared/InputString";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import { Motion } from "@/components/animation/Motion";
import IconSad from "@/assets/images/famicons_sad.png";
import { StatusView } from "@/components/shared/StatusView";

const EditBusiness = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const businessId = Number(id);

  const {
    data: businessData,
    isLoading: isLoadingData,
    isError,
  } = useReadBusinessById(businessId);

  const {
    mutate: update,
    isPending: isUpdating,
    isErrorModalVisible: isUpdateErrorModalVisible,
    errorModalMessage: updateErrorMessage,
    closeErrorModal: closeUpdateErrorModal,
  } = useResourceMutation<BusinessDTO>({
    mutationFn: (vars) => updateBusinessById(vars.id!, vars.payload),
    successToastMessage: "Setor de negócio atualizado com sucesso!",
    successNavigationRoute: "/configuracoes/negocios",
    errorModalMessage:
      "Não foi possível atualizar o setor. Verifique os dados e tente novamente.",
  });

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteBusiness();
  const [isDeleteErrorModalVisible, setDeleteErrorModalVisible] =
    useState(false);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });

  useEffect(() => {
    if (businessData) {
      reset({ businessName: businessData.nome_setor_negocio });
    }
  }, [businessData, reset]);

  const onUpdateSubmit = (data: BusinessFormData) => {
    update({
      id: businessId,
      payload: { nome_setor_negocio: data.businessName },
    });
  };

  const handleDeleteConfirm = () => {
    deleteItem(businessId, {
      onSuccess: () => {
        navigate("/configuracoes/negocios", {
          state: {
            toastMessage: `Setor "${businessData?.nome_setor_negocio}" excluído com sucesso!`,
          },
        });
      },
      onError: () => {
        setDeleteConfirmModalVisible(false); // fecha o modal de confirmação antes
        setDeleteErrorModalVisible(true);
      },
    });
  };

  return (
    <>
      <Modal
        title="Confirmar Exclusão"
        description={`Tem certeza que deseja excluir o setor "${businessData?.nome_setor_negocio}"? Esta ação não pode ser desfeita.`}
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
        description="Não foi possível excluir o setor. Tente novamente."
        onClick1={() => setDeleteErrorModalVisible(false)}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
        isError={true}
      />

      <BaseScreen>
        <BackButton onClick={() => navigate("/configuracoes/negocios")} />
        <PageTitle
          marginTop="mt-4"
          icon="fa-solid fa-pencil"
          title="Editar Setor de Negócio"
        />
        <Motion>
          <Box
            width="w-full"
            height="h-fit"
            title={`Detalhes de: ${businessData?.nome_setor_negocio || ""}`}
            subtitle="Altere o nome ou exclua o setor de negócio."
          >
            <StatusView isLoading={isLoadingData} isError={isError}>
              <form onSubmit={handleSubmit(onUpdateSubmit)}>
                <div className="w-full flex flex-col">
                  <Controller
                    name="businessName"
                    control={control}
                    render={({ field }) => (
                      <InputString
                        {...field}
                        title="NOME DO SETOR DE NEGÓCIO"
                        height="h-[40px]"
                        isMandatory
                        placeholder="Digite o nome do setor de negócio"
                        errorMessage={errors.businessName?.message}
                        borderColor={
                          errors.businessName
                            ? "border-customRedAlert"
                            : "border-customYellow"
                        }
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

export default EditBusiness;
