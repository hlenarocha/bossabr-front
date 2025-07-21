import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useReadBusinessById } from "@/hooks/business/useReadBusinessById";
import { useUpdateBusiness } from "@/hooks/business/useUpdateBusiness";
import { useDeleteBusiness } from "@/hooks/business/useDeleteBusiness";

import { businessSchema, BusinessFormData } from "@/schemas/businessSchema";
import BaseScreen from "@/views/BaseScreen";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import Box from "@/components/box/BoxContent";
import InputString from "@/components/shared/InputString";
import ColoredButton from "@/components/shared/ColoredButton";
import Modal from "@/components/modal/Modal";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Motion } from "@/components/animation/Motion";

// import IconHappy from "@/assets/images/famicons_happy.png";
import IconSad from "@/assets/images/famicons_sad.png";

const EditBusiness = () => {
  const navigate = useNavigate();
  // useParams pega o id da URL
  const { id } = useParams<{ id: string }>();
  const businessId = Number(id);

  const {
    data: businessData,
    isLoading: isLoadingData,
    isError,
  } = useReadBusinessById(businessId);
  const { mutate: update } = useUpdateBusiness();
  const { mutate: deleteItem } = useDeleteBusiness();

  // const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isDeleteConfirmModalVisible, setDeleteConfirmModalVisible] =
    useState(false);
  const [isModalErrorDeleteVisible, setIsModalErrorDeleteVisible] =
    useState(false);
  const [isModalErrorUpdateVisible, setIsModalErrorUpdateVisible] =
    useState(false);

  // REACT HOOK FORM
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });

  // preenche o formulário quando os dados da API chegam
  useEffect(() => {
    if (businessData) {
      reset({ businessName: businessData.nome_setor_negocio });
    }
  }, [businessData, reset]);

  // HANDLERS
  const onUpdateSubmit = (data: BusinessFormData) => {
    update(
      { id: businessId, data: { nome_setor_negocio: data.businessName } },
      {
        onSuccess: () => {
          navigate("/configuracoes/negocios", {
            state: { toastMessage: "Setor de negócio atualizado com sucesso!" },
          });
        },
        onError: () => {
          setIsModalErrorUpdateVisible(true);
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    deleteItem(businessId, {
      onSuccess: () => {
        navigate("/configuracoes/negocios", {
          state: {
            toastMessage: `Setor de negócio "${businessData?.nome_setor_negocio}" excluído com sucesso!`,
          },
        });
      },
      onError: () => {
        setIsModalErrorDeleteVisible(true);
      },
    });
  };

  // Carregamento e erros
  if (isLoadingData) {
    return (
      <BaseScreen>
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      </BaseScreen>
    );
  }

  if (isError) {
    return (
      <BaseScreen>
        <div className="text-center text-customRedAlert mt-10">
          Erro ao carregar os dados do setor.
        </div>
      </BaseScreen>
    );
  }

  return (
    <>
      {/* <Modal
        title="Sucesso!"
        description="Setor de negócio atualizado com sucesso."
        isModalVisible={isSuccessModalVisible}
        onClick1={() => setSuccessModalVisible(false)}
        buttonTitle1="OK"
        iconImage={IconHappy}
      /> */}
      <Modal
        title="Confirmar Exclusão"
        description={`Tem certeza que deseja excluir o setor "${businessData?.nome_setor_negocio}"? Esta ação não pode ser desfeita.`}
        isModalVisible={isDeleteConfirmModalVisible}
        buttonTitle1="CANCELAR"
        onClick2={handleDeleteConfirm}
        buttonColor1="bg-customYellow"
        buttonTitle2="CONFIRMAR"
        onClick1={() => setDeleteConfirmModalVisible(false)}
        buttonColor2="bg-customRedAlert"
        iconName="fa-circle-exclamation"
        iconColor="text-customRedAlert"
      />

      <Modal
        title="Erro!"
        isModalVisible={isModalErrorDeleteVisible}
        description="Não foi possível deletar o setor. Tente novamente."
        onClick1={() => setIsModalErrorDeleteVisible(false)}
        buttonTitle1="FECHAR"
        iconImage={IconSad}
        isError={true}
      />

      <Modal
        title="Erro!"
        isModalVisible={isModalErrorUpdateVisible}
        description="Não foi possível atualizar o setor. Tente novamente."
        onClick1={() => setIsModalErrorUpdateVisible(false)}
        buttonTitle1="FECHAR"
        isError={true}
        iconImage={IconSad}
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
                  title={"EXCLUIR"}
                  color="customRedAlert"
                  icon="fa-solid fa-trash"
                  width="w-full sm:w-auto"
                  justify="justify-center"
                />
                <ColoredButton
                  type="submit"
                  title={"SALVAR ALTERAÇÕES"}
                  color="customYellow"
                  icon="fa-solid fa-floppy-disk"
                  width="w-full sm:w-auto"
                  justify="justify-center"
                />
              </div>
            </form>
          </Box>
        </Motion>
      </BaseScreen>
    </>
  );
};

export default EditBusiness;
