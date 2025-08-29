// hooks e bibliotecas
import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";
import Timeline, { TimelineItemProps } from "@/components/shared/Timeline";

// Hook
import { useReadDemandHistory } from "@/hooks/demands/useReadDemandHistory";

const DemandHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const demandId = Number(id);

  const {
    data: historyData,
    isLoading,
    isError,
  } = useReadDemandHistory(demandId);

  // Transforma os dados da API para o formato esperado pelo componente Timeline
  const timelineItems: TimelineItemProps[] = useMemo(() => {
    if (!historyData) return [];

    const designerActivities = historyData.atividades_designer.map((act) => ({
      id: `design-${act.id_ativ_designer}`,
      type: "Design" as const,
      author: `${act.pessoa.first_name} ${act.pessoa.last_name || ""}`.trim(),
      teamName: act.equipe_pessoa.equipe.nome_equipe, // ADICIONADO
      date: act.data_inicio,
      status: act.status.status,
      observation: act.observacoes,
    }));

    const socialMediaActivities = historyData.atividades_social_media.map(
      (act) => ({
        id: `sm-${act.id_ativ_social_media}`,
        type: "Social Media" as const,
        author: `${act.pessoa.first_name} ${act.pessoa.last_name || ""}`.trim(),
        teamName: act.equipe_pessoa.equipe.nome_equipe, // ADICIONADO
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

  return (
    <BaseScreen>
      <BackButton onClick={() => navigate(`/demandas/${demandId}`)} />
      <PageTitle
        marginTop="mt-4"
        icon="fa-solid fa-history"
        title={`Histórico da Demanda #${demandId}`}
      />
      <Motion>
        <Box
          width="w-full"
          height="h-fit"
          title="Linha do Tempo de Atividades"
          subtitle="Visualize todos os registros de atividades para esta demanda, do mais recente ao mais antigo."
        >
          <div className="h-[500px] overflow-y-auto">
            <StatusView isLoading={isLoading} isError={isError}>
              <Timeline
                items={timelineItems}
                emptyMessage="Nenhuma atividade registrada para esta demanda."
              />
            </StatusView>
          </div>
        </Box>
      </Motion>
    </BaseScreen>
  );
};

export default DemandHistory;
