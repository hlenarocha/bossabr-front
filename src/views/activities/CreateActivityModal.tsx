// hooks e bibliotecas
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import Modal from "@/components/modal/Modal";
import InputDate from "@/components/shared/InputDate";
import InputString from "@/components/shared/InputString";
import TextArea from "@/components/shared/TextArea";
import SearchableSelect from "@/components/shared/SearchableSelect";

// API, schemas, hooks e assets
import { activitySchema, ActivityFormData } from "@/schemas/activitySchema";
import { getDemandFormData } from "@/api/demandRoutes";
import {
  createDesignActivity,
  createSocialMediaActivity,
  DesignActivityDTO,
  SocialMediaActivityDTO,
} from "@/api/activityRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import IconSad from "@/assets/images/famicons_sad.png";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

interface CreateActivityModalProps {
  demandId: number;
  activityType: "design" | "social_media";
  onClose: () => void;
  setToast: (message: string, type: 'success' | 'error') => void;
}

const CreateActivityModal = ({
  demandId,
  activityType,
  onClose,
  setToast
}: CreateActivityModalProps) => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["demandFormData"],
    queryFn: getDemandFormData,
  });

  const mutationOptions = {
    successToastMessage: "",
    errorModalMessage: "Não foi possível registrar a atividade.",
    // A rota de navegação não será usada, pois onSuccess será sobrescrito
    successNavigationRoute: "", 
  };

  const { mutate: saveDesignActivity, isPending: isSavingDesign, ...designMutation } = 
    useResourceMutation<DesignActivityDTO>({
      ...mutationOptions,
      mutationFn: ({ payload }) => createDesignActivity(payload),
    });

  const { mutate: saveSocialMediaActivity, isPending: isSavingSocialMedia, ...socialMediaMutation } = 
    useResourceMutation<SocialMediaActivityDTO>({
      ...mutationOptions,
      mutationFn: ({ payload }) => createSocialMediaActivity(payload),
    });

  const { control, handleSubmit, formState: { errors } } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      startDate: new Date().toISOString().split("T")[0],
      statusId: undefined,
      driveLink: "",
      observations: "",
      text: "",
    },
    mode: "onChange",
  });

  const isPending = isSavingDesign || isSavingSocialMedia;
  const mutationError = designMutation.errorModalMessage || socialMediaMutation.errorModalMessage;
  const isErrorModalVisible = designMutation.isErrorModalVisible || socialMediaMutation.isErrorModalVisible;
  const closeErrorModal = isSavingDesign ? designMutation.closeErrorModal : socialMediaMutation.closeErrorModal;

  const onSubmit = (data: ActivityFormData) => {
    
    const onSuccess = () => {
      setToast("Atividade registrada com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: ["demands"] });
      onClose();
    };

    const onError = () => {
      setToast("Erro ao registrar atividade. Verifique os dados.", "error");
      onClose(); // Fecha o modal
    };


    const payload = {
      id_pessoa: user?.id_pessoa ?? 0,
      id_demanda: demandId,
      id_status: data.statusId,
      data_inicio: data.startDate,
      link_drive: data.driveLink,
      observacoes: data.observations,
      ...(activityType === 'social_media' && { texto: data.text }),
    };

    if (activityType === "design") {
      saveDesignActivity({ payload }, { onSuccess, onError });
    } else {
      saveSocialMediaActivity({ payload }, { onSuccess, onError });
    }
  };


  const statusOptions =
    formData?.status?.map((s) => ({ value: s.id_status, label: s.status })) ||
    [];

  return (
    <>
      {/* <Modal
        title="Erro!"
        description={mutationError}
        onClick1={closeErrorModal}
        isModalVisible={isErrorModalVisible}
        buttonTitle1="FECHAR"
        isError={true}
        iconImage={IconSad}
      /> */}

      <Modal
        title={`Registrar Atividade de ${activityType === "design" ? "Design" : "Social Media"}`}
        isModalVisible={true}
        onClick1={onClose}
        buttonTitle1="CANCELAR"
        buttonColor1="bg-customRedAlert"
        buttonTitle2={isPending ? "SALVANDO..." : "SALVAR ATIVIDADE"}
        buttonColor2="bg-customYellow"
        iconName="fa-solid fa-pen-to-square"
        onClick2={handleSubmit(onSubmit)}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-[450px] overflow-y-auto"
        >
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <InputDate
                {...field}
                title="DATA DE INÍCIO"
                isMandatory
                errorMessage={errors.startDate?.message}
                borderColor={errors.startDate ? "#EF4444" : "#F6BC0A"}
                />
            )}
          />

          <Controller
            name="statusId"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                title="ATUALIZAR STATUS PARA"
                isMandatory
                options={statusOptions}
                value={
                  statusOptions.find((s) => s.value === field.value) || null
                }
                onChange={(option) => field.onChange(option?.value)}
                placeholder={
                  isLoadingFormData ? "Carregando..." : "Selecione um status"
                }
                errorMessage={errors.statusId?.message}
                
              />
            )}
          />

          {activityType === "social_media" && (
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <TextArea
                  isMandatory={false}
                  {...field}
                  title="TEXTO"
                  placeholder="Digite o conteúdo aqui..."
                  height="h-[150px]"
                  errorMessage={errors.text?.message} 
                  borderColor={
                    errors.text
                      ? "border-customRedAlert"
                      : "border-customYellow"
                  }

                />
              )}
            />
          )}

          <Controller
            name="driveLink"
            control={control}
            render={({ field }) => (
              <InputString
                isMandatory={false}
                height="h-[40px]"
                {...field}
                title="LINK DO DRIVE"
                placeholder="Cole o link aqui..."
                errorMessage={errors.driveLink?.message}
                borderColor={
                  errors.driveLink
                    ? "border-customRedAlert"
                    : "border-customYellow"
                }
              />
            )}
          />

          <Controller
            name="observations"
            control={control}
            render={({ field }) => (
              <TextArea
                isMandatory={false}
                {...field}
                title="OBSERVAÇÕES"
                placeholder="Adicione comentários sobre a atividade..."
                height="h-[100px]"
                errorMessage={errors.observations?.message}
                borderColor={
                  errors.observations
                    ? "border-customRedAlert"
                    : "border-customYellow"
                }
              />
            )}
          />

          <div className="flex justify-end mt-4">
            {/* <button type="submit" disabled={isPending} className="bg-customYellow text-black font-bold py-2 px-4 rounded disabled:bg-gray-400">
              {isPending ? 'SALVANDO...' : 'SALVAR ATIVIDADE'}
            </button> */}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateActivityModal;
