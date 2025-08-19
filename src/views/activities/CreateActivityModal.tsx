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

interface CreateActivityModalProps {
  demandId: number;
  activityType: "design" | "social_media";
  onClose: () => void;
}

const CreateActivityModal = ({
  demandId,
  activityType,
  onClose,
}: CreateActivityModalProps) => {
  const queryClient = useQueryClient();

  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    queryKey: ["demandFormData"],
    queryFn: getDemandFormData,
  });

  // --- MUTAÇÕES ---
  // A propriedade 'successNavigationRoute' foi adicionada para satisfazer o tipo do hook.
  const {
    mutate: saveDesignActivity,
    isPending: isSavingDesign,
    isErrorModalVisible: isDesignErrorVisible,
    errorModalMessage: designErrorMessage,
    closeErrorModal: closeDesignErrorModal,
  } = useResourceMutation<DesignActivityDTO>({
    mutationFn: ({ payload }) => createDesignActivity(payload),
    successToastMessage: "Atividade de Design registrada!",
    errorModalMessage: "Não foi possível registrar a atividade.",
    successNavigationRoute: "", // Adicionado para corrigir o erro de tipo
  });

  const {
    mutate: saveSocialMediaActivity,
    isPending: isSavingSocialMedia,
    isErrorModalVisible: isSocialMediaErrorVisible,
    errorModalMessage: socialMediaErrorMessage,
    closeErrorModal: closeSocialMediaErrorModal,
  } = useResourceMutation<SocialMediaActivityDTO>({
    mutationFn: ({ payload }) => createSocialMediaActivity(payload),
    successToastMessage: "Atividade de Social Media registrada!",
    errorModalMessage: "Não foi possível registrar a atividade.",
    successNavigationRoute: "", // Adicionado para corrigir o erro de tipo
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityFormData>({
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

  // A função onSubmit passa a lógica de sucesso como segundo argumento para o mutate.
  const onSubmit = (data: ActivityFormData) => {
    const onSuccess = () => {
      queryClient.invalidateQueries({ queryKey: ["demands"] });
      queryClient.invalidateQueries({ queryKey: ["demand", demandId] });
      onClose();
    };

    if (activityType === "design") {
      const payload: DesignActivityDTO = {
        id_demanda: demandId,
        id_status: data.statusId,
        data_inicio: data.startDate,
        link_drive: data.driveLink,
        observacoes: data.observations,
      };
      saveDesignActivity({ payload }, { onSuccess });
    } else if (activityType === "social_media") {
      const payload: SocialMediaActivityDTO = {
        id_demanda: demandId,
        id_status: data.statusId,
        data_inicio: data.startDate,
        texto: data.text,
        link_drive: data.driveLink,
        observacoes: data.observations,
      };
      saveSocialMediaActivity({ payload }, { onSuccess });
    }
  };

  const statusOptions =
    formData?.status?.map((s) => ({ value: s.id_status, label: s.status })) ||
    [];

  return (
    <>
      {/* Modal de Erro unificado */}
      <Modal
        title="Erro!"
        description={designErrorMessage || socialMediaErrorMessage}
        onClick1={
          isDesignErrorVisible
            ? closeDesignErrorModal
            : closeSocialMediaErrorModal
        }
        isModalVisible={isDesignErrorVisible || isSocialMediaErrorVisible}
        buttonTitle1="FECHAR"
        isError={true}
        iconImage={IconSad}
      />

      <Modal
        title={`Registrar Atividade de ${
          activityType === "design" ? "Design" : "Social Media"
        }`}
        isModalVisible={true}
        onClick1={onClose}
        buttonTitle1="CANCELAR"
        buttonColor1="bg-customRedAlert"
        buttonColor2="bg-customYellow"
        buttonTitle2="SALVAR ATIVIDADE"
        iconName="fa-solid fa-pen-to-square"
        onClick2={handleSubmit(onSubmit)}

        // hasSubmitButton={false}
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
