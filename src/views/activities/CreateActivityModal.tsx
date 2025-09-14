// hooks e bibliotecas
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useMemo } from "react";

// Componentes
import Modal from "@/components/modal/Modal";
import InputDate from "@/components/shared/InputDate";
import InputString from "@/components/shared/InputString";
import TextArea from "@/components/shared/TextArea";
import SearchableSelect from "@/components/shared/SearchableSelect";
import Timeline, { TimelineItemProps } from "@/components/shared/Timeline";
import { StatusView } from "@/components/shared/StatusView";

// API, schemas, hooks e assets
import { activitySchema, ActivityFormData } from "@/schemas/activitySchema";
import {
  createDesignActivity,
  createSocialMediaActivity,
  DesignActivityDTO,
  getDesignActivityFormData,
  getSocialMediaActivityFormData,
  SocialMediaActivityDTO,
} from "@/api/activityRoutes";
import { useResourceMutation } from "@/hooks/useResourceMutation";
import { UserContext } from "@/contexts/UserContext";
import { useReadDemandHistory } from "@/hooks/demands/useReadDemandHistory";

interface CreateActivityModalProps {
  demandId: number;
  navigateToOnSuccess: string;
  activityType: "design" | "social_media";
  onClose: () => void;
  setToast: (message: string, type: "success" | "error") => void;
}

