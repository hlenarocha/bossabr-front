// hooks e bibliotecas
import { useState, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Componentes
import PageTitle from "@/components/title/PageTitle";
import BaseScreen from "@/views/BaseScreen";
import Box from "@/components/box/BoxContent";
import InputString from "@/components/shared/InputString";
import InputTitle from "@/components/title/InputTitle";
import TableItem from "@/components/table/TableItem";
import ColoredButton from "@/components/shared/ColoredButton";
import { Motion } from "@/components/animation/Motion";
import BackButton from "@/components/shared/BackButton";
import InputDate from "@/components/shared/InputDate";
import { ResourceListView } from "@/components/shared/ResourceListView";
import StatusTag from "@/components/shared/StatusTag";

// Contexto, hooks e API
import { UserContext } from "@/contexts/UserContext";
import { useReadDailyReport } from "@/hooks/reports/useReadDailyReport";

const DailyReportScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const cameFromAdminList = location.state?.from === "/diarios/admin";

  const [reportDate, setReportDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const { data: reportData, isLoading, isError } = useReadDailyReport(user?.id_pessoa, reportDate);
  console.log(reportData);

  // Combina as atividades de design e social media em uma única lista
  const allActivities = useMemo(() => {
    if (!reportData) return [];
    return [...reportData.ativ_design, ...reportData.ativ_social_media];
  }, [reportData]);

  return (
    <BaseScreen>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-4">
          {cameFromAdminList && <BackButton onClick={() => navigate("/diarios/admin")} />}
          <PageTitle
            icon="fa-solid fa-book"
            title={`Diário de ${user?.first_name || ""} ${user?.last_name || ""}`}
          />
        </div>
       
      </div>

      <Motion>
        <Box
          title="Diário de atividades"
          subtitle="Selecione um dia para visualizar as atividades registradas."
          width="w-full"
          height="h-fit"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InputDate
              isMandatory={false}
              title="DATA SELECIONADA"
              value={reportDate}
              onChange={(value: string) => setReportDate(value)}
              height="h-10"
            />
            <InputString title="NOME" placeholder={`${user?.first_name || ''} ${user?.last_name || ''}`} isReadOnly height="h-10" />
            <InputString title="EQUIPE / SETOR" placeholder={`${user?.nome_equipe || 'N/A'} - ${user?.nome_setor || 'N/A'}`} isReadOnly height="h-10" />
          </div>

          <InputTitle 
            title={
              <div className="flex items-center gap-4">
                <span>Atividades Registradas</span>
                <div className="bg-zinc-800 text-customYellow font-bold py-1 px-3 rounded-lg inline-flex items-center gap-2 text-sm">
                  <i className="fa-solid fa-calendar-day"></i>
                  {format(new Date(reportDate + "T12:00:00"), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </div>
              </div>
            } 
          />
          <TableItem
            columns={[
              { width: "30%", content: "SERVIÇO" },
              { width: "25%", content: "CLIENTE" },
              { width: "25%", content: "OBSERVAÇÕES" },
              { width: "10%", content: "STATUS" },
              { width: "10%", content: "AÇÕES" },
            ]}
            isTableHeader={true}
            itemHeight="h-12"
          />

          <div className="h-[350px] overflow-y-auto">
            <ResourceListView
              isLoading={isLoading}
              isError={isError}
              items={allActivities}
              showMessage="Selecione outra data."
              emptyMessage="Nenhuma atividade registrada para este dia."
              errorMessage="Erro ao carregar as atividades."
              renderItem={(activity: any) => {
                const isDesign = !!activity.id_ativ_designer;
                const activityType = isDesign ? 'design' : 'social_media';
                const activityId = isDesign ? activity.id_ativ_designer : activity.id_ativ_social_media;

                return (
                <TableItem
                  key={activityId}
                  columns={[
                    { width: "30%", content: activity.nome_servico },
                    { width: "25%", content: activity.nome_empresa },
                    { width: "25%", content: <div className="truncate" title={activity.observacoes || ""}>{activity.observacoes || "-"}</div> },
                    { width: "10%", content: <StatusTag status={activity.status} /> },
                    {
                      width: "10%",
                      content: (
                        <i
                          className="fa-solid fa-eye text-lg text-customYellow hover:cursor-pointer"
                          title="Visualizar detalhes da atividade"
                          // mudar depois o id
                          onClick={() => navigate(`/diarios/${activityType}/${activityId}`, { state: { from: '/diarios' } })}                        ></i>
                      ),
                    },
                  ]}
                  itemHeight="h-12"
                />
              );
            }}
            />
          </div>
        </Box>
      </Motion>
    </BaseScreen>
  );
};

export default DailyReportScreen;
