// hooks e bibliotecas
import { useState } from "react";
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

interface Activity {
  activityId: number;
  demandId: number;
  demandTitle: string;
  collaboratorName: string;
  collaboratorTeam: string;
  submissionDate: Date;
  observation: string;
  links: { label: string; url: string }[];
}

// Em um cenário real, isso viria de um hook (ex: useReadApprovalQueue)
const mockActivities = [
  {
    activityId: 101,
    demandId: 25,
    demandTitle: "Criação de 3 artes para post do Dia do Cliente",
    collaboratorName: "Ana Silva",
    collaboratorTeam: "Design Alpha",
    submissionDate: new Date(2025, 7, 28, 10, 30, 0), // Mês 7 = Agosto
    observation:
      "Artes finalizadas conforme o briefing. Seguem os links para aprovação e para o drive com os arquivos abertos.",
    links: [{ label: "Acessar pasta no Drive", url: "#" }],
  },
  {
    activityId: 102,
    demandId: 32,
    demandTitle: "Revisão de texto para blogpost sobre Marketing Digital",
    collaboratorName: "Carlos Pereira",
    collaboratorTeam: "Social Media",
    submissionDate: new Date(2025, 7, 28, 9, 0, 0),
    observation:
      "Texto revisado e ajustado. Por favor, verificar se o tom de voz está adequado. A referência está no link abaixo.",
    links: [{ label: "Documento de referência.docx", url: "#" }],
  },
  {
    activityId: 103,
    demandId: 18,
    demandTitle: "Legendas para posts da semana - Cliente Y",
    collaboratorName: "Juliana Costa",
    collaboratorTeam: "Social Media",
    submissionDate: new Date(2025, 7, 27, 16, 45, 0),
    observation:
      "Legendas criadas para os 5 posts da semana. Não há links para esta atividade.",
    links: [],
  },
];
// --- FIM DOS DADOS ESTÁTICOS ---

const ActivitiesApproval = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("recentes");

  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [approvalAction, setApprovalAction] = useState<
    "approve" | "reprove" | null
  >(null);

  const handleApproveClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setApprovalAction("approve");
    setIsApprovalModalOpen(true);
  };

  const handleReproveClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setApprovalAction("reprove");
    setIsApprovalModalOpen(true);
  };

  // Adicionado: Função que será chamada quando o modal for confirmado
  const handleConfirmAction = (reason?: string) => {
    if (!selectedActivity) return;

    if (approvalAction === "approve") {
      // Aqui você chamaria a sua API para APROVAR
      alert(
        `Atividade #${selectedActivity.activityId} APROVADA! (Ação simulada)`
      );
    } else if (approvalAction === "reprove") {
      // Aqui você chamaria a sua API para REPROVAR, enviando o 'reason'
      alert(
        `Atividade #${selectedActivity.activityId} REPROVADA! (Ação simulada)\nMotivo: ${reason}`
      );
    }

    // Fecha e reseta o modal
    setIsApprovalModalOpen(false);
    setSelectedActivity(null);
    setApprovalAction(null);
  };

  const filterOptions: FilterOption[] = [
    {
      value: "recentes",
      label: "Mais Recentes",
      icon: "fa-solid fa-clock-rotate-left",
      baseColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      value: "antigas",
      label: "Mais Antigas",
      icon: "fa-solid fa-hourglass-end",
      baseColor: "bg-yellow-500",
      textColor: "text-zinc-900",
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

  const isLoading = false;
  const isError = false;

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
              onClick={() =>
                navigate("/demandas/lista", {
                  state: { previousRoute: "/demandas/atendente/aprovacao" },
                })
              }
            />
            <ColoredButton
              justify="justify-center"
              onClick={() =>
                navigate("/demandas/nova", {
                  state: { previousRoute: "/demandas/atendente/aprovacao" },
                })
              }
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
              <StatusView isLoading={isLoading} isError={isError}>
                <div className="flex flex-col gap-4">
                  {mockActivities.length > 0 ? (
                    mockActivities.map((activity) => (
                      <div
                        key={activity.activityId}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex flex-col gap-3 transition-all hover:border-customYellow"
                      >
                        <div className="flex justify-between items-center">
                          <h3
                            className="font-bold text-white text-lg cursor-pointer hover:underline"
                            onClick={() =>
                              navigate(`/demandas/${activity.demandId}`)
                            }
                          >
                            Demanda #{activity.demandId}: {activity.demandTitle}
                          </h3>
                          <span className="text-xs text-zinc-400">
                            {formatDistanceToNow(activity.submissionDate, {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <div className="text-sm text-zinc-300">
                          Enviado por:{" "}
                          <span className="font-semibold text-white">
                            {activity.collaboratorName}
                          </span>
                          {" | "}
                          Equipe:{" "}
                          <span className="font-semibold text-white">
                            {activity.collaboratorTeam}
                          </span>
                        </div>
                        <div className="bg-zinc-900 p-3 rounded-md text-sm">
                          <p className="text-zinc-400 mb-2">
                            <i className="fa-solid fa-comment-dots mr-2"></i>
                            {activity.observation}
                          </p>
                          {activity.links.length > 0 && (
                            <div className="flex flex-col gap-1 pt-2 border-t border-zinc-700">
                              {activity.links.map((link) => (
                                <a
                                  key={link.url}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-30ȧ0 hover:underline text-xs"
                                >
                                  <i className="fa-solid fa-link mr-2"></i>
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end gap-3 mt-2">
                          <ColoredButton
                            title="Reprovar atividade"
                            icon="fa-solid fa-times"
                            borderColor="border-customRedTask" // Adicionado para borda
                            onClick={() => handleReproveClick(activity)}
                          />
                          <ColoredButton
                            title="Aprovar atividade"
                            icon="fa-solid fa-check"
                            borderColor="border-customGreenTask" // Adicionado para borda
                            onClick={() => handleApproveClick(activity)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-zinc-500 py-16">
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
          activityTitle={selectedActivity.demandTitle}
        />
      )}
    </>
  );
};

export default ActivitiesApproval;