const CreateActivityModal = ({
  demandId,
  activityType,
  onClose,
  setToast,
  navigateToOnSuccess,
}: CreateActivityModalProps) => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

  // --- BUSCA DE DADOS PARA O FORMULÁRIO (ESQUERDA) ---
  const { data: formData, isLoading: isLoadingFormData } = useQuery({
    // A chave da query agora inclui o 'activityType'.
    // Isso faz com que o React Query armazene em cache os dados para 'design'
    // e 'social_media' separadamente.
    queryKey: ["activityFormData", activityType],
    
    // A função de busca agora decide qual rota chamar com base no 'activityType'.
    queryFn: () => activityType === 'design' 
      ? getDesignActivityFormData() 
      : getSocialMediaActivityFormData(),
    
    
    // Garante que a busca só aconteça se 'activityType' for válido.
    enabled: !!activityType,

  });

  // --- BUSCA DE DADOS PARA O HISTÓRICO (DIREITA) ---
  const {
    data: historyData,
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
  } = useReadDemandHistory(demandId);

  const { mutate: saveDesignActivity, isPending: isSavingDesign } =
    useResourceMutation<DesignActivityDTO>({
      mutationFn: ({ payload }) => createDesignActivity(payload),
      successToastMessage: "Atividade de design criada com sucesso!",
      successNavigationRoute: navigateToOnSuccess,
      errorModalMessage:
        "Não foi possível criar a atividade de design. Verifique os dados e tente novamente.",
    });

  const { mutate: saveSocialMediaActivity, isPending: isSavingSocialMedia } =
    useResourceMutation<SocialMediaActivityDTO>({
      mutationFn: ({ payload }) => createSocialMediaActivity(payload),
      successToastMessage: "Atividade de social media criada com sucesso!",
      successNavigationRoute: navigateToOnSuccess,
      errorModalMessage:
        "Não foi possível criar a atividade de social media. Verifique os dados e tente novamente.",
    });

  // --- CONFIGURAÇÃO DO FORMULÁRIO ---
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

  // --- TRANSFORMAÇÃO DOS DADOS DO HISTÓRICO PARA A TIMELINE (DIREITA) ---
  const timelineItems: TimelineItemProps[] = useMemo(() => {
    if (!historyData) return [];
    const designerActivities = historyData.atividades_designer.map((act) => ({
      id: `design-${act.id_ativ_designer}`,
      type: "Design" as const,
      author: `${act.pessoa.first_name} ${act.pessoa.last_name || ""}`.trim(),
      teamName: act.equipe_pessoa.equipe.nome_equipe,
      date: act.data_inicio,
      status: act.status.status,
      observation: act.observacoes,
    }));
    const socialMediaActivities = historyData.atividades_social_media.map(
      (act) => ({
        id: `sm-${act.id_ativ_social_media}`,
        type: "Social Media" as const,
        author: `${act.pessoa.first_name} ${act.pessoa.last_name || ""}`.trim(),
        teamName: act.equipe_pessoa.equipe.nome_equipe,
        date: act.data_inicio,
        status: act.status.status,
        observation: act.observacoes,
      })
    );
    const combined = [...designerActivities, ...socialMediaActivities];
    return combined.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [historyData]);

  // --- FUNÇÃO DE SUBMISSÃO DO FORMULÁRIO ---
  const onSubmit = (data: ActivityFormData) => {
    const onSuccess = () => {
      setToast("Atividade registrada com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: ["demands"] });
      queryClient.invalidateQueries({ queryKey: ['unifiedDemands'] });
      queryClient.invalidateQueries({ queryKey: ["demandHistory", demandId] });
      onClose();
    };
    const onError = () => {
      setToast("Erro ao registrar atividade.", "error");
    };
    const payload = {
      id_pessoa: user?.id_pessoa ?? 0,
      id_demanda: demandId,
      id_status: data.statusId,
      data_inicio: data.startDate,
      link_drive: data.driveLink,
      observacoes: data.observations,
      ...(activityType === "social_media" && { texto: data.text }),
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
    <Modal
      title={`Registrar Atividade de ${
        activityType === "design" ? "Design" : "Social Media"
      }`}
      isModalVisible={true}
      onClick1={onClose}
      buttonTitle1="CANCELAR"
      width="w-11/12 max-w-7xl"
      height="h-auto max-h-[90vh]"
      buttonColor1="bg-customRedAlert"
      buttonTitle2={isPending ? "SALVANDO..." : "SALVAR ATIVIDADE"}
      buttonColor2="bg-customYellow"
      iconName="fa-solid fa-pen-to-square"
      onClick2={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LADO ESQUERDO: FORMULÁRIO DE REGISTRO */}
        <div className="w-full lg:w-1/2 lg:pr-6 border-b lg:border-b-0 lg:border-r border-zinc-700 pb-6 lg:pb-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <InputDate
                  {...field}
                  title="DATA DE INÍCIO"
                  isMandatory
                  borderColor={errors.startDate ? "#EF4444" : "#F6BC0A"}
                  errorMessage={errors.startDate?.message}
                />
              )}
            />
            <Controller
              name="statusId"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  title="STATUS DA ATIVIDADE"
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
                    {...field}
                    isMandatory={false}
                    title="TEXTO"
                    placeholder="Digite o conteúdo aqui..."
                    height="h-[150px]"
                    borderColor={
                      errors.text
                        ? "border-customRedAlert"
                        : "border-customYellow"
                    }
                    errorMessage={errors.text?.message}
                  />
                )}
              />
            )}
            <Controller
              name="driveLink"
              control={control}
              render={({ field }) => (
                <InputString
                  {...field}
                  height="h-8"
                  isMandatory={false}
                  title="LINK DO DRIVE"
                  placeholder="Cole o link aqui..."
                  borderColor={
                    errors.driveLink
                      ? "border-customRedAlert"
                      : "border-customYellow"
                  }
                  errorMessage={errors.driveLink?.message}
                />
              )}
            />
            <Controller
              name="observations"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  isMandatory={false}
                  title="OBSERVAÇÕES"
                  placeholder="Adicione comentários..."
                  height="h-[100px]"
                  borderColor={
                    errors.observations
                      ? "border-customRedAlert"
                      : "border-customYellow"
                  }
                  errorMessage={errors.observations?.message}
                />
              )}
            />
          </form>
        </div>

        {/* LADO DIREITO: HISTÓRICO DA DEMANDA */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4 shrink-0">
            <i className="fa-solid fa-history mr-2"></i>
            Linha do tempo das atividades
          </h3>
          <div className="flex-grow min-h-[300px]">
            <StatusView
              isLoading={isLoadingHistory}
              isError={isErrorHistory}
              errorMessage="Não foi possível carregar o histórico."
            >
              <Timeline
                items={timelineItems}
                emptyMessage="Nenhuma atividade registrada para esta demanda ainda."
              />
            </StatusView>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateActivityModal;
