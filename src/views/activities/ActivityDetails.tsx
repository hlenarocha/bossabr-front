// hooks e bibliotecas
import { useNavigate, useParams, useLocation } from "react-router-dom";

// Componentes
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import BackButton from "@/components/shared/BackButton";
import PageTitle from "@/components/title/PageTitle";
import InputTitle from "@/components/title/InputTitle";
import InputString from "@/components/shared/InputString";
import TextArea from "@/components/shared/TextArea";
import { Motion } from "@/components/animation/Motion";
import { StatusView } from "@/components/shared/StatusView";
import StatusTag from "@/components/shared/StatusTag";
import { formatDateToBR } from "@/utils/formatDate";

// API, hooks
import { useReadActivityById } from "@/hooks/activity/useReadActivityById";

const ActivityDetailsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, id } = useParams<{
    type: "design" | "social_media";
    id: string;
  }>();
  const activityId = Number(id);

  const previousRoute = location.state?.from || "/area-trabalho";

  const {
    data: activity,
    isLoading,
    isError,
  } = useReadActivityById(type, activityId);

  return (
    <BaseScreen>
      <BackButton onClick={() => navigate(previousRoute)} />
      <PageTitle
        marginTop="mt-4"
        icon="fa-solid fa-clipboard-check" // Ícone mais apropriado para atividade
        title="Detalhes da Atividade"
      />

      <Motion>
        <Box
          width="w-full"
          height="h-fit"
          title={activity?.nome_servico || "Carregando..."}
          subtitle={`Cliente: ${activity?.nome_empresa || ""}`}
        >
          <StatusView
            isLoading={isLoading}
            isError={isError}
            errorMessage="Não foi possível carregar os detalhes da atividade."
          >
            {activity && (
              <>
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-6">
                  {/* Status da Atividade */}
                  <div className="w-full sm:w-auto">
                    <p className="text-white font-bold text-sm mb-1">STATUS</p>
                    <StatusTag status={activity.status} />
                  </div>
                  {/* Datas */}
                  {/* Alterado: Adicionado flex-col sm:flex-row para as datas empilharem em telas muito pequenas */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:justify-end">
                    <InputString
                      title="DATA DE INÍCIO"
                      placeholder={formatDateToBR(activity.data_inicio)}
                      isReadOnly
                      height="h-8"
                    />
                    <InputString
                      title="DATA DE CONCLUSÃO"
                      placeholder={formatDateToBR(activity.data_fim)}
                      isReadOnly
                      height="h-8"
                    />
                  </div>
                </div>

                <InputTitle title="Detalhes da Atividade" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <InputString
                    title="CLIENTE"
                    placeholder={activity.nome_empresa}
                    isReadOnly
                    height="h-8"
                  />
                  <InputString
                    title="TIPO DE SERVIÇO"
                    placeholder={activity.nome_servico}
                    isReadOnly
                    height="h-8"
                  />
                </div>

                {/* Link para a Demanda pai */}
                <div className="mt-4">
                  <InputTitle title="Demanda Associada" />
                  <div
                    className="bg-zinc-900 text-customYellow font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 mt-2 hover:bg-zinc-700 cursor-pointer"
                    onClick={() => navigate(`/demandas/${activity.id_demanda}`)}
                  >
                    <i className="fa-solid fa-link"></i>
                    Ver detalhes da Demanda #{activity.id_demanda}
                  </div>
                </div>

                {activity.texto && (
                  <div className="mt-4">
                    <TextArea
                      isMandatory={false}
                      placeholder={activity.texto}
                      title="TEXTO PRODUZIDO"
                      isReadOnly
                      height="h-[150px]"
                    />
                  </div>
                )}

                <div className="mt-4">
                  <TextArea
                    isMandatory={false}
                    placeholder={activity.observacoes || "Nenhuma observação."}
                    title="OBSERVAÇÕES REGISTRADAS"
                    isReadOnly
                    height="h-[100px]"
                  />
                </div>

                <div className="mt-4">
                  <InputString
                    title="LINK DO DRIVE"
                    placeholder={
                      activity.link_drive || "Nenhum link fornecido."
                    }
                    isReadOnly
                    height="h-8"
                  />
                </div>
              </>
            )}
          </StatusView>
        </Box>
      </Motion>
    </BaseScreen>
  );
};

export default ActivityDetailsScreen;