// hooks e bibliotecas
import { useState, useMemo } from "react"; 
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import PageTitle from "@/components/title/PageTitle";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";
import FilterButtonGroup, {
  FilterOption,
} from "@/components/shared/FilterButtonGroup";
import ColoredButton from "@/components/shared/ColoredButton";
import ApprovalModal from "@/views/activities/ApprovalModal"; 

// API e Hooks
import { useReadPendingApprovals } from "@/hooks/activity/useReadPendingApprovals";
import { PendingActivity } from "@/api/approvalRoutes";
import { useApprovalAction } from "@/hooks/activity/useApprovalAction";
import Toast from "@/components/shared/Toast";

const ActivitiesApproval = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("todos");

  const { data: allActivities, isLoading, isError } = useReadPendingApprovals();

  const { mutate: performApprovalAction, isPending: isUpdating } =
    useApprovalAction();

  const filteredActivities = useMemo(() => {
    if (!allActivities) return [];
    if (filter === "todos") return allActivities;
    if (filter === "design")
      return allActivities.filter((act) => act.tipo === "Design");
    if (filter === "social")
      return allActivities.filter((act) => act.tipo === "Social Media");
    // Adicionar mais filtros se necessário, como 'recentes' e 'antigas'
    return allActivities;
  }, [allActivities, filter]);

  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState<PendingActivity | null>(null);
  const [approvalAction, setApprovalAction] = useState<
    "approve" | "reprove" | null
  >(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Adicionado: Função de apoio para o Toast, para definir a mensagem e o tipo juntos
  const handleSetToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleApproveClick = (activity: PendingActivity) => {
    setSelectedActivity(activity);
    setApprovalAction("approve");
    setIsApprovalModalOpen(true);
  };
  const handleReproveClick = (activity: PendingActivity) => {
    setSelectedActivity(activity);
    setApprovalAction("reprove");
    setIsApprovalModalOpen(true);
  };
  const handleConfirmAction = (reason?: string) => {
    if (!selectedActivity || !approvalAction) return;
    const apiType = selectedActivity.tipo.toLowerCase().replace(' ', '_') as 'design' | 'social_media';

    performApprovalAction({
      action: approvalAction,
      type: apiType,
      activityId: selectedActivity.id_atividade,
      reason: reason,
    }, {
      onSuccess: () => {
        handleSetToast(`Atividade ${approvalAction === 'approve' ? 'aprovada' : 'reprovada'} com sucesso!`, "success");
        setIsApprovalModalOpen(false);
      },
      onError: () => {
        handleSetToast("Ocorreu um erro ao processar a ação.", "error");
        setIsApprovalModalOpen(false);       }
    });
  };

  const filterOptions: FilterOption[] = [
    {
      value: "todos",
      label: "Todos",
      icon: "fa-solid fa-layer-group",
      baseColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      value: "design",
      label: "Design",
      icon: "fa-solid fa-palette",
      baseColor: "bg-purple-500",
      textColor: "text-white",
    },
    {
      value: "social",
      label: "Social Media",
      icon: "fa-solid fa-share-nodes",
      baseColor: "bg-pink-500",
      textColor: "text-white",
    },
  ];

  return (
    <>
      <BaseScreen>
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
          <PageTitle
            icon="fa-solid fa-clipboard-check"
            title="Fila de aprovação"
          />
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <ColoredButton
              justify="justify-center"
              color="customYellow"
              width="w-full sm:w-fit"
              title="LISTA DE DEMANDAS"
              icon="fa-solid fa-eye"
              onClick={() => navigate("/demandas/lista")}
            />
            <ColoredButton
              justify="justify-center"
              onClick={() => navigate("/demandas/nova")}
              color="customYellow"
              width="w-full sm:w-fit"
              title="ADICIONAR DEMANDA"
              icon="fa-solid fa-circle-plus"
            />
          </div>
        </div>

        <Motion>
          <Box
            width="w-full"
            height="h-fit"
            title="Atividades pendentes de revisão"
            subtitle="Analise as atividades enviadas e tome uma ação para dar continuidade às demandas."
          >
            <div className="mb-6">
              <FilterButtonGroup
                options={filterOptions}
                selectedValue={filter}
                onFilterChange={setFilter}
              />
            </div>

            <div className="max-h-[600px] overflow-y-auto pr-2">
              <StatusView
                isLoading={isLoading}
                isError={isError}
                errorMessage="Não foi possível carregar as atividades."
              >
                <div className="flex flex-col gap-4">
                  {filteredActivities && filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                      <div
                        key={activity.id_atividade}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-3 transition-all hover:border-customYellow"
                      >
                        <div className="flex justify-between items-center">
                          <h3
                            className="font-bold text-white text-lg cursor-pointer hover:underline"
                            onClick={() =>
                              navigate(`/demandas/${activity.id_demanda}`)
                            }
                          >
                            Demanda #{activity.id_demanda}:{" "}
                            {activity.nome_servico || "Serviço não informado"}
                          </h3>
                          <span className="text-xs text-zinc-400">
                            {formatDistanceToNow(
                              new Date(activity.data_inicio),
                              { addSuffix: true, locale: ptBR }
                            )}
                          </span>
                        </div>
                        <div className="text-sm text-zinc-300">
                          Enviado por:{" "}
                          <span className="font-semibold text-white">
                            {activity.nome_colaborador || "N/A"}
                          </span>
                          {" | "}
                          Setor:{" "}
                          <span className="font-semibold text-white">
                            {activity.nome_setor}
                          </span>
                        </div>
                        <div className="bg-zinc-900 p-3 rounded-md text-sm">
                          <p className="text-zinc-400 mb-2">
                            <i className="fa-solid fa-comment-dots mr-2"></i>
                            {activity.observacoes}
                          </p>
                          {activity.link_drive && (
                            <div className="flex flex-col gap-1 pt-2 border-t border-zinc-700">
                              <a
                                href={activity.link_drive}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 hover:underline text-xs"
                              >
                                <i className="fa-solid fa-link mr-2"></i>{" "}
                                {activity.link_drive}
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end gap-3 mt-2">
                          <ColoredButton
                            title="Reprovar atividade"
                            icon="fa-solid fa-times"
                            borderColor="border-customRedTask"
                            onClick={() => handleReproveClick(activity)}
                          />
                          <ColoredButton
                            title="Aprovar atividade"
                            icon="fa-solid fa-check"
                            borderColor="border-customGreenTask"
                            onClick={() => handleApproveClick(activity)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-zinc-400 py-16">
                      <i className="fa-solid fa-check-double text-4xl mb-4"></i>
                      <p className="font-bold">Caixa de entrada limpa!</p>
                      <p>
                        Nenhuma atividade aguardando sua aprovação no momento.
                      </p>
                    </div>
                  )}
                </div>
              </StatusView>
            </div>
          </Box>
        </Motion>
      </BaseScreen>
      {isApprovalModalOpen && selectedActivity && approvalAction && (
        <ApprovalModal
          isOpen={isApprovalModalOpen}
          onClose={() => setIsApprovalModalOpen(false)}
          onConfirm={handleConfirmAction}
          action={approvalAction}
          activityTitle={
            selectedActivity.nome_servico ||
            `Atividade #${selectedActivity.id_atividade}`
          }
        />
        
      )}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
};

export default ActivitiesApproval;
